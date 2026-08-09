import Link from "next/link";
import Image from "next/image";
import { CircleHelp, LogOut, Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
};

type SidebarNavProps = {
  items: SidebarNavItem[];
  sectionLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  supportLabel?: string;
  supportHref?: string;
  logoutHref?: string;
};

export function SidebarNav({
  items,
  sectionLabel = "BOSHQARUV",
  ctaLabel = "Yangi bron qilish",
  ctaHref = "#",
  supportLabel = "Yordam",
  supportHref = "#",
  logoutHref = "#",
}: SidebarNavProps) {
  return (
    <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-[#c7c4d8] bg-[#f5f2ff] px-4 py-6 lg:flex">
      <div className="flex flex-col gap-1 px-2 pb-8">
        <div className="flex items-center gap-2">
          <Image src="/salonflow-mark.svg" alt="" width={25} height={25} />
          <span className="font-heading text-xl font-black leading-7 text-[#3525cd]">
            SalonFlow
          </span>
        </div>
        <span className="text-xs font-medium text-[#777587]">Premium Boshqaruv</span>
      </div>

      <div className="pb-8">
        <Link
          href={ctaHref}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3525cd] px-6 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3525cd]/90 hover:shadow-soft-lg"
        >
          <Plus className="size-4" />
          {ctaLabel}
        </Link>
      </div>

      <p className="px-2 pb-4 text-xs font-semibold uppercase tracking-[0.6px] text-[#777587]">
        {sectionLabel}
      </p>

      <nav className="flex flex-1 flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200",
              item.active
                ? "bg-[#e2dfff] text-[#3525cd] shadow-soft-sm"
                : "text-[#464555] hover:bg-[#e2dfff]/50"
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-1.5 border-t border-[#c7c4d8] pt-5">
        <Link
          href={supportHref}
          className="flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-medium text-[#464555] transition-colors hover:bg-[#e2dfff]/50"
        >
          <CircleHelp className="size-5 shrink-0" />
          {supportLabel}
        </Link>
        <Link
          href={logoutHref}
          className="flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm font-medium text-[#ba1a1a] transition-colors hover:bg-[#ba1a1a]/5"
        >
          <LogOut className="size-[18px] shrink-0" />
          Chiqish
        </Link>
      </div>
    </aside>
  );
}
