import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const serviceImageSeeds = [
  "salonflow-haircut",
  "salonflow-haircolor",
  "salonflow-manicure",
  "salonflow-massage",
  "salonflow-facial",
  "salonflow-waxing",
];

export async function PopularServicesSection() {
  const t = await getTranslations("popularServices");
  const items = t.raw("items") as string[];

  return (
    <section className="bg-secondary/40 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4 pb-8 sm:pb-12">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t("title")}
            </h2>
            <p className="mt-2 text-base text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link
            href="#"
            className="group hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {items.map((label, i) => {
            const seed = serviceImageSeeds[i % serviceImageSeeds.length];
            return (
              <Link key={label} href="#" className="group flex flex-col gap-3">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg">
                  <Image
                    src={`https://picsum.photos/seed/${seed}/400/400`}
                    alt={label}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-center text-sm font-medium text-foreground">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
