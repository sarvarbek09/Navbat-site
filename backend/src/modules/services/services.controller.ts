import type { Request, Response } from "express";
import { requireParam, requireQuery } from "../../lib/params";
import { createServiceSchema, updateServiceSchema } from "../../schemas/service.schema";
import * as servicesService from "./services.service";

/** GET /api/services?salonId=... — public */
export async function listServices(req: Request, res: Response) {
  const result = await servicesService.listServicesBySalon(requireQuery(req, "salonId"));
  res.json(result);
}

/** POST /api/services — faqat owner */
export async function createService(req: Request, res: Response) {
  const parsed = createServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const service = await servicesService.createService(req.user!.id, parsed.data);
  res.status(201).json(service);
}

/** PATCH /api/services/:id — faqat o'z xizmati ustidan owner */
export async function updateService(req: Request, res: Response) {
  const parsed = updateServiceSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const service = await servicesService.updateService(req.user!.id, requireParam(req, "id"), parsed.data);
  res.json(service);
}

/** DELETE /api/services/:id — faqat o'z xizmati ustidan owner */
export async function deleteService(req: Request, res: Response) {
  await servicesService.deleteService(req.user!.id, requireParam(req, "id"));
  res.status(204).send();
}
