// BRONLAR MODULI — loyihaning eng markaziy qismi.
// Mantiq Next.js ilovasidagi src/actions/booking.actions.ts bilan 1:1 bir xil,
// faqat HTTP qatlamiga moslashtirilgan (throw AppError -> error-handler orqali
// mos status kod bilan JSON javob).
import { and, desc, eq, inArray } from "drizzle-orm";
import { db } from "../../db/client";
import { bookings, blockedSlots, services, salons } from "../../db/schema";
import { isTimeAvailable } from "../../lib/availability";
import { publish } from "../../lib/realtime";
import { AppError, ForbiddenError, NotFoundError } from "../../lib/errors";
import { getSalonByOwnerOrThrow } from "../salons/salons.service";
import type { CreateBookingInput, UpdateBookingStatusInput } from "../../schemas/booking.schema";
import type { Booking } from "../../db/schema";

/**
 * Yangi bron yaratadi. Qadamlar:
 *  1) xizmat mavjudligini tekshiradi (narx/davomiylik shundan olinadi),
 *  2) shu salon uchun band vaqtlar (blockedSlots) va faol bronlarni (pending/confirmed) o'qiydi,
 *  3) isTimeAvailable() bilan kesishish yo'qligini tekshiradi,
 *  4) bo'sh bo'lsa — bazaga yozadi va realtime orqali "booking_created" xabar tarqatadi.
 */
export async function createBooking(clientId: string, input: CreateBookingInput): Promise<Booking> {
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, input.serviceId))
    .limit(1);

  if (!service) throw NotFoundError("Xizmat topilmadi");
  if (service.salonId !== input.salonId) {
    throw new AppError("Bu xizmat ko'rsatilgan salonga tegishli emas", 400);
  }

  const blocked = await db
    .select()
    .from(blockedSlots)
    .where(eq(blockedSlots.salonId, input.salonId));

  const existing = await db
    .select()
    .from(bookings)
    .where(
      and(eq(bookings.salonId, input.salonId), inArray(bookings.status, ["pending", "confirmed"]))
    );

  const bookingEnd = new Date(input.date.getTime() + service.duration * 60_000);

  if (!isTimeAvailable(input.date, bookingEnd, blocked, existing, service.duration)) {
    throw new AppError("Bu vaqt band. Boshqa vaqt tanlang.", 409);
  }

  const [booking] = await db
    .insert(bookings)
    .values({
      salonId: input.salonId,
      serviceId: input.serviceId,
      clientId,
      date: input.date,
    })
    .returning();

  publish({ type: "booking_created", salonId: booking.salonId, bookingId: booking.id });

  return booking;
}

/** Salon egasi bron holatini o'zgartiradi (pending -> confirmed va h.k.) */
export async function updateBookingStatus(
  ownerId: string,
  bookingId: string,
  input: UpdateBookingStatusInput
): Promise<Booking> {
  // Bron haqiqatan ham shu ownerning saloniga tegishli ekanini tekshiramiz
  const salon = await getSalonByOwnerOrThrow(ownerId);

  const [existing] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
  if (!existing) throw NotFoundError("Bron topilmadi");
  if (existing.salonId !== salon.id) throw ForbiddenError("Bu bron sizning salonizga tegishli emas");

  const [booking] = await db
    .update(bookings)
    .set({ status: input.status })
    .where(eq(bookings.id, bookingId))
    .returning();

  publish({
    type: "booking_updated",
    salonId: booking.salonId,
    bookingId: booking.id,
    data: { status: booking.status },
  });

  return booking;
}

/** Mijoz o'z bronini bekor qiladi — faqat o'zinikini, boshqa mijoznikini emas */
export async function cancelBooking(clientId: string, bookingId: string): Promise<Booking> {
  const [existing] = await db.select().from(bookings).where(eq(bookings.id, bookingId)).limit(1);
  if (!existing || existing.clientId !== clientId) {
    throw NotFoundError("Bron topilmadi");
  }

  const [booking] = await db
    .update(bookings)
    .set({ status: "cancelled" })
    .where(eq(bookings.id, bookingId))
    .returning();

  publish({ type: "booking_cancelled", salonId: booking.salonId, bookingId: booking.id });

  return booking;
}

/**
 * Mijozning o'z bronlari — xizmat va salon ma'lumotlari bilan birga (join).
 * Next.js tarafidagi GET /api/bookings?clientId=... o'rnini bosadi, farqi:
 * clientId query orqali emas, sessiyadan (req.user.id) olinadi — shu tufayli
 * boshqa mijozning bronlarini clientId ni bilib ko'rib bo'lmaydi.
 */
export async function getMyBookings(clientId: string) {
  return db
    .select({ booking: bookings, service: services, salon: salons })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(salons, eq(bookings.salonId, salons.id))
    .where(eq(bookings.clientId, clientId))
    .orderBy(desc(bookings.date));
}

/**
 * Owner uchun — o'z salonidagi kutilayotgan (pending) bronlar ro'yxati.
 * Next.js tarafidagi GET /api/bookings?salonId=... o'rnini bosadi, farqi:
 * salonId query'dan emas, sessiyadagi owner'ning o'z salonidan olinadi —
 * boshqa salonning bronlarini salonId ni bilib ko'rib bo'lmaydi.
 */
export async function getSalonPendingBookings(ownerId: string, salonId: string): Promise<Booking[]> {
  const salon = await getSalonByOwnerOrThrow(ownerId);
  if (salon.id !== salonId) throw ForbiddenError("Bu salon sizga tegishli emas");

  return db
    .select()
    .from(bookings)
    .where(and(eq(bookings.salonId, salonId), eq(bookings.status, "pending")))
    .orderBy(desc(bookings.date));
}
