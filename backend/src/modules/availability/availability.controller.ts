import type { Request, Response } from "express";
import { requireParam, requireQuery } from "../../lib/params";
import { blockSlotSchema } from "../../schemas/availability.schema";
import * as availabilityService from "./availability.service";

/** GET /api/availability/blocked?salonId=... — public */
export async function listBlockedSlots(req: Request, res: Response) {
  const result = await availabilityService.listBlockedSlots(requireQuery(req, "salonId"));
  res.json(result);
}

/** POST /api/availability/block — faqat owner */
export async function blockTimeSlot(req: Request, res: Response) {
  const parsed = blockSlotSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const slot = await availabilityService.blockTimeSlot(req.user!.id, parsed.data);
  res.status(201).json(slot);
}

/** DELETE /api/availability/block/:id — faqat owner, faqat o'z saloni */
export async function unblockTimeSlot(req: Request, res: Response) {
  const slot = await availabilityService.unblockTimeSlot(req.user!.id, requireParam(req, "id"));
  res.json(slot);
}
