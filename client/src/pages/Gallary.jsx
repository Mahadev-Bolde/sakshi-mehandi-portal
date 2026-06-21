// src/pages/Gallery.jsx

import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  ImageOff,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

const categories = ["Bridal", "Arabic", "Traditional"];
const filterOptions = ["All", ...categories];

const Gallery = () => {
  const { user } = useAuth();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  const filteredDesigns =
    activeCategory === "All"
      ? designs
      : designs.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedImage(filteredDesigns[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goPrev = () => {
    if (filteredDesigns.length === 0) return;

    const newIndex =
      (lightboxIndex - 1 + filteredDesigns.length) % filteredDesigns.length;

    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  };

  const goNext = () => {
    if (filteredDesigns.length === 0) return;

    const newIndex = (lightboxIndex + 1) % filteredDesigns.length;

    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  };

  const deleteImage = async () => {
    if (!imageToDelete) return;

    try {
      setDeletingId(imageToDelete._id);

      const res = await API.delete(`/gallery/${imageToDelete._id}`);

      if (res.data.success) {
        toast.success("Image deleted successfully");

        setDesigns((previousDesigns) =>
          previousDesigns.filter((image) => image._id !== imageToDelete._id),
        );

        if (selectedImage?._id === imageToDelete._id) {
          closeLightbox();
        }

        setImageToDelete(null);
      }
    } catch (error) {
      console.log("Delete gallery image error:", error);

      toast.error(error.response?.data?.message || "Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

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
    return (
      <section className="min-h-screen bg-ivory pt-28 px-4 md:px-8">
        <div className="container mx-auto animate-pulse">
          <div className="mx-auto h-8 w-52 bg-gold/10 rounded-full mb-5"></div>
          <div className="mx-auto h-12 w-80 max-w-full bg-burgundy/10 rounded-xl mb-4"></div>
          <div className="mx-auto h-4 w-96 max-w-full bg-charcoal/10 rounded mb-12"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-white border border-gold/10"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-ivory min-h-screen relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-burgundy/10 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold/50"></span>

            <h6 className="text-gold font-semibold tracking-[0.25em] uppercase text-sm">
              Sakshi&apos;s Portfolio
            </h6>

            <span className="w-12 h-px bg-gold/50"></span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
            Mehendi <span className="text-burgundy">Gallery</span>
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>

          <p className="text-charcoal/60 mt-4 text-sm leading-relaxed">
            Explore a curated collection of Sakshi&apos;s finest henna
            creations, crafted with care for every special occasion.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {filterOptions.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-burgundy text-white shadow-lg shadow-burgundy/20"
                    : "bg-white/80 text-charcoal/60 border border-gold/20 hover:bg-gold/10 hover:text-burgundy"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-charcoal/50 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-gold/10 shadow-sm">
            <Grid3x3 size={14} className="text-gold" />

            <span>
              {filteredDesigns.length} of {designs.length} designs
            </span>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredDesigns.map((item, index) => (
              <div
                key={item._id}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
                <button
                  onClick={() => openLightbox(index)}
                  className="w-full h-full focus:outline-none focus:ring-2 focus:ring-gold">
                  <img
                    src={item.image}
                    alt={`${item.category} mehendi design`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x600/f7f0e8/6b1f2a?text=Mehendi+Design";
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                      {item.category}
                    </span>
                  </div>
                </button>

                {/* ADMIN DELETE BUTTON */}
                {user?.role === "admin" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageToDelete(item);
                    }}
                    disabled={deletingId === item._id}
                    title="Delete image"
                    className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110 transition-all disabled:opacity-70">
                    {deletingId === item._id ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 size={17} />
                    )}
                  </button>
                )}

                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-gold transition-all duration-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 rounded-3xl border border-gold/10">
            <ImageOff size={42} className="text-gold mx-auto mb-4" />

            <p className="font-serif text-xl text-burgundy">No designs found</p>

            <p className="text-charcoal/50 text-sm mt-2">
              New {activeCategory !== "All" ? activeCategory : ""} designs will
              be added soon.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}>
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setImageToDelete(item);
            }}>
            <button
              onClick={closeLightbox}
              aria-label="Close image"
              className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 shadow-lg hover:bg-gold transition">
              <X size={20} className="text-charcoal" />
            </button>

            {/* ADMIN DELETE BUTTON IN LIGHTBOX */}
            {user?.role === "admin" && (
              <button
                onClick={() => setImageToDelete(selectedImage)}
                disabled={deletingId === selectedImage._id}
                className="absolute top-4 right-16 z-20 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition disabled:opacity-70"
                title="Delete image">
                {deletingId === selectedImage._id ? (
                  <span className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            )}

            <div className="relative bg-charcoal">
              <img
                src={selectedImage.image}
                alt={`${selectedImage.category} mehendi design`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-sm font-semibold uppercase tracking-wider">
                      {selectedImage.category}
                    </p>

                    <p className="text-white/70 text-xs mt-1">
                      Use arrow keys to explore designs
                    </p>
                  </div>

                  <span className="text-white/60 text-xs">
                    {lightboxIndex + 1} / {filteredDesigns.length}
                  </span>
                </div>
              </div>
            </div>

            {filteredDesigns.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-gold rounded-full p-2.5 shadow-lg transition">
                  <ChevronLeft size={24} className="text-charcoal" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-gold rounded-full p-2.5 shadow-lg transition">
                  <ChevronRight size={24} className="text-charcoal" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {imageToDelete && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => {
            if (!deletingId) setImageToDelete(null);
          }}>
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-7 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
                <AlertTriangle size={30} className="text-red-500" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Delete Gallery Image?
              </h2>

              <p className="text-charcoal/60 text-sm leading-relaxed mt-3">
                This image will be permanently deleted from your gallery and
                Cloudinary. This action cannot be undone.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-gold/20">
                <img
                  src={imageToDelete.image}
                  alt="Image to delete"
                  className="w-full h-44 object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-7">
                <button
                  onClick={() => setImageToDelete(null)}
                  disabled={Boolean(deletingId)}
                  className="py-3 rounded-full border border-gold/30 text-charcoal font-semibold hover:bg-gold/10 transition disabled:opacity-50">
                  Cancel
                </button>

                <button
                  onClick={deleteImage}
                  disabled={Boolean(deletingId)}
                  className="py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 shadow-lg shadow-red-500/20 transition disabled:opacity-70 flex items-center justify-center gap-2">
                  {deletingId ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={17} />
                      Delete Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
