"use server";

import { db } from "@/lib/db";
import { blockedSlots, salons } from "@/lib/schema";
import { requireAuth } from "@/lib/auth";
import { publish } from "@/lib/realtime";
import { blockSlotSchema } from "@/schemas/availability";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function getOwnerSalon(ownerId: string) {
  const [salon] = await db
    .select()
    .from(salons)
    .where(eq(salons.ownerId, ownerId))
    .limit(1);

  if (!salon) throw new Error("Salon topilmadi");
  return salon;
}

export async function blockTimeSlot(formData: FormData) {
  const session = await requireAuth("owner");
  const salon = await getOwnerSalon(session.id);

  const parsed = blockSlotSchema.safeParse({
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
    reason: formData.get("reason") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const [slot] = await db
    .insert(blockedSlots)
    .values({
      salonId: salon.id,
      startTime: parsed.data.startTime,
      endTime: parsed.data.endTime,
      reason: parsed.data.reason,
    })
    .returning();

  publish({
    type: "slot_blocked",
    salonId: salon.id,
    slotId: slot.id,
    data: { startTime: slot.startTime, endTime: slot.endTime },
  });

  revalidatePath("/schedule");
  return { data: slot };
}

export async function unblockTimeSlot(slotId: string) {
  const session = await requireAuth("owner");
  const salon = await getOwnerSalon(session.id);

  const [slot] = await db
    .delete(blockedSlots)
    .where(eq(blockedSlots.id, slotId))
    .returning();

  if (!slot || slot.salonId !== salon.id) {
    return { error: "Slot topilmadi" };
  }

  publish({
    type: "slot_unblocked",
    salonId: salon.id,
    slotId: slot.id,
  });

  revalidatePath("/schedule");
  return { data: slot };
}
