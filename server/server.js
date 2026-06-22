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

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://sakshi-mehandi-portal-frontend.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request origin:", origin);

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/api/test-cors", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CORS is working",
  });
});

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

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
