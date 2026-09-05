"use client";

import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Team() {
  const { dict } = useLanguage();
  
  const team = [
    {
      role: dict.team.owner,
      name: "Naveenkumar", 
      phone: "+919159824141",
      whatsapp: "919159824141",
      image: "/images/owner_photo.jpg" 
    },
    {
      role: dict.team.driver,
      name: "Angappan", 
      phone: "+919442702912",
      whatsapp: "919159824141",
      image: "" 
    }
  ];

  return (
    <section id="about" className="py-24 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-gold font-poppins tracking-[0.3em] uppercase mb-4">{dict.team.tagline}</h2>
          <h3 className="text-3xl md:text-4xl font-poppins font-bold text-white uppercase tracking-wider">
            {dict.team.title}
          </h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="flex-1 bg-charcoal p-8 border border-charcoal-lighter rounded-sm text-center">
              {member.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.image} alt={member.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-6 border border-gold/30" />
              )}
              <p className="text-gold text-sm font-poppins tracking-widest uppercase mb-2">{member.role}</p>
              <h4 className="text-2xl font-bold text-white mb-8">{member.name}</h4>
              
              <div className="flex justify-center gap-4">
                <a 
                  href={`tel:${member.phone}`}
                  className="flex items-center px-4 py-2 border border-charcoal-lighter hover:border-gold hover:text-gold transition-colors text-white text-sm font-poppins uppercase tracking-wider rounded-sm"
                >
                  <Phone size={16} className="mr-2" /> {dict.team.call}
                </a>
                <a 
                  href={`https://wa.me/${member.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-charcoal transition-colors text-sm font-poppins uppercase tracking-wider rounded-sm"
                >
                  <MessageCircle size={16} className="mr-2" /> {dict.team.whatsapp}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
