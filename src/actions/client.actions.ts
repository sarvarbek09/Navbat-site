"use server";

import { db } from "@/lib/db";
import { users, bookings } from "@/lib/schema";
import { getCurrentSalon } from "@/lib/salon";
import { createClientSchema } from "@/schemas/client";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getClients() {
  const salon = await getCurrentSalon();
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
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.clientId, clientId))
    .orderBy(desc(bookings.date));
}

export async function createClient(formData: FormData) {
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
