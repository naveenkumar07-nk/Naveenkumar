"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Snowflake, Music, BatteryCharging, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Fleet() {
  const { dict } = useLanguage();
  
  const vehicles = [
    {
      id: "urbania",
      name: "Force Urbania",
      type: "Premium Traveller",
      image: "/images/urbania.jpg", 
      description: dict.fleet.urbaniaDesc,
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
      name: "Traveller",
      type: "Group Travel Coach",
      image: "/images/travells_photo.jpeg", 
      description: dict.fleet.travellerDesc,
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
    <section id="fleet" className="py-24 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm text-gold font-poppins tracking-[0.3em] uppercase mb-4">{dict.fleet.tagline}</h2>
          <h3 className="text-3xl md:text-5xl font-poppins font-bold text-white uppercase tracking-wider">
            {dict.fleet.title}
          </h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="space-y-24">
          {vehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2 relative">
                <div className="aspect-[4/3] rounded-sm overflow-hidden border border-charcoal-lighter">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} w-32 h-32 bg-gold/10 -z-10 blur-2xl`}></div>
              </div>

              <div className="w-full lg:w-1/2">
                <p className="text-gold font-poppins tracking-widest text-sm uppercase mb-2">{vehicle.type}</p>
                <h4 className="text-3xl font-poppins font-bold text-white mb-6 tracking-wide">{vehicle.name}</h4>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {vehicle.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {vehicle.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <span className="text-gold mr-3">{feature.icon}</span>
                      <span className="text-sm font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={`https://wa.me/919159824141?text=Hi, I would like to know more about the ${vehicle.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gold hover:text-white transition-colors font-poppins font-semibold uppercase tracking-widest text-sm group"
                >
                  {dict.fleet.enquire} 
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
