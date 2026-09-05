"use client";

import { Shield, Sparkles, UserCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
  const { dict } = useLanguage();
  
  const reasons = [
    {
      icon: <Sparkles size={32} />,
      title: dict.why.c1_title,
      desc: dict.why.c1_desc
    },
    {
      icon: <Shield size={32} />,
      title: dict.why.c2_title,
      desc: dict.why.c2_desc
    },
    {
      icon: <UserCheck size={32} />,
      title: dict.why.c3_title,
      desc: dict.why.c3_desc
    },
    {
      icon: <MapPin size={32} />,
      title: dict.why.c4_title,
      desc: dict.why.c4_desc
    }
  ];

  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-gold font-poppins tracking-[0.3em] uppercase mb-4">{dict.why.tagline}</h2>
          <h3 className="text-3xl md:text-5xl font-poppins font-bold text-white uppercase tracking-wider mb-6">
            {dict.why.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="bg-charcoal-light p-8 border border-charcoal-lighter hover:border-gold/50 transition-colors rounded-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-charcoal text-gold mb-6 border border-charcoal-lighter">
                {reason.icon}
              </div>
              <h4 className="text-xl font-poppins font-bold text-white mb-4">{reason.title}</h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
