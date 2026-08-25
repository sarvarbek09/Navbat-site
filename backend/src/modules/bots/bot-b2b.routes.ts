// B2B TELEGRAM BOT WEBHOOK — salon egalari shu bot orqali qisqacha
// statistika ko'radi. Foydalanuvchi Telegram'dan `/start` bosishda
// users.telegram_id maydoni bilan bog'langan bo'lishi kerak (bu bog'lash
// jarayonining o'zi hali qo'shilmagan — TODO, quyida izohlangan).
//
// Next.js tarafidagi src/app/api/bot-b2b/route.ts bilan bir xil mantiq —
// buyruqlar: /start, /stats
import { Router, type Request, type Response } from "express";
import { and, count, eq } from "drizzle-orm";
import { db } from "../../db/client";
import { bookings, salons, users } from "../../db/schema";
import { env } from "../../config/env";
import { sendTelegramMessage } from "./telegram";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  if (!env.BOT_B2B_TOKEN) {
    res.status(500).json({ error: "Bot token sozlanmagan (BOT_B2B_TOKEN)" });
    return;
  }

  const { message } = req.body ?? {};
  if (!message?.text) {
    res.json({ ok: true });
    return;
  }

  const chatId: number = message.chat.id;
  const text: string = message.text.trim();

  if (text === "/start") {
    await sendTelegramMessage(
      env.BOT_B2B_TOKEN,
      chatId,
      "Navbat B2B botiga xush kelibsiz! 💼\n\n/stats — bugungi statistika\n/bookings — yangi bronlar"
    );
    res.json({ ok: true });
    return;
  }

  if (text === "/stats") {
    // TODO(backend team): hozircha users.telegram_id qo'lda/boshqa joyda
    // to'ldirilishi kerak — Telegram akkauntini owner hisobiga bog'laydigan
    // real oqim (masalan /link <kod> buyrug'i) hali yo'q.
    const [owner] = await db.select().from(users).where(eq(users.telegramId, String(chatId))).limit(1);

    if (!owner) {
      await sendTelegramMessage(env.BOT_B2B_TOKEN, chatId, "Hisobingiz bog'lanmagan.");
      res.json({ ok: true });
      return;
    }

    const [salon] = await db.select().from(salons).where(eq(salons.ownerId, owner.id)).limit(1);
    if (!salon) {
      await sendTelegramMessage(env.BOT_B2B_TOKEN, chatId, "Salon topilmadi.");
      res.json({ ok: true });
      return;
    }

    const [pending] = await db
      .select({ count: count() })
      .from(bookings)
      .where(and(eq(bookings.salonId, salon.id), eq(bookings.status, "pending")));

    await sendTelegramMessage(env.BOT_B2B_TOKEN, chatId, `📊 ${salon.name}\nKutilayotgan bronlar: ${pending.count}`);
    res.json({ ok: true });
    return;
  }

  res.json({ ok: true });
});

export default router;
