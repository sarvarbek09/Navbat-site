// Controller qatlami: faqat HTTP request/response bilan ishlaydi —
// req.body'ni Zod bilan tekshiradi, servisni chaqiradi, javob qaytaradi.
// Haqiqiy biznes-mantiq (bazaga yozish va h.k.) auth.service.ts da.
import type { Request, Response } from "express";
import { loginOrRegisterSchema } from "../../schemas/auth.schema";
import { loginOrRegisterUser } from "./auth.service";
import { setSessionCookie, clearSessionCookie } from "../../lib/session";

/** POST /api/auth/session — { phone, name?, telegramId? } */
export async function loginOrRegister(req: Request, res: Response) {
  const parsed = loginOrRegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const { phone, name, telegramId } = parsed.data;
  const user = await loginOrRegisterUser(phone, name, telegramId);

  setSessionCookie(res, user.id);

  res.json({
    user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
  });
}

/** POST /api/auth/logout */
export async function logout(_req: Request, res: Response) {
  clearSessionCookie(res);
  res.json({ ok: true });
}

/** GET /api/auth/me — requireAuth() dan o'tgan bo'lsa, req.user to'ldirilgan bo'ladi */
export async function me(req: Request, res: Response) {
  res.json({ user: req.user ?? null });
}
