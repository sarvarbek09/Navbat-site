"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Popover } from "radix-ui";

export type NavLink = { label: string; href: string };

type HeaderNavProps = {
  navLinks: NavLink[];
};

export function HeaderNav({ navLinks }: HeaderNavProps) {
  const pathname = usePathname();
  const triggerLabel = navLinks[0]?.label ?? "";
  const isAnyActive = navLinks.some((link) => pathname === link.href);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={
            "group hidden items-center gap-1.5 rounded-2xl border border-white/70 bg-white/45 px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 md:flex " +
            (isAnyActive ? "text-primary" : "text-muted-foreground hover:text-foreground")
          }
        >
          {triggerLabel}
          <ChevronDown className="size-3.5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content sideOffset={10} align="start" asChild>
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="z-[60] w-52 rounded-2xl border border-border/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors " +
                    (isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/8 hover:text-primary")
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
