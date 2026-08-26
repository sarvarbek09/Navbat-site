import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AuthSceneLoader } from "@/components/auth/auth-scene-loader";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("auth.layout");

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        {/* Background gradient + radial glow live on their own -z-10 sibling (not the panel's own
            `background`) so they paint below AuthSceneLoader's canvas — a container with `position:
            relative` but no explicit z-index doesn't form its own stacking context, so a native
            background on the panel itself would otherwise paint OVER a -z-10 child instead of under it. */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-primary via-indigo-600 to-violet-700" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <AuthSceneLoader />

        <Link href="/" className="relative z-10 flex w-fit items-center gap-2 text-white">
          <span className="flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Sparkles className="size-4" />
          </span>
          <span className="font-heading text-lg font-bold">SalonFlow</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="font-heading text-4xl font-bold leading-tight text-white xl:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-white/80">{t("subtitle")}</p>
        </div>

        <div className="relative z-10 flex items-center gap-8">
          <div>
            <p className="font-heading text-2xl font-bold text-white">10K+</p>
            <p className="text-sm text-white/70">{t("statsBookings")}</p>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div>
            <p className="font-heading text-2xl font-bold text-white">500+</p>
            <p className="text-sm text-white/70">{t("statsSalons")}</p>
          </div>
        </div>
      </div>

      {/* Content panel */}
      <div className="flex flex-1 flex-col bg-background">
        <div className="flex items-center justify-between px-6 py-5 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t("backHome")}
          </Link>
          <Link href="/" className="font-heading text-base font-bold text-primary lg:hidden">
            SalonFlow
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 pb-12 sm:px-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
