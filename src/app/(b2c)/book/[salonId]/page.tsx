import { db } from "@/lib/db";
import { salons, services } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createBooking } from "@/actions/booking.actions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ salonId: string }>;
};

export default async function BookPage({ params }: Props) {
  const { salonId } = await params;

  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.id, salonId))
    .limit(1);

  if (!salon) notFound();

  const salonServices = await db
    .select()
    .from(services)
    .where(eq(services.salonId, salonId));

  return (
    <div>
      <h1 className="text-2xl font-bold">{salon.name}</h1>
      {salon.address && (
        <p className="mt-1 text-gray-500">{salon.address}</p>
      )}

      <form action={createBooking} className="mt-8 space-y-4">
        <input type="hidden" name="salonId" value={salonId} />

        <div>
          <label className="block text-sm font-medium">Xizmat</label>
          <select
            name="serviceId"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            {salonServices.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.price.toLocaleString()} so&apos;m ({s.duration} min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Sana va vaqt</label>
          <input
            type="datetime-local"
            name="date"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
        >
          Bron qilish
        </button>
      </form>
    </div>
  );
}
