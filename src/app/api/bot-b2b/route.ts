import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, salons, users } from "@/lib/schema";
import { eq, and, count } from "drizzle-orm";

const BOT_TOKEN = process.env.BOT_B2B_TOKEN;

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
    await sendMessage(chatId, "Navbat B2B botiga xush kelibsiz! 💼\n\n/stats — bugungi statistika\n/bookings — yangi bronlar");
    return NextResponse.json({ ok: true });
  }

  if (text === "/stats") {
    const [owner] = await db
      .select()
      .from(users)
      .where(eq(users.telegramId, String(chatId)))
      .limit(1);

    if (!owner) {
      await sendMessage(chatId, "Hisobingiz bog'lanmagan.");
      return NextResponse.json({ ok: true });
    }

    const [salon] = await db
      .select()
      .from(salons)
      .where(eq(salons.ownerId, owner.id))
      .limit(1);

    if (!salon) {
      await sendMessage(chatId, "Salon topilmadi.");
      return NextResponse.json({ ok: true });
    }

    const [pending] = await db
      .select({ count: count() })
      .from(bookings)
      .where(and(eq(bookings.salonId, salon.id), eq(bookings.status, "pending")));

    await sendMessage(chatId, `📊 ${salon.name}\nKutilayotgan bronlar: ${pending.count}`);
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
