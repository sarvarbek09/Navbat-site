import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import {
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getMyBookings,
  getSalonPendingBookings,
} from "./bookings.controller";

const router = Router();

// DIQQAT: aniq path'lar ("/mine", "/salon/:salonId") "/:id" kabi dinamik
// path'lardan OLDIN turishi kerak, aks holda Express ularni ":id" ga mos deb topadi.
router.get("/mine", requireAuth("client"), getMyBookings);
router.get("/salon/:salonId", requireAuth("owner"), getSalonPendingBookings);

router.post("/", requireAuth("client"), createBooking);
router.patch("/:id/status", requireAuth("owner"), updateBookingStatus);
router.post("/:id/cancel", requireAuth("client"), cancelBooking);

export default router;
