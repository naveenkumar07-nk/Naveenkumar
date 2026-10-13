"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Calendar, Users, Car, User, Phone, CheckCircle } from "lucide-react";
import { GlowingButton } from "./GlowingButton";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialVehicle?: string;
  initialDate?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  initialDestination = "Ooty & Kodaikanal",
  initialVehicle = "Shankar Luxury Bus (21 Seats)",
  initialDate = "2026-10-05",
}: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: initialDestination,
    vehicle: initialVehicle,
    date: initialDate,
    passengers: "15",
    pickup: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = 
`🚌 *SHANKAR TRAVELS BOOKING ENQUIRY*
--------------------------------
👤 *Name:* ${formData.name || "Customer"}
📞 *Phone:* ${formData.phone || "Not specified"}
📍 *Destination:* ${formData.destination}
🚍 *Vehicle:* ${formData.vehicle}
📅 *Travel Date:* ${formData.date}
👥 *Passengers:* ${formData.passengers}
🏠 *Pickup:* ${formData.pickup || "Madurai"}
📝 *Notes:* ${formData.notes || "None"}
--------------------------------
Please provide availability and pricing details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919159824141?text=${encodedMessage}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-charcoal-light border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-white z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono text-gold tracking-[0.25em] uppercase block mb-1">
                SHANKAR TRAVELS ENQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-poppins font-extrabold text-white uppercase tracking-wider">
                Book Your Journey
              </h2>
              <p className="text-xs text-gray-400 font-light mt-1">
                Fill details to get instant quote & availability directly on WhatsApp
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-[#25D366] animate-bounce mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Redirecting to WhatsApp...</h3>
                <p className="text-xs text-gray-300">Opening chat with Shankar Travels</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <User size={12} className="inline mr-1 text-gold" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <Phone size={12} className="inline mr-1 text-gold" /> Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="WhatsApp Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Destination & Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <MapPin size={12} className="inline mr-1 text-gold" /> Destination
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Ooty & Kodaikanal">Ooty & Kodaikanal</option>
                      <option value="Madurai & Rameshwaram">Madurai & Rameshwaram</option>
                      <option value="Chennai & Pondicherry">Chennai & Pondicherry</option>
                      <option value="Munnar & Alleppey (Kerala)">Munnar & Alleppey</option>
                      <option value="Custom Outstation Trip">Custom Outstation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <Car size={12} className="inline mr-1 text-gold" /> Vehicle Choice
                    </label>
                    <select
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Shankar Luxury Bus (21 Seats)">Shankar Luxury Bus (21 Seats)</option>
                      <option value="Force Urbania (17 Seats)">Force Urbania (17 Seats)</option>
                    </select>
                  </div>
                </div>

                {/* Date & Passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <Calendar size={12} className="inline mr-1 text-gold" /> Travel Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                      <Users size={12} className="inline mr-1 text-gold" /> Passengers
                    </label>
                    <input
                      type="number"
                      name="passengers"
                      min="1"
                      max="30"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="text-[10px] font-mono text-gray-300 uppercase tracking-wider block mb-1">
                    Pickup City / Address
                  </label>
                  <input
                    type="text"
                    name="pickup"
                    placeholder="e.g. Madurai, Dindigul, Trichy..."
                    value={formData.pickup}
                    onChange={handleChange}
                    className="w-full bg-charcoal/90 border border-white/15 focus:border-gold rounded-xl p-3 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <GlowingButton
                    variant="neon"
                    className="w-full py-4 text-xs tracking-widest bg-gradient-to-r from-emerald-600 to-green-500 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                  >
                    <Send size={14} className="mr-2" />
                    SUBMIT & CHAT ON WHATSAPP
                  </GlowingButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
