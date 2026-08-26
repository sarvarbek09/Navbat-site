// Bu fayl process.env dagi barcha muhit o'zgaruvchilarini Zod bilan tekshiradi.
// Next.js ilovasidagi src/config/env.ts dan farqli o'laroq, bu yerdagi getEnv()
// SERVER ISHGA TUSHGANDA DARHOL chaqiriladi (server.ts ning eng boshida) —
// ya'ni DATABASE_URL yoki boshqa majburiy o'zgaruvchi noto'g'ri/yo'q bo'lsa,
// server umuman ishga tushmaydi va sabab konsolda darhol ko'rinadi.
// Yangi muhit o'zgaruvchisi qo'shsangiz — avval shu yerga qo'shing, keyin kodda ishlating.
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL kerak (.env faylini tekshiring)"),
  // Vergul bilan ajratilgan ro'yxat (masalan: "http://localhost:3000,https://navbat-site.vercel.app") —
  // CORS shu ro'yxatdagi ISTALGAN origin'dan kelgan so'rovga ruxsat beradi.
  FRONTEND_ORIGIN: z
    .string()
    .min(1)
    .default("http://localhost:3000,https://navbat-site.vercel.app")
    .transform((value) => value.split(",").map((origin) => origin.trim())),
  BOT_B2C_TOKEN: z.string().optional(),
  BOT_B2B_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("❌ Muhit o'zgaruvchilari noto'g'ri:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables — backend/.env faylini tekshiring");
  }
  return parsed.data;
}

export const env = loadEnv();
export type Env = typeof env;
