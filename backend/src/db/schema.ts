// ============================================================================
// DRIZZLE SCHEMA — bazadagi jadvallarning TypeScript tavsifi.
//
// DIQQAT: bu jadvallar hozircha Next.js ilovasi (../../src/lib/schema.ts) bilan
// BITTA Postgres bazasini bo'lishadi. Shu sabab:
//   1) Bu yerda jadval/ustun o'zgartirsangiz, xuddi shu o'zgarishni
//      Next.js tarafidagi src/lib/schema.ts faylida ham qiling (aks holda
//      ikki tomon bir-biriga mos kelmay qoladi) — yoki kelajakda bu backend
//      yagona "source of truth" bo'lsa, Next.js tarafini shu yerdan import
//      qiladigan qilib almashtirish kerak bo'ladi.
//   2) `npm run db:generate` shu fayldan migratsiya generatsiya qiladi —
//      Next.js tarafidagi migratsiyalar bilan aralashtirmang, ikkalasini
//      alohida drizzle-kit konfiguratsiyasi orqali boshqaring.
// ============================================================================
import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

// Foydalanuvchi roli: "client" — mijoz (bron qiladi), "owner" — salon egasi.
// Eslatma: "admin" roli hali bazada YO'Q — /admin panel backend logikasini
// yozayotgan bo'lsangiz, avval shu enumga "admin" qo'shish va migratsiya
// qilish kerak bo'ladi.
export const userRoleEnum = pgEnum("user_role", ["client", "owner"]);

// Bron holati: pending (kutilmoqda) -> confirmed (tasdiqlangan) -> completed (bajarilgan)
// yoki cancelled (bekor qilingan) bo'lishi mumkin.
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

/** Foydalanuvchilar — mijoz ham, salon egasi ham shu jadvalda, role ustuni bilan farqlanadi */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(), // login shu orqali amalga oshadi, parol yo'q
  role: userRoleEnum("role").notNull().default("client"),
  telegramId: text("telegram_id"), // Telegram bot orqali kirganda to'ldiriladi
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Salonlar — har biri bitta owner'ga (users.role === "owner") tegishli */
export const salons = pgTable("salons", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Xizmatlar (soch olish, manikyur va h.k.) — har biri bitta salonga tegishli */
export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  salonId: uuid("salon_id")
    .notNull()
    .references(() => salons.id),
  name: text("name").notNull(),
  price: integer("price").notNull(), // so'mda, butun son
  duration: integer("duration").notNull(), // daqiqada — bron tugash vaqtini hisoblashda ishlatiladi
});

/** Bronlar — mijoz (clientId) tomonidan bitta salon + bitta xizmatga qilingan yozilish */
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  salonId: uuid("salon_id")
    .notNull()
    .references(() => salons.id),
  clientId: uuid("client_id")
    .notNull()
    .references(() => users.id),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id),
  status: bookingStatusEnum("status").notNull().default("pending"),
  date: timestamp("date").notNull(), // bron boshlanish vaqti; tugash vaqti = date + service.duration
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** Salon egasi qo'lda belgilaydigan band vaqtlar (tushlik, dam olish va h.k.) */
export const blockedSlots = pgTable("blocked_slots", {
  id: uuid("id").primaryKey().defaultRandom(),
  salonId: uuid("salon_id")
    .notNull()
    .references(() => salons.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Drizzle'dan avtomatik chiqarilgan TypeScript tiplar — boshqa fayllarda
// `import type { User, Salon, ... } from "../db/schema"` deb ishlatiladi.
export type User = typeof users.$inferSelect;
export type Salon = typeof salons.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BlockedSlot = typeof blockedSlots.$inferSelect;
