"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { dict } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-charcoal relative border-t border-charcoal-lighter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white uppercase tracking-wider mb-6">
          {dict.contact.title}
        </h2>
        <p className="text-xl text-gray-400 mb-12 font-light">
          {dict.contact.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          <a 
            href="tel:+919442702912"
            className="p-6 bg-charcoal-light border border-charcoal-lighter hover:border-gold group transition-colors flex flex-col items-center justify-center rounded-sm"
          >
            <span className="text-gold font-poppins font-bold uppercase tracking-widest mb-2 group-hover:scale-105 transition-transform">
              {dict.contact.callOwner}
            </span>
            <span className="text-gray-400 text-sm font-inter group-hover:text-white transition-colors">
              +91 94427 02912
            </span>
          </a>
          
          <a 
            href="https://wa.me/919159824141"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-charcoal-light border border-charcoal-lighter hover:border-[#25D366] group transition-colors flex flex-col items-center justify-center rounded-sm"
          >
            <span className="text-[#25D366] font-poppins font-bold uppercase tracking-widest mb-2 group-hover:scale-105 transition-transform">
              {dict.contact.waOwner}
            </span>
            <span className="text-gray-400 text-sm font-inter group-hover:text-white transition-colors">
              {dict.contact.clickChat}
            </span>
          </a>
        </div>

        <div className="text-gray-500 font-poppins tracking-widest text-sm uppercase">
          📍 {dict.contact.location}
        </div>
      </div>
    </section>
  );
}
