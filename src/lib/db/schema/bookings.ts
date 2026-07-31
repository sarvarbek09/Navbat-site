import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { bookingStatusEnum } from "./enums";
import { users } from "./users";
import { salons, services } from "./salons";

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

export type Booking = typeof bookings.$inferSelect;
export type BlockedSlot = typeof blockedSlots.$inferSelect;
