import React from "react";
import TestimonialCard from "./TestimonialCard";
import testimonials from "../../assets/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 bg-burgundy/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h6 className="text-gold font-semibold tracking-widest uppercase text-sm">
            Testimonials
          </h6>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-2">
            What Clients Say <span className="text-burgundy">About Sakshi</span>
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4">
            Real stories from real people who trusted Sakshi with their special
            moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
