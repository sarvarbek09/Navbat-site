// EXPRESS ILOVASI — barcha middleware va route'lar shu yerda ulanadi.
// server.ts shu app'ni http portda tinglatadi. Bu ikki faylni ataylab
// alohida saqlaymiz: app.ts'ni (masalan avtomatlashtirilgan test yozganda)
// serverni haqiqatan ishga tushirmasdan import qilish mumkin bo'lsin.
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { errorHandler } from "./middleware/error-handler.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import authRoutes from "./modules/auth/auth.routes";
import salonsRoutes from "./modules/salons/salons.routes";
import servicesRoutes from "./modules/services/services.routes";
import bookingsRoutes from "./modules/bookings/bookings.routes";
import availabilityRoutes from "./modules/availability/availability.routes";
import clientsRoutes from "./modules/clients/clients.routes";
import realtimeRoutes from "./modules/realtime/realtime.routes";
import botB2cRoutes from "./modules/bots/bot-b2c.routes";
import botB2bRoutes from "./modules/bots/bot-b2b.routes";

export const app = express();

// --- Global middleware -----------------------------------------------------
// credentials: true — sessiya cookie'si cross-origin (frontend boshqa portda/
// domenda) so'rovlarda ham yuborilishi/o'qilishi uchun shart. Shu bilan birga
// origin ANIQ ko'rsatilishi kerak ("*" cookie bilan ishlamaydi).
app.use(cors({ origin: env.FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// --- Health check (monitoring/uptime uchun) --------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "navbat-backend" });
});

// --- Domen bo'yicha route'lar ------------------------------------------------
// Har bir modul o'zining routes/controller/service uchtasiga ega —
// backend-lead shu ro'yxatdagi bitta qatorni (bitta papkani) bitta odamga
// vazifa qilib berishi mumkin.
app.use("/api/auth", authRoutes);
app.use("/api/salons", salonsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/realtime", realtimeRoutes);
app.use("/api/bot-b2c", botB2cRoutes);
app.use("/api/bot-b2b", botB2bRoutes);

// --- Eng oxirida: 404, keyin global xato ushlagich --------------------------
app.use(notFoundHandler);
app.use(errorHandler);
