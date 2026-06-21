import React, { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      setUser(null);
      setIsOpen(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const navTextClass = scrolled
    ? "text-charcoal/80 hover:text-burgundy"
    : "text-white/90 hover:text-gold";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto transition-all duration-1000 ease-out ${
          navVisible
            ? "w-full opacity-100 scale-x-100"
            : "w-0 opacity-0 scale-x-0"
        }`}>
        <div
          className={`relative transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gold/10 text-charcoal"
              : "bg-black/20 backdrop-blur-[2px] border-b border-white/10 text-white"
          }`}>
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 group">
                <Heart
                  className="text-gold fill-gold/30 group-hover:scale-110 transition-transform"
                  size={28}
                />

                <span
                  className={`font-serif text-2xl font-bold tracking-wide transition-colors ${
                    scrolled ? "text-burgundy" : "text-white drop-shadow-md"
                  }`}>
                  Sakshi<span className="text-gold">.</span>
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium uppercase tracking-wider">
                <Link to="/" className={`${navTextClass} transition-colors`}>
                  Home
                </Link>

                <Link
                  to="/services"
                  className={`${navTextClass} transition-colors`}>
                  Services
                </Link>

                <Link
                  to="/gallery"
                  className={`${navTextClass} transition-colors`}>
                  Gallery
                </Link>

                <Link
                  to="/booking"
                  className={`${navTextClass} transition-colors`}>
                  Booking
                </Link>

                <Link
                  to="/contact"
                  className={`${navTextClass} transition-colors`}>
                  Contact
                </Link>

                {user && (
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    className={`${navTextClass} transition-colors`}>
                    Dashboard
                  </Link>
                )}

                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className={`${navTextClass} transition-colors`}>
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className="bg-gold text-charcoal px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:scale-105 hover:shadow-gold/40 transition-all duration-300">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-gold text-charcoal px-6 py-2.5 rounded-full text-xs font-bold shadow-lg hover:scale-105 hover:shadow-gold/40 transition-all duration-300">
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-11 h-11 rounded-full border backdrop-blur-md flex items-center justify-center transition ${
                    scrolled
                      ? "bg-burgundy/10 border-burgundy/20 text-burgundy"
                      : "bg-white/10 border-white/20 text-white hover:bg-gold hover:text-charcoal"
                  }`}>
                  {isOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="md:hidden absolute top-20 left-4 right-4 bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-6 py-7 flex flex-col items-center gap-5 text-sm font-medium uppercase tracking-wider">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="text-white/90 hover:text-gold transition-colors">
                  Home
                </Link>

                <Link
                  to="/services"
                  onClick={closeMobileMenu}
                  className="text-white/90 hover:text-gold transition-colors">
                  Services
                </Link>

                <Link
                  to="/gallery"
                  onClick={closeMobileMenu}
                  className="text-white/90 hover:text-gold transition-colors">
                  Gallery
                </Link>

                <Link
                  to="/booking"
                  onClick={closeMobileMenu}
                  className="text-white/90 hover:text-gold transition-colors">
                  Booking
                </Link>

                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="text-white/90 hover:text-gold transition-colors">
                  Contact
                </Link>

                {user && (
                  <Link
                    to={user.role === "admin" ? "/admin" : "/dashboard"}
                    onClick={closeMobileMenu}
                    className="text-white/90 hover:text-gold transition-colors">
                    Dashboard
                  </Link>
                )}

                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="text-white/90 hover:text-gold transition-colors">
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="w-full text-center bg-gold text-charcoal px-6 py-3 rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-all">
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gold text-charcoal px-6 py-3 rounded-full text-xs font-bold shadow-lg hover:scale-105 transition-all">
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
