import { and, isNotNull } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { salons } from "@/lib/schema";
import { NearbySalonsMap } from "./nearby-salons-map";

export async function NearbySalonsSection() {
  const t = await getTranslations("nearbySalons");

  const rows = await db
    .select({
      id: salons.id,
      name: salons.name,
      address: salons.address,
      latitude: salons.latitude,
      longitude: salons.longitude,
    })
    .from(salons)
    .where(and(isNotNull(salons.latitude), isNotNull(salons.longitude)));

  const nearbySalons = rows.map((row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    latitude: row.latitude as number,
    longitude: row.longitude as number,
  }));

  return (
    <section className="bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="pb-8 sm:pb-12">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">{t("subtitle")}</p>
        </div>

        <NearbySalonsMap salons={nearbySalons} />
      </div>
    </section>
  );
}
