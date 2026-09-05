"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function InteriorShowcase() {
  const { dict } = useLanguage();
  
  const images = [
    { src: "/images/main_photo.jpeg", label: dict.interior.front },
    { src: "/images/travells_photo.jpeg", label: dict.interior.seats },
    { src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop", label: dict.interior.roof },
    { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop", label: dict.interior.luggageSpace },
  ];

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-gold font-poppins tracking-[0.3em] uppercase mb-4">{dict.interior.tagline}</h2>
          <h3 className="text-3xl md:text-5xl font-poppins font-bold text-white uppercase tracking-wider mb-6">
            {dict.interior.title}
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400">
            {dict.interior.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.src} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                <span className="text-gold font-poppins font-semibold uppercase tracking-widest text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
