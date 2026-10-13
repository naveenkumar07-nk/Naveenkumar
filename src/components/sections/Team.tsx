"use client";

import { Phone, MessageCircle, UserCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Team() {
  const { dict } = useLanguage();
  
  const team = [
    {
      role: dict.team.owner,
      name: "Naveenkumar", 
      phone: "+919159824141",
      whatsapp: "919159824141",
      image: "/images/owner_photo.jpg",
      experience: "Owner & Fleet Operations",
      badge: "24/7 Booking & Support"
    },
    {
      role: dict.team.driver,
      name: "Angappan", 
      phone: "+919442702912",
      whatsapp: "919159824141",
      image: null,
      experience: "Lead Outstation Driver",
      badge: "15+ Years Safe Driving"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
            {dict.team.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] mt-4 font-normal">
            Direct communication with our owner and licensed drivers for transparent pricing and hassle-free booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--card-bg)] p-8 border border-[var(--border-color)] hover:border-gold/40 rounded-3xl text-center flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-mono font-bold text-gold bg-gold/10 border border-gold/30 px-3 py-1 rounded-full uppercase">
                  {member.badge}
                </span>
              </div>
              <div>
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-gold/50 shadow-xl" />
                ) : (
                  <div className="w-24 h-24 mx-auto rounded-full bg-gold/10 border-2 border-gold/40 flex items-center justify-center text-gold mb-4 shadow-xl">
                    <UserCheck size={40} />
                  </div>
                )}
                <p className="text-gold text-xs font-mono font-bold tracking-widest uppercase mb-1">{member.role}</p>
                <h3 className="text-2xl font-poppins font-extrabold text-[var(--text-primary)] mb-2">{member.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] font-mono mb-6">{member.experience}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={`tel:${member.phone}`}
                  className="flex-1 flex items-center justify-center py-3 px-4 bg-white/5 border border-[var(--border-color)] hover:border-gold hover:text-gold transition-colors text-[var(--text-primary)] text-xs font-poppins font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  <Phone size={15} className="mr-2 text-gold" /> 
                  <span>{dict.team.call}</span>
                </a>
                <a 
                  href={`https://wa.me/${member.whatsapp}?text=Hi%20${encodeURIComponent(member.name)},%20I%20want%20to%20enquire%20about%20a%20vehicle%20booking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-colors text-xs font-poppins font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  <MessageCircle size={15} className="mr-2" /> 
                  <span>{dict.team.whatsapp}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
