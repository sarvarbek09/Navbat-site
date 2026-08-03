"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavLink } from "./header-nav";

type MobileNavProps = {
  navLinks: NavLink[];
  forBusinessLabel: string;
  loginLabel: string;
  signUpLabel: string;
};

export function MobileNav({ navLinks, forBusinessLabel, loginLabel, signUpLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white/60 text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-white"
        aria-label="Menyu"
        aria-expanded={open}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
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
                onClick={() => setOpen(false)}
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
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
            >
              {forBusinessLabel}
            </Link>

            <div className="mt-1 flex items-center gap-2 border-t border-border/60 pt-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
              >
                {loginLabel}
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20"
              >
                {signUpLabel}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
