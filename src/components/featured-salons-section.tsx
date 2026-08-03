import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";

const salonImages = [
  "/images/salon-velvet-loft.png",
  "/images/salon-iron-silk.png",
  "/images/salon-lumina-spa.png",
];

export async function FeaturedSalonsSection() {
  const t = await getTranslations("featuredSalons");
  const items = t.raw("items") as {
    name: string;
    priceTier: string;
    price: string;
    rating: string;
    location: string;
    availability: string;
  }[];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="pb-12">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((salon, i) => (
            <div
              key={salon.name}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={salonImages[i]}
                  alt={salon.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/50 bg-white/95 px-3 py-1.5 shadow-soft-sm backdrop-blur-sm">
                  <Star className="size-3.5 fill-current text-amber-400" />
                  <span className="text-xs font-bold tracking-wide text-foreground">
                    {salon.rating}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-2 pb-2">
                  <h3 className="text-xl font-semibold text-foreground">{salon.name}</h3>
                  <div className="flex shrink-0 flex-col items-end">
                    <span className="text-base font-bold text-primary">{salon.price}</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {salon.priceTier}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pb-6 text-sm text-muted-foreground">
                  <MapPin className="size-3 shrink-0" />
                  <span>{salon.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t("nextAvail")}:{" "}
                    <span className="font-semibold text-foreground">
                      {salon.availability}
                    </span>
                  </p>
                  <button
                    type="button"
                    className="cursor-pointer text-sm font-bold text-primary hover:underline"
                  >
                    {t("bookNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
