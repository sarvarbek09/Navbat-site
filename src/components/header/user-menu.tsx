"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { Bell, CreditCard, Heart, LogOut, Settings, User } from "lucide-react";
import { motion } from "framer-motion";
import { Popover } from "radix-ui";

export type UserMenuLabels = {
  notifications: string;
  favorites: string;
  profile: string;
  bookings: string;
  paymentMethods: string;
  settings: string;
  logout: string;
};

type UserMenuProps = {
  name: string;
  labels: UserMenuLabels;
};

export function UserMenu({ name, labels }: UserMenuProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  function logout() {
    startTransition(async () => {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.push("/");
      router.refresh();
    });
  }

  const menuItems = [
    { label: labels.profile, href: "/profile", icon: User },
    { label: labels.bookings, href: "/my-bookings", icon: Bell },
    { label: labels.favorites, href: "/favorites", icon: Heart },
    { label: labels.paymentMethods, href: "/payment-methods", icon: CreditCard },
    { label: labels.settings, href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button
        type="button"
        aria-label={labels.notifications}
        className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-white/60 text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-white hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <Bell className="size-4" />
      </button>

      <Link
        href="/favorites"
        aria-label={labels.favorites}
        className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-white/60 text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-white hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
      >
        <Heart className="size-4" />
      </Link>

      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={labels.profile}
            className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {initials || <User className="size-4" />}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content sideOffset={10} align="end" asChild>
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="z-[60] w-56 rounded-2xl border border-border/70 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/8 hover:text-primary"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              ))}
              <div className="my-1.5 border-t border-border/60" />
              <button
                type="button"
                disabled={isPending}
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
              >
                <LogOut className="size-4" />
                {labels.logout}
              </button>
            </motion.div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
