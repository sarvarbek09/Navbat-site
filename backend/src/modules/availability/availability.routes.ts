import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { listBlockedSlots, blockTimeSlot, unblockTimeSlot } from "./availability.controller";

const router = Router();

router.get("/blocked", listBlockedSlots); // ?salonId=...
router.post("/block", requireAuth("owner"), blockTimeSlot);
router.delete("/block/:id", requireAuth("owner"), unblockTimeSlot);

export default router;
