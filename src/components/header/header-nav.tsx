"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export type NavLink = { label: string; href: string };

 /**
 * Responsive:
 *   mobile  (< 768px) : hidden (shown in MobileNav drawer)
 *   tablet  (768px+)  : visible, slightly compact padding
 *   desktop (1024px+) : visible, full padding
 */
export function HeaderNav({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-0.5 rounded-2xl border border-white/70 bg-white/45 p-1 shadow-sm md:flex">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative rounded-xl px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:px-3.5 md:py-2 lg:px-4"
          >
            {isActive && (
              <motion.span
                layoutId="active-nav-link"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-white shadow-sm ring-1 ring-border/60"
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
