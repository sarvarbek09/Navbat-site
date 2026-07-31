import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, salons, services, bookings } from "@/lib/schema";
import { eq } from "drizzle-orm";

const BOT_TOKEN = process.env.BOT_B2C_TOKEN;

export async function POST(request: Request) {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "Bot token sozlanmagan" }, { status: 500 });
  }

  const body = await request.json();
  const { message } = body;

  if (!message?.text) {
    return NextResponse.json({ ok: true });
  }

  const chatId = message.chat.id;
  const text = message.text.trim();

  if (text === "/start") {
    await sendMessage(chatId, "Navbat botiga xush kelibsiz! 📅\n\nSalon topish uchun havolani bosing.");
    return NextResponse.json({ ok: true });
  }

  if (text.startsWith("/book")) {
    const salonId = text.split(" ")[1];
    if (!salonId) {
      await sendMessage(chatId, "Salon ID kiriting: /book <salon-id>");
      return NextResponse.json({ ok: true });
    }

    const [salon] = await db
      .select()
      .from(salons)
      .where(eq(salons.id, salonId))
      .limit(1);

    if (!salon) {
      await sendMessage(chatId, "Salon topilmadi.");
      return NextResponse.json({ ok: true });
    }

    const salonServices = await db
      .select()
      .from(services)
      .where(eq(services.salonId, salonId));

    const list = salonServices
      .map((s) => `• ${s.name} — ${s.price.toLocaleString()} so'm (${s.duration} min)`)
      .join("\n");

    await sendMessage(chatId, `${salon.name}\n\nXizmatlar:\n${list || "Xizmatlar yo'q"}`);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}

async function sendMessage(chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
