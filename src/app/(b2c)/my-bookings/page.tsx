import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookings, services, salons } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { cancelBooking } from "@/actions/booking.actions";
import { redirect } from "next/navigation";

const statusLabels: Record<string, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlangan",
  cancelled: "Bekor qilingan",
  completed: "Yakunlangan",
};

export default async function MyBookingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const myBookings = await db
    .select({
      booking: bookings,
      service: services,
      salon: salons,
    })
    .from(bookings)
    .innerJoin(services, eq(bookings.serviceId, services.id))
    .innerJoin(salons, eq(bookings.salonId, salons.id))
    .where(eq(bookings.clientId, session.id))
    .orderBy(desc(bookings.date));

  return (
    <div>
      <h1 className="text-2xl font-bold">Mening bronlarim</h1>

      {myBookings.length === 0 ? (
        <p className="mt-4 text-gray-500">Hozircha bronlar yo&apos;q</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {myBookings.map(({ booking, service, salon }) => (
            <li
              key={booking.id}
              className="rounded-lg border bg-white p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{salon.name}</p>
                  <p className="text-sm text-gray-500">{service.name}</p>
                  <p className="mt-1 text-sm">
                    {new Date(booking.date).toLocaleString("uz-UZ")}
                  </p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                  {statusLabels[booking.status]}
                </span>
              </div>

              {booking.status === "pending" && (
                <form
                  action={async () => {
                    "use server";
                    await cancelBooking(booking.id);
                  }}
                  className="mt-3"
                >
                  <button
                    type="submit"
                    className="text-sm text-red-600 hover:underline"
                  >
                    Bekor qilish
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
