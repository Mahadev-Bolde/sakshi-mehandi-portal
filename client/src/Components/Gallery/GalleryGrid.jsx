import React from "react";
import { ImageOff } from "lucide-react";
import GalleryCard from "./GalleryCard";

const GalleryGrid = ({
  filteredDesigns,
  user,
  deletingId,
  setImageToDelete,
  openLightbox,
  activeCategory,
}) => {
  if (filteredDesigns.length === 0) {
    return (
      <div className="text-center py-20 bg-white/60 rounded-3xl border border-gold/10">
        {" "}
        <ImageOff size={42} className="text-gold mx-auto mb-4" />
        <p className="font-serif text-xl text-burgundy">No designs found</p>
        <p className="text-charcoal/50 text-sm mt-2">
          New {activeCategory !== "All" ? activeCategory : ""} designs will be
          added soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {filteredDesigns.map((item, index) => (
        <GalleryCard
          key={item._id}
          item={item}
          index={index}
          openLightbox={openLightbox}
          user={user}
          deletingId={deletingId}
          setImageToDelete={setImageToDelete}
        />
      ))}{" "}
    </div>
  );
};

export default GalleryGrid;
