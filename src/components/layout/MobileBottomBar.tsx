"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomBar() {
  const { dict } = useLanguage();
  const phoneNumber = "+919159824141"; 
  const whatsappNumber = "919159824141"; 

  return (
    <aside
      aria-label="Quick Mobile Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-gold/30 flex items-center justify-between shadow-[0_-10px_35px_rgba(0,0,0,0.5)] px-2 py-2 transition-colors duration-300"
    >
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 flex justify-center items-center py-3 px-3 mx-1 bg-white/5 border border-white/10 rounded-xl text-[var(--text-primary)] active:scale-95 active:bg-gold/20 transition-all cursor-pointer"
      >
        <Phone size={18} className="mr-2 text-gold" />
        <span className="font-poppins font-bold text-xs tracking-wider uppercase text-gold">
          {dict.mobile.call}
        </span>
      </a>
      
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(dict.mobile.waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex justify-center items-center py-3 px-3 mx-1 bg-[#25D366]/15 border border-[#25D366]/40 rounded-xl text-[#25D366] active:scale-95 active:bg-[#25D366]/30 transition-all cursor-pointer"
      >
        <MessageCircle size={18} className="mr-2" />
        <span className="font-poppins font-bold text-xs tracking-wider uppercase">
          {dict.mobile.whatsapp}
        </span>
      </a>
    </aside>
  );
}
