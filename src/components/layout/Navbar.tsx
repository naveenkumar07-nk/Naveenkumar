"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Globe, PhoneCall, MessageSquare, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const { lang, setLang, dict } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: dict.nav.home, href: "#" },
    { name: dict.nav.offers, href: "#special-offers" },
    { name: dict.nav.fleet, href: "#fleet" },
    { name: dict.nav.journeys, href: "#journeys" },
    { name: dict.nav.about, href: "#about" },
    { name: dict.nav.contact, href: "#contact" },
  ];

  const toggleLang = () => {
    setLang(lang === "en" ? "ta" : "en");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-gold/20 shadow-2xl py-3"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Brand Logo */}
            <Link href="#" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.25)] shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/travelslogo.png"
                  alt="Shankar Travels Logo"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-poppins font-black text-[var(--text-primary)] tracking-wider group-hover:text-gold transition-colors leading-tight">
                  SHANKAR
                </span>
                <span className="text-[10px] sm:text-xs text-gold font-poppins tracking-[0.25em] uppercase font-bold">
                  {dict.nav.travels}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-semibold text-[var(--text-secondary)] hover:text-gold transition-colors font-poppins uppercase tracking-widest relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Controls */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Light/Dark Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-gold/30 hover:border-gold text-gold bg-gold/10 hover:bg-gold/20 transition-all cursor-pointer active:scale-95"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label="Toggle Light/Dark Theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} className="text-slate-800" />}
              </button>

              {/* Language Switcher */}
              <button 
                onClick={toggleLang}
                className="flex items-center text-[var(--text-primary)] hover:text-gold transition-all font-poppins font-semibold text-xs tracking-wider border border-white/20 dark:border-white/20 border-slate-300 hover:border-gold/50 px-3.5 py-2 rounded-full bg-white/5 backdrop-blur-md cursor-pointer"
                title="Switch Language / மொழியை மாற்றுக"
              >
                <Globe size={14} className="mr-1.5 text-gold" />
                <span>{lang === "en" ? "தமிழ்" : "English"}</span>
              </button>

              {/* Primary CTA */}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-gold via-amber-400 to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare size={14} className="fill-black" />
                <span>ENQUIRE NOW</span>
              </button>
            </div>

            {/* Mobile Header Controls */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-lg border border-gold/30 text-gold bg-gold/10 active:scale-95 transition-transform"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} className="text-slate-800" />}
              </button>

              <button 
                onClick={toggleLang}
                className="text-gold font-poppins font-bold text-xs border border-gold/40 px-2 py-1 rounded-lg bg-gold/10 flex items-center gap-1 active:scale-95 transition-transform"
              >
                <Globe size={12} />
                <span>{lang === "en" ? "தமிழ்" : "EN"}</span>
              </button>
              
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-2.5 py-1.5 bg-gold text-black font-poppins font-extrabold text-[10px] tracking-wider uppercase rounded-lg shadow-md active:scale-95 transition-transform"
              >
                ENQUIRE
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[var(--text-primary)] hover:text-gold transition-colors focus:outline-none rounded-lg bg-white/5 border border-white/10"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} className="text-gold" /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[var(--bg-primary)]/98 backdrop-blur-2xl border-t border-gold/20 overflow-hidden shadow-2xl"
            >
              <div className="px-5 pt-4 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-semibold text-[var(--text-primary)] hover:text-gold hover:bg-gold/10 rounded-xl transition-all font-poppins uppercase tracking-wider border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </a>
                ))}

                <div className="pt-2 flex flex-col gap-2.5">
                  <div className="flex gap-2">
                    <button
                      onClick={toggleTheme}
                      className="flex-1 py-2.5 px-3 bg-white/5 border border-white/15 rounded-xl text-xs font-poppins font-bold uppercase tracking-wider text-gold flex items-center justify-center gap-2"
                    >
                      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                      <span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
                    </button>

                    <button
                      onClick={toggleLang}
                      className="flex-1 py-2.5 px-3 bg-white/5 border border-white/15 rounded-xl text-xs font-poppins font-bold uppercase tracking-wider text-gold flex items-center justify-center gap-2"
                    >
                      <Globe size={14} />
                      <span>{lang === "en" ? "தமிழ்" : "ENGLISH"}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsEnquiryOpen(true);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-gold to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl text-center shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} />
                    <span>BOOK / ENQUIRE VEHICLE</span>
                  </button>

                  <a
                    href="tel:+919159824141"
                    className="w-full py-3 bg-white/5 border border-white/15 text-[var(--text-primary)] font-poppins font-bold text-xs tracking-wider uppercase rounded-xl text-center flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={15} className="text-gold" />
                    <span>DIRECT CALL: +91 91598 24141</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </>
  );
}
