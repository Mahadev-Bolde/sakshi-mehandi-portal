import express from "express";
import {
  uploadGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
  deleteAllGalleryImages,
} from "../controllers/galleryController.js";
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getGalleryImages);

router.post(
  "/upload",
  protect,
  adminOnly,
  cloudinaryUpload.single("image"),
  uploadGalleryImage,
);

router.delete("/all", protect, adminOnly, deleteAllGalleryImages);

router.delete("/:id", protect, adminOnly, deleteGalleryImage);

export default router;
