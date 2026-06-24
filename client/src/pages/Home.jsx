import React, { lazy, Suspense } from "react";
import { Star, Quote } from "lucide-react";

import Hero from "../Components/HomeComponents/Hero";
import About from "../Components/HomeComponents/About";

const FeaturedCard = lazy(
  () => import("../Components/HomeComponents/FeaturedCard"),
);
const HomeServicesPreview = lazy(
  () => import("../Components/HomeComponents/HomeServicesPreview"),
);
const Testimonials = lazy(
  () => import("../Components/HomeComponents/Testimonials"),
);

const Home = () => {
  return (
    <div className="font-sans text-charcoal bg-ivory overflow-x-hidden">
      <Hero />
      <About />
      <Suspense fallback={<div>Loading content...</div>}>
        <FeaturedCard />
        <HomeServicesPreview />
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home;
