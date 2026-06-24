// src/pages/Gallery.jsx

import React, {
  useEffect,
  useState,
  useMemo,
  Suspense,
  lazy,
  useCallback,
} from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { filterOptions } from "../constants/galleryConstants";
import useGallery from "../hooks/useGallery";

import toast from "react-hot-toast";
import GalleryHeader from "../Components/Gallery/GalleryHeader";
import GalleryFilters from "../Components/Gallery/GalleryFilters";
const GalleryLightbox = lazy(
  () => import("../Components/Gallery/GalleryLightbox"),
);
import DeleteImageModal from "../Components/Gallery/DeleteImageModal";
import GalleryGrid from "../Components/Gallery/GalleryGrid";
import GallerySkeleton from "../Components/Gallery/GallerySkeleton";

const Gallery = () => {
  const { user } = useAuth();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const {
    designs,
    setDesigns,
    loading,
    deletingId,
    imageToDelete,
    setImageToDelete,
    deleteImage,
  } = useGallery(selectedImage, () => setSelectedImage(null));

  // useEffect(() => {
  //   fetchGallery();
  // }, []);

  const filteredDesigns = useMemo(() => {
    return activeCategory === "All"
      ? designs
      : designs.filter((item) => item.category === activeCategory);
  }, [designs, activeCategory]);

  const openLightbox = useCallback(
    (index) => {
      setLightboxIndex(index);
      setSelectedImage(filteredDesigns[index]);
    },
    [filteredDesigns],
  );

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const goPrev = useCallback(() => {
    if (filteredDesigns.length === 0) return;

    const newIndex =
      (lightboxIndex - 1 + filteredDesigns.length) % filteredDesigns.length;

    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  }, [lightboxIndex, filteredDesigns]);

  const goNext = useCallback(() => {
    if (filteredDesigns.length === 0) return;

    const newIndex = (lightboxIndex + 1) % filteredDesigns.length;

    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  }, [lightboxIndex, filteredDesigns]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, lightboxIndex, filteredDesigns]);

  if (loading) {
    return <GallerySkeleton />;
  }

  return (
    <section className="py-24 md:py-32 bg-ivory min-h-screen relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-burgundy/10 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <GalleryHeader />

        {/* Filters */}
        <GalleryFilters
          filterOptions={filterOptions}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredCount={filteredDesigns.length}
          totalCount={designs.length}
        />

        {/* Gallery Grid */}
        <GalleryGrid
          filteredDesigns={filteredDesigns}
          user={user}
          deletingId={deletingId}
          setImageToDelete={setImageToDelete}
          openLightbox={openLightbox}
          activeCategory={activeCategory}
        />
      </div>

      {/* Lightbox */}
      <Suspense fallback={null}>
        <GalleryLightbox
          selectedImage={selectedImage}
          closeLightbox={closeLightbox}
          goPrev={goPrev}
          goNext={goNext}
          lightboxIndex={lightboxIndex}
          filteredDesigns={filteredDesigns}
          user={user}
          deletingId={deletingId}
          setImageToDelete={setImageToDelete}
        />
      </Suspense>

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteImageModal
        imageToDelete={imageToDelete}
        deletingId={deletingId}
        setImageToDelete={setImageToDelete}
        deleteImage={deleteImage}
      />

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
