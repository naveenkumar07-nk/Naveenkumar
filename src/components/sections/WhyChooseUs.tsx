"use client";

import { Shield, Sparkles, UserCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const { dict } = useLanguage();
  
  const reasons = [
    { icon: <Sparkles size={28} />, title: dict.why.c1_title, desc: dict.why.c1_desc },
    { icon: <Shield size={28} />, title: dict.why.c2_title, desc: dict.why.c2_desc },
    { icon: <UserCheck size={28} />, title: dict.why.c3_title, desc: dict.why.c3_desc },
    { icon: <MapPin size={28} />, title: dict.why.c4_title, desc: dict.why.c4_desc }
  ];

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-primary)] border-t border-[var(--border-color)] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
            {dict.why.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-4 font-normal">
            We prioritize passenger safety, vehicle hygiene, on-time pickup, and memorable outstation comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--card-bg)] p-6 sm:p-8 border border-[var(--border-color)] hover:border-gold/40 transition-all rounded-3xl text-center group hover:-translate-y-1.5 shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 text-gold mb-6 border border-gold/30 group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all">
                {reason.icon}
              </div>
              <h3 className="text-lg font-poppins font-bold text-[var(--text-primary)] mb-3 tracking-wide group-hover:text-gold transition-colors">
                {reason.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-normal">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
