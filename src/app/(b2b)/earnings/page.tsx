import { db } from "@/lib/db";
import { bookings, services, salons } from "@/lib/schema";
import { eq, and, sum } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export default async function EarningsPage() {
  const session = await getSession();

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.ownerId, session!.id))
    .limit(1);

  if (!salon) {
    return <p className="text-gray-500">Salon topilmadi</p>;
  }

  const [total] = await db
    .select({ amount: sum(services.price) })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(
      and(eq(bookings.salonId, salon.id), eq(bookings.status, "completed"))
    );

  const completedBookings = await db
    .select({
      booking: bookings,
      service: services,
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .where(
      and(eq(bookings.salonId, salon.id), eq(bookings.status, "completed"))
    )
    .orderBy(bookings.date);

  return (
    <div>
      <h1 className="text-2xl font-bold">Daromad</h1>

      <div className="mt-6 rounded-lg border bg-white p-6">
        <p className="text-sm text-gray-500">Jami daromad</p>
        <p className="text-3xl font-bold">
          {Number(total.amount ?? 0).toLocaleString()} so&apos;m
        </p>
      </div>

      <h2 className="mt-8 text-lg font-semibold">Yakunlangan bronlar</h2>
      <ul className="mt-4 space-y-3">
        {completedBookings.map(({ booking, service }) => (
          <li
            key={booking.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(booking.date).toLocaleDateString("uz-UZ")}
              </p>
            </div>
            <p className="font-medium">
              {service.price.toLocaleString()} so&apos;m
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
