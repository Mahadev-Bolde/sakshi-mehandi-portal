import React from "react";

const GalleryHeader = () => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      {" "}
      <div className="flex items-center justify-center gap-4 mb-4">
        {" "}
        <span className="w-12 h-px bg-gold/50"></span>
        <h6 className="text-gold font-semibold tracking-[0.25em] uppercase text-sm">
          Sakshi&apos;s Portfolio
        </h6>
        <span className="w-12 h-px bg-gold/50"></span>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
        Mehendi <span className="text-burgundy">Gallery</span>
      </h1>
      <div className="w-20 h-1 bg-linear-to-r from-gold to-burgundy mx-auto mt-4"></div>
      <p className="text-charcoal/60 mt-4 text-sm leading-relaxed">
        Explore a curated collection of Sakshi&apos;s finest henna creations,
        crafted with care for every special occasion.
      </p>
    </div>
  );
};

export default GalleryHeader;
