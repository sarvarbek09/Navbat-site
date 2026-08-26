import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Store, User } from "lucide-react";

export default async function TelegramChoicePage() {
  const t = await getTranslations("auth.telegram");

  const options = [
    {
      href: "https://t.me/SalonFlowBot",
      icon: User,
      title: t("clientTitle"),
      desc: t("clientDesc"),
    },
    {
      href: "https://t.me/SalonFlowBot",
      icon: Store,
      title: t("businessTitle"),
      desc: t("businessDesc"),
    },
  ];

  return (
    <div className="motion-safe:animate-fade-up">
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">{t("title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>

      <div className="mt-8 flex flex-col gap-4">
        {options.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft-lg"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-violet-500/20 text-primary">
              <option.icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{option.title}</p>
              <p className="text-sm text-muted-foreground">{option.desc}</p>
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
