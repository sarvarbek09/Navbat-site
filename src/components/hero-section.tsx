import Image from "next/image";
import { MapPin, Search, Sparkles, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex items-center overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-salon.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/20" />
        {/* Soft depth blobs for a layered, premium feel */}
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-[576px] motion-safe:animate-fade-up">
          <p className="flex items-center gap-2 pb-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
            <Sparkles className="size-3.5" />
            {t("eyebrow")}
          </p>

          <h1 className="font-heading pb-5 text-3xl font-bold tracking-tight text-foreground sm:pb-6 sm:text-5xl lg:text-6xl">
            {t.rich("title", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </h1>

          <p className="max-w-[512px] pb-6 text-base text-muted-foreground sm:text-lg">
            {t("description")}
          </p>

          <div className="flex items-center gap-3 pb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-secondary bg-accent"
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">4.9</span>
              <span>{t("trustLine")}</span>
            </div>
          </div>

          <form className="flex w-full flex-col items-stretch gap-2 rounded-2xl border border-white/30 bg-white/90 p-2 shadow-soft-xl backdrop-blur-md sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-xl border-b border-border px-4 py-3 transition-shadow focus-within:ring-2 focus-within:ring-primary/40 sm:border-b-0 sm:border-r">
              <Search className="size-[18px] shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="query"
                aria-label={t("searchPlaceholderSalon")}
                placeholder={t("searchPlaceholderSalon")}
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </label>

            <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 transition-shadow focus-within:ring-2 focus-within:ring-primary/40">
              <MapPin className="size-[18px] shrink-0 text-muted-foreground" />
              <input
                type="text"
                name="location"
                aria-label={t("searchPlaceholderLocation")}
                placeholder={t("searchPlaceholderLocation")}
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </label>

            <Button size="lg" className="w-full rounded-xl px-8 sm:w-auto">
              {t("searchButton")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
