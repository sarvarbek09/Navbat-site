// B2C TELEGRAM BOT WEBHOOK — oddiy mijozlar shu bot orqali salon xizmatlarini
// ko'radi. Telegram serverlari har bir yangi xabarda shu endpoint'ga POST
// so'rov yuboradi (webhook Telegram tomonda botfather/setWebhook orqali shu
// backendning ochiq manziliga: https://<domen>/api/bot-b2c ga sozlanadi).
//
// Next.js tarafidagi src/app/api/bot-b2c/route.ts bilan bir xil mantiq —
// buyruqlar: /start, /book <salonId>
import { Router, type Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { salons, services } from "../../db/schema";
import { env } from "../../config/env";
import { sendTelegramMessage } from "./telegram";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  if (!env.BOT_B2C_TOKEN) {
    res.status(500).json({ error: "Bot token sozlanmagan (BOT_B2C_TOKEN)" });
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
      env.BOT_B2C_TOKEN,
      chatId,
      "Navbat botiga xush kelibsiz! 📅\n\nSalon topish uchun havolani bosing."
    );
    res.json({ ok: true });
    return;
  }

  if (text.startsWith("/book")) {
    const salonId = text.split(" ")[1];
    if (!salonId) {
      await sendTelegramMessage(env.BOT_B2C_TOKEN, chatId, "Salon ID kiriting: /book <salon-id>");
      res.json({ ok: true });
      return;
    }

    const [salon] = await db.select().from(salons).where(eq(salons.id, salonId)).limit(1);
    if (!salon) {
      await sendTelegramMessage(env.BOT_B2C_TOKEN, chatId, "Salon topilmadi.");
      res.json({ ok: true });
      return;
    }

    const salonServices = await db.select().from(services).where(eq(services.salonId, salonId));
    const list = salonServices
      .map((s) => `• ${s.name} — ${s.price.toLocaleString()} so'm (${s.duration} min)`)
      .join("\n");

    await sendTelegramMessage(
      env.BOT_B2C_TOKEN,
      chatId,
      `${salon.name}\n\nXizmatlar:\n${list || "Xizmatlar yo'q"}`
    );
    res.json({ ok: true });
    return;
  }

  // TODO(backend team): bron qilish (/book <salonId> dan keyingi bosqichlar —
  // xizmat va vaqt tanlash) hali qo'shilmagan, faqat xizmatlar ro'yxati chiqadi.
  res.json({ ok: true });
});

export default router;
