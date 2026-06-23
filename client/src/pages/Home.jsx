import React from "react";
import { Star, Quote } from "lucide-react";

import Hero from "../Components/HomeComponents/Hero";
import About from "../Components/HomeComponents/About";
import FeaturedCard from "../Components/HomeComponents/FeaturedCard";
import Testimonials from "../Components/HomeComponents/Testimonials";
import HomeServicesPreview from "../Components/HomeComponents/HomeServicesPreview"; // Uncomment when ready

const Home = () => {
  return (
    <div className="font-sans text-charcoal bg-ivory overflow-x-hidden">
      <Hero />
      <About />
      <FeaturedCard />

      {/* ===== SERVICES (uncomment when ready) ===== */}
      <HomeServicesPreview />

      {/* ===== TESTIMONIALS ===== */}
      <Testimonials />
    </div>
  );
};

export default Home;
