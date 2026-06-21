// src/components/HomeComponents/HomeServicesPreview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../assets/services";
import { getIcon } from "../../utils/iconHelpers.jsx";

const HomeServicesPreview = () => {
  const navigate = useNavigate();

  const previewServices = services.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-burgundy/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header – different from full page */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-burgundy/10 text-burgundy rounded-full text-xs font-semibold uppercase tracking-wider border border-burgundy/20">
            ✨ Signature Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4">
            Mehendi <span className="text-burgundy">Experiences</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>
          <p className="text-charcoal/50 mt-4 text-sm max-w-lg mx-auto">
            Discover Sakshi’s most‑loved henna services – each one crafted with
            organic love.
          </p>
        </div>

        {/* Service Cards – minimalist, icon-first */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewServices.map((service) => (
            <div
              key={service.id}
              className="group bg-ivory/50 rounded-3xl p-8 border border-gold/10 hover:border-gold/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              {/* Large Icon */}
              <div className="w-20 h-20 mx-auto rounded-2xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/20">
                <span className="text-3xl">{getIcon(service.icon, 32)}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold mt-4 mb-2">
                {service.title}
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              <div className="flex justify-center gap-2 mb-4">
                {service.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-burgundy/5 text-burgundy text-xs rounded-full border border-burgundy/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-burgundy">{service.price}</span>
                <span className="text-charcoal/40 text-xs flex items-center gap-1">
                  ⏱ {service.duration}
                </span>
              </div>
              <button
                onClick={() => navigate("/booking")}
                className="w-full mt-4 py-2.5 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300">
                Book Now →
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gold/30 text-burgundy font-semibold rounded-full hover:bg-gold hover:text-charcoal transition-all duration-300 hover:border-gold hover:shadow-lg hover:shadow-gold/20">
            Explore All Services
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeServicesPreview;
