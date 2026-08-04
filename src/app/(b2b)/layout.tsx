"use client";

import { usePathname } from "next/navigation";
import { BarChart3, Calendar, CreditCard, Users } from "lucide-react";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#fcf8ff] lg:flex lg:h-screen">
      <SidebarNav
        items={navItems.map((item) => ({
          ...item,
          active: pathname === item.href,
        }))}
        ctaLabel="Yangi mijoz"
        ctaHref="/clients"
      />
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <TopNavBar
          title="SalonFlow Boshqaruv Paneli"
          userName="Admin"
          userRole="Salon egasi"
        />
        <nav className="flex overflow-x-auto border-b border-[#c7c4d8] bg-[#f5f2ff] px-4 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium ${
                pathname === item.href
                  ? "border-[#3525cd] text-[#3525cd]"
                  : "border-transparent text-[#464555]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
