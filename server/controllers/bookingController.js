import Booking from "../models/Booking.js";
import { sendMail } from "../utils/sendMail.js";

/* -------------------------------
   CREATE BOOKING
-------------------------------- */
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      user: req.user.id,
      status: "Pending",
    });

    // Return response immediately so frontend does not wait for email
    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully",
      booking,
    });

    // Send email ONLY to admin in background
    sendMail({
      to: process.env.EMAIL_USER,
      subject: "New Mehendi Booking Received",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>New Booking Received</h2>

          <h3>Customer Details</h3>
          <p><b>Name:</b> ${booking.name}</p>
          <p><b>Email:</b> ${booking.email}</p>
          <p><b>Phone:</b> ${booking.phone}</p>

          <hr />

          <h3>Booking Details</h3>
          <p><b>Service:</b> ${booking.service}</p>
          <p><b>Date:</b> ${booking.date}</p>
          <p><b>Time:</b> ${booking.time}</p>
          <p><b>Message:</b> ${booking.message || "No special request"}</p>

          <p>Please open the admin dashboard and confirm or cancel this booking.</p>
        </div>
      `,
    })
      .then(() => console.log("Admin booking email sent"))
      .catch((err) =>
        console.error("Admin booking email failed:", err.message),
      );
  } catch (error) {
    console.error("Create booking error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to create booking",
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

    const oldStatus = booking.status;
    booking.status = status;
    await booking.save();

    // Respond immediately — do not make frontend wait for email
    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });

    // Do not send duplicate email if admin clicks same status again
    if (oldStatus === status) return;

    if (status === "Confirmed") {
      sendMail({
        to: booking.email,
        subject: "Your Mehendi Booking is Confirmed",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h2 style="color:green;">Booking Confirmed</h2>

            <p>Hi ${booking.name},</p>

            <p>Your mehendi booking has been <b>confirmed</b>.</p>

            <h3>Booking Details</h3>
            <p><b>Service:</b> ${booking.service}</p>
            <p><b>Date:</b> ${booking.date}</p>
            <p><b>Time:</b> ${booking.time}</p>

            <p>We look forward to serving you.</p>
            <p>— Sakshi Mehendi Team</p>
          </div>
        `,
      })
        .then(() => console.log("Confirmation email sent to user"))
        .catch((err) =>
          console.error("Confirmation email failed:", err.message),
        );
    }

    if (status === "Cancelled") {
      sendMail({
        to: booking.email,
        subject: "Update on Your Mehendi Booking",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;">
            <h2 style="color:#b91c1c;">Booking Cancelled</h2>

            <p>Hi ${booking.name},</p>

            <p>Unfortunately, your mehendi booking has been <b>cancelled</b>.</p>

            <h3>Booking Details</h3>
            <p><b>Service:</b> ${booking.service}</p>
            <p><b>Date:</b> ${booking.date}</p>
            <p><b>Time:</b> ${booking.time}</p>

            <p>If you have questions, please contact us.</p>
            <p>— Sakshi Mehendi Team</p>
          </div>
        `,
      })
        .then(() => console.log("Cancellation email sent to user"))
        .catch((err) =>
          console.error("Cancellation email failed:", err.message),
        );
    }
  } catch (error) {
    console.error("Update booking status error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update booking status",
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
