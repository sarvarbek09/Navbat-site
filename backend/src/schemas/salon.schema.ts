import { z } from "zod";

export const createSalonSchema = z.object({
  name: z.string().min(2, "Salon nomi kamida 2 ta harf"),
  address: z.string().optional(),
});

export const updateSalonSchema = createSalonSchema.partial();

export type CreateSalonInput = z.infer<typeof createSalonSchema>;
export type UpdateSalonInput = z.infer<typeof updateSalonSchema>;
