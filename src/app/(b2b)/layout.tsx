"use client";

import { usePathname } from "next/navigation";
import { BarChart3, Calendar, CreditCard, Users } from "lucide-react";
import { SidebarNav } from "./_components/sidebar-nav";
import { TopNavBar } from "./_components/top-nav-bar";

// TODO: backend/DB ulanganda getSession() + rol tekshiruvini (owner) qayta yoqish kerak.
// Hozircha DATABASE_URL yo'q, shuning uchun sessiya o'rniga static ma'lumot ko'rsatilmoqda.

const navItems = [
  { label: "Boshqaruv paneli", href: "/dashboard", icon: BarChart3 },
  { label: "Jadval", href: "/schedule", icon: Calendar },
  { label: "Mijozlar", href: "/clients", icon: Users },
  { label: "Daromad", href: "/earnings", icon: CreditCard },
];

export default function B2BLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <SidebarNav
        items={navItems.map((item) => ({
          ...item,
          active: pathname === item.href,
        }))}
        ctaLabel="Yangi mijoz"
        ctaHref="/clients"
      />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <TopNavBar
          title="SalonFlow Boshqaruv Paneli"
          userName="Admin"
          userRole="Salon egasi"
        />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
