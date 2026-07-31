import { z } from "zod";

export const createBookingSchema = z.object({
  salonId: z.string().uuid(),
  serviceId: z.string().uuid(),
  date: z.coerce.date(),
});

export const updateBookingSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
