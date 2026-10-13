"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface SmoothScrollIndicatorProps {
  progress?: number;
  label?: string;
  onClick?: () => void;
}

export default function SmoothScrollIndicator({
  progress = 0,
  label = "SCROLL DOWN",
  onClick,
}: SmoothScrollIndicatorProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 cursor-pointer group select-none"
    >
      <span className="text-[10px] font-mono font-medium tracking-[0.3em] text-gold/80 group-hover:text-gold transition-colors uppercase">
        {label} ({percentage}%)
      </span>

      {/* Mouse Pill Container */}
      <div className="relative w-6 h-10 rounded-full border-2 border-gold/40 group-hover:border-gold transition-colors flex justify-center p-1 bg-charcoal/50 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        {/* Animated Dot inside mouse */}
        <motion.div
          animate={{
            y: [0, 16, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_#d4af37]"
        />
      </div>

      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-gold/60 group-hover:text-gold transition-colors"
      >
        <ArrowDown size={14} />
      </motion.div>
    </div>
  );
}
