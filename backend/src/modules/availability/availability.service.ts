// BAND VAQTLAR (blockedSlots) MODULI — salon egasi tushlik/dam olish kabi
// vaqtlarni qo'lda belgilashi uchun. Next.js tarafidagi
// src/actions/availability.actions.ts bilan bir xil mantiq.
import { eq } from "drizzle-orm";
import { db } from "../../db/client";
import { blockedSlots } from "../../db/schema";
import { publish } from "../../lib/realtime";
import { NotFoundError } from "../../lib/errors";
import { getSalonByOwnerOrThrow } from "../salons/salons.service";
import type { BlockSlotInput } from "../../schemas/availability.schema";
import type { BlockedSlot } from "../../db/schema";

/** Salonning band vaqtlari — public (mijoz bron qilishdan oldin ko'rishi uchun ham kerak bo'lishi mumkin) */
export async function listBlockedSlots(salonId: string): Promise<BlockedSlot[]> {
  return db.select().from(blockedSlots).where(eq(blockedSlots.salonId, salonId));
}

export async function blockTimeSlot(ownerId: string, input: BlockSlotInput): Promise<BlockedSlot> {
  const salon = await getSalonByOwnerOrThrow(ownerId);

  const [slot] = await db
    .insert(blockedSlots)
    .values({ salonId: salon.id, ...input })
    .returning();

  publish({
    type: "slot_blocked",
    salonId: salon.id,
    slotId: slot.id,
    data: { startTime: slot.startTime, endTime: slot.endTime },
  });

  return slot;
}

export async function unblockTimeSlot(ownerId: string, slotId: string): Promise<BlockedSlot> {
  const salon = await getSalonByOwnerOrThrow(ownerId);

  const [slot] = await db
    .delete(blockedSlots)
    .where(eq(blockedSlots.id, slotId))
    .returning();

  if (!slot || slot.salonId !== salon.id) {
    throw NotFoundError("Band vaqt topilmadi");
  }

  publish({ type: "slot_unblocked", salonId: salon.id, slotId: slot.id });

  return slot;
}
