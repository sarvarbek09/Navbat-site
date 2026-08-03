import { getTranslations } from "next-intl/server";
import { HeaderShell } from "./header-shell";

export async function SiteHeader() {
  const t = await getTranslations("header");

  const navLinks = [
    { label: t("nav.discover"), href: "/explore" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.specialists"), href: "/specialists" },
    { label: t("nav.offers"), href: "/offers" },
  ];

  return (
    <HeaderShell
      navLinks={navLinks}
      forBusinessLabel={t("forBusiness")}
      loginLabel={t("signIn")}
      signUpLabel={t("signUp")}
    />
  );
}
