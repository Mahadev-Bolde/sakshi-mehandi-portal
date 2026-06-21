import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import seedRoutes from "./routes/seedRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Keep this only if you still use local uploads anywhere.
// Cloudinary gallery images do not need this.
app.use("/uploads", express.static("uploads"));

app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/gallery", galleryRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Mehandi Booking API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
