// src/components/Hero.jsx

import React, { useEffect, useRef } from "react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import mehendiVideo from "../../assets/mehendi-hero.mp4";
// 1. IMPORT A BACKUP FALLBACK IMAGE FOR MOBILE LOW-POWER MODES
import heroFallback from "../../assets/mehendi1.webp";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Unify the playback rate inside the React mount effect
      videoRef.current.playbackRate = 0.4;
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-black">
      {/* Full Background Video with explicit mobile attributes and fallback image */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true" // Extra safety configuration for older iOS devices
        preload="auto"
        poster={heroFallback} // 2. Displays instantly while video downloads or if mobile autoplay is blocked
        className="absolute inset-0 w-full h-full object-cover object-center" // 3. Forces the cropping focus to stay anchored directly in the middle
      >
        <source src={mehendiVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 lg:via-black/60 to-transparent"></div>

      {/* Premium Golden Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-burgundy/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-20 relative z-10">
        <div className="max-w-3xl text-center lg:text-left space-y-6">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 bg-white/10 text-gold rounded-full text-xs font-semibold uppercase tracking-wider border border-gold/40 backdrop-blur-md">
            ✨ Premium Henna Artistry
          </span>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            Elegance <br />
            <span className="text-gold">Meets Tradition</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
            Crafting intricate, lasting memories with natural henna. Exclusively
            for the modern bride and trendsetter.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <Link
              to="/booking"
              className="btn-gold px-8 py-4 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 justify-center hover:scale-105 transition-transform">
              Book Your Session <ArrowRight size={18} />
            </Link>

            <Link
              to="/gallery"
              className="px-8 py-4 rounded-full font-bold text-sm border border-white/50 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              <Play size={16} fill="currentColor" />
              View Gallery
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 justify-center lg:justify-start">
            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">
                3.5+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70">
                Years Exp
              </span>
            </div>

            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">
                66+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70">
                Happy Brides
              </span>
            </div>

            <div>
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-gold">
                4.6★
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70">
                Rating
              </span>
            </div>
          </div>

          {/* Trust Row */}
          <div className="flex flex-wrap gap-4 sm:gap-5 pt-4 text-white/70 text-xs justify-center lg:justify-start">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold" />
              100% Natural Henna
            </span>

            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-gold" />
              Bridal & Traditional Designs
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Fade - 4. Set "from-" color to perfectly match your website's primary body background color */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent pointer-events-none"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none hidden sm:flex">
        <span className="text-white/60 text-[9px] tracking-[0.25em] uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
