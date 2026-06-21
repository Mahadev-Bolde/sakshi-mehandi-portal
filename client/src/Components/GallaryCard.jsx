// src/pages/Gallery.jsx
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react";

// ===== CURATED MEHENDI IMAGES (10 unique, repeated across 3 categories) =====
const mehendiImages = [
  "https://images.pexels.com/photos/31032216/pexels-photo-31032216.jpeg",
  "https://images.pexels.com/photos/5433583/pexels-photo-5433583.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  "https://images.pexels.com/photos/11019293/pexels-photo-11019293.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  "https://images.pexels.com/photos/30707334/pexels-photo-30707334.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  "https://images.pexels.com/photos/29743625/pexels-photo-29743625.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  "https://images.pexels.com/photos/17343894/pexels-photo-17343894.jpeg",
  "https://images.pexels.com/photos/32010607/pexels-photo-32010607.jpeg",
  "https://images.pexels.com/photos/19590218/pexels-photo-19590218.jpeg",
  "https://images.pexels.com/photos/35500950/pexels-photo-35500950.jpeg",
  "https://images.pexels.com/photos/4019855/pexels-photo-4019855.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
];

// Build the 30‑entry dataset (10 per category)
const categories = ["Bridal", "Arabic", "Traditional"];
const designs = [];
let id = 1;
categories.forEach((cat) => {
  mehendiImages.forEach((img) => {
    designs.push({ id: id++, image: img, category: cat });
  });
});

// Filter options
const filterOptions = ["All", ...categories];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null); // for lightbox
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter logic
  const filteredDesigns =
    activeCategory === "All"
      ? designs
      : designs.filter((item) => item.category === activeCategory);

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setSelectedImage(filteredDesigns[index]);
  };

  const closeLightbox = () => setSelectedImage(null);

  const goPrev = () => {
    const newIndex =
      (lightboxIndex - 1 + filteredDesigns.length) % filteredDesigns.length;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  };

  const goNext = () => {
    const newIndex = (lightboxIndex + 1) % filteredDesigns.length;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredDesigns[newIndex]);
  };

  // Keyboard events
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, lightboxIndex, filteredDesigns]);

  return (
    <section className="py-24 md:py-32 bg-ivory min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h6 className="text-gold font-semibold tracking-widest uppercase text-sm">
            Sakshi's Portfolio
          </h6>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
            Mehendi <span className="text-burgundy">Gallery</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4 text-sm">
            Explore a curated collection of her finest henna creations.
          </p>
        </div>

        {/* Filter + Counter */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-3">
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
          <div className="text-xs text-charcoal/40 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-gold/10">
            <Grid3x3 size={14} />
            <span>
              {filteredDesigns.length} of {designs.length} designs
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDesigns.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/50 cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-2xl"
              onClick={() => openLightbox(index)}>
              <img
                src={item.image}
                alt={`Mehendi design - ${item.category}`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  const parent = e.target.parentElement;
                  parent.className =
                    "relative aspect-square rounded-2xl bg-gradient-to-br from-burgundy/10 to-gold/10 flex items-center justify-center";
                  parent.innerHTML = `
                    <span class="text-charcoal/20 font-serif text-lg">🖌️</span>
                  `;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-gold transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-16">
            <p className="text-charcoal/40 text-sm">
              No designs found in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* ===== LIGHTBOX MODAL ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}>
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition">
              <X size={20} className="text-charcoal" />
            </button>
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.category}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {selectedImage.category} • Design #{selectedImage.id}
                    </p>
                    <p className="text-white/70 text-xs">
                      Click outside to close
                    </p>
                  </div>
                  <span className="text-white/50 text-xs">
                    {lightboxIndex + 1} / {filteredDesigns.length}
                  </span>
                </div>
              </div>
            </div>
            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition">
              <ChevronLeft size={24} className="text-charcoal" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition">
              <ChevronRight size={24} className="text-charcoal" />
            </button>
          </div>
        </div>
      )}

      {/* Animations (add to global CSS or inline) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
