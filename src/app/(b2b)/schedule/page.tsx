import { ScheduleBoard } from "../_components/schedule-board";

/* ============================================================
   DEFAULT (statik) MA'LUMOTLAR — backend ulanguncha ishlaydi
   ============================================================ */

const DEFAULT_SALON_NAME = "Lumiere Hair Studio";

const DEFAULT_STAFF = [
  { id: "staff-aziza", name: "Aziza M.", color: "#3525cd" },
  { id: "staff-dilnoza", name: "Dilnoza R.", color: "#0891b2" },
  { id: "staff-sardor", name: "Sardor K.", color: "#92400e" },
];

// Bugungi sana atrofidagi default bronlar — kalendar va jadvalda ko'rinadi
function buildDefaultBookings() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const at = (dayOffset: number, hours: number, minutes: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + dayOffset);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const rows = [
    // Bugun
    { day: 0, h: 9, m: 30, client: "Nilufar Rahimova", service: "Soch olish", dur: 60, staff: "staff-aziza", status: "completed" },
    { day: 0, h: 10, m: 30, client: "Bekzod Aliyev", service: "Soch bo'yash", dur: 90, staff: "staff-dilnoza", status: "completed" },
    { day: 0, h: 11, m: 0, client: "Jasur Toshmatov", service: "Stilist xizmati", dur: 45, staff: "staff-sardor", status: "completed" },
    { day: 0, h: 12, m: 30, client: "Malika Yusupova", service: "Soch olish", dur: 60, staff: "staff-aziza", status: "confirmed" },
    { day: 0, h: 14, m: 0, client: "Dildora Normatova", service: "Makiyaj", dur: 50, staff: "staff-dilnoza", status: "confirmed" },
    { day: 0, h: 15, m: 30, client: "Gulzoda Karimova", service: "Yuz tozalash", dur: 40, staff: "staff-sardor", status: "pending" },
    { day: 0, h: 17, m: 0, client: "Malika Yusupova", service: "Soch bo'yash", dur: 90, staff: "staff-aziza", status: "confirmed" },
    { day: 0, h: 19, m: 0, client: "Jasur Toshmatov", service: "Soch olish", dur: 60, staff: "staff-dilnoza", status: "pending" },
    // Ertaga
    { day: 1, h: 10, m: 0, client: "Malika Yusupova", service: "Makiyaj", dur: 50, staff: "staff-dilnoza", status: "confirmed" },
    { day: 1, h: 11, m: 30, client: "Bekzod Aliyev", service: "Soch olish", dur: 60, staff: "staff-aziza", status: "pending" },
    { day: 1, h: 15, m: 0, client: "Nilufar Rahimova", service: "Soch bo'yash", dur: 90, staff: "staff-sardor", status: "confirmed" },
    // Indinga
    { day: 2, h: 12, m: 0, client: "Dildora Normatova", service: "Stilist xizmati", dur: 45, staff: "staff-sardor", status: "confirmed" },
    { day: 2, h: 16, m: 30, client: "Gulzoda Karimova", service: "Soch olish", dur: 60, staff: "staff-aziza", status: "pending" },
  ];

  return rows.map((r, i) => ({
    id: `booking-${i + 1}`,
    date: at(r.day, r.h, r.m).toISOString(),
    status: r.status,
    clientName: r.client,
    serviceName: r.service,
    serviceDuration: r.dur,
    staffId: r.staff,
  }));
}

export default function SchedulePage() {
  const staff = DEFAULT_STAFF;
  const bookings = buildDefaultBookings();

  return <ScheduleBoard salonName={DEFAULT_SALON_NAME} staff={staff} bookings={bookings} />;
}
