import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { createSession, destroySession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const body = await request.json();
  const { action, phone, name, telegramId } = body;

  if (action === "logout") {
    await destroySession();
    return NextResponse.json({ ok: true });
  }

  if (!phone) {
    return NextResponse.json({ error: "Telefon kerak" }, { status: 400 });
  }

  let [user] = await db
    .select()
    .from(users)
    .where(eq(users.phone, phone))
    .limit(1);

  if (!user && name) {
    [user] = await db
      .insert(users)
      .values({ name, phone, telegramId })
      .returning();
  }

  if (!user) {
    return NextResponse.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 });
  }

  await createSession(user.id);

  return NextResponse.json({
    user: { id: user.id, name: user.name, phone: user.phone, role: user.role },
  });
}
