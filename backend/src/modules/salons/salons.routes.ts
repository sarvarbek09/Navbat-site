import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { listSalons, getSalon, createSalon, updateSalon } from "./salons.controller";

const router = Router();

router.get("/", listSalons);
router.get("/:id", getSalon);
router.post("/", requireAuth("owner"), createSalon);
router.patch("/:id", requireAuth("owner"), updateSalon);

export default router;
