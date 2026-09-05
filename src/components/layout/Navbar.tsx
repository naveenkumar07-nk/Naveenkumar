"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, dict } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.nav.home, href: "#" },
    { name: dict.nav.fleet, href: "#fleet" },
    { name: dict.nav.journeys, href: "#journeys" },
    { name: dict.nav.about, href: "#about" },
  ];

  const toggleLang = () => {
    setLang(lang === "en" ? "ta" : "en");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="#" className="flex flex-col">
            <span className="text-xl md:text-2xl font-poppins font-bold text-white tracking-wider">
              SHANKAR
            </span>
            <span className="text-xs text-gold font-poppins tracking-widest uppercase">
              {dict.nav.travels}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-gold transition-colors font-poppins uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={toggleLang}
              className="flex items-center text-gray-300 hover:text-gold transition-colors font-poppins font-medium text-sm tracking-wider"
            >
              <Globe size={16} className="mr-1" />
              {lang === "en" ? "தமிழ்" : "English"}
            </button>
            <a
              href="#contact"
              className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all rounded-sm font-poppins font-medium text-sm tracking-wider"
            >
              {dict.nav.contact}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleLang}
              className="text-white hover:text-gold transition-colors font-poppins text-xs border border-white/20 px-2 py-1 rounded-sm"
            >
              {lang === "en" ? "தமிழ்" : "EN"}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-charcoal-light absolute w-full border-t border-charcoal-lighter">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-white hover:text-gold hover:bg-charcoal transition-colors border-b border-charcoal-lighter font-poppins uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-4 text-base font-medium text-gold hover:bg-charcoal transition-colors font-poppins uppercase tracking-wider"
            >
              {dict.nav.contact}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
