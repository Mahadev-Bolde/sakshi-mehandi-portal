import React, { lazy, Suspense } from "react";
import { Star, Quote } from "lucide-react";

const Hero = lazy(() => import("../Components/HomeComponents/Hero"));
const About = lazy(() => import("../Components/HomeComponents/About"));
const FeaturedCard = lazy(
  () => import("../Components/HomeComponents/FeaturedCard"),
);
const Testimonials = lazy(
  () => import("../Components/HomeComponents/Testimonials"),
);
const HomeServicesPreview = lazy(
  () => import("../Components/HomeComponents/HomeServicesPreview"),
);

const Home = () => {
  return (
    <div className="font-sans text-charcoal bg-ivory overflow-x-hidden">
      <Suspense fallback={<p>Loading Hero...</p>}>
        <Hero />
      </Suspense>

      <Suspense fallback={<p>Loading About...</p>}>
        <About />
      </Suspense>

      <Suspense fallback={<p>Loading Services...</p>}>
        <HomeServicesPreview />
      </Suspense>

      <Suspense fallback={<p>Loading Testimonials...</p>}>
        <Testimonials />
      </Suspense>
    </div>
  );
};

export default Home;
