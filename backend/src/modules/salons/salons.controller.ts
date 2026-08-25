import type { Request, Response } from "express";
import { requireParam } from "../../lib/params";
import { createSalonSchema, updateSalonSchema } from "../../schemas/salon.schema";
import * as salonsService from "./salons.service";

/** GET /api/salons — hammaga ochiq */
export async function listSalons(_req: Request, res: Response) {
  const result = await salonsService.listSalons();
  res.json(result);
}

/** GET /api/salons/:id — hammaga ochiq */
export async function getSalon(req: Request, res: Response) {
  const salon = await salonsService.getSalonById(requireParam(req, "id"));
  res.json(salon);
}

/** POST /api/salons — faqat owner, requireAuth("owner") middleware'dan keyin ishlaydi */
export async function createSalon(req: Request, res: Response) {
  const parsed = createSalonSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const salon = await salonsService.createSalon(req.user!.id, parsed.data);
  res.status(201).json(salon);
}

/** PATCH /api/salons/:id — faqat o'z saloni ustidan owner */
export async function updateSalon(req: Request, res: Response) {
  const parsed = updateSalonSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const salon = await salonsService.updateSalon(req.user!.id, requireParam(req, "id"), parsed.data);
  res.json(salon);
}
