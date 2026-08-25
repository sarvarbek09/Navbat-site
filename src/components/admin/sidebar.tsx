"use client";
import { usePathname } from "next/navigation";
import { BanknoteArrowDown, CalendarDays, ChartColumnBig, Settings, Sparkles, SquareArrowRightEnter, Store, User, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";


const links: { name: string; icon: LucideIcon; href: string }[] = [
  {
    name: "Foydalanuvchilar",
    icon: User,
    href: "/admin/users"
  },
  {
    name: "Salonlar",
    icon: Store,
    href: "/admin/salons"
  },
  {
    name: "Band qilishlar",
    icon: CalendarDays,
    href: "/admin/bookings"
  },
  {
    name: "To'lovlar",
    icon: BanknoteArrowDown,
    href: "/admin/payments"
  },
  {
    name: "Hisobotlar",
    icon: ChartColumnBig,
    href: "/admin/reports"
  },
  // {
  //   name: "Sozlamalar",
  //   icon: Settings,
  //   href: "/admin/settings"
  // },
];
export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex w-72 flex-col bg-(--sidebar-admin) border-r border-accent">
      <div className="p-6 text-2xl font-bold">
        <div className="flex min-w-0 items-center gap-8 lg:gap-12">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="SalonFlow bosh sahifasi">
            <motion.span
              whileHover={{ rotate: 8, scale: 1.06 }}
              className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/25"
            >
              <Sparkles className="size-4" />
            </motion.span>
            <span className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Salon<span className="text-primary">Flow</span>
            </span>
          </Link>
        </div>
        <div className="text-xs font-normal ml-12">Admin Console</div>
      </div>
      <div className="pt-10 pb-8 uppercase px-4 text-sm font-medium text-gray-400">boshqaruv</div>
      <nav className="flex-1 px-4 space-y-2.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-lg p-2.5 ${pathname === link.href
              ? "bg-(--nav-active) text-primary" : "border border-transparent hover:border-accent hover:text-primary"}`}
          >
            <div>
              <link.icon className="size-4" />
            </div>
            <div>{link.name}</div>
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Button variant="default" className="w-full justify-center px-4 py-5">
          + Yangi band qilish
        </Button>
        <hr className="my-4" />
        <Button variant="destructive" className="w-full justify-start px-4 py-5">
          <SquareArrowRightEnter />
          <div>Chiqish</div>
        </Button>
      </div>
    </aside>
  );
}