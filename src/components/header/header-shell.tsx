"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { HeaderNav, type NavLink } from "./header-nav";
import { AuthActions } from "./auth-actions";
import { UserMenu, type UserMenuLabels } from "./user-menu";
import { LanguageSwitcher } from "./language-switcher";
import { LocationSelector, type City } from "./location-selector";
import { SearchBar } from "./search-bar";
import { BusinessCta } from "./business-cta";
import { Logo } from "./logo";
import { MobileNav, type MobileNavLabels } from "./mobile-nav";

type HeaderShellProps = {
  navLinks: NavLink[];
  forBusinessLabel: string;
  loginLabel: string;
  signUpLabel: string;
  searchPlaceholder: string;
  searchShortcutHint: string;
  cities: City[];
  locationSelectLabel: string;
  session: { name: string } | null;
  userMenuLabels: UserMenuLabels;
  mobileNavLabels: MobileNavLabels;
};

export function HeaderShell({
  navLinks,
  forBusinessLabel,
  loginLabel,
  signUpLabel,
  searchPlaceholder,
  searchShortcutHint,
  cities,
  locationSelectLabel,
  session,
  userMenuLabels,
  mobileNavLabels,
}: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
      className={
        "sticky top-0 z-50 border-b border-white/50 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-secondary/55 " +
        (scrolled ? "bg-secondary/85 shadow-md backdrop-blur-2xl" : "bg-secondary/70 shadow-none")
      }
    >
      <div
        className="mx-auto flex max-w-[1440px] items-center justify-between px-4 transition-[height] duration-300 sm:px-6 lg:px-10"
        style={{ height: scrolled ? "3.75rem" : "5rem" }}
      >
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          <Logo scrolled={scrolled} />
          <HeaderNav navLinks={navLinks} />
        </div>

        <div className="hidden min-w-0 flex-1 items-center justify-center px-4 lg:flex">
          <SearchBar placeholder={searchPlaceholder} shortcutHint={searchShortcutHint} />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LocationSelector cities={cities} selectLabel={locationSelectLabel} />
          <LanguageSwitcher />
          <BusinessCta label={forBusinessLabel} />
          {session ? (
            <UserMenu name={session.name} labels={userMenuLabels} />
          ) : (
            <AuthActions loginLabel={loginLabel} signUpLabel={signUpLabel} />
          )}
          <MobileNav
            navLinks={navLinks}
            forBusinessLabel={forBusinessLabel}
            loginLabel={loginLabel}
            signUpLabel={signUpLabel}
            searchPlaceholder={searchPlaceholder}
            isAuthenticated={!!session}
            mobileNavLabels={mobileNavLabels}
          />
        </div>
      </div>
    </header>
  );
}
