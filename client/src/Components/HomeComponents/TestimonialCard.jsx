import React from "react";
import { Quote, Star } from "lucide-react";

const TestimonialCard = ({ t }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gold/10 hover:border-gold/30 relative overflow-hidden">
      {/* Decorative gold gradient overlay - subtle */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-all duration-500"></div>

      {/* Quote Icon */}
      <div className="relative">
        <Quote size={36} className="text-gold/20 mb-4" strokeWidth={1.5} />
      </div>

      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < t.rating ? "text-gold fill-gold" : "text-charcoal/20"
            } transition-colors duration-300`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-charcoal/70 leading-relaxed italic mb-6 relative z-10">
        "{t.text}"
      </p>

      {/* Divider */}
      <div className="w-12 h-0.5 bg-gold/30 rounded-full mb-4"></div>

      {/* Author Name with Image */}
      <div className="flex items-center gap-3">
        {/* Client Image */}
        <img
          src={t.image}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover border border-gold/20"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.target.style.display = "none";
            const parent = e.target.parentElement;
            const fallback = document.createElement("div");
            fallback.className =
              "w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-bold text-sm";
            fallback.textContent = t.name.charAt(0);
            parent.appendChild(fallback);
          }}
        />
        <div>
          <p className="font-bold text-sm text-charcoal">{t.name}</p>
          <p className="text-xs text-charcoal/40">Happy Client</p>
        </div>
      </div>

      {/* Small gold accent bar at bottom */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default TestimonialCard;
