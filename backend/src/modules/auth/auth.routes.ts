import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { loginOrRegister, logout, me } from "./auth.controller";

const router = Router();

router.post("/session", loginOrRegister); // login yoki register (telefon orqali)
router.post("/logout", logout);
router.get("/me", requireAuth(), me); // joriy login qilgan foydalanuvchini qaytaradi

export default router;
