import { db } from "@/lib/db";
import { bookings, services, users, salons } from "@/lib/schema";
import { eq, and, count } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { ConfirmBookingButton } from "../_components/confirm-booking-button";

const statusLabels: Record<string, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlangan",
  cancelled: "Bekor qilingan",
  completed: "Yakunlangan",
};

export default async function DashboardPage() {
  const session = await getSession();

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.ownerId, session!.id))
    .limit(1);

  if (!salon) {
    return <p className="text-gray-500">Salon topilmadi</p>;
  }

  const [pendingCount] = await db
    .select({ count: count() })
    .from(bookings)
    .where(and(eq(bookings.salonId, salon.id), eq(bookings.status, "pending")));

  const recentBookings = await db
    .select({
      booking: bookings,
      service: services,
      client: users,
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(users, eq(bookings.clientId, users.id))
    .where(eq(bookings.salonId, salon.id))
    .orderBy(bookings.createdAt)
    .limit(10);

  return (
    <div>
      <h1 className="text-2xl font-bold">{salon.name}</h1>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4">
          <p className="text-sm text-gray-500">Kutilayotgan</p>
          <p className="text-2xl font-bold">{pendingCount.count}</p>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">So&apos;nggi bronlar</h2>
      <ul className="mt-4 space-y-3">
        {recentBookings.map(({ booking, service, client }) => (
          <li
            key={booking.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4"
          >
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-500">
                {service.name} — {new Date(booking.date).toLocaleString("uz-UZ")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">
                {statusLabels[booking.status]}
              </span>
              {booking.status === "pending" && (
                <ConfirmBookingButton bookingId={booking.id} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
