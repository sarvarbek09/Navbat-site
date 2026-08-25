// Sessiya = httpOnly cookie ichida saqlanadigan users.id (UUID). JWT yoki
// boshqa imzolash YO'Q — xuddi Next.js ilovasidagi src/lib/auth.ts kabi oddiy.
// Bu yerda faqat "cookie bilan ishlash" mantig'i bor; huquq tekshiruvi
// (requireAuth) alohida faylda: ../middleware/auth.middleware.ts
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { users } from "../db/schema";
import { env } from "../config/env";
import type { SessionUser } from "../types";

export const SESSION_COOKIE_NAME = "navbat_session";

/** So'rovdagi cookie'dan foydalanuvchini bazadan topib qaytaradi (yo'q bo'lsa null) */
export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const userId = req.cookies?.[SESSION_COOKIE_NAME];
  if (!userId) return null;

  const [user] = await db
    .select({ id: users.id, name: users.name, phone: users.phone, role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user ?? null;
}

/** Login/register muvaffaqiyatli bo'lganda cookie o'rnatadi (30 kunga) */
export function setSessionCookie(res: Response, userId: string) {
  res.cookie(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30 * 1000, // 30 kun (ms)
    path: "/",
  });
}

/** Logout — cookie'ni o'chiradi */
export function clearSessionCookie(res: Response) {
  res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
}
