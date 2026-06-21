// src/pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import API from "../api/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid.";
    if (!formData.phone.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      return "Phone must be 10 digits.";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/auth/signup", {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-ivory py-12 px-4 pt-24">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gold/10 p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-charcoal">
            Account Created!
          </h3>
          <p className="text-charcoal/60 text-sm mt-2">
            Welcome to Sakshi's Mehendi family. You can now log in.
          </p>
          <Link
            to="/login"
            className="inline-block mt-6 px-6 py-2 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition">
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-ivory py-12 px-4 pt-24 relative overflow-hidden">
      {/* 👆 pt-24 pushes content below fixed navbar */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"></div>
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gold/10 p-8 relative z-10">
        {" "}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-burgundy">
            Create Account
          </h2>
          <p className="text-charcoal/60 text-sm mt-1">
            Join the Sakshi Mehendi family
          </p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Full Name
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Email Address
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Phone Number
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                placeholder="9876543210"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                placeholder="Min. 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-burgundy transition">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gold/20 focus:border-gold focus:ring-2 focus:ring-gold/20 transition outline-none text-sm"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-burgundy transition">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-gold to-gold/80 text-charcoal rounded-full text-sm font-bold hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
        <p className="text-center text-sm text-charcoal/60 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-burgundy font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
