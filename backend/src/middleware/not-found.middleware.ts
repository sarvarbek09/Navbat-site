// Hech qaysi route mos kelmasa (masalan noto'g'ri yozilgan URL), shu ishlaydi.
// app.ts da barcha route'lardan KEYIN, errorHandler'dan OLDIN ulanadi.
import type { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: `Route topilmadi: ${req.method} ${req.originalUrl}` });
}
