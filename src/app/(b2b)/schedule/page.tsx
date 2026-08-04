import { db } from "@/lib/db";
import { blockedSlots, bookings, salons } from "@/lib/schema";
import { eq, and, gte, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { unblockTimeSlot } from "@/actions/availability.actions";
import { ScheduleRealtime } from "@/components/schedule-realtime";
import { BlockTimeForm } from "../_components/block-time-form";

export default async function SchedulePage() {
  const session = await getSession();

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.ownerId, session!.id))
    .limit(1);

  if (!salon) {
    return <p className="text-gray-500">Salon topilmadi</p>;
  }

  const now = new Date();

  const blocked = await db
    .select()
    .from(blockedSlots)
    .where(and(eq(blockedSlots.salonId, salon.id), gte(blockedSlots.endTime, now)))
    .orderBy(blockedSlots.startTime);

  const upcomingBookings = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.salonId, salon.id),
        gte(bookings.date, now)
      )
    )
    .orderBy(bookings.date);

  const activeBookings = upcomingBookings.filter(
    (b) => b.status !== "cancelled"
  );

  return (
    <div>
      <ScheduleRealtime salonId={salon.id} />

      <h1 className="text-2xl font-bold">Jadval</h1>
      <p className="mt-1 text-sm text-gray-500">
        Band vaqtlarni belgilang — qolgan vaqt avtomatik bo&apos;sh
      </p>

      {/* Band vaqt qo'shish */}
      <BlockTimeForm />

      {/* Band vaqtlar ro'yxati */}
      <section className="mt-8">
        <h2 className="font-semibold text-red-600">Band vaqtlar</h2>
        {blocked.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400">Band vaqt yo&apos;q</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {blocked.map((slot) => (
              <li
                key={slot.id}
                className="flex flex-col gap-2 rounded-lg border border-red-100 bg-red-50 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium">
                    {slot.startTime.toLocaleString("uz-UZ")} —{" "}
                    {slot.endTime.toLocaleTimeString("uz-UZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {slot.reason && (
                    <p className="text-xs text-gray-500">{slot.reason}</p>
                  )}
                </div>
                <form
                  action={async () => {
                    "use server";
                    await unblockTimeSlot(slot.id);
                  }}
                >
                  <button
                    type="submit"
                    className="text-xs text-green-700 hover:underline"
                  >
                    Bo&apos;shatish
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bronlar (avtomatik band) */}
      <section className="mt-8">
        <h2 className="font-semibold text-blue-600">Bronlar (avtomatik band)</h2>
        {activeBookings.length === 0 ? (
          <p className="mt-2 text-sm text-gray-400">Kelgusi bronlar yo&apos;q</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {activeBookings.map((b) => (
              <li
                key={b.id}
                className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm"
              >
                {b.date.toLocaleString("uz-UZ")} — {b.status}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
