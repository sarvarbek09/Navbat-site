"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string; active?: boolean };

type MobileNavProps = {
  navLinks: NavLink[];
  forBusinessLabel: string;
};

export function MobileNav({ navLinks, forBusinessLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Menyu"
        aria-expanded={open}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-secondary px-4 pb-4 pt-2 shadow-soft-lg motion-safe:animate-fade-up">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={
                link.active
                  ? "rounded-lg bg-accent px-3 py-2 text-sm font-bold text-primary"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-primary"
          >
            {forBusinessLabel}
          </Link>
        </nav>
      )}
    </div>
  );
}
