import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Mail } from "lucide-react";
import { AuthField } from "../_components/auth-field";
import { PasswordField } from "../_components/password-field";
import { TelegramCta } from "../_components/telegram-cta";
import { AuthDivider } from "../_components/auth-divider";

export default async function LoginPage() {
  const t = await getTranslations("auth.login");

  return (
    <div className="motion-safe:animate-fade-up">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-8">
        <TelegramCta href="/auth/telegram" label={t("telegramCta")} />
      </div>

      <div className="mt-6">
        <AuthDivider label={t("orEmail")} />
      </div>

      <form className="mt-6 flex flex-col gap-5">
        <AuthField
          id="email"
          label={t("emailLabel")}
          icon={Mail}
          type="email"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
        />
        <PasswordField
          id="password"
          label={t("passwordLabel")}
          placeholder={t("passwordPlaceholder")}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="size-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/30" />
            {t("rememberMe")}
          </label>
          <Link href="#" className="font-semibold text-primary hover:underline">
            {t("forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
        >
          {t("submit")}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link href="/auth/register" className="font-semibold text-primary hover:underline">
          {t("signUpLink")}
        </Link>
      </p>
    </div>
  );
}
