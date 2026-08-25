// Har bir himoyalangan route'da shu middleware ishlatiladi:
//   router.get("/dashboard-data", requireAuth("owner"), controllerFn)
//   router.post("/book", requireAuth("client"), controllerFn)
//   router.get("/me", requireAuth(), controllerFn)   // rol farqi yo'q, faqat login bo'lishi kerak
//
// Next.js tarafidagi src/lib/auth.ts dagi requireAuth() xato THROW qilardi
// (Server Action buni { error } ga aylantirardi). Bu yerda HTTP dunyosiga mos
// ravishda to'g'ridan-to'g'ri 401/403 javob qaytaramiz va route handler'ga
// umuman yetib bormaydi.
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { getSessionUser } from "../lib/session";

export function requireAuth(role?: "client" | "owner"): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getSessionUser(req);

    if (!user) {
      res.status(401).json({ error: "Tizimga kirilmagan (Unauthorized)" });
      return;
    }

    if (role && user.role !== role) {
      res.status(403).json({ error: "Ruxsat yo'q (Forbidden)" });
      return;
    }

    req.user = user; // shu yerdan keyingi controller/service req.user orqali foydalanadi
    next();
  };
}
