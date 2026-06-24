import { useState, useEffect, useCallback } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

const useGallery = (filteredDesigns, selectedImage, closeLightbox) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);

  // FETCH GALLERY
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await API.get("/gallery");
      if (res.data.success) {
        setDesigns(res.data.images || []);
      }
    } catch (error) {
      console.log("Gallery fetch error:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // DELETE IMAGE
  const deleteImage = async () => {
    if (!imageToDelete) return;
    try {
      setDeletingId(imageToDelete._id);

      const res = await API.delete(`/gallery/${imageToDelete._id}`);

      if (res.data.success) {
        toast.success("Image deleted successfully");

        setDesigns((prev) =>
          prev.filter((img) => img._id !== imageToDelete._id),
        );

        if (selectedImage?._id === imageToDelete._id) {
          closeLightbox();
        }

        setImageToDelete(null);
      }
    } catch (error) {
      console.log("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    designs,
    setDesigns,
    loading,
    deletingId,
    imageToDelete,
    setImageToDelete,
    deleteImage,
  };
};

export default useGallery;
