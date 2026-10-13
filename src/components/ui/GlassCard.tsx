"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "gold" | "purple" | "cyan";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "gold",
  hoverEffect = true,
}: GlassCardProps) {
  const borderGlows = {
    gold: "border-gold/30 hover:border-gold/70 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]",
    purple: "border-purple-500/30 hover:border-purple-500/70 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    cyan: "border-cyan-500/30 hover:border-cyan-500/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]",
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative backdrop-blur-xl bg-charcoal-light/60 border ${borderGlows[glowColor]} rounded-2xl p-6 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Light sheen overlay */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
