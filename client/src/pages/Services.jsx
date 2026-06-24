// src/pages/Services.jsx
import React, { useState } from "react";
import {
  Clock,
  Sparkles,
  Users,
  Calendar,
  Gift,
  Award,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Heart,
  Star,
  ThumbsUp,
  Shield,
  Leaf,
  Palette,
  Brush,
  Smile,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { services, extraServices } from "../assets/services";

const iconMap = {
  Sparkles,
  Users,
  Calendar,
  Gift,
  Award,
  Clock,
  Heart,
  Star,
  ThumbsUp,
  Shield,
  Leaf,
  Palette,
  Brush,
  Smile,
};

const getIcon = (name, size = 22) => {
  const Icon = iconMap[name];
  return Icon ? <Icon size={size} /> : null;
};

const Services = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      q: "How long does bridal mehendi take?",
      a: "Bridal mehendi typically takes 3-4 hours, depending on the intricacy of the design. We recommend booking at least a day before your event.",
    },
    {
      q: "Is the henna organic and safe?",
      a: "Absolutely! We use 100% natural, chemical‑free henna that is safe for all skin types. Our henna is freshly prepared and tested for quality.",
    },
    {
      q: "Do you offer trial sessions?",
      a: "Yes, we offer trial sessions for bridal mehendi. This helps you finalise the design and see the colour intensity before the big day.",
    },
    {
      q: "What is the cancellation policy?",
      a: "We require a 50% advance payment to confirm your booking. Cancellations made 48 hours in advance are eligible for a full refund.",
    },
  ];

  // Process steps
  const steps = [
    {
      icon: <Calendar size={28} />,
      title: "Book a Session",
      desc: "Choose your service, date, and time. We'll confirm within 24 hours.",
    },
    {
      icon: <Palette size={28} />,
      title: "Design Consultation",
      desc: "Share your preferences – we'll create a custom pattern just for you.",
    },
    {
      icon: <Brush size={28} />,
      title: "Mehendi Day",
      desc: "Relax and enjoy the experience as we bring your design to life with organic henna.",
    },
  ];

  // Stats
  const stats = [
    { number: "500+", label: "Happy Clients", icon: <Users size={24} /> },
    { number: "4.9★", label: "Average Rating", icon: <Star size={24} /> },
    { number: "10+", label: "Years Experience", icon: <Award size={24} /> },
    { number: "100%", label: "Natural Henna", icon: <Leaf size={24} /> },
  ];

  // Trust badges
  const trustBadges = [
    {
      icon: <Shield size={20} />,
      title: "Chemical‑Free",
      desc: "No PPD, no synthetic additives.",
    },
    {
      icon: <Heart size={20} />,
      title: "Love & Care",
      desc: "Every design is made with passion.",
    },
    {
      icon: <Smile size={20} />,
      title: "Customer First",
      desc: "Your satisfaction is our priority.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* ===== HEADER ===== */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold/50"></span>
            <span className="text-gold font-semibold tracking-[0.3em] uppercase text-sm">
              Sakshi’s Mehendi Services
            </span>
            <span className="w-12 h-px bg-gold/50"></span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Henna Artistry <br />
            <span className="text-burgundy">for Every Occasion</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            From bridal masterpieces to quick festive designs – every stroke is
            crafted with{" "}
            <strong className="text-burgundy">100% organic henna</strong> and a
            deep love for the ancient art.
          </p>
        </div>

        {/* ===== STATS / TRUST BAR ===== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center bg-ivory/50 rounded-2xl p-6 border border-gold/10">
              <div className="text-gold flex justify-center mb-2">
                {stat.icon}
              </div>
              <div className="font-serif text-3xl font-bold text-burgundy">
                {stat.number}
              </div>
              <div className="text-xs text-charcoal/50 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ===== MAIN SERVICES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gold/10 hover:border-gold/30 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <div className="relative h-64 md:h-72 overflow-hidden bg-burgundy/5 flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    parent.className =
                      "relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-burgundy/10 to-gold/10 flex items-center justify-center";
                    parent.innerHTML = `<span class="text-charcoal/20 font-serif text-lg">✨ ${service.title}</span>`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-burgundy shadow-lg border border-gold/20 z-10">
                  {service.price}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white/80 text-xs flex items-center gap-1 z-10">
                  <Clock size={12} /> {service.duration}
                </div>
                {hoveredId === service.id && (
                  <div className="absolute inset-0 bg-burgundy/10 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-serif text-sm tracking-wider border border-white/30 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-4 flex-grow">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-burgundy/5 text-burgundy text-xs rounded-full border border-burgundy/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300">
                  Book Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-gold font-semibold tracking-widest uppercase text-sm">
              Simple Process
            </h3>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">
              How It <span className="text-burgundy">Works</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="text-center bg-ivory/30 rounded-3xl p-8 border border-gold/10 hover:border-gold/30 transition">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h4 className="font-serif text-xl font-bold mb-2">
                  <span className="text-burgundy">0{idx + 1}.</span>{" "}
                  {step.title}
                </h4>
                <p className="text-charcoal/60 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== WHY SAKSHI? ===== */}
        <div className="mt-24 bg-ivory/50 rounded-3xl border border-gold/10 p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-3xl font-bold text-charcoal">
              Why <span className="text-burgundy">Sakshi</span>?
            </h3>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="text-gold flex-shrink-0 mt-1">{badge.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{badge.title}</h4>
                  <p className="text-xs text-charcoal/50">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MORE OFFERINGS ===== */}
        <div className="mt-24 relative">
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gold"></div>
              <span className="text-xs uppercase tracking-[0.3em] text-charcoal/40 font-medium">
                Also Available
              </span>
              <div className="w-3 h-3 rounded-full bg-gold"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {extraServices.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative p-5 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/20">
                      {getIcon(item.icon)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg font-bold text-charcoal group-hover:text-burgundy transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-charcoal/50 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block px-2.5 py-0.5 bg-gold/10 text-gold/80 text-[10px] font-bold rounded-full border border-gold/20">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-xs text-charcoal/40 tracking-wider">
              🌿 All henna products are 100% natural, chemical‑free, and
              handcrafted with care.
            </p>
          </div>
        </div>

        {/* ===== FAQ ===== */}
        <div className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-gold font-semibold tracking-widest uppercase text-sm">
              FAQ
            </h3>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mt-2">
              Frequently Asked <span className="text-burgundy">Questions</span>
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-2"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition">
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-charcoal hover:text-burgundy transition"
                  onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <div
                  className={`px-5 pb-5 text-sm text-charcoal/60 leading-relaxed transition-all duration-300 ${
                    openFaq === idx ? "block" : "hidden"
                  }`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FINAL CTA ===== */}
        <div className="mt-24 text-center bg-gradient-to-r from-burgundy/5 via-gold/5 to-burgundy/5 rounded-3xl p-10 border border-gold/10">
          <h3 className="font-serif text-3xl font-bold text-charcoal">
            Ready to Book Your <span className="text-burgundy">Mehendi</span>?
          </h3>
          <p className="text-charcoal/60 mt-2 max-w-md mx-auto text-sm">
            Let’s create something beautiful together. Reach out to Sakshi
            today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href="tel:+917972792251"
              className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white rounded-full text-sm font-bold hover:bg-burgundy/90 transition shadow-lg hover:shadow-burgundy/20">
              <Phone size={16} /> Call Now
            </a>
            <a
              href="mailto:sakshi_bridal@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-burgundy rounded-full text-sm font-bold hover:bg-gold hover:text-charcoal transition">
              <Mail size={16} /> Email
            </a>
            <a
              href="https://wa.me/917972792251?text=Hi%20Sakshi!%20I%20want%20to%20book%20a%20mehendi%20session."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition">
              WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
