import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

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
  duration: integer("duration").notNull(),
});

export type Salon = typeof salons.$inferSelect;
export type Service = typeof services.$inferSelect;
