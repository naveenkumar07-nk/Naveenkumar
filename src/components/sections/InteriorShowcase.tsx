"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function InteriorShowcase() {
  const { dict } = useLanguage();
  const [activeImage, setActiveImage] = useState<{ src: string; label: string; desc: string } | null>(null);

  const images = [
    { 
      src: "/images/main_photo.jpeg", 
      label: dict.interior.front,
      desc: "Aerodynamic front profile with LED headlights and panoramic windshield for optimal road visibility."
    },
    { 
      src: "/images/travells_photo.jpeg", 
      label: dict.interior.seats,
      desc: "Plush executive pushback recliner seats with neck support and individual USB mobile charging sockets."
    },
    { 
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop", 
      label: dict.interior.roof,
      desc: "Soft ambient ceiling lighting, individual AC vent controls, and high-fidelity surround sound speakers."
    },
    { 
      src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", 
      label: dict.interior.luggageSpace,
      desc: "Dedicated rear luggage compartment designed to fit large bags for outstation trips safely."
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)] border-t border-[var(--border-color)] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
            {dict.interior.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-4 leading-relaxed font-normal">
            {dict.interior.desc} Tap any photo to inspect high-resolution interior details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActiveImage(img)}
              className="group relative aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl border border-[var(--border-color)] cursor-pointer bg-[var(--card-bg)] hover:border-gold/50 transition-all shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.src} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/60 backdrop-blur-md text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={16} />
                  </span>
                </div>
                <div>
                  <span className="text-gold font-mono font-bold uppercase tracking-widest text-xs sm:text-sm block">
                    {img.label}
                  </span>
                  <span className="text-[11px] text-gray-300 line-clamp-1 mt-1 font-light opacity-90">
                    {img.desc}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--card-bg)] border border-gold/30 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/80 text-white hover:text-gold transition-colors border border-white/20 cursor-pointer"
              >
                <X size={20} />
              </button>
              <div className="aspect-[16/10] w-full bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeImage.src} alt={activeImage.label} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-[var(--card-bg)]">
                <h3 className="text-xl font-poppins font-bold text-gold uppercase tracking-wider">{activeImage.label}</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{activeImage.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
