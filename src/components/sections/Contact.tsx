"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { dict } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", destination: "", vehicle: "Shankar Luxury Bus (21 Seats)" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Shankar Travels! New Booking Enquiry:\nName: ${formData.name}\nPhone: ${formData.phone}\nTravel Date: ${formData.date}\nDestination: ${formData.destination}\nVehicle: ${formData.vehicle}`;
    window.open(`https://wa.me/919159824141?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 pb-28 md:pb-24 bg-[var(--bg-primary)] relative border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-black text-[var(--text-primary)] uppercase tracking-tight">
            {dict.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-3 font-normal max-w-2xl mx-auto">
            {dict.contact.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Quick Contact Card */}
          <div className="bg-[var(--card-bg)] p-6 sm:p-8 border border-[var(--border-color)] rounded-3xl shadow-lg">
            <h3 className="text-xl font-poppins font-bold text-gold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock size={20} />
              <span>24/7 OUTSTATION BOOKING</span>
            </h3>
            <div className="space-y-4">
              <a href="tel:+919159824141" className="p-4 bg-white/5 border border-[var(--border-color)] hover:border-gold rounded-2xl transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-gold/10 text-gold rounded-xl group-hover:bg-gold group-hover:text-black transition-colors"><Phone size={20} /></span>
                  <div>
                    <span className="block text-xs font-mono text-gold font-bold uppercase tracking-wider">PRIMARY BOOKING</span>
                    <span className="text-lg font-poppins font-extrabold text-[var(--text-primary)]">+91 91598 24141</span>
                  </div>
                </div>
                <span className="text-xs text-gold font-bold font-mono group-hover:translate-x-1 transition-transform">CALL →</span>
              </a>
              <a href="tel:+919442702912" className="p-4 bg-white/5 border border-[var(--border-color)] hover:border-gold rounded-2xl transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-white/10 text-[var(--text-primary)] rounded-xl group-hover:bg-gold group-hover:text-black transition-colors"><Phone size={20} /></span>
                  <div>
                    <span className="block text-xs font-mono text-[var(--text-secondary)] font-bold uppercase tracking-wider">DRIVER CONTACT</span>
                    <span className="text-lg font-poppins font-extrabold text-[var(--text-primary)]">+91 94427 02912</span>
                  </div>
                </div>
                <span className="text-xs text-[var(--text-secondary)] group-hover:text-gold font-bold font-mono group-hover:translate-x-1 transition-transform">CALL →</span>
              </a>
              <a href="https://wa.me/919159824141?text=Hi%20Shankar%20Travels,%20I%20want%20to%20enquire%20about%20vehicle%20booking." target="_blank" rel="noopener noreferrer"
                className="p-4 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] rounded-2xl transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-xl group-hover:bg-[#25D366] group-hover:text-black transition-colors"><MessageCircle size={20} /></span>
                  <div>
                    <span className="block text-xs font-mono text-[#25D366] font-bold uppercase tracking-wider">INSTANT WHATSAPP</span>
                    <span className="text-base font-poppins font-extrabold text-[var(--text-primary)]">Chat With Shankar Travels</span>
                  </div>
                </div>
                <span className="text-xs text-[#25D366] font-bold font-mono group-hover:translate-x-1 transition-transform">CHAT →</span>
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" /><span>Salem, Tamil Nadu</span></span>
              <span className="text-gold font-bold">ALL SOUTH INDIA TOURS</span>
            </div>
          </div>

          {/* Quick Enquiry Form */}
          <div className="bg-[var(--card-bg)] p-6 sm:p-8 border border-[var(--border-color)] rounded-3xl shadow-lg">
            <h3 className="text-xl font-poppins font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">QUICK TRIP ENQUIRY</h3>
            <p className="text-xs text-[var(--text-secondary)] font-normal mb-6">Fill in your details to open an instant WhatsApp quote.</p>

            {submitted ? (
              <div className="p-6 bg-gold/10 border border-gold/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={40} className="text-gold mx-auto" />
                <h4 className="text-lg font-poppins font-bold text-[var(--text-primary)] uppercase">Enquiry Sent!</h4>
                <p className="text-xs text-[var(--text-secondary)]">Your trip details were sent via WhatsApp. We will reply shortly!</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-xs text-gold font-mono uppercase underline font-bold">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-1">YOUR NAME *</label>
                  <input type="text" required placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-[var(--border-color)] focus:border-gold rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-1">PHONE NUMBER *</label>
                  <input type="tel" required placeholder="Enter 10-digit mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-[var(--border-color)] focus:border-gold rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-1">TRAVEL DATE *</label>
                    <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white/5 border border-[var(--border-color)] focus:border-gold rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-1">DESTINATION *</label>
                    <input type="text" required placeholder="e.g. Bangalore, Ooty" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full bg-white/5 border border-[var(--border-color)] focus:border-gold rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[var(--text-secondary)] uppercase mb-1">SELECT VEHICLE *</label>
                  <select value={formData.vehicle} onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] focus:border-gold rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none transition-colors">
                    <option value="Shankar Luxury Bus (21 Seats)">Shankar Luxury Traveller (21 Seats)</option>
                    <option value="Force Urbania (17 Seats)">Force Urbania (17 Seats)</option>
                    <option value="Both / Need Recommendation">Both / Need Recommendation</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-gold via-amber-400 to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2">
                  <Send size={16} />
                  <span>REQUEST FARE ON WHATSAPP</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
