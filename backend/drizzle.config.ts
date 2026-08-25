// Drizzle Kit konfiguratsiyasi — `npm run db:generate` / `db:migrate` / `db:studio`
// shu faylga qarab ishlaydi. Next.js ilovasidagi drizzle.config.ts bilan bir xil
// mantiq, faqat schema manzili shu backend papkasi ichiga qarab yozilgan.
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL .env faylida topilmadi (backend/.env ni tekshiring)");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
