// MIJOZLAR MODULI — salon egasi o'ziga bron qilgan mijozlarni ko'radi/qo'shadi.
// Next.js tarafidagi src/actions/client.actions.ts bilan bir xil mantiq.
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { users, bookings } from "../../db/schema";
import { getSalonByOwnerOrThrow } from "../salons/salons.service";
import type { CreateClientInput } from "../../schemas/client.schema";
import type { Booking, User } from "../../db/schema";

/** Owner'ning saloniga hech bo'lmasa bitta marta bron qilgan mijozlar ro'yxati */
export async function getClients(ownerId: string): Promise<Pick<User, "id" | "name" | "phone" | "createdAt">[]> {
  const salon = await getSalonByOwnerOrThrow(ownerId).catch(() => null);
  if (!salon) return []; // Next.js tarafidagi getClients() bilan bir xil: salon yo'q bo'lsa bo'sh massiv

  return db
    .selectDistinct({ id: users.id, name: users.name, phone: users.phone, createdAt: users.createdAt })
    .from(users)
    .innerJoin(bookings, eq(bookings.clientId, users.id))
    .where(eq(bookings.salonId, salon.id))
    .orderBy(desc(users.createdAt));
}

/**
 * Bitta mijozning barcha bronlari.
 * TODO(backend team): hozircha bu yerda "mijoz haqiqatan ham shu ownerning
 * salonida bron qilganmi" degan tekshiruv YO'Q (Next.js tarafidagi
 * getClientBookings() da ham yo'q edi) — istalgan owner istalgan clientId
 * bo'yicha bronlarni ko'ra oladi. Ko'p-salonli muhitga o'tilganda buni
 * getClients() dagidek salonId orqali filtrlash kerak bo'ladi.
 */
export async function getClientBookings(clientId: string): Promise<Booking[]> {
  return db.select().from(bookings).where(eq(bookings.clientId, clientId)).orderBy(desc(bookings.date));
}

/** Owner mijozni qo'lda (masalan telefon orqali kelgan mijoz uchun) qo'shadi */
export async function createClient(input: CreateClientInput): Promise<User> {
  const [client] = await db.insert(users).values({ ...input, role: "client" }).returning();
  return client;
}
