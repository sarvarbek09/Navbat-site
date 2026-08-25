// GLOBAL XATO USHLAGICH. app.ts da ENG OXIRGI middleware sifatida ulanadi.
// Express 5'da async route handler ichida throw qilingan / reject bo'lgan
// Promise avtomatik shu yerga tushadi — alohida try/catch yozish shart emas.
//
// modules/*/​*.service.ts fayllarida `throw new AppError("xabar", statusCode)`
// deb yozsangiz bo'ldi, qolganini shu fayl bajaradi.
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/errors";

// Barcha 4 ta parametr shart — Express faqat 4-argumentli funksiyani "error
// middleware" deb taniydi (req/next ishlatilmasa ham olib tashlab bo'lmaydi).
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Kutilmagan xato — to'liq stack'ni serverda logga yozamiz, mijozga esa
  // ichki tafsilotlarni chiqarmaymiz.
  console.error("Kutilmagan server xatosi:", err);
  res.status(500).json({ error: "Server xatosi" });
}
