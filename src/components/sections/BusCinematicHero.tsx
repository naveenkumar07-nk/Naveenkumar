"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCw, Zap, Star, ShieldCheck, ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { GlowingButton } from "@/components/ui/GlowingButton";
import ThreeBusBackground from "@/components/animation/ThreeBusBackground";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function BusCinematicHero() {
  const { dict } = useLanguage();
  const { theme } = useTheme();
  const [activeVehicle, setActiveVehicle] = useState<"bus" | "urbania">("bus");
  const [isHeadlightsOn, setIsHeadlightsOn] = useState<boolean>(true);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  const vehicleImage =
    activeVehicle === "bus"
      ? "/images/main_photo.jpeg"
      : "/images/urbania.jpg";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenEnquiry = () => {
    setIsEnquiryModalOpen(true);
  };

  return (
    <>
      <section className="relative bg-[var(--bg-primary)] text-[var(--text-primary)] pt-20 pb-8 md:pt-24 md:pb-10 px-3 sm:px-6 md:px-8 flex flex-col items-center overflow-hidden transition-colors duration-300">
        
        {/* Subtle Ambient Radial Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none z-0" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
          
          {/* Top Tagline Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 shadow-lg backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-gold uppercase">
              SHANKAR TRAVELS • LUXURY OUTSTATION TOURS
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-poppins text-[var(--text-primary)] tracking-tight uppercase leading-tight"
          >
            {dict.hero.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-400 to-gold-dark drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]">
              {dict.hero.title2}
            </span>
          </motion.h1>

          {/* BUS SHOWCASE — Clean Transparent Responsive Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-4xl mx-auto my-3"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              {/* Subtle glow border ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.12)] pointer-events-none z-10" />

              {/* 3D Bus Showcase (transparent background) */}
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <ThreeBusBackground
                  imageSrc={vehicleImage}
                  isHeadlightsOn={isHeadlightsOn}
                />
              </div>

              {/* Floating Vehicle Info Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-gold/40 rounded-xl shadow-xl">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  {activeVehicle === "bus" ? "SHANKAR LUXURY TRAVELLER (21 SEATER)" : "FORCE URBANIA (17 SEATER)"}
                </span>
              </div>

              {/* HD badge */}
              <div className="absolute bottom-3 right-3 z-20 hidden sm:flex">
                <span className="text-[9px] font-mono text-gold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-gold/30 uppercase font-bold">
                  HIGH DEFINITION 3D SHOWCASE
                </span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Controls Bar Directly Below Large Bus Model */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg pt-1"
          >
            <button
              onClick={() => setActiveVehicle(activeVehicle === "bus" ? "urbania" : "bus")}
              className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-gold/15 border border-gold/50 hover:border-gold rounded-full text-xs font-mono font-bold text-gold flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              <RotateCw size={14} className="text-gold" />
              <span>3D MODEL: {activeVehicle === "bus" ? "SWITCH TO FORCE URBANIA" : "SWITCH TO SHANKAR BUS"}</span>
            </button>

            <button
              onClick={() => setIsHeadlightsOn(!isHeadlightsOn)}
              className="w-full sm:w-auto px-5 py-2.5 bg-white/5 hover:bg-amber-400/15 border border-amber-400/50 hover:border-amber-400 rounded-full text-xs font-mono font-bold text-amber-500 dark:text-amber-300 flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              <Zap size={14} className={isHeadlightsOn ? "text-amber-400 fill-amber-400" : ""} />
              <span>LED LIGHTS: {isHeadlightsOn ? "ON" : "OFF"}</span>
            </button>
          </motion.div>

          {/* Content Down of Bus Model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl mx-auto space-y-3.5 pt-1"
          >
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full pt-1">
              <GlowingButton
                variant="gold"
                className="w-full sm:w-auto px-10 py-3.5 text-xs sm:text-sm tracking-widest font-extrabold uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                onClick={handleOpenEnquiry}
              >
                {dict.fleet.enquire}
              </GlowingButton>

              <button
                onClick={() => scrollToSection("fleet")}
                className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 dark:border-white/20 border-slate-300 text-[var(--text-primary)] font-poppins font-bold text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{dict.hero.btnFleet}</span>
                <ArrowDown size={14} />
              </button>
            </div>
          </motion.div>


        </div>
      </section>

      {/* Booking Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        initialVehicle={activeVehicle === "bus" ? "Shankar Luxury Bus (21 Seats)" : "Force Urbania (17 Seats)"}
      />
    </>
  );
}
