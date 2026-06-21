// src/pages/Contact.jsx
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight,
  Heart,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    const message = `Hi Sakshi,%0A%0A📧 *New Contact Message*%0A👤 *Name:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A📌 *Subject:* ${formData.subject || "General"}%0A💬 *Message:* ${formData.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/917972792251?text=${message}`, "_blank");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitted(false);
    setErrors({});
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      title: "Visit Us",
      details: "Solapur, Maharashtra, India",
      action: "https://maps.google.com",
    },
    {
      icon: <Phone size={20} />,
      title: "Call Us",
      details: "+91 7972792251",
      action: "tel:+917972792251",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Us",
      details: "sakshi_Bridal@gmail.com",
      action: "mailto:sakshi_Bridal@gmail.com",
    },
    {
      icon: <Clock size={20} />,
      title: "Working Hours",
      details: "Mon–Sat: 10:00 AM – 8:00 PM",
    },
  ];

  const socials = [
    {
      icon: <FaInstagram size={22} />,
      label: "Instagram",
      url: "https://www.instagram.com/sakshi_bridalmehndi/",
    },
    { icon: <FaFacebook size={22} />, label: "Facebook", url: "#" },
    { icon: <FaTwitter size={22} />, label: "Twitter", url: "#" },
    { icon: <FaYoutube size={22} />, label: "YouTube", url: "#" },
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory min-h-screen relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-px bg-gold/50"></span>
            <span className="text-gold font-semibold tracking-[0.3em] uppercase text-sm">
              Get in Touch
            </span>
            <span className="w-12 h-px bg-gold/50"></span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Let's <span className="text-burgundy">Connect</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Have a question or want to book a session? Reach out – we'd love to
            hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, idx) => (
            <a
              key={idx}
              href={item.action || "#"}
              target={item.action?.startsWith("http") ? "_blank" : ""}
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-6 border border-gold/10 hover:border-gold/30 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto mb-3 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                {item.icon}
              </div>
              <h4 className="font-semibold text-sm text-charcoal">
                {item.title}
              </h4>
              <p className="text-xs text-charcoal/50 mt-1">{item.details}</p>
            </a>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gold/10 p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Name <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-500" : "border-gold/20"
                      } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Email <span className="text-burgundy">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? "border-red-500" : "border-gold/20"
                      } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Message <span className="text-burgundy">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your mehendi vision..."
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? "border-red-500" : "border-gold/20"
                    } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  Message Sent!
                </h3>
                <p className="text-charcoal/60 mt-2 text-sm max-w-sm mx-auto">
                  Thank you for reaching out. Sakshi will get back to you as
                  soon as possible.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2 border border-gold/30 text-burgundy rounded-full text-sm font-bold hover:bg-gold hover:text-charcoal transition">
                  Send Another
                </button>
              </div>
            )}
          </div>

          {/* Sidebar – Map + Social */}
          <div className="lg:col-span-1 space-y-6">
            {/* Map */}
            <div className="bg-white rounded-3xl shadow-xl border border-gold/10 p-4">
              <h4 className="font-semibold text-sm text-charcoal mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-burgundy" />
                Find Us
              </h4>
              <div className="aspect-video rounded-xl overflow-hidden bg-burgundy/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d75.7411029566968!3d17.682197839569277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b8c8c8c8c8c8%3A0x0!2sBoramani%2C%20Solapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sakshi Mehendi Location - Boramani, Solapur"
                  className="w-full h-full"></iframe>
              </div>
              <p className="text-xs text-charcoal/40 mt-2 text-center">
                Solapur, Maharashtra, India
              </p>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl shadow-xl border border-gold/10 p-6">
              <h4 className="font-semibold text-sm text-charcoal mb-4 flex items-center gap-2">
                <Heart size={16} className="text-burgundy" />
                Follow Sakshi
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-xl border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition group">
                    <span className="text-burgundy group-hover:text-gold transition">
                      {social.icon}
                    </span>
                    <span className="text-xs font-medium text-charcoal/70 group-hover:text-burgundy transition">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Banner */}
        <div className="mt-16 bg-gradient-to-r from-burgundy/5 via-gold/5 to-burgundy/5 rounded-3xl border border-gold/10 p-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Prefer WhatsApp? <span className="text-burgundy">Chat Now!</span>
          </h3>
          <p className="text-charcoal/60 text-sm mt-2">
            Get instant replies – click below to start a conversation.
          </p>
          <a
            href="https://wa.me/917972792251?text=Hi%20Sakshi!%20I%20have%20a%20question%20about%20mehendi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300">
            <MessageSquare size={18} /> WhatsApp Us <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
