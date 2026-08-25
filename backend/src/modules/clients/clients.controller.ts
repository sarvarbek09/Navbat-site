import type { Request, Response } from "express";
import { requireParam } from "../../lib/params";
import { createClientSchema } from "../../schemas/client.schema";
import * as clientsService from "./clients.service";

/** GET /api/clients — faqat owner */
export async function getClients(req: Request, res: Response) {
  const result = await clientsService.getClients(req.user!.id);
  res.json(result);
}

/** GET /api/clients/:id/bookings — faqat owner */
export async function getClientBookings(req: Request, res: Response) {
  const result = await clientsService.getClientBookings(requireParam(req, "id"));
  res.json(result);
}

/** POST /api/clients — faqat owner */
export async function createClient(req: Request, res: Response) {
  const parsed = createClientSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const client = await clientsService.createClient(parsed.data);
  res.status(201).json(client);
}
