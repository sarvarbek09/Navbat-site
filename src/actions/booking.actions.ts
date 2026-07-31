"use server";

import { db } from "@/lib/db";
import { bookings, blockedSlots, services } from "@/lib/schema";
import { requireAuth } from "@/lib/auth";
import { publish } from "@/lib/realtime";
import { isTimeAvailable } from "@/lib/availability";
import { createBookingSchema, updateBookingSchema } from "@/schemas/booking";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const session = await requireAuth("client");

  const parsed = createBookingSchema.safeParse({
    salonId: formData.get("salonId"),
    serviceId: formData.get("serviceId"),
    date: formData.get("date"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.id, parsed.data.serviceId))
    .limit(1);

  if (!service) return { error: "Xizmat topilmadi" };

  const blocked = await db
    .select()
    .from(blockedSlots)
    .where(eq(blockedSlots.salonId, parsed.data.salonId));

  const existing = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.salonId, parsed.data.salonId),
        inArray(bookings.status, ["pending", "confirmed"])
      )
    );

  const bookingEnd = new Date(
    parsed.data.date.getTime() + service.duration * 60_000
  );

  if (
    !isTimeAvailable(
      parsed.data.date,
      bookingEnd,
      blocked,
      existing,
      service.duration
    )
  ) {
    return { error: "Bu vaqt band. Boshqa vaqt tanlang." };
  }

  const [booking] = await db
    .insert(bookings)
    .values({
      salonId: parsed.data.salonId,
      serviceId: parsed.data.serviceId,
      clientId: session.id,
      date: parsed.data.date,
    })
    .returning();

  publish({
    type: "booking_created",
    salonId: booking.salonId,
    bookingId: booking.id,
  });

  revalidatePath("/my-bookings");
  return { data: booking };
}

export async function updateBookingStatus(formData: FormData) {
  await requireAuth("owner");

  const parsed = updateBookingSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const [booking] = await db
    .update(bookings)
    .set({ status: parsed.data.status })
    .where(eq(bookings.id, parsed.data.id))
    .returning();

  if (!booking) return { error: "Booking topilmadi" };

  publish({
    type: "booking_updated",
    salonId: booking.salonId,
    bookingId: booking.id,
    data: { status: booking.status },
  });

  revalidatePath("/dashboard");
  return { data: booking };
}

export async function cancelBooking(bookingId: string) {
  const session = await requireAuth("client");

  const [booking] = await db
    .update(bookings)
    .set({ status: "cancelled" })
    .where(eq(bookings.id, bookingId))
    .returning();

  if (!booking || booking.clientId !== session.id) {
    return { error: "Booking topilmadi" };
  }

  publish({
    type: "booking_cancelled",
    salonId: booking.salonId,
    bookingId: booking.id,
  });

  revalidatePath("/my-bookings");
  return { data: booking };
}
