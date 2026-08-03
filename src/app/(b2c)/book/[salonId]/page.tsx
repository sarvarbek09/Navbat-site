import { db } from "@/lib/db";
import { salons, services } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BookingForm } from "../../_components/booking-form";

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

      <BookingForm salonId={salonId} services={salonServices} />
    </div>
  );
}
