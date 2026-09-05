"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { dict } = useLanguage();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/main_photo.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/80" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 uppercase tracking-wider leading-tight"
        >
          {dict.hero.title1} <br/>
          <span className="text-gold">{dict.hero.title2}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-10 font-light tracking-wide max-w-2xl mx-auto"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#fleet"
            className="px-8 py-4 bg-gold text-charcoal hover:bg-gold-light transition-all rounded-sm font-poppins font-semibold tracking-widest uppercase w-full sm:w-auto text-center"
          >
            {dict.hero.btnFleet}
          </a>
          <a 
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-charcoal transition-all rounded-sm font-poppins font-semibold tracking-widest uppercase w-full sm:w-auto text-center"
          >
            {dict.hero.btnContact}
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-24 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gold z-10"
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
}
