import { z } from "zod";

export const blockSlotSchema = z
  .object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    reason: z.string().optional(),
  })
  .refine((d) => d.endTime > d.startTime, {
    message: "Tugash vaqti boshlanishdan keyin bo'lishi kerak",
    path: ["endTime"],
  });

export type BlockSlotInput = z.infer<typeof blockSlotSchema>;
