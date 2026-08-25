// AUTH MODULI — "vazifa": telefon raqami orqali kirish/ro'yxatdan o'tish.
// Parol YO'Q (loyihada hali parol tizimi yo'q) — Next.js ilovasidagi
// POST /api/auth route'i bilan bir xil mantiq.
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { users } from "../../db/schema";
import { AppError } from "../../lib/errors";
import type { User } from "../../db/schema";

/**
 * Telefon raqami bo'yicha foydalanuvchini topadi.
 * - Topilsa — o'shani qaytaradi (login).
 * - Topilmasa va `name` berilgan bo'lsa — yangi foydalanuvchi yaratadi (register).
 * - Topilmasa va `name` berilmagan bo'lsa — 404 (frontend "ism kiriting" deb so'rashi kerak).
 */
export async function loginOrRegisterUser(
  phone: string,
  name?: string,
  telegramId?: string
): Promise<User> {
  const [existing] = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
  if (existing) return existing;

  if (!name) {
    throw new AppError("Foydalanuvchi topilmadi — ro'yxatdan o'tish uchun ism (name) yuboring", 404);
  }

  const [created] = await db.insert(users).values({ name, phone, telegramId }).returning();
  return created;
}
