"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowingButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "outline" | "neon";
  className?: string;
}

export function GlowingButton({
  children,
  href,
  onClick,
  variant = "gold",
  className = "",
}: GlowingButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg overflow-hidden group cursor-pointer";
  
  const variantStyles = {
    gold: "bg-gold text-charcoal shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:bg-gold-light",
    outline: "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]",
    neon: "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]",
  };

  const Content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Dynamic hover light streak */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </>
  );

  if (href) {
    return (
      <motion.a
        whileTap={{ scale: 0.96 }}
        href={href}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {Content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {Content}
    </motion.button>
  );
}
