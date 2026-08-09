import { db } from "@/lib/db";
import { bookings, services, users, staff } from "@/lib/schema";
import { eq, gte, and, lt } from "drizzle-orm";
import { getCurrentSalon } from "@/lib/salon";
import { ScheduleBoard } from "../_components/schedule-board";

export default async function SchedulePage() {
  const salon = await getCurrentSalon();

  if (!salon) {
    return <p className="text-gray-500">Salon topilmadi</p>;
  }

  // Ustalar
  const staffList = await db
    .select()
    .from(staff)
    .where(eq(staff.salonId, salon.id))
    .orderBy(staff.name);

  // Bronlar — oldingi oy, hozir va kelgusi oy (kalendar va jadval uchun)
  const rangeStart = new Date();
  rangeStart.setDate(1);
  rangeStart.setMonth(rangeStart.getMonth() - 1);
  rangeStart.setHours(0, 0, 0, 0);

  const rangeEnd = new Date();
  rangeEnd.setDate(1);
  rangeEnd.setMonth(rangeEnd.getMonth() + 2);
  rangeEnd.setHours(0, 0, 0, 0);

  const bookingRows = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      status: bookings.status,
      clientName: users.name,
      serviceName: services.name,
      serviceDuration: services.duration,
      staffId: bookings.staffId,
    })
    .from(bookings)
    .innerJoin(users, eq(bookings.clientId, users.id))
    .innerJoin(services, eq(bookings.serviceId, services.id))      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, rangeStart),
          lt(bookings.date, rangeEnd)
        )
      )
      .orderBy(bookings.date);

  const bookingsForBoard = bookingRows.map((b) => ({
    ...b,
    date: b.date.toISOString(),
  }));

  const staffForBoard = staffList.map((s) => ({
    id: s.id,
    name: s.name,
    color: s.color ?? "#3525cd",
  }));

  return (
    <ScheduleBoard
      salonName={salon.name}
      staff={staffForBoard}
      bookings={bookingsForBoard}
    />
  );
}
