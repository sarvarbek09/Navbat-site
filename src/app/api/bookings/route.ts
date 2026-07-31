import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, services, salons } from "@/lib/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const salonId = searchParams.get("salonId");
  const clientId = searchParams.get("clientId");

  if (clientId) {
    const result = await db
      .select({
        booking: bookings,
        service: services,
        salon: salons,
      })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .innerJoin(salons, eq(bookings.salonId, salons.id))
      .where(eq(bookings.clientId, clientId))
      .orderBy(desc(bookings.date));

    return NextResponse.json(result);
  }

  if (salonId) {
    const result = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.salonId, salonId),
          eq(bookings.status, "pending")
        )
      )
      .orderBy(desc(bookings.date));

    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "salonId yoki clientId kerak" }, { status: 400 });
}
