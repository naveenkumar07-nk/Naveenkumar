"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, Compass, Car } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import VideoScrollAnimation from "@/components/animation/VideoScrollAnimation";
import SmoothScrollIndicator from "@/components/animation/SmoothScrollIndicator";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowingButton } from "@/components/ui/GlowingButton";

export default function FutureHero() {
  const { dict } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleLeftX = useTransform(scrollYProgress, [0, 0.5, 1], [-60, 0, 40]);
  const titleRightX = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="future-showcase"
      className="relative min-h-screen bg-[#060608] text-white py-20 px-4 md:px-8 overflow-hidden flex flex-col items-center justify-between border-t border-gold/20"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-purple-900/20 via-gold/10 to-cyan-900/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Tagline Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal-light/80 border border-gold/30 backdrop-blur-md mb-6"
      >
        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
        <span className="text-xs font-mono font-semibold tracking-[0.25em] text-gold uppercase">
          WE TRANSCEND DIMENSIONS
        </span>
      </motion.div>

      {/* Main Stage: BORN - [VIDEO/ORB] - FUTURE */}
      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between my-auto gap-6 lg:gap-0 z-10">
        
        {/* Left Title */}
        <motion.div
          style={{ x: titleLeftX }}
          className="text-center lg:text-left flex-1"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-[100px] font-extrabold tracking-tighter uppercase font-poppins leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gold/70 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            BORN
          </h2>
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-gold/80 mt-2 uppercase">
            LUXURY TRAVELLER & URBANIA
          </p>
        </motion.div>

        {/* Central 3D Video / Canvas Scroll Component */}
        <motion.div
          style={{ scale: orbScale }}
          className="relative z-30 my-4 lg:my-0 flex items-center justify-center"
        >
          <VideoScrollAnimation progress={0.5} />
        </motion.div>

        {/* Right Title */}
        <motion.div
          style={{ x: titleRightX }}
          className="text-center lg:text-right flex-1"
        >
          <h2 className="text-5xl sm:text-7xl lg:text-[100px] font-extrabold tracking-tighter uppercase font-poppins leading-none text-transparent bg-clip-text bg-gradient-to-l from-white via-gray-200 to-gold/70 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            FUTURE
          </h2>
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-gold/80 mt-2 uppercase">
            BUILT FOR THE FUTURE
          </p>
        </motion.div>
      </div>

      {/* Feature Cards Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 z-20 my-8">
        <GlassCard glowColor="gold" className="text-center">
          <Car className="w-8 h-8 text-gold mx-auto mb-3" />
          <h3 className="font-poppins font-bold text-white text-lg mb-1">
            PREMIUM FLEET
          </h3>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            High-end Force Urbania & Luxury Traveller models with executive interiors.
          </p>
        </GlassCard>

        <GlassCard glowColor="purple" className="text-center">
          <ShieldCheck className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="font-poppins font-bold text-white text-lg mb-1">
            EXECUTIVE COMFORT
          </h3>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            Reclining push-back seats, ambient roof lighting & surround sound.
          </p>
        </GlassCard>

        <GlassCard glowColor="cyan" className="text-center">
          <Compass className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
          <h3 className="font-poppins font-bold text-white text-lg mb-1">
            UNMATCHED JOURNEYS
          </h3>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            Family vacations, corporate events & devotional tours across South India.
          </p>
        </GlassCard>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 z-20 mt-4">
        <div className="flex items-center gap-3">
          <GlowingButton
            variant="gold"
            onClick={() => scrollToSection("fleet")}
          >
            {dict.hero.btnFleet}
          </GlowingButton>
          <GlowingButton
            variant="outline"
            onClick={() => scrollToSection("contact")}
          >
            {dict.hero.btnContact}
          </GlowingButton>
        </div>

        <SmoothScrollIndicator
          label="EXPLORE FLEET"
          onClick={() => scrollToSection("fleet")}
        />
      </div>
    </section>
  );
}
