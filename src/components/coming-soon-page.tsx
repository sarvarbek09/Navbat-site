import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

type ComingSoonPageProps = {
  namespace:
    | "explore"
    | "services"
    | "specialists"
    | "offers"
    | "business"
    | "login"
    | "signup"
    | "salons"
    | "blog"
    | "favorites"
    | "paymentMethods"
    | "settings";
};

export async function ComingSoonPage({ namespace }: ComingSoonPageProps) {
  const t = await getTranslations("comingSoon");

  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center px-4 py-16 sm:min-h-[calc(100vh-5rem)]">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-1.5 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" />
          {t("badge")}
        </span>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(`${namespace}.title`)}
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
          {t(`${namespace}.description`)}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border/70 bg-white/60 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-white hover:shadow-md"
        >
          <ArrowLeft className="size-4" />
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
