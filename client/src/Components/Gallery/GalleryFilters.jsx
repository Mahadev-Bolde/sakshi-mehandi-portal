import React from "react";
import { Grid3x3 } from "lucide-react";

const GalleryFilters = ({
  filterOptions,
  activeCategory,
  setActiveCategory,
  filteredCount,
  totalCount,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
      {" "}
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
            {cat}{" "}
          </button>
        ))}{" "}
      </div>
      <div className="text-xs text-charcoal/50 flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full border border-gold/10 shadow-sm">
        <Grid3x3 size={14} className="text-gold" />
        <span>
          {filteredCount} of {totalCount} designs
        </span>
      </div>
    </div>
  );
};

export default GalleryFilters;
