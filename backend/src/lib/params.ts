// Express 5'da req.params[x] va req.query[x] tipi `string | string[] | ...`
// bo'lishi mumkin (wildcard route'lar uchun, masalan "/files/*"). Bizning
// route'larimizda bunday wildcard yo'q, shuning uchun bu qiymatlar amalda
// doim string — lekin TypeScript buni bilmaydi. Shu ikki funksiya buni
// xavfsiz tarzda tasdiqlaydi (array/undefined kelsa — aniq 400 xato beradi,
// jim qolib noto'g'ri qiymat bilan davom etmaydi).
import type { Request } from "express";
import { AppError } from "./errors";

export function requireParam(req: Request, name: string): string {
  const value = req.params[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new AppError(`"${name}" parametri noto'g'ri yoki yo'q`, 400);
  }
  return value;
}

export function requireQuery(req: Request, name: string): string {
  const value = req.query[name];
  if (typeof value !== "string" || value.length === 0) {
    throw new AppError(`"${name}" query parametri kerak`, 400);
  }
  return value;
}
