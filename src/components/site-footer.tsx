import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("footer");

  const columns = [
    {
      title: t("company.title"),
      links: [t("company.aboutUs"), t("company.careers"), t("company.press")],
    },
    {
      title: t("partnerships.title"),
      links: [
        t("partnerships.joinAsPartner"),
        t("partnerships.forEnterprise"),
        t("partnerships.successStories"),
      ],
    },
    {
      title: t("legal.title"),
      links: [
        t("legal.helpCenter"),
        t("legal.privacyPolicy"),
        t("legal.termsOfService"),
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-b from-white to-secondary/40 py-10 sm:py-14">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[minmax(0,1.45fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <p className="font-heading text-2xl font-bold tracking-tight text-primary">
              {t("brand")}
            </p>
            <p className="mt-3 max-w-[32ch] text-sm leading-6 text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[Globe, MessageCircle, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  aria-label={["Veb-sayt", "Xabar yuborish", "Email"][i]}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-soft"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-[0.08em] text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="inline-flex py-0.5 text-sm text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/80 pt-6 text-center sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="text-xs text-muted-foreground/80">Salonlar uchun qulay onlayn bron tizimi</p>
        </div>
      </div>
    </footer>
  );
}
