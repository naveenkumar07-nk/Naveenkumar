"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Journeys() {
  const { dict } = useLanguage();
  
  const timeline = [
    { route: "Salem ↔ Bangalore (Bengaluru)", distance: "Approx. 200 km • 4.5 Hours", type: dict.journeys.corp, highlight: "Airport Drops, Tech Park Corporate Outings, Family Trips" },
    { route: "Salem ↔ Chennai", distance: "Approx. 340 km • 6.5 Hours", type: dict.journeys.family, highlight: "Marriage Functions, Grand Family Gatherings, Bulk Transport" },
    { route: "Salem ↔ Kerala (Cochin / Munnar / Sabarimala)", distance: "Outstation Special Package", type: dict.journeys.devotional, highlight: "Sabarimala Temple Package, Nature Vacation Tours" },
    { route: "Salem ↔ Ooty & Kodaikanal", distance: "Hill Station Special Drive", type: dict.journeys.tourist, highlight: "Experienced Hill Drivers, Mountain Sightseeing" },
    { route: "Salem ↔ Tirupati & Rameshwaram", distance: "Pilgrimage Express Package", type: dict.journeys.devotional, highlight: "Temple Pilgrimages, Multi-Day Heritage Tours" },
  ];

  return (
    <section id="journeys" className="py-20 md:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
            {dict.journeys.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-4 font-normal">
            Trusted outstation travel services across Tamil Nadu, Karnataka, Kerala, and Andhra Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-gold/40 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold">
                    <MapPin size={20} />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-poppins font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-gold transition-colors">
                  {item.route}
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-mono font-semibold mb-3 flex items-center gap-1.5">
                  <Navigation size={12} />
                  <span>{item.distance}</span>
                </p>
                <p className="text-xs text-[var(--text-secondary)] font-normal leading-relaxed mb-6">
                  {item.highlight}
                </p>
              </div>
              <a
                href={`https://wa.me/919159824141?text=Hi, I would like to book a trip for: ${encodeURIComponent(item.route)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white/5 border border-[var(--border-color)] group-hover:border-gold/50 group-hover:bg-gold group-hover:text-black text-[var(--text-primary)] text-xs font-poppins font-extrabold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>BOOK THIS ROUTE</span>
                <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
