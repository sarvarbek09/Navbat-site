"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { NavLink } from "./header-nav";

/**
 * Responsive: visible ONLY on mobile (< 768px).
 * Tablet and desktop use HeaderNav + AuthActions inline.
 */
export function MobileNav({
  navLinks,
  forBusinessLabel,
  loginLabel,
  signUpLabel,
}: {
  navLinks: NavLink[];
  forBusinessLabel: string;
  loginLabel: string;
  signUpLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white/60 text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-white"
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="size-4.5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu className="size-4.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-[4.5rem] z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              id="mobile-nav-menu"
              key="menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 flex flex-col gap-0.5 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-xl backdrop-blur-xl"
            >
              {/* Nav links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 font-bold text-primary"
                        : "text-muted-foreground hover:bg-primary/6 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* For Business */}
              <Link
                href="/business"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/6 hover:text-primary"
              >
                {forBusinessLabel}
              </Link>

              {/* Divider + Auth */}
              <div className="mt-1 flex items-center gap-2 border-t border-border/60 pt-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/6 hover:text-primary"
                >
                  {loginLabel}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-soft"
                >
                  {signUpLabel}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
