import { z } from "zod";

export const createServiceSchema = z.object({
  salonId: z.string().uuid(),
  name: z.string().min(2, "Xizmat nomi kamida 2 ta harf"),
  price: z.coerce.number().int().nonnegative("Narx manfiy bo'lmasin"),
  duration: z.coerce.number().int().positive("Davomiylik (daqiqa) musbat bo'lishi kerak"),
});

export const updateServiceSchema = createServiceSchema
  .omit({ salonId: true })
  .partial();

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
