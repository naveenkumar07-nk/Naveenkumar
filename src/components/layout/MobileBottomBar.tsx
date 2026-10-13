"use client";

import React, { useState, useEffect } from "react";
import { Home, Flame, Bus, Compass, MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MobileBottomBar() {
  const { dict } = useLanguage();
  const [activeTab, setActiveTab] = useState("#");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash || "#");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navItems = [
    {
      id: "#",
      label: dict.nav.home,
      icon: Home,
      href: "#",
    },
    {
      id: "#special-offers",
      label: dict.nav.offers,
      icon: Flame,
      href: "#special-offers",
      badge: "HOT",
    },
    {
      id: "#fleet",
      label: dict.nav.fleet,
      icon: Bus,
      href: "#fleet",
    },
    {
      id: "#journeys",
      label: dict.nav.journeys,
      icon: Compass,
      href: "#journeys",
    },
    {
      id: "#contact",
      label: dict.nav.contact,
      icon: MessageSquare,
      href: "#contact",
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 w-full z-40 bg-[var(--bg-primary)]/95 backdrop-blur-2xl border-t border-[var(--border-color)] shadow-[0_-8px_30px_rgba(0,0,0,0.4)] px-1 py-1.5 transition-colors duration-300"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? "text-gold font-bold"
                  : "text-[var(--text-secondary)] hover:text-gold"
              }`}
            >
              {/* Active subtle top dot or background highlight */}
              {isActive && (
                <span className="absolute -top-1 w-5 h-0.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative p-1">
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? "scale-110 text-gold" : ""
                  }`}
                />

                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-gradient-to-r from-red-500 to-amber-500 text-[8px] font-mono font-black text-white rounded-full leading-tight uppercase animate-pulse shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[10px] font-poppins font-medium tracking-tight truncate max-w-[64px] text-center mt-0.5 leading-tight">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
