"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Tag, Calendar, MapPin, ArrowRight, Sparkles, Phone } from "lucide-react";
import { useOffers, OfferType } from "@/context/OffersContext";

const TYPE_BADGES: Record<OfferType, string> = {
  Corporate: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  Family: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  Devotional: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  Tourist: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  Festival: "text-rose-400 bg-rose-500/10 border-rose-500/30",
  Weekend: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
};

export default function OffersBanner() {
  const { activeOffers } = useOffers();

  // If no offers exist, we don't render an empty block
  if (!activeOffers || activeOffers.length === 0) {
    return null;
  }

  const primaryPhone = "+919159824141";
  const whatsappNumber = "919159824141";

  return (
    <section id="special-offers" className="py-12 md:py-16 bg-[var(--bg-primary)] relative overflow-hidden transition-colors duration-300">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Flame size={14} className="text-amber-500 animate-bounce" />
              <span>LIMITED TIME EXCLUSIVE OFFERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
              Special Travel <span className="text-gold">Deals & Discounts</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)] mt-1.5 max-w-xl font-normal">
              Grab exclusive discounts on our luxury 21-seater Traveller and 17-seater Force Urbania for your upcoming trips.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gold/80 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
            <Sparkles size={14} className="text-gold" />
            <span>Instant booking confirmation via WhatsApp</span>
          </div>
        </div>

        {/* Offers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer, index) => {
            const badgeClass = TYPE_BADGES[offer.type] || "text-gold bg-gold/10 border-gold/30";
            const waText = offer.whatsappMsg || `Hi Shankar Travels, I would like to book the ${offer.title} offer for ${offer.route}.`;
            const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-gold/50 rounded-2xl p-6 shadow-xl hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] transition-all flex flex-col justify-between"
              >
                {/* Glow accent corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/15 to-transparent rounded-tr-2xl pointer-events-none" />

                <div>
                  {/* Top Badges: Category & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${badgeClass}`}>
                      {offer.type}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-poppins font-black bg-gradient-to-r from-amber-400 to-gold text-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      <Tag size={12} className="fill-black" />
                      {offer.discount}
                    </span>
                  </div>

                  {/* Route Indicator */}
                  <div className="flex items-center gap-2 text-xs font-mono text-gold mb-2">
                    <MapPin size={13} className="shrink-0" />
                    <span className="font-semibold tracking-wide truncate">{offer.route}</span>
                  </div>

                  {/* Offer Title */}
                  <h3 className="text-lg font-poppins font-bold text-[var(--text-primary)] group-hover:text-gold transition-colors leading-snug mb-2">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 leading-relaxed font-normal">
                    {offer.description}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-[var(--border-color)] mt-auto">
                  {offer.validUntil && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)] mb-3">
                      <Calendar size={12} className="text-gold" />
                      <span>Valid until: <strong className="text-[var(--text-primary)]">{offer.validUntil}</strong></span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-poppins font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_4px_15px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.486-8.414z"/>
                      </svg>
                      <span>Claim on WhatsApp</span>
                    </a>

                    <a
                      href={`tel:${primaryPhone}`}
                      aria-label="Call directly"
                      className="p-2.5 bg-white/5 hover:bg-gold hover:text-black text-gold border border-[var(--border-color)] hover:border-gold rounded-xl transition-all active:scale-95 cursor-pointer"
                      title="Call directly"
                    >
                      <Phone size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
