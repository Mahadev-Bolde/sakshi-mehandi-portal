// src/pages/Booking.jsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Heart,
} from "lucide-react";
import { services } from "../assets/services";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: services[0]?.title || "",
    date: "",
    time: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";
    return newErrors;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/bookings", formData);

      if (response.data.success) {
        setSubmitted(true);

        // Reset form after successful booking
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: services[0]?.title || "",
          date: "",
          time: "",
          message: "",
        });

        setErrors({});
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to create booking. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: services[0]?.title || "",
      date: "",
      time: "",
      message: "",
    });
    setSubmitted(false);
    setErrors({});
  };

  // Get selected service details for preview
  const selectedService = services.find((s) => s.title === formData.service);

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
              Book Your Session
            </span>
            <span className="w-12 h-px bg-gold/50"></span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Let's Create <br />
            <span className="text-burgundy">Something Beautiful</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-burgundy mx-auto mt-4"></div>
          <p className="text-charcoal/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Fill in the details below, and Sakshi will get back to you within 24
            hours.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-gold/10 p-6 md:p-8">
            {!authLoading && !user && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
                Please login before booking a mehendi session.
              </div>
            )}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Full Name <span className="text-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.name ? "border-red-500" : "border-gold/20"
                      } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Email <span className="text-burgundy">*</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-gold/20"
                        } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Phone <span className="text-burgundy">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="xxxxxxxxxx"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-gold/20"
                        } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Select Service <span className="text-burgundy">*</span>
                  </label>
                  <div className="relative">
                    <Sparkles
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                    />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.service ? "border-red-500" : "border-gold/20"
                      } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm appearance-none bg-white`}>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} – {s.price}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Date <span className="text-burgundy">*</span>
                    </label>
                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                      />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.date ? "border-red-500" : "border-gold/20"
                        } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-1">
                      Time <span className="text-burgundy">*</span>
                    </label>
                    <div className="relative">
                      <Clock
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                      />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.time ? "border-red-500" : "border-gold/20"
                        } focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm`}
                      />
                    </div>
                    {errors.time && (
                      <p className="text-red-500 text-xs mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-1">
                    Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-3 top-4 text-charcoal/40"
                    />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Any specific design ideas or preferences?"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading ? "Booking..." : user ? "Book Now" : "Login to Book"}

                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>
            ) : (
              // Success state
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-charcoal">
                  Booking Request Sent!
                </h3>
                <p className="text-charcoal/60 mt-2 text-sm max-w-sm mx-auto">
                  Sakshi will contact you within 24 hours to confirm your
                  session.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2 border border-gold/30 text-burgundy rounded-full text-sm font-bold hover:bg-gold hover:text-charcoal transition">
                  Book Another
                </button>
              </div>
            )}
          </div>

          {/* Sidebar – Service Preview & Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gold/10 p-6 sticky top-24">
              <h3 className="font-serif text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Heart size={18} className="text-burgundy" />
                Your Selection
              </h3>
              {selectedService && (
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-burgundy/5">
                    <img
                      src={selectedService.image}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">
                      {selectedService.title}
                    </h4>
                    <p className="text-sm text-charcoal/60">
                      {selectedService.desc.substring(0, 60)}...
                    </p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="font-bold text-burgundy">
                        {selectedService.price}
                      </span>
                      <span className="text-charcoal/40 flex items-center gap-1">
                        <Clock size={14} /> {selectedService.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedService.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-burgundy/5 text-burgundy text-[10px] rounded-full border border-burgundy/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-4 border-t border-gold/10 pt-4 text-xs text-charcoal/40">
                <p>✨ All bookings confirmed via WhatsApp.</p>
                <p className="mt-1">
                  📞 Need help? Call{" "}
                  <a
                    href="tel:+917972792251"
                    className="text-burgundy font-semibold">
                    +91 7972792251
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
