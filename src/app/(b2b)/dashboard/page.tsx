import {
  ArrowRight,
  Bell,
  Brush,
  CalendarClock,
  Clock,
  Paintbrush,
  Play,
  Scissors,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ServicesDonut } from "../_components/services-donut";

function formatMoney(value: number) {
  return value.toLocaleString("uz-UZ");
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  pending: "Kutilmoqda",
  confirmed: "Tasdiqlandi",
  cancelled: "Bekor qilindi",
  completed: "Yakunlandi",
};

function serviceIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("makiyaj")) return Brush;
  if (n.includes("yuz") || n.includes("tozalash")) return Sparkles;
  if (n.includes("qosh") || n.includes("brending")) return Paintbrush;
  return Scissors;
}

const donutColors = ["#3525cd", "#7c3aed", "#0891b2", "#059669", "#d97706", "#e11d48"];

/* ============================================================
   DEFAULT (statik) MA'LUMOTLAR — backend ulanguncha ishlaydi
   ============================================================ */

const DEFAULT_SALON_OWNER = "Aziz Karimov";

function formatTime(d: Date) {
  return d.toLocaleTimeString("uz-UZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Bugungi default bronlar (vaqtlar joriy kunga mos, "Hozir" yorlig'i ko'rinadi)
function buildDefaultSchedule(now: Date) {
  const nowMinus90 = new Date(now.getTime() - 90 * 60000);
  const nowMinus30 = new Date(now.getTime() - 30 * 60000);
  const nowPlus60 = new Date(now.getTime() + 60 * 60000);
  const nowPlus120 = new Date(now.getTime() + 120 * 60000);
  const nowPlus180 = new Date(now.getTime() + 180 * 60000);

  return [
    {
      id: "d1",
      name: "Nilufar Rahimova",
      service: "Soch olish",
      time: formatTime(nowMinus90),
      status: "completed",
      isNow: false,
    },
    {
      id: "d2",
      name: "Bekzod Aliyev",
      service: "Soch bo'yash",
      time: formatTime(nowMinus30),
      status: "completed",
      isNow: false,
    },
    {
      id: "d3",
      name: "Malika Yusupova",
      service: "Soch olish",
      time: formatTime(now),
      status: "confirmed",
      isNow: true,
    },
    {
      id: "d4",
      name: "Jasur Toshmatov",
      service: "Stilist xizmati",
      time: formatTime(nowPlus60),
      status: "confirmed",
      isNow: false,
    },
    {
      id: "d5",
      name: "Dildora Normatova",
      service: "Makiyaj",
      time: formatTime(nowPlus120),
      status: "pending",
      isNow: false,
    },
    {
      id: "d6",
      name: "Gulzoda Karimova",
      service: "Yuz tozalash",
      time: formatTime(nowPlus180),
      status: "pending",
      isNow: false,
    },
  ];
}

export default function DashboardPage() {
  const fullName = DEFAULT_SALON_OWNER;
  const firstName = fullName.split(" ")[0] ?? fullName;
  const lastNameInitial = fullName.split(" ")[1]?.[0] ?? "";
  const displayName = lastNameInitial ? `${firstName} ${lastNameInitial}.` : firstName;

  const now = new Date();

  // KPI: bugungi daromad, navbatlar soni, trend
  const todayRevenue = 1_250_000;
  const todayCompleted = 3;
  const todayPending = 2;
  const yesterdayRevenue = 1_080_000;

  // Kunlik ish jadvali
  const schedule = buildDefaultSchedule(now);

  // Navbatdagi mijoz — jadvaldagi "Hozir" bronidan (bog'liq bo'lmasin, bir xil ko'rinsin)
  const nowBooking = schedule.find((s) => s.isNow) ?? schedule[0];
  const nextClient = nowBooking
    ? {
        name: nowBooking.name,
        service: nowBooking.service,
        time: `${nowBooking.time} — ${formatTime(new Date(now.getTime() + 30 * 60000))}`,
      }
    : null;

  // Xizmatlar ulushi (donut)
  const donutSegments = [
    { label: "Soch olish", value: 5, color: donutColors[0] },
    { label: "Soch bo'yash", value: 4, color: donutColors[1] },
    { label: "Makiyaj", value: 3, color: donutColors[2] },
    { label: "Yuz tozalash", value: 2, color: donutColors[3] },
  ];
  const donutTotal = donutSegments.reduce((acc, s) => acc + s.value, 0);

  const trend =
    yesterdayRevenue > 0
      ? Math.round(((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100)
      : todayRevenue > 0
        ? 100
        : 0;
  const trendPositive = trend >= 0;

  return (
    <div>
      {/* Greeting header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Xush kelibsiz,{" "}
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              {firstName}!
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Bugungi ishlaringiz va statistikangiz shu yerda
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Bildirishnomalar"
            className="relative flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white text-muted-foreground shadow-soft-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-soft"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-[#3525cd] ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-sm font-bold text-white shadow-soft-sm ring-2 ring-white">
              {firstName[0]}
              {lastNameInitial}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-foreground">{displayName}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Salon egasi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI kartalar */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Chap — ikkita kichik karta */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Bugungi daromad */}
          <div className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-white p-5 shadow-soft-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <Wallet className="size-5" />
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  trendPositive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {trendPositive ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
                {trendPositive ? "+" : ""}
                {trend}%
              </span>
            </div>
            <div className="mt-5">
              <h2 className="text-sm font-medium text-muted-foreground">
                Bugungi daromad
              </h2>
              <p className="font-heading mt-1 text-2xl font-bold tracking-tight text-foreground">
                {formatMoney(todayRevenue)}{" "}
                <span className="text-sm font-semibold text-muted-foreground">
                  so&apos;m
                </span>
              </p>
            </div>
          </div>

          {/* Navbatlar soni */}
          <div className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-white p-5 shadow-soft-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Users className="size-5" />
            </div>
            <div className="mt-5">
              <h2 className="text-sm font-medium text-muted-foreground">
                Navbatlar soni
              </h2>
              <p className="font-heading mt-1 text-2xl font-bold tracking-tight text-foreground">
                {todayCompleted}
                <span className="mx-1 text-muted-foreground">/</span>
                {todayPending}
                <span className="ml-1 text-sm font-semibold text-muted-foreground">
                  ta
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Navbatdagi mijoz */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-accent/60 via-white to-white p-5 shadow-soft-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
          <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/10 blur-2xl" />
          <div className="flex items-start justify-between">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UserRound className="size-4 text-primary" />
              Navbatdagi mijoz
            </p>
            {nextClient && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Navbatda
              </span>
            )}
          </div>

          {nextClient ? (
            <>
              <div className="mt-4">
                <p className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {nextClient.name}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4 text-primary" />
                    {nextClient.time}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarClock className="size-4 text-primary" />
                    {nextClient.service}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-violet-500 px-5 text-sm font-semibold text-white shadow-soft-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <Play className="size-4" />
                  Boshlash
                </button>
                <Link
                  href="/schedule"
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-border/70 bg-white px-5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                >
                  Batafsil
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Bugungi navbat bo&apos;sh — yangi bronlarni kuting
            </p>
          )}
        </div>
      </div>

      {/* Kunlik ish jadvali + Xizmatlar ulushi */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Kunlik ish jadvali — chap 2/3 */}
        <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-soft-sm sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
              Kunlik ish jadvali
            </h2>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-violet-600"
            >
              Barcha bronlar
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {schedule.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Bugungi bronlar yo&apos;q
            </p>
          ) : (
            <div className="space-y-3">
              {schedule.map((row) => {
                const Icon = serviceIcon(row.service);
                return (
                  <div
                    key={row.id}
                    className={`flex items-center gap-4 rounded-xl border p-3.5 transition-all duration-200 sm:p-4 ${
                      row.isNow
                        ? "border-primary/40 bg-accent/40 shadow-soft-sm"
                        : "border-border/60 bg-white hover:border-primary/20 hover:bg-accent/20"
                    }`}
                  >
                    <div className="flex w-16 shrink-0 flex-col items-center gap-1">
                      <span className="font-heading text-lg font-bold text-foreground">
                        {row.time}
                      </span>
                      {row.isNow && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-70" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                          </span>
                          Hozir
                        </span>
                      )}
                    </div>

                    <div className="h-10 w-px shrink-0 bg-border/60" />

                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">
                          {row.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {row.service}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                        statusStyles[row.status] ?? "bg-gray-50 text-gray-600 border-gray-200"
                      }`}
                    >
                      {statusLabels[row.status] ?? row.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Xizmatlar ulushi — o'ng 1/3 */}
        <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-soft-sm sm:p-6">
          <h2 className="font-heading pb-6 text-lg font-bold tracking-tight text-foreground">
            Xizmatlar ulushi
          </h2>

          {donutSegments.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Bugun xizmatlar bajarilmagan
            </p>
          ) : (
            <ServicesDonut segments={donutSegments} total={donutTotal} />
          )}
        </div>
      </div>
    </div>
  );
}
