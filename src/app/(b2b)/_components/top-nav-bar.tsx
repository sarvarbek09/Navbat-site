import Image from "next/image";
import { Bell, CircleHelp, Search, UserRound } from "lucide-react";

type TopNavBarProps = {
  title?: string;
  searchPlaceholder?: string;
  userName?: string;
  userRole?: string;
  avatarSrc?: string;
};

export function TopNavBar({
  title = "SalonFlow Boshqaruv Konsoli",
  searchPlaceholder = "Qidirish...",
  userName = "Admin",
  userRole = "Boshqaruvchi",
  avatarSrc,
}: TopNavBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#c7c4d8] bg-[#fcf8ff] px-6 py-3 shadow-soft-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-[#3525cd]">{title}</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6b7280]" />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-[#c7c4d8] bg-[#f5f2ff] py-2 pl-9 pr-4 text-sm font-medium text-[#6b7280] placeholder:text-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#3525cd]/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-[#464555] transition-colors hover:bg-[#e2dfff]/50"
          >
            <Bell className="size-4" />
          </button>
          <button
            type="button"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-[#464555] transition-colors hover:bg-[#e2dfff]/50"
          >
            <CircleHelp className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 border-l border-[#c7c4d8] pl-6">
          <div className="text-right">
            <p className="text-sm font-bold text-[#1b1b24]">{userName}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.6px] text-[#777587]">
              {userRole}
            </p>
          </div>
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#c7c4d8] bg-[#f5f2ff]">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt=""
                width={32}
                height={32}
                className="size-full object-cover"
              />
            ) : (
              <UserRound className="size-4 text-[#777587]" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
