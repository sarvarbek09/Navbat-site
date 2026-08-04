import { getTranslations } from "next-intl/server";
import { getSession } from "@/lib/auth";
import { HeaderShell } from "./header-shell";

const cityKeys = [
  "tashkent",
  "samarkand",
  "bukhara",
  "andijan",
  "namangan",
  "fergana",
  "nukus",
] as const;

export async function SiteHeader() {
  const t = await getTranslations("header");
  const session = await getSession();

  const navLinks = [
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.salons"), href: "/salons" },
    { label: t("nav.specialists"), href: "/specialists" },
    { label: t("nav.offers"), href: "/offers" },
    { label: t("nav.blog"), href: "/blog" },
  ];

  const cities = cityKeys.map((key) => ({
    key,
    label: t(`location.cities.${key}`),
  }));

  return (
    <HeaderShell
      navLinks={navLinks}
      forBusinessLabel={t("forBusiness")}
      loginLabel={t("signIn")}
      signUpLabel={t("signUp")}
      searchPlaceholder={t("search.placeholder")}
      searchShortcutHint={t("search.shortcutHint")}
      cities={cities}
      locationSelectLabel={t("location.select")}
      session={session ? { name: session.name } : null}
      userMenuLabels={{
        notifications: t("userMenu.notifications"),
        favorites: t("userMenu.favorites"),
        profile: t("userMenu.profile"),
        bookings: t("userMenu.bookings"),
        paymentMethods: t("userMenu.paymentMethods"),
        settings: t("userMenu.settings"),
        logout: t("userMenu.logout"),
      }}
      mobileNavLabels={{
        home: t("mobileNav.home"),
        search: t("mobileNav.search"),
        bookings: t("mobileNav.bookings"),
        favorites: t("mobileNav.favorites"),
        profile: t("mobileNav.profile"),
      }}
    />
  );
}
