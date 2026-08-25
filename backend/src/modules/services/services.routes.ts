import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { listServices, createService, updateService, deleteService } from "./services.controller";

const router = Router();

router.get("/", listServices); // ?salonId=... talab qilinadi
router.post("/", requireAuth("owner"), createService);
router.patch("/:id", requireAuth("owner"), updateService);
router.delete("/:id", requireAuth("owner"), deleteService);

export default router;
