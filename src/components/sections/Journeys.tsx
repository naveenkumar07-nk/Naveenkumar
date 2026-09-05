"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Journeys() {
  const { dict } = useLanguage();
  
  const timeline = [
    { route: "Salem → Bangalore", date: dict.journeys.dates.jun26, type: dict.journeys.corp },
    { route: "Salem → Chennai", date: dict.journeys.dates.may26, type: dict.journeys.family },
    { route: "Salem → Kerala", date: dict.journeys.dates.nov25, type: dict.journeys.devotional },
    { route: "Salem → Ooty", date: dict.journeys.dates.mar26, type: dict.journeys.tourist },
  ];

  return (
    <section id="journeys" className="py-24 bg-charcoal-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm text-gold font-poppins tracking-[0.3em] uppercase mb-4">{dict.journeys.tagline}</h2>
          <h3 className="text-3xl md:text-5xl font-poppins font-bold text-white uppercase tracking-wider">
            {dict.journeys.title}
          </h3>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <div key={index} className="flex relative pb-12 last:pb-0">
              {/* Timeline line */}
              {index !== timeline.length - 1 && (
                <div className="absolute left-6 top-10 bottom-0 w-px bg-charcoal-lighter"></div>
              )}
              
              {/* Timeline dot */}
              <div className="w-12 h-12 rounded-full bg-charcoal flex items-center justify-center border-2 border-gold z-10 shrink-0">
                <div className="w-3 h-3 rounded-full bg-gold"></div>
              </div>
              
              {/* Content */}
              <div className="ml-8 pt-2">
                <h4 className="text-xl md:text-2xl font-poppins font-bold text-white mb-1">
                  {item.route}
                </h4>
                <div className="flex items-center text-gray-400 text-sm font-medium uppercase tracking-wider">
                  <span className="text-gold">{item.date}</span>
                  <span className="mx-3">•</span>
                  <span>{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
