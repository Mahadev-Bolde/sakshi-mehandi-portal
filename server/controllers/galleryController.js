import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// Upload gallery image
export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const category = req.body.category || "Bridal";

    const newImage = await Gallery.create({
      image: req.file.path,
      publicId: req.file.filename,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.log("GALLERY UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
};

// Get all gallery images
export const getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.log("GET GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
    });
  }
};

// Delete one gallery image
export const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
      });
    }

    await Gallery.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log("DELETE GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete image",
    });
  }
};

// Delete all gallery images
export const deleteAllGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find();

    const publicIds = images
      .filter((image) => image.publicId)
      .map((image) => image.publicId);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds, {
        resource_type: "image",
      });
    }

    await Gallery.deleteMany({});

    return res.status(200).json({
      success: true,
      message: "All gallery images deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ALL GALLERY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete all gallery images",
    });
  }
};
