// servicesData.js
import service1 from "./service4.webp";
import service2 from "./service2.jpg";
import service3 from "./service3.jpg";

export const services = [
  {
    id: "bridal",
    icon: "Sparkles", // 👈 store icon name as string
    title: "Bridal Mehendi",
    desc: "Full hand & feet intricate patterns for your big day. Custom designs that tell your love story.",
    price: "From ₹5,000",
    duration: "3-4 hrs",
    image: service1,
    tags: ["Custom", "Organic", "Aftercare"],
  },
  {
    id: "party",
    icon: "Users",
    title: "Party & Events",
    desc: "Get togethers, baby showers, and festive gatherings. Beautiful designs for all your guests.",
    price: "From ₹1,500",
    duration: "1-2 hrs",
    image: service2,
    tags: ["Group", "Express", "Festival"],
  },
  {
    id: "express",
    icon: "Calendar",
    title: "Express Styles",
    desc: "Quick, stunning designs for those on a time crunch. Perfect for last‑minute events.",
    price: "From ₹999",
    duration: "30‑60 min",
    image: service3,
    tags: ["Minimal", "Instant", "Budget"],
  },
];

export const extraServices = [
  {
    icon: "Gift",
    title: "Henna Kits",
    desc: "DIY cones & kits for home use.",
    price: "From ₹299",
    image:
      "https://images.pexels.com/photos/6210957/pexels-photo-6210957.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    icon: "Award",
    title: "Training Classes",
    desc: "Learn the art of mehendi from Sakshi herself.",
    price: "From ₹2,999",
    image:
      "https://images.pexels.com/photos/3077582/pexels-photo-3077582.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: "Clock",
    title: "On‑Demand",
    desc: "Same‑day appointments for urgent needs.",
    price: "From ₹1,499",
    image:
      "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    bgGradient: "from-blue-50 to-cyan-50",
  },
];
