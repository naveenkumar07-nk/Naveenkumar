"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomBar() {
  const { dict } = useLanguage();
  const phoneNumber = "+919159824141"; 
  const whatsappNumber = "919159824141"; 

  return (
    <div className="md:hidden fixed bottom-0 w-full z-50 bg-charcoal-light border-t border-charcoal-lighter flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
      <a
        href={`tel:${phoneNumber}`}
        className="flex-1 flex justify-center items-center py-4 text-white hover:bg-charcoal transition-colors"
      >
        <Phone size={20} className="mr-2" />
        <span className="font-poppins font-medium text-sm tracking-wide">{dict.mobile.call}</span>
      </a>
      
      <div className="w-px h-8 bg-charcoal-lighter"></div>
      
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(dict.mobile.waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex justify-center items-center py-4 text-[#25D366] hover:bg-charcoal transition-colors"
      >
        <MessageCircle size={20} className="mr-2" />
        <span className="font-poppins font-medium text-sm tracking-wide">{dict.mobile.whatsapp}</span>
      </a>
    </div>
  );
}
