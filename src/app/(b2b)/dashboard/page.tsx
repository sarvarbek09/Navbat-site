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
import { db } from "@/lib/db";
import { bookings, services, users } from "@/lib/schema";
import { eq, and, desc, gte, lt, inArray, sum, count } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { getCurrentSalon } from "@/lib/salon";
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

export default async function DashboardPage() {
  const session = await getSession();
  const fullName = session?.name ?? "Aziz Karimov";
  const firstName = fullName.split(" ")[0] ?? fullName;
  const lastNameInitial = fullName.split(" ")[1]?.[0] ?? "";
  const displayName = lastNameInitial ? `${firstName} ${lastNameInitial}.` : firstName;

  const salon = await getCurrentSalon();

  const now = new Date();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const startOfYesterday = new Date(startOfDay);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  let todayRevenue = 0;
  let todayCompleted = 0;
  let todayPending = 0;
  let yesterdayRevenue = 0;
  let nextClient: {
    name: string;
    time: string;
    service: string;
  } | null = null;

  let schedule: {
    id: string;
    name: string;
    service: string;
    time: string;
    status: string;
    isNow: boolean;
  }[] = [];

  let donutSegments: { label: string; value: number; color: string }[] = [];
  let donutTotal = 0;

  if (salon) {
    const [revenueRow] = await db
      .select({ total: sum(services.price) })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay),
          inArray(bookings.status, ["confirmed", "completed"])
        )
      );
    todayRevenue = Number(revenueRow?.total ?? 0);

    const [completedRow] = await db
      .select({ total: count() })
      .from(bookings)
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay),
          eq(bookings.status, "completed")
        )
      );
    todayCompleted = Number(completedRow?.total ?? 0);

    const [pendingRow] = await db
      .select({ total: count() })
      .from(bookings)
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay),
          eq(bookings.status, "pending")
        )
      );
    todayPending = Number(pendingRow?.total ?? 0);

    const [yesterdayRow] = await db
      .select({ total: sum(services.price) })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfYesterday),
          lt(bookings.date, startOfDay),
          inArray(bookings.status, ["confirmed", "completed"])
        )
      );
    yesterdayRevenue = Number(yesterdayRow?.total ?? 0);

    // Bugungi navbatdagi keyingi mijoz (kelgusi eng yaqin bron)
    const queueBookings = await db
      .select({
        booking: bookings,
        service: services,
        client: users,
      })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .innerJoin(users, eq(bookings.clientId, users.id))
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay),
          inArray(bookings.status, ["pending", "confirmed"])
        )
      )
      .orderBy(bookings.date)
      .limit(1);

    const next = queueBookings[0];
    if (next) {
      const start = new Date(next.booking.date);
      const end = new Date(start.getTime() + next.service.duration * 60000);
      nextClient = {
        name: next.client.name,
        service: next.service.name,
        time: `${start.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
        })} — ${end.toLocaleTimeString("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      };
    }

    // Kunlik ish jadvali — bugungi bronlar
    const todayBookings = await db
      .select({
        booking: bookings,
        service: services,
        client: users,
      })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .innerJoin(users, eq(bookings.clientId, users.id))
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay)
        )
      )
      .orderBy(bookings.date);

    schedule = todayBookings
      .filter(({ booking }) => booking.status !== "cancelled")
      .map(({ booking, service, client }) => {
        const start = new Date(booking.date);
        const end = new Date(start.getTime() + service.duration * 60000);
        const isNow = now >= start && now <= end;
        return {
          id: booking.id,
          name: client.name,
          service: service.name,
          time: `${start.toLocaleTimeString("uz-UZ", {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          status: booking.status,
          isNow,
        };
      });

    // Xizmatlar ulushi — bugungi bronlar bo'yicha
    const serviceCounts = await db
      .select({ name: services.name, total: count() })
      .from(bookings)
      .innerJoin(services, eq(bookings.serviceId, services.id))
      .where(
        and(
          eq(bookings.salonId, salon.id),
          gte(bookings.date, startOfDay),
          lt(bookings.date, endOfDay),
          inArray(bookings.status, ["completed", "confirmed"])
        )
      )
      .groupBy(services.name)
      .orderBy(desc(count()));

    donutSegments = serviceCounts.map((row, i) => ({
      label: row.name,
      value: Number(row.total),
      color: donutColors[i % donutColors.length],
    }));
    donutTotal = donutSegments.reduce((acc, s) => acc + s.value, 0);
  }

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
