// Postgres ulanishi + Drizzle client. Butun loyihada bazaga faqat shu `db`
// obyekti orqali murojaat qilinadi: `import { db } from "../../db/client"`.
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/env";
import * as schema from "./schema";

// `prepare: false` — ba'zi Postgres provayderlari (masalan PgBouncer transaction
// rejimida ishlaydigan hostinglar) prepared statement'larni qo'llamaydi;
// Next.js tarafidagi src/lib/db.ts bilan bir xil sozlama.
const client = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
