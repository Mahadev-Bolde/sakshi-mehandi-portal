import React from "react";
import { Link } from "react-router-dom";
import Mehendi1 from "../../assets/mehendi1.webp"; // 👈 Pexels bridal mehendi image
import Mehendi2 from "../../assets/mehendi2.webp"; // 👈 Pexels bridal mehendi image
import Mehendi3 from "../../assets/mehendi3.webp"; // 👈 Pexels bridal mehendi image
import Mehendi4 from "../../assets/mehendi4.webp"; // 👈 Pexels bridal mehendi image

// Data Arrays with Images
const designs = [
  {
    id: 1,
    name: "Bridal Elegance",
    style: "Traditional",
    image: Mehendi1, // 👈 Pexels bridal mehendi image
  },
  {
    id: 2,
    name: "Arabic Floral",
    style: "Modern",
    image: Mehendi2, // 👈 Pexels bridal mehendi image
  },
  {
    id: 3,
    name: "Mandala Magic",
    style: "Bohemian",
    image: Mehendi3, // 👈 Pexels bridal mehendi image
  },
  {
    id: 4,
    name: "Minimalist Dots",
    style: "Contemporary",
    image: Mehendi4, // 👈 Pexels bridal mehendi image
  },
];

const FeaturedCard = () => {
  return (
    <section id="designs" className="py-20 md:py-32 bg-ivory">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h6 className="text-gold font-semibold tracking-widest uppercase text-sm">
            Portfolio
          </h6>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
            Sakshi's <span className="text-burgundy">Designs</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4">
            Explore our latest masterpieces crafted with love and precision.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {designs.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-burgundy/10 border border-white/50 transition-transform hover:scale-[1.02]">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML += `
                    <div class="w-full h-full bg-gradient-to-br from-terracotta/20 to-gold/10 flex items-center justify-center">
                      <span class="text-charcoal/30 font-serif text-lg">🖌️</span>
                    </div>
                  `;
                }}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-white/70 text-xs">{item.style}</p>
                </div>
              </div>

              {/* Gold accent line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={"/gallery"}
            className="px-8 py-3 border border-gold text-gold rounded-full text-sm font-bold hover:bg-gold hover:text-charcoal transition-all">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCard;
