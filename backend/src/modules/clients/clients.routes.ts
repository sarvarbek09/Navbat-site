import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { getClients, getClientBookings, createClient } from "./clients.controller";

const router = Router();

router.get("/", requireAuth("owner"), getClients);
router.get("/:id/bookings", requireAuth("owner"), getClientBookings);
router.post("/", requireAuth("owner"), createClient);

export default router;
