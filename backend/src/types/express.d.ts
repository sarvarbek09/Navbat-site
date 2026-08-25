// Express'ning Request obyektiga `req.user` maydonini qo'shamiz (module
// augmentation). Buni requireAuth() middleware to'ldiradi — qarang:
// ../middleware/auth.middleware.ts
import type { SessionUser } from "./index";

declare global {
  namespace Express {
    interface Request {
      /** requireAuth() middleware'idan o'tgan so'rovlarda to'ldirilgan bo'ladi */
      user?: SessionUser;
    }
  }
}

export {};
