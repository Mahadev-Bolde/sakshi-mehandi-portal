import React from "react";
import { Trash2 } from "lucide-react";

const GalleryCard = ({
  item,
  index,
  openLightbox,
  user,
  deletingId,
  setImageToDelete,
}) => {
  return (
    <div className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl">
      <button
        onClick={() => openLightbox(index)}
        className="w-full h-full focus:outline-none focus:ring-2 focus:ring-gold">
        <img
          src={item.image}
          alt={`${item.category} mehendi design`}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
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
  );
};

export default GalleryCard;
