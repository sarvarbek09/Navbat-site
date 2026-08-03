import { Calendar } from "lucide-react";

type DashboardHeroProps = {
  title?: string;
  subtitle?: string;
  dateRangeLabel?: string;
};

export function DashboardHero({
  title = "Asosiy Panel Xulosasi",
  subtitle = "Xush kelibsiz. Bugun SalonFlow tizimida nimalar sodir bo'lmoqda.",
  dateRangeLabel = "Okt 24, 2024 - Okt 31, 2024",
}: DashboardHeroProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold leading-[56px] tracking-[-0.96px] text-[#1b1b24]">
          {title}
        </h1>
        <p className="text-base text-[#464555]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-[#c7c4d8] bg-[#e4e1ee] px-6 py-2">
        <Calendar className="size-4 text-[#3525cd]" />
        <span className="text-sm font-medium text-[#1b1b24]">{dateRangeLabel}</span>
      </div>
    </div>
  );
}
