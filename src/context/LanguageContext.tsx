"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dictionaries } from "../locales";

type Language = "en" | "ta";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: typeof dictionaries.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("shankar_lang") as Language | null;
      if (savedLang === "en" || savedLang === "ta") {
        setLangState(savedLang);
        return;
      }

      // Check system / browser language
      const systemLanguages = (typeof navigator !== "undefined" && navigator.languages) ? navigator.languages : [navigator.language || "en"];
      const isTamil = systemLanguages.some(
        (l) => typeof l === "string" && l.toLowerCase().startsWith("ta")
      );

      setLangState(isTamil ? "ta" : "en");
    } catch {
      setLangState("en");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("shankar_lang", newLang);
    } catch {
      // ignore
    }
  };

  const dict = dictionaries[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
