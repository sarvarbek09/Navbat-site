import { z } from "zod";

// POST /api/auth/session uchun. `name` bo'lmasa — bu "login" (foydalanuvchi
// oldindan mavjud bo'lishi kerak); `name` bo'lsa va foydalanuvchi topilmasa —
// yangi hisob shu telefon+ism bilan yaratiladi ("register").
// Telegram bot ham shu endpoint'ni chaqiradi, shuning uchun telegramId ixtiyoriy.
export const loginOrRegisterSchema = z.object({
  phone: z.string().regex(/^\+998\d{9}$/, "Telefon: +998XXXXXXXXX"),
  name: z.string().min(2, "Ism kamida 2 ta harf").optional(),
  telegramId: z.string().optional(),
});

export type LoginOrRegisterInput = z.infer<typeof loginOrRegisterSchema>;
