import { z } from "zod";

export const createClientSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta harf"),
  phone: z.string().regex(/^\+998\d{9}$/, "Telefon: +998XXXXXXXXX"),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
