import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { userRoleEnum } from "./enums";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  role: userRoleEnum("role").notNull().default("client"),
  telegramId: text("telegram_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
