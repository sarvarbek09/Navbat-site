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
    <footer className="border-t border-border bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-[276px]">
            <p className="font-heading text-xl font-bold text-primary">{t("brand")}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, MessageCircle, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-soft-sm"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
