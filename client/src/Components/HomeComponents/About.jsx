import { ArrowRight, Heart } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h6 className="text-gold font-semibold tracking-widest uppercase text-sm">
              About Me
            </h6>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
              Where Art <br />{" "}
              <span className="text-burgundy">Meets the Soul</span>
            </h2>
            <div className="w-20 h-1 bg-gold"></div>
            <p className="text-charcoal/70 leading-relaxed">
              Hi, I'm Sakshi Khede — a passionate mehendi artist dedicated to
              preserving the ancient art of henna while infusing it with
              contemporary flair. Every stroke is intentional, every pattern
              tells a story.
            </p>
            <p className="text-charcoal/70 leading-relaxed">
              Using only organic, chemical-free henna, I ensure a rich, dark
              stain that lasts while being gentle on your skin.
            </p>
            <button className="text-burgundy font-semibold flex items-center gap-2 group">
              Read My Story{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] rounded-3xl bg-sage/20 border-2 border-gold/30 flex items-center justify-center shadow-xl">
              <span className="font-serif text-3xl text-charcoal/30">
                [ About Image ]
              </span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-ivory p-4 rounded-xl shadow-2xl border border-gold/10">
              <Heart size={32} className="text-burgundy fill-burgundy/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
