import type { Request, Response } from "express";
import { requireParam } from "../../lib/params";
import { createBookingSchema, updateBookingStatusSchema } from "../../schemas/booking.schema";
import * as bookingsService from "./bookings.service";

/** POST /api/bookings — faqat client */
export async function createBooking(req: Request, res: Response) {
  const parsed = createBookingSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const booking = await bookingsService.createBooking(req.user!.id, parsed.data);
  res.status(201).json(booking);
}

/** PATCH /api/bookings/:id/status — faqat owner */
export async function updateBookingStatus(req: Request, res: Response) {
  const parsed = updateBookingStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten().fieldErrors });
    return;
  }

  const booking = await bookingsService.updateBookingStatus(
    req.user!.id,
    requireParam(req, "id"),
    parsed.data
  );
  res.json(booking);
}

/** POST /api/bookings/:id/cancel — faqat client, faqat o'z bronini */
export async function cancelBooking(req: Request, res: Response) {
  const booking = await bookingsService.cancelBooking(req.user!.id, requireParam(req, "id"));
  res.json(booking);
}

/** GET /api/bookings/mine — faqat client */
export async function getMyBookings(req: Request, res: Response) {
  const result = await bookingsService.getMyBookings(req.user!.id);
  res.json(result);
}

/** GET /api/bookings/salon/:salonId — faqat owner, faqat o'z saloni */
export async function getSalonPendingBookings(req: Request, res: Response) {
  const result = await bookingsService.getSalonPendingBookings(req.user!.id, requireParam(req, "salonId"));
  res.json(result);
}
