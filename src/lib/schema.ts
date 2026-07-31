import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["client", "owner"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  role: userRoleEnum("role").notNull().default("client"),
  telegramId: text("telegram_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const salons = pgTable("salons", {
  id: uuid("id").primaryKey().defaultRandom(),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  salonId: uuid("salon_id")
    .notNull()
    .references(() => salons.id),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(), // minutes
});

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
  date: timestamp("date").notNull(),
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

export type User = typeof users.$inferSelect;
export type Salon = typeof salons.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BlockedSlot = typeof blockedSlots.$inferSelect;
