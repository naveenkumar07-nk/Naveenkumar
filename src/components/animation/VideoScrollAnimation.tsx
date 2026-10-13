"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

interface VideoScrollAnimationProps {
  progress: number; // 0 to 1
  videoUrl?: string;
  posterUrl?: string;
  className?: string;
}

export default function VideoScrollAnimation({
  progress,
  videoUrl,
  posterUrl = "/images/main_photo.jpeg",
  className = "",
}: VideoScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Mouse movement for subtle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Canvas 3D Orb / Ring Renderer synced with scroll progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = 600);
    let height = (canvas.height = 600);
    const centerX = width / 2;
    const centerY = height / 2;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.02;
      const scrollAngle = progress * Math.PI * 4;
      const totalRotation = time * 0.5 + scrollAngle;
      const orbScale = 1 + Math.sin(progress * Math.PI) * 0.3;

      // Outer glowing aura
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        40 * orbScale,
        centerX,
        centerY,
        220 * orbScale
      );
      outerGlow.addColorStop(0, "rgba(212, 175, 55, 0.4)");
      outerGlow.addColorStop(0.4, "rgba(168, 85, 247, 0.25)");
      outerGlow.addColorStop(0.8, "rgba(6, 182, 212, 0.1)");
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240 * orbScale, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Cyber Ring 1 (Gold)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(totalRotation);
      ctx.scale(1, 0.35 + Math.sin(progress * Math.PI) * 0.15);

      ctx.beginPath();
      ctx.arc(0, 0, 160 * orbScale, 0, Math.PI * 2);
      ctx.strokeStyle = "#d4af37";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#d4af37";
      ctx.stroke();

      // Ring Nodes
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const nx = Math.cos(ang) * 160 * orbScale;
        const ny = Math.sin(ang) * 160 * orbScale;
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      ctx.restore();

      // Rotating Cyber Ring 2 (Purple Accent)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-totalRotation * 1.3);
      ctx.scale(0.4 + Math.cos(progress * Math.PI) * 0.1, 1);

      ctx.beginPath();
      ctx.arc(0, 0, 140 * orbScale, 0, Math.PI * 2);
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#a855f7";
      ctx.stroke();
      ctx.restore();

      // Central Core Sphere Gradient
      const coreGradient = ctx.createRadialGradient(
        centerX - 20,
        centerY - 20,
        5,
        centerX,
        centerY,
        90 * orbScale
      );
      coreGradient.addColorStop(0, "#ffffff");
      coreGradient.addColorStop(0.3, "#f3d05a");
      coreGradient.addColorStop(0.7, "#a855f7");
      coreGradient.addColorStop(1, "#0d0d12");

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90 * orbScale, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.shadowBlur = 35;
      ctx.shadowColor = "#d4af37";
      ctx.fill();
      ctx.restore();

      // Orbiting particle trail
      const particleCount = 24;
      for (let p = 0; p < particleCount; p++) {
        const pAngle = totalRotation * 2 + (p * Math.PI * 2) / particleCount;
        const pRadius = (110 + Math.sin(pAngle * 3 + time) * 30) * orbScale;
        const px = centerX + Math.cos(pAngle) * pRadius;
        const py = centerY + Math.sin(pAngle) * (pRadius * 0.4);

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? "#67e8f9" : "#fef08a";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#67e8f9";
        ctx.fill();
      }

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [progress]);

  // Video autoplay/scrub logic if videoUrl provided
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = progress * video.duration;
      }
    }
  }, [progress, isPlaying, videoUrl]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: mousePos.y * -20,
        rotateY: mousePos.x * 20,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl transform scale-125 pointer-events-none" />

      {/* HTML5 Video or Interactive Canvas Animation */}
      {videoUrl ? (
        <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-2 border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            muted
            playsInline
            loop
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="relative w-[300px] h-[300px] md:w-[460px] md:h-[460px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain filter drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] pointer-events-none"
          />
        </div>
      )}

      {/* Floating Center Badge / Play Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 md:bottom-8 px-4 py-2 bg-charcoal-light/80 backdrop-blur-md border border-gold/40 hover:border-gold rounded-full text-xs font-mono text-gold flex items-center gap-2 shadow-lg z-20 cursor-pointer"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        <span>{isPlaying ? "PAUSE PREVIEW" : "INTERACTIVE SCRUB"}</span>
      </motion.button>
    </motion.div>
  );
}
