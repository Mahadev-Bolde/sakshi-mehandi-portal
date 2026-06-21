import React from "react";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory/70 pt-20 pb-8 border-t-4 border-gold">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="text-gold fill-gold/20" size={28} />
              <span className="font-serif text-2xl font-bold text-white">
                Sakshi<span className="text-gold">.</span>
              </span>
            </div>
            <p className="text-sm max-w-xs">
              Creating timeless elegance through the ancient art of henna. Made
              with love and organic ingredients.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-gold transition-colors">
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/sakshi_bridalmehndi/"
                target="_blank"
                className="hover:text-gold transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="hover:text-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#designs"
                  className="hover:text-gold transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-gold transition-colors">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h5>
            <ul className="space-y-3 text-sm">
              <li>Bridal Mehendi</li>
              <li>Party Events</li>
              <li>Express Styles</li>
              <li>Training Classes</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h5>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-gold" />
                <span>+91 7972792251</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gold" />
                <span>sakshi_Bridal@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-gold" />
                <span>Solapur, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest">
          <p>© 2026 Sakshi. All rights reserved.</p>
          <p>
            Made with <span className="text-gold">❤</span> for the love of art
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
