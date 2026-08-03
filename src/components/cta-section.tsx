import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function CtaSection() {
  const t = await getTranslations("cta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[rgb(var(--primary))]/90 py-16 sm:py-20">
      <div className="absolute -left-16 -top-16 size-72 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 size-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1040px] px-4 text-center sm:px-6 lg:px-10">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <Button
            size="lg"
            className="h-auto w-full rounded-xl bg-white px-8 py-5 text-base text-primary shadow-soft-lg transition-transform hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto sm:py-6"
            asChild
          >
            <Link href="#">{t("primaryButton")}</Link>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-auto w-full rounded-xl px-8 py-5 text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground sm:w-auto sm:py-6"
            asChild
          >
            <Link href="#">{t("secondaryButton")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
