"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Snowflake, Music, BatteryCharging, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import EnquiryModal from "@/components/ui/EnquiryModal";

export default function Fleet() {
  const { dict } = useLanguage();
  const [selectedVehicleModal, setSelectedVehicleModal] = useState<string | null>(null);
  
  const vehicles = [
    {
      id: "urbania",
      name: "Force Urbania",
      badge: "ULTRA LUXURY 17-SEATER",
      type: "Premium Executive Coach",
      image: "/images/urbania.jpg", 
      description: dict.fleet.urbaniaDesc,
      seats: "17 Pushback Seats",
      features: [
        { icon: <Users size={18} />, text: dict.fleet.features.seats17 },
        { icon: <Snowflake size={18} />, text: dict.fleet.features.ac },
        { icon: <Music size={18} />, text: dict.fleet.features.sound },
        { icon: <BatteryCharging size={18} />, text: dict.fleet.features.charging },
        { icon: <Briefcase size={18} />, text: dict.fleet.features.luggage },
      ]
    },
    {
      id: "traveller",
      name: "Shankar Luxury Traveller",
      badge: "SPACIOUS 21-SEATER",
      type: "Group & Outstation Coach",
      image: "/images/travells_photo.jpeg", 
      description: dict.fleet.travellerDesc,
      seats: "21 Pushback Seats",
      features: [
        { icon: <Users size={18} />, text: dict.fleet.features.seats21 },
        { icon: <Snowflake size={18} />, text: dict.fleet.features.ac },
        { icon: <Music size={18} />, text: dict.fleet.features.sound },
        { icon: <BatteryCharging size={18} />, text: dict.fleet.features.charging },
        { icon: <Briefcase size={18} />, text: dict.fleet.features.luggage },
      ]
    }
  ];

  return (
    <section id="fleet" className="pt-10 pb-20 md:pt-14 md:pb-24 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (Eyebrow 2 of max 3 allowed) */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[11px] text-gold font-mono font-bold tracking-[0.25em] uppercase px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30">
            {dict.fleet.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight mt-4">
            {dict.fleet.title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl mx-auto mt-3 font-normal">
            Equipped with modern reclining seats, powerful climate control, LED ambient lighting, and ample luggage space.
          </p>
        </div>

        {/* Vehicles Bento Layout */}
        <div className="space-y-12 md:space-y-20">
          {vehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-8 lg:gap-14 items-center bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-gold/40 rounded-3xl p-5 sm:p-8 lg:p-10 transition-all shadow-xl ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-color)] relative shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-gold font-mono font-bold text-[10px] sm:text-xs px-3 py-1 rounded-lg border border-gold/40">
                    {vehicle.badge}
                  </div>
                </div>
              </div>

              {/* Vehicle Specs & Action */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <p className="text-gold font-mono text-xs uppercase tracking-widest font-bold mb-1">
                    {vehicle.type}
                  </p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
                    {vehicle.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-6">
                    {vehicle.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {vehicle.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center text-[var(--text-primary)] bg-white/5 dark:bg-white/5 bg-slate-100 border border-[var(--border-color)] p-2.5 rounded-xl text-xs sm:text-sm font-medium"
                      >
                        <span className="text-gold mr-2.5 p-1 bg-gold/10 rounded-lg">{feature.icon}</span>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={() => setSelectedVehicleModal(vehicle.name)}
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-gold to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{dict.fleet.enquire}</span>
                    <ArrowRight size={16} />
                  </button>

                  <a 
                    href={`https://wa.me/919159824141?text=Hi, I would like to book/enquire about the ${encodeURIComponent(vehicle.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 bg-white/5 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] font-poppins font-bold text-xs tracking-wider uppercase rounded-xl text-center active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>WHATSAPP CHAT</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Enquiry Modal */}
      {selectedVehicleModal && (
        <EnquiryModal
          isOpen={!!selectedVehicleModal}
          onClose={() => setSelectedVehicleModal(null)}
          initialVehicle={selectedVehicleModal}
        />
      )}
    </section>
  );
}
