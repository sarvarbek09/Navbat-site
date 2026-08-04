"use client";

import { useRef, useState, type SubmitEvent } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Home, Menu, Search, Ticket, User, X } from "lucide-react";
import type { NavLink } from "./header-nav";

export type MobileNavLabels = {
  home: string;
  search: string;
  bookings: string;
  favorites: string;
  profile: string;
};

type MobileNavProps = {
  navLinks: NavLink[];
  forBusinessLabel: string;
  loginLabel: string;
  signUpLabel: string;
  searchPlaceholder: string;
  isAuthenticated: boolean;
  mobileNavLabels: MobileNavLabels;
};

export function MobileNav({
  navLinks,
  forBusinessLabel,
  loginLabel,
  signUpLabel,
  searchPlaceholder,
  isAuthenticated,
  mobileNavLabels,
}: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  function toggleSearch() {
    setMenuOpen(false);
    setSearchOpen((open) => !open);
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }

  function submitSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/salons?q=${encodeURIComponent(trimmed)}` : "/salons");
    setSearchOpen(false);
  }

  const bottomTabs = [
    { label: mobileNavLabels.home, href: "/", icon: Home },
    { label: mobileNavLabels.search, href: "/salons", icon: Search },
    { label: mobileNavLabels.bookings, href: "/my-bookings", icon: Ticket },
    { label: mobileNavLabels.favorites, href: "/favorites", icon: Heart },
    { label: mobileNavLabels.profile, href: "/profile", icon: User },
  ];

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-1.5">
        <motion.button
          type="button"
          onClick={toggleSearch}
          whileTap={{ scale: 0.92 }}
          className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white/60 text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-white"
          aria-label={mobileNavLabels.search}
          aria-expanded={searchOpen}
        >
          {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => {
            setSearchOpen(false);
            setMenuOpen((open) => !open);
          }}
          whileTap={{ scale: 0.92 }}
          className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white/60 text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-white"
          aria-label="Menyu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.form
            onSubmit={submitSearch}
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 flex items-center gap-2 overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-2 shadow-xl backdrop-blur-xl"
          >
            <Search className="ml-1.5 size-4 shrink-0 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full min-w-0 bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-1 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-xl backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={
                  pathname === link.href
                    ? "rounded-xl bg-primary/10 px-3 py-3 text-sm font-bold text-primary"
                    : "rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/business"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
            >
              {forBusinessLabel}
            </Link>

            {!isAuthenticated && (
              <div className="mt-1 flex items-center gap-2 border-t border-border/60 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
                >
                  {loginLabel}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20"
                >
                  {signUpLabel}
                </Link>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      {isAuthenticated && (
        <nav
          className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-border/70 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          aria-label={mobileNavLabels.home}
        >
          {bottomTabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  "flex min-w-[64px] flex-1 flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-medium transition-colors " +
                  (active ? "text-primary" : "text-muted-foreground")
                }
              >
                <tab.icon className={"size-5" + (active ? " fill-primary/15" : "")} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
