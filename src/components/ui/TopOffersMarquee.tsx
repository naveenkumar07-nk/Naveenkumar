"use client";

import React from "react";
import { Flame, Sparkles } from "lucide-react";
import { useOffers } from "@/context/OffersContext";

export default function TopOffersMarquee() {
  const { activeOffers } = useOffers();

  if (!activeOffers || activeOffers.length === 0) return null;

  const current = activeOffers[0];
  const whatsappUrl = `https://wa.me/919159824141?text=${encodeURIComponent(
    current.whatsappMsg || `Hi Shankar Travels, I would like to claim the offer: ${current.title}`
  )}`;

  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-black py-2 px-3 text-center shadow-lg relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs md:text-sm font-poppins font-bold flex-wrap">
        <span className="inline-flex items-center gap-1 bg-black text-gold px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-mono font-black uppercase tracking-wider shadow">
          <Flame size={12} className="text-amber-400 fill-amber-400 animate-pulse" />
          OFFER
        </span>
        <span className="truncate">
          {current.title} — <span className="underline decoration-black/50">{current.route}</span>:{" "}
          <span className="bg-black/10 px-1.5 py-0.5 rounded font-black">{current.discount}</span>
        </span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 bg-black text-white hover:bg-neutral-900 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase transition-transform hover:scale-105 active:scale-95 shadow-md ml-1"
        >
          <span>Claim Offer</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
