"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StaffMember = {
  id: string;
  name: string;
  color: string;
};

type BoardBooking = {
  id: string;
  date: string;
  status: string;
  clientName: string;
  serviceName: string;
  serviceDuration: number;
  staffId: string | null;
};

type ScheduleBoardProps = {
  salonName: string;
  staff: StaffMember[];
  bookings: BoardBooking[];
};

type ViewMode = "day" | "week" | "month";

const WEEKDAYS = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

// O'zbekcha oy nomlari — toLocaleDateString server/brauzerda farq qilgani uchun qo'lda formatlaymiz
const MONTHS_SHORT = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

const MONTHS_LONG = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avgust",
  "Sentabr",
  "Oktabr",
  "Noyabr",
  "Dekabr",
];

function formatDateShort(date: Date) {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}, ${date.getFullYear()}`;
}

function formatMonthLong(date: Date) {
  return `${MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
}

const statusLabels: Record<string, string> = {
  pending: "Yangi",
  confirmed: "Tasdiqlandi",
  cancelled: "Bekor qilindi",
  completed: "Yakunlandi",
};

function formatDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

export function ScheduleBoard({ salonName, staff, bookings }: ScheduleBoardProps) {
  const [view, setView] = useState<ViewMode>("day");
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [search, setSearch] = useState("");
  const [checkedStaff, setCheckedStaff] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(staff.map((s) => [s.id, true]))
  );
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  // Hydration xatosini oldini olish: server va client vaqti farq qilishi mumkin
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const bookingsOnDate = useMemo(
    () =>
      bookings.filter(
        (b) =>
          formatDateKey(new Date(b.date)) === formatDateKey(selectedDate) &&
          b.status !== "cancelled"
      ),
    [bookings, selectedDate]
  );

  const filteredBySearch = useMemo(
    () =>
      bookingsOnDate.filter((b) =>
        b.clientName.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [bookingsOnDate, search]
  );

  // Kun ko'rinishi: soatlar 09:00 — 21:00
  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = 9; h <= 21; h++) arr.push(h);
    return arr;
  }, []);

  const activeStaff = staff.filter((s) => checkedStaff[s.id]);

  const nowLineTop = useMemo(() => {
    if (!isSameDay(now, selectedDate)) return null;
    const minutes = now.getHours() * 60 + now.getMinutes();
    const start = 9 * 60;
    const total = 13 * 60; // 09:00 — 22:00
    return ((minutes - start) / total) * 100;
  }, [now, selectedDate]);

  function changeDate(delta: number) {
    const d = new Date(selectedDate);
    if (view === "day") d.setDate(d.getDate() + delta);
    if (view === "week") d.setDate(d.getDate() + delta * 7);
    if (view === "month") d.setMonth(d.getMonth() + delta);
    setSelectedDate(d);
    setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }

  function goToday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setSelectedDate(d);
    setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
  }

  // ---- Oy kalendar uchun ma'lumotlar ----
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7; // Du kunidan boshlanadi
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [calendarMonth]);

  const bookingsByDay = useMemo(() => {
    const map: Record<string, BoardBooking[]> = {};
    for (const b of bookings) {
      if (b.status === "cancelled") continue;
      if (!checkedStaff[b.staffId ?? ""]) continue;
      if (!b.clientName.toLowerCase().includes(search.trim().toLowerCase())) continue;
      const key = formatDateKey(new Date(b.date));
      if (!map[key]) map[key] = [];
      map[key].push(b);
    }
    return map;
  }, [bookings, checkedStaff, search]);

  const monthLabel = formatMonthLong(calendarMonth);

  const weekDays = useMemo(() => {
    const arr: Date[] = [];
    const start = new Date(selectedDate);
    const day = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - day);
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [selectedDate]);

  function toggleStaff(id: string) {
    setCheckedStaff((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const staffColumnWidth = "w-40 sm:w-48 lg:w-56";

  return (
    <div>
      {/* Yuqori qator: sarlavha + qidiruv */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Jadval
          </h1>
          <p className="text-sm text-muted-foreground">{salonName}</p>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mijoz qidirish..."
            className="w-52 rounded-xl border border-border/70 bg-white py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 lg:w-64"
          />
        </div>
      </div>

      {/* Mobil qidiruv */}
      <div className="relative mt-3 md:hidden">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Mijoz qidirish..."
          className="w-full rounded-xl border border-border/70 bg-white py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Boshqaruv: tablar + sana + Bugun + qo'ng'iroq */}
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center rounded-xl border border-border/70 bg-white p-1">
          {(["day", "week", "month"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-200 sm:px-4",
                view === mode
                  ? "bg-[#3525cd] text-white shadow-soft-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {mode === "day" ? "Kun" : mode === "week" ? "Hafta" : "Oy"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-border/70 bg-white p-1">
          <button
            type="button"
            onClick={() => changeDate(-1)}
            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            aria-label="Oldingi"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-24 px-1 text-center text-sm font-bold text-foreground sm:min-w-28">
            {formatDateShort(selectedDate)}
          </span>
          <button
            type="button"
            onClick={() => changeDate(1)}
            className="cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            aria-label="Keyingi"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={goToday}
          className="cursor-pointer rounded-xl bg-[#3525cd] px-4 py-2 text-sm font-semibold text-white shadow-soft-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft"
        >
          Bugun
        </button>

        <button
          type="button"
          aria-label="Bildirishnomalar"
          className="ml-auto hidden size-10 cursor-pointer items-center justify-center rounded-xl border border-border/70 bg-white text-muted-foreground shadow-soft-sm transition-all duration-200 hover:text-primary sm:flex"
        >
          <Bell className="size-5" />
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-5 xl:flex-row">
        {/* Chap panel: kalendar + ustalar */}
        <aside className="w-full shrink-0 space-y-5 xl:w-64">
          <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft-sm">
            <div className="flex items-center justify-between pb-3">
              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
                  )
                }
                className="cursor-pointer rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-primary"
                aria-label="Oldingi oy"
              >
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm font-bold capitalize text-foreground">
                {monthLabel}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCalendarMonth(
                    new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
                  )
                }
                className="cursor-pointer rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-primary"
                aria-label="Keyingi oy"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((wd) => (
                <span
                  key={wd}
                  className="py-1 text-[11px] font-semibold text-muted-foreground"
                >
                  {wd}
                </span>
              ))}
              {calendarDays.map((day, i) =>
                day === null ? (
                  <span key={`empty-${i}`} />
                ) : (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "relative mx-auto flex size-8 cursor-pointer items-center justify-center rounded-full text-sm transition-colors duration-200",
                      isSameDay(day, selectedDate)
                        ? "bg-[#3525cd] font-bold text-white shadow-soft-sm"
                        : isSameDay(day, now)
                          ? "font-bold text-[#3525cd]"
                          : "text-foreground hover:bg-accent",
                      bookingsByDay[formatDateKey(day)]?.length && !isSameDay(day, selectedDate)
                        ? "after:absolute after:bottom-0.5 after:size-1 after:rounded-full after:bg-[#3525cd]"
                        : ""
                    )}
                  >
                    {day.getDate()}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-white p-4 shadow-soft-sm">
            <h2 className="pb-3 text-sm font-bold text-foreground">Ustalar</h2>
            <div className="space-y-2">
              {staff.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-accent/40"
                >
                  <input
                    type="checkbox"
                    checked={checkedStaff[s.id] ?? false}
                    onChange={() => toggleStaff(s.id)}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-md border transition-all duration-200",
                      checkedStaff[s.id]
                        ? "border-[#3525cd] bg-[#3525cd] text-white"
                        : "border-border bg-white text-transparent"
                    )}
                  >
                    <Check className="size-3.5" />
                  </span>
                  <span
                    className="flex size-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </span>
                  <span className="text-sm font-medium text-foreground">{s.name}</span>
                </label>
              ))}
              {staff.length === 0 && (
                <p className="text-sm text-muted-foreground">Ustalar yo&apos;q</p>
              )}
            </div>
          </div>
        </aside>

        {/* Asosiy qism */}
        <main className="min-w-0 flex-1">
          {view === "day" && (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft-sm">
              {activeStaff.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Ko&apos;rsatish uchun ustani tanlang
                </p>
              ) : (
                /* Gorizontal scroll — mobil ekranlarda ustunlar sig'masa scroll bo'ladi */
                <div className="overflow-x-auto">
                  <div className="min-w-[560px]">
                    {/* Ustunlar sarlavhasi */}
                    <div className="flex border-b border-border/70">
                      <div className="sticky left-0 z-10 w-16 shrink-0 border-r border-border/70 bg-white p-3 text-xs font-bold text-muted-foreground">
                        Vaqt
                      </div>
                      <div className="flex flex-1">
                        {activeStaff.map((s) => (
                          <div
                            key={s.id}
                            className={cn(
                              "flex items-center gap-2 border-r border-border/70 p-3 last:border-r-0",
                              staffColumnWidth
                            )}
                          >
                            <span
                              className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                              style={{ backgroundColor: s.color }}
                            >
                              {s.name
                                .split(" ")
                                .map((p) => p[0])
                                .join("")}
                            </span>
                            <span className="truncate text-sm font-bold text-foreground">
                              {s.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vaqt panjarasi */}
                    <div className="relative flex">
                      <div className="sticky left-0 z-10 w-16 shrink-0 border-r border-border/70 bg-white">
                        {hours.map((h) => (
                          <div
                            key={h}
                            className="flex h-14 items-start justify-end pr-2 pt-1 text-[11px] font-medium text-muted-foreground"
                          >
                            {String(h).padStart(2, "0")}:00
                          </div>
                        ))}
                      </div>

                      <div className="relative flex flex-1">
                        {activeStaff.map((s) => (
                          <div
                            key={s.id}
                            className={cn(
                              "relative border-r border-border/70 last:border-r-0",
                              staffColumnWidth
                            )}
                          >
                            {hours.map((h) => (
                              <div key={h} className="h-14 border-b border-border/40" />
                            ))}

                            {/* Usta bronlari */}
                            {filteredBySearch
                              .filter((b) => b.staffId === s.id)
                              .map((b) => {
                                const start = new Date(b.date);
                                const startMin = start.getHours() * 60 + start.getMinutes();
                                const startOff = ((startMin - 9 * 60) / (13 * 60)) * 100;
                                const durPct = (b.serviceDuration / (13 * 60)) * 100;
                                return (
                                  <div
                                    key={b.id}
                                    className="absolute inset-x-1 overflow-hidden rounded-lg p-2 shadow-soft-sm transition-transform duration-200 hover:scale-[1.02]"
                                    style={{
                                      top: `${startOff}%`,
                                      height: `calc(${durPct}% - 4px)`,
                                      backgroundColor: `${s.color}1a`,
                                      borderLeft: `3px solid ${s.color}`,
                                    }}
                                  >
                                    <p className="truncate text-xs font-bold text-foreground">
                                      {b.clientName}
                                    </p>
                                    <p className="truncate text-[11px] text-muted-foreground">
                                      {b.serviceName} · {formatTime(start)}
                                    </p>
                                    {b.status === "pending" && (
                                      <span className="mt-0.5 inline-block rounded-full bg-[#3525cd] px-1.5 py-px text-[9px] font-bold text-white">
                                        {statusLabels[b.status]}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        ))}

                        {/* Hozirgi vaqt chizig'i */}
                        {mounted && nowLineTop !== null && (
                          <div
                            className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
                            style={{ top: `${nowLineTop}%` }}
                          >
                            <span className="size-2 -translate-x-1/2 rounded-full bg-red-500" />
                            <span className="h-px flex-1 bg-red-500" />
                          </div>
                        )}
                      </div>
                    </div>

                    {filteredBySearch.length === 0 && (
                      <p className="border-t border-border/40 p-6 text-center text-sm text-muted-foreground">
                        Bu kunga bronlar yo&apos;q
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {view === "week" && (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft-sm">
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-7 border-b border-border/70">
                    {weekDays.map((d) => (
                      <div
                        key={d.toISOString()}
                        className={cn(
                          "border-r border-border/70 p-3 text-center last:border-r-0",
                          isSameDay(d, now) && "bg-accent/40"
                        )}
                      >
                        <p className="text-[11px] font-semibold text-muted-foreground">
                          {WEEKDAYS[(d.getDay() + 6) % 7]}
                        </p>
                        <p
                          className={cn(
                            "text-lg font-bold",
                            isSameDay(d, selectedDate) ? "text-[#3525cd]" : "text-foreground"
                          )}
                        >
                          {d.getDate()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {weekDays.map((d) => {
                      const dayBookings = bookingsByDay[formatDateKey(d)] ?? [];
                      return (
                        <div
                          key={d.toISOString()}
                          className="min-h-40 border-r border-border/40 p-2 last:border-r-0"
                        >
                          {dayBookings.map((b) => {
                            const st = staff.find((s) => s.id === b.staffId);
                            return (
                              <div
                                key={b.id}
                                className="mb-2 rounded-lg border-l-[3px] bg-accent/40 p-2"
                                style={{ borderColor: st?.color ?? "#3525cd" }}
                              >
                                <p className="truncate text-xs font-bold text-foreground">
                                  {b.clientName}
                                </p>
                                <p className="truncate text-[10px] text-muted-foreground">
                                  {formatTime(new Date(b.date))} · {b.serviceName}
                                </p>
                                {st && (
                                  <p
                                    className="truncate text-[10px] font-semibold"
                                    style={{ color: st.color }}
                                  >
                                    {st.name}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                          {dayBookings.length === 0 && (
                            <p className="pt-6 text-center text-[11px] text-muted-foreground">
                              —
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "month" && (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-soft-sm">
              <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                  <div className="grid grid-cols-7 border-b border-border/70">
                    {WEEKDAYS.map((wd) => (
                      <div
                        key={wd}
                        className="border-r border-border/70 p-3 text-center text-xs font-bold text-muted-foreground last:border-r-0"
                      >
                        {wd}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {calendarDays.map((day, i) =>
                      day === null ? (
                        <div
                          key={`empty-${i}`}
                          className="min-h-24 border-r border-b border-border/40"
                        />
                      ) : (
                        <button
                          key={day.toISOString()}
                          type="button"
                          onClick={() => {
                            setSelectedDate(day);
                            setView("day");
                          }}
                          className={cn(
                            "min-h-24 cursor-pointer border-r border-b border-border/40 p-2 text-left transition-colors last:border-r-0 hover:bg-accent/30",
                            isSameDay(day, now) && "bg-accent/40",
                            isSameDay(day, selectedDate) && "ring-2 ring-inset ring-[#3525cd]"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-flex size-7 items-center justify-center rounded-full text-sm",
                              isSameDay(day, now)
                                ? "bg-[#3525cd] font-bold text-white"
                                : "font-medium text-foreground"
                            )}
                          >
                            {day.getDate()}
                          </span>
                          {bookingsByDay[formatDateKey(day)]?.length ? (
                            <div className="mt-1 flex flex-col gap-1">
                              {bookingsByDay[formatDateKey(day)].slice(0, 2).map((b) => {
                                const st = staff.find((s) => s.id === b.staffId);
                                return (
                                  <span
                                    key={b.id}
                                    className="truncate rounded px-1.5 py-0.5 text-[10px] font-semibold"
                                    style={{
                                      backgroundColor: `${st?.color ?? "#3525cd"}1a`,
                                      color: st?.color ?? "#3525cd",
                                    }}
                                  >
                                    {b.clientName}
                                  </span>
                                );
                              })}
                              {bookingsByDay[formatDateKey(day)].length > 2 && (
                                <span className="px-1 text-[10px] font-semibold text-muted-foreground">
                                  +{bookingsByDay[formatDateKey(day)].length - 2} ta
                                </span>
                              )}
                            </div>
                          ) : null}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
