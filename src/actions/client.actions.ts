"use server";

import { db } from "@/lib/db";
import { users, bookings, salons } from "@/lib/schema";
import { requireAuth } from "@/lib/auth";
import { createClientSchema } from "@/schemas/client";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getClients() {
  const session = await requireAuth("owner");

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.ownerId, session.id))
    .limit(1);

  if (!salon) return [];

  const clients = await db
    .selectDistinct({
      id: users.id,
      name: users.name,
      phone: users.phone,
      createdAt: users.createdAt,
    })
    .from(users)
    .innerJoin(bookings, eq(bookings.clientId, users.id))
    .where(eq(bookings.salonId, salon.id))
    .orderBy(desc(users.createdAt));

  return clients;
}

export async function getClientBookings(clientId: string) {
  await requireAuth("owner");

  return db
    .select()
    .from(bookings)
    .where(eq(bookings.clientId, clientId))
    .orderBy(desc(bookings.date));
}

export async function createClient(formData: FormData) {
  await requireAuth("owner");

  const parsed = createClientSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const [client] = await db
    .insert(users)
    .values({ ...parsed.data, role: "client" })
    .returning();

  revalidatePath("/clients");
  return { data: client };
}
