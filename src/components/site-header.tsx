import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";

export async function SiteHeader() {
  const t = await getTranslations("header");

  const navLinks = [
    { label: t("nav.discover"), href: "#", active: true },
    { label: t("nav.services"), href: "#" },
    { label: t("nav.specialists"), href: "#" },
    { label: t("nav.offers"), href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-secondary/90 shadow-soft-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-10">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="font-heading text-2xl font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
          >
            SalonFlow
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-colors"
                    : "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button variant="ghost" size="lg" className="hidden cursor-pointer md:inline-flex" asChild>
            <Link href="#">{t("forBusiness")}</Link>
          </Button>
          <Button
            size="lg"
            className="cursor-pointer rounded-lg px-6 shadow-soft-sm transition-shadow hover:shadow-soft"
            asChild
          >
            <Link href="#">{t("signIn")}</Link>
          </Button>
          <MobileNav navLinks={navLinks} forBusinessLabel={t("forBusiness")} />
        </div>
      </div>
    </header>
  );
}
