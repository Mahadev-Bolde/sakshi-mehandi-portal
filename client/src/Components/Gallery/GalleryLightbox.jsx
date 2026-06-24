import React from "react";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

const GalleryLightbox = ({
  selectedImage,
  closeLightbox,
  goPrev,
  goNext,
  lightboxIndex,
  filteredDesigns,
  user,
  deletingId,
  setImageToDelete,
}) => {
  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={closeLightbox}>
      <div
        className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        {" "}
        <button
          onClick={closeLightbox}
          aria-label="Close image"
          className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 shadow-lg hover:bg-gold transition">
          {" "}
          <X size={20} className="text-charcoal" />{" "}
        </button>
        ```
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
  );
};

export default GalleryLightbox;
