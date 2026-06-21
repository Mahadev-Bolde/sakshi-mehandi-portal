import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
  getBookingById,
} from "../controllers/bookingController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= USER ROUTES =================
router.post("/", protect, createBooking);

router.get("/my-bookings", protect, getMyBookings);

// ================= ADMIN ROUTES =================
router.get("/", protect, adminOnly, getAllBookings);

router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

router.delete("/:id", protect, adminOnly, deleteBooking);

router.get("/:id", protect, adminOnly, getBookingById);

export default router;
