// SALONLAR MODULI.
// Eslatma: Next.js ilovasida hozircha salon yaratish uchun UI/action umuman
// yo'q (faqat Drizzle Studio orqali qo'lda qo'shilgan). Shu modul o'sha
// bo'shliqni to'ldiradi — endi salon "owner" ro'lidagi foydalanuvchi
// tomonidan API orqali yaratilishi mumkin.
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { salons } from "../../db/schema";
import { AppError, ForbiddenError, NotFoundError } from "../../lib/errors";
import type { CreateSalonInput, UpdateSalonInput } from "../../schemas/salon.schema";
import type { Salon } from "../../db/schema";

/** Barcha salonlar (ochiq/public ro'yxat — masalan mijozlar uchun salon tanlash sahifasida) */
export async function listSalons(): Promise<Salon[]> {
  return db.select().from(salons);
}

/** Bitta salon — topilmasa 404 */
export async function getSalonById(id: string): Promise<Salon> {
  const [salon] = await db.select().from(salons).where(eq(salons.id, id)).limit(1);
  if (!salon) throw NotFoundError("Salon topilmadi");
  return salon;
}

/**
 * Berilgan owner'ga tegishli birinchi salonni qaytaradi.
 * Boshqa modullar (services, availability, clients) ham shundan foydalanadi,
 * chunki hozirgi mantiqda "bitta owner = bitta salon" deb qaralgan
 * (Next.js tarafidagi getOwnerSalon() bilan bir xil taxmin).
 * TODO(backend team): agar bitta ownerga bir nechta salon ruxsat etilsa,
 * bu funksiya va uni chaqiruvchi joylar salonId parametrini talab qiladigan
 * qilib qayta yozilishi kerak.
 */
export async function getSalonByOwnerOrThrow(ownerId: string): Promise<Salon> {
  const [salon] = await db.select().from(salons).where(eq(salons.ownerId, ownerId)).limit(1);
  if (!salon) throw NotFoundError("Sizga tegishli salon topilmadi");
  return salon;
}

export async function createSalon(ownerId: string, input: CreateSalonInput): Promise<Salon> {
  const [salon] = await db.insert(salons).values({ ownerId, ...input }).returning();
  return salon;
}

export async function updateSalon(
  ownerId: string,
  salonId: string,
  input: UpdateSalonInput
): Promise<Salon> {
  const salon = await getSalonById(salonId);
  if (salon.ownerId !== ownerId) {
    throw ForbiddenError("Bu salon sizga tegishli emas");
  }

  const [updated] = await db
    .update(salons)
    .set(input)
    .where(eq(salons.id, salonId))
    .returning();

  if (!updated) throw new AppError("Salonni yangilab bo'lmadi", 500);
  return updated;
}
