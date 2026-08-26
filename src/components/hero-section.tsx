import Link from "next/link";
import { ArrowRight, Sparkles, Star, Store, Zap, ShieldCheck, Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { HeroVisual } from "@/components/hero-visual";
import { HeroSceneLoader } from "@/components/hero-scene-loader";

export async function HeroSection() {
  const t = await getTranslations("hero");

  const stats = [
    { value: t("stats.bookingsValue"), label: t("stats.bookingsLabel") },
    { value: t("stats.salonsValue"), label: t("stats.salonsLabel") },
    { value: t("stats.ratingValue"), label: t("stats.ratingLabel"), icon: Star },
  ];

  const features = [
    { label: t("features.instantBooking"), icon: Zap },
    { label: t("features.verifiedProfessionals"), icon: ShieldCheck },
    { label: t("features.securePayments"), icon: Lock },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary via-white to-white" />
      <div className="absolute -left-32 -top-32 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 -z-10 size-96 rounded-full bg-accent/30 blur-3xl" />
      <HeroSceneLoader />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        <div className="motion-safe:animate-fade-up">
          <p className="flex items-center gap-2 pb-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
            <Sparkles className="size-3.5" />
            {t("eyebrow")}
          </p>

          <h1 className="font-heading pb-5 text-3xl font-bold tracking-tight text-foreground sm:pb-6 sm:text-5xl lg:text-6xl">
            {t.rich("title", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>

          <p className="max-w-[512px] pb-8 text-base text-muted-foreground sm:text-lg">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-3 pb-9">
            <Link
              href="/salons"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-500 px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              {t("cta.primary")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/business"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border/70 bg-white/70 px-6 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-md"
            >
              <Store className="size-4 text-primary" />
              {t("cta.secondary")}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border/60 py-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                {stat.icon && <stat.icon className="size-4 fill-amber-400 text-amber-400" />}
                <span className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-6">
            {features.map((feature) => (
              <span
                key={feature.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-violet-500/20 text-primary">
                  <feature.icon className="size-3" />
                </span>
                {feature.label}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual
          labels={{
            confirmedTitle: t("mockup.confirmedTitle"),
            confirmedSubtitle: t("mockup.confirmedSubtitle"),
            salonCardName: t("mockup.salonCardName"),
            ratingValue: t("mockup.ratingValue"),
            ratingCount: t("mockup.ratingCount"),
            statusConfirmed: t("mockup.statusConfirmed"),
            specialistName: t("mockup.specialistName"),
            customerLabel: t("mockup.customerLabel"),
            customerName: t("mockup.customerName"),
            serviceLabel: t("mockup.serviceLabel"),
            serviceName: t("mockup.serviceName"),
            dateTimeLabel: t("mockup.dateTimeLabel"),
            dateTimeValue: t("mockup.dateTimeValue"),
            priceLabel: t("mockup.priceLabel"),
            priceValue: t("mockup.priceValue"),
            directionsButton: t("mockup.directionsButton"),
            rescheduleButton: t("mockup.rescheduleButton"),
          }}
        />
      </div>
    </section>
  );
}
