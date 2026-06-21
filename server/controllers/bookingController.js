import Booking from "../models/Booking.js";
import { sendMail } from "../utils/sendMail.js";

/* -------------------------------
   CREATE BOOKING
-------------------------------- */
export const createBooking = async (req, res) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    const booking = await Booking.create({
      ...req.body,
      user: req.user.id,
      // status: "pending",
    });

    /* ---------------- ADMIN EMAIL ---------------- */
    try {
      await sendMail({
        to: process.env.EMAIL_USER,
        subject: "🎉 New Mehendi Booking Received",
        html: `
          <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px;">
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

              <div style="background:#111827;color:#fff;padding:20px;text-align:center;">
                <h2 style="margin:0;">New Booking Received 🎉</h2>
                <p style="margin:5px 0 0;font-size:13px;color:#d1d5db;">Mehendi Booking Dashboard</p>
              </div>

              <div style="padding:20px;">
                <h3>Customer Details</h3>

                <p><b>Name:</b> ${booking.name}</p>
                <p><b>Email:</b> ${booking.email}</p>
                <p><b>Phone:</b> ${booking.phone}</p>

                <hr />

                <p><b>Service:</b> ${booking.service}</p>
                <p><b>Date:</b> ${booking.date}</p>
                <p><b>Time:</b> ${booking.time}</p>

                <hr />

                <p><b>Message:</b> ${booking.message || "N/A"}</p>
              </div>

            </div>
          </div>
        `,
      });
    } catch (err) {
      console.log("Admin email failed:", err.message);
    }

    /* ---------------- USER EMAIL (PENDING) ---------------- */
    try {
      await sendMail({
        to: booking.email,
        subject: "🎉 We Received Your Mehendi Booking",
        html: `
          <div style="font-family: Arial; padding:20px;">
            <h2>Thank you for your booking 💚</h2>

            <p>Hi ${booking.name},</p>

            <p>Your booking is <b>pending confirmation</b>.</p>

            <h3>📌 Details</h3>
            <p><b>Service:</b> ${booking.service}</p>
            <p><b>Date:</b> ${booking.date}</p>
            <p><b>Time:</b> ${booking.time}</p>

            <p>We will confirm you shortly.</p>

            <p>– Sakshi Mehendi Team</p>
          </div>
        `,
      });
    } catch (err) {
      console.log("User email failed:", err.message);
    }

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------
   GET ALL BOOKINGS
-------------------------------- */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------
   UPDATE STATUS (ADMIN)
-------------------------------- */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ["Pending", "Confirmed", "Cancelled", "Completed"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = status;
    await booking.save();

    /* ---------------- CONFIRMED EMAIL ---------------- */
    if (status === "Confirmed") {
      try {
        await sendMail({
          to: booking.email,
          subject: "🎉 Your Mehendi Booking is Confirmed!",
          html: `
            <div style="font-family:Arial;padding:20px;">
              <h2 style="color:green;">Booking Confirmed 💚</h2>

              <p>Hi ${booking.name},</p>

              <p>Your booking is <b>confirmed</b>.</p>

              <h3>📅 Details</h3>
              <p><b>Service:</b> ${booking.service}</p>
              <p><b>Date:</b> ${booking.date}</p>
              <p><b>Time:</b> ${booking.time}</p>

              <p>We look forward to serving you 💛</p>

              <p>– Sakshi Mehendi Team</p>
            </div>
          `,
        });
      } catch (err) {
        console.log("Confirmation email failed:", err.message);
      }
    }

    /* ---------------- CANCELLED EMAIL ---------------- */
    if (status === "Cancelled") {
      try {
        await sendMail({
          to: booking.email,
          subject: "❌ Your Mehendi Booking is Cancelled",
          html: `
            <div style="font-family:Arial;padding:20px;">
              <h2 style="color:red;">Booking Cancelled ❌</h2>

              <p>Hi ${booking.name},</p>

              <p>Your booking has been cancelled.</p>

              <p>If this is unexpected, contact us.</p>

              <p>– Sakshi Mehendi Team</p>
            </div>
          `,
        });
      } catch (err) {
        console.log("Cancel email failed:", err.message);
      }
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------
   DELETE BOOKING
-------------------------------- */
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------
   GET SINGLE BOOKING
-------------------------------- */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------
   GET USER BOOKINGS
-------------------------------- */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
