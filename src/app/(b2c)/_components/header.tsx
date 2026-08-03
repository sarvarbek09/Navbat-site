"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export type HeaderNavItem = { label: string; href: string };

type HeaderProps = {
  logoText?: string;
  navItems?: HeaderNavItem[];
  businessLabel?: string;
  businessHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  userName?: string;
};

const defaultNavItems: HeaderNavItem[] = [
  { label: "Kashf etish", href: "#" },
  { label: "Xizmatlar", href: "#" },
  { label: "Mutaxassislar", href: "#" },
  { label: "Aksiyalar", href: "#" },
];

export function Header({
  logoText = "SalonFlow",
  navItems = defaultNavItems,
  businessLabel,
  businessHref = "#",
  ctaLabel,
  ctaHref = "#",
  userName,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-secondary shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-base font-bold text-primary">
          {logoText}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-base text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {businessLabel && (
            <Link href={businessHref} className="text-base text-primary">
              {businessLabel}
            </Link>
          )}
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="rounded-lg bg-primary px-6 py-2.5 text-base font-bold text-primary-foreground shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-primary/90"
            >
              {ctaLabel}
            </Link>
          )}
          {userName && (
            <span className="text-base text-muted-foreground">{userName}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-lg text-muted-foreground md:hidden"
          aria-label="Menyu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 pb-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-lg px-2 py-2 text-base text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
          {businessLabel && (
            <Link
              href={businessHref}
              className="rounded-lg px-2 py-2 text-base text-primary"
            >
              {businessLabel}
            </Link>
          )}
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-center text-base font-bold text-primary-foreground"
            >
              {ctaLabel}
            </Link>
          )}
          {userName && (
            <span className="px-2 pt-2 text-base text-muted-foreground">
              {userName}
            </span>
          )}
        </nav>
      )}
    </header>
  );
}
