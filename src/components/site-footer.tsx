import Link from "next/link";
import { Globe, Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * Footer grid breakpoints
 * ──────────────────────────────────────────────────────────────
 * mobile  < 640px   : Brand (full) → 3 cols split across 2 rows
 *                     row 1: Company | Partnerships
 *                     row 2: Legal   | (empty)
 * tablet  640–1023px: 2-col layout
 *                     col-left (40%): Brand block
 *                     col-right (60%): 3 link columns side by side
 * desktop ≥ 1024px  : 4-col row — Brand | Company | Partnerships | Legal
 * ──────────────────────────────────────────────────────────────
 */
export async function SiteFooter() {
  const t = await getTranslations("footer");

  const columns = [
    {
      title: t("company.title"),
      links: [
        { label: t("company.aboutUs"),  href: "#" },
        { label: t("company.careers"),  href: "#" },
        { label: t("company.press"),    href: "#" },
      ],
    },
    {
      title: t("partnerships.title"),
      links: [
        { label: t("partnerships.joinAsPartner"),   href: "#" },
        { label: t("partnerships.forEnterprise"),   href: "#" },
        { label: t("partnerships.successStories"),  href: "#" },
      ],
    },
    {
      title: t("legal.title"),
      links: [
        { label: t("legal.helpCenter"),      href: "#" },
        { label: t("legal.privacyPolicy"),   href: "#" },
        { label: t("legal.termsOfService"),  href: "#" },
      ],
    },
  ];

  const socials = [
    { Icon: Globe,         label: "Website" },
    { Icon: MessageCircle, label: "Chat"    },
    { Icon: Mail,          label: "Email"   },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-b from-white to-secondary/40">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[2fr_3fr] sm:gap-12 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-12">

          {/* Brand block */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-bold tracking-tight text-primary sm:text-2xl">
                {t("brand")}
              </span>
            </Link>
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socials.map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border bg-white text-muted-foreground shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-soft"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/*
            tablet: 3 link cols inside a sub-grid, inside the right column
            desktop: each link col is its own top-level grid cell
          */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:contents">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="text-xs text-muted-foreground/60">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
