import { db } from "./db";
import { salons } from "./schema";
import { eq } from "drizzle-orm";
import { getSession } from "./auth";

/**
 * Login bo'lsa — egasining salonini qaytaradi.
 * Login bo'lmasa — DB'dagi birinchi salondan (demo rejim) foydalanadi,
 * shunda sahifalar login qilmasdan ham ishlayveradi.
 * Umuman salon bo'lmasa null qaytaradi.
 */
export async function getCurrentSalon() {
  const session = await getSession();

  if (session) {
    const [salon] = await db
      .select()
      .from(salons)
      .where(eq(salons.ownerId, session.id))
      .limit(1);

    if (salon) return salon;
  }

  const [fallback] = await db.select().from(salons).limit(1);
  return fallback ?? null;
}
