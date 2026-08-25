"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type BottomNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type BottomNavProps = {
  items: BottomNavItem[];
};

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-[#c7c4d8] bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-semibold transition-colors duration-200",
              active ? "text-[#3525cd]" : "text-[#777587] hover:text-[#464555]"
            )}
          >
            <span
              className={cn(
                "flex h-9 w-14 items-center justify-center rounded-xl transition-all duration-200",
                active ? "bg-[#e2dfff]" : "bg-transparent"
              )}
            >
              <item.icon className="size-5 shrink-0" />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
