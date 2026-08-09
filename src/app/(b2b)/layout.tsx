"use client";

import { usePathname } from "next/navigation";
import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { SidebarNav } from "./_components/sidebar-nav";
import { BottomNav } from "./_components/bottom-nav";

// TODO: backend/DB ulanganda getSession() + rol tekshiruvini (owner) qayta yoqish kerak.
// Hozircha DATABASE_URL yo'q, shuning uchun sessiya o'rniga static ma'lumot ko'rsatilmoqda.

const navItems = [
  { label: "Asosiy", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jadval", href: "/schedule", icon: Calendar },
  { label: "Mijozlar", href: "/clients", icon: Users },
  { label: "Daromad", href: "/earnings", icon: CreditCard },
  { label: "Sozlamalar", href: "/settings", icon: Settings },
];

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#fcf8ff] lg:flex lg:h-screen">
      <SidebarNav
        items={navItems.map((item) => ({
          ...item,
          active: pathname === item.href,
        }))}
        ctaLabel="Yangi bron qilish"
        ctaHref="/schedule"
      />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <main className="flex-1 pb-20 lg:pb-8">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
      <BottomNav
        items={navItems.map((item) => ({
          label: item.label,
          href: item.href,
          icon: item.icon,
        }))}
      />
    </div>
  );
}
