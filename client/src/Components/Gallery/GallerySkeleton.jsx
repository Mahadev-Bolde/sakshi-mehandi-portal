import React from "react";

const GallerySkeleton = () => {
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
};

export default GallerySkeleton;
