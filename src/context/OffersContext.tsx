"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type OfferType = "Corporate" | "Family" | "Devotional" | "Tourist" | "Festival" | "Weekend";

export interface Offer {
  id: string;
  title: string;
  route: string;
  description: string;
  discount: string;
  validUntil: string;
  type: OfferType;
  isActive: boolean;
  whatsappMsg: string;
  createdAt: string;
}

interface OffersContextValue {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id" | "createdAt">) => void;
  updateOffer: (id: string, offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  toggleOffer: (id: string) => void;
  activeOffers: Offer[];
}

const OffersContext = createContext<OffersContextValue | null>(null);

const STORAGE_KEY = "shankar_travels_offers";

const DEFAULT_OFFERS: Offer[] = [
  {
    id: "default-1",
    title: "Festival Season Special",
    route: "Salem ↔ Tirupati",
    description: "Special Diwali pilgrimage package with comfortable journey and experienced driver.",
    discount: "15% OFF",
    validUntil: "2026-11-15",
    type: "Devotional",
    isActive: true,
    whatsappMsg: "Hi, I'm interested in the Festival Season Special offer for Salem to Tirupati.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-2",
    title: "Weekend Hill Getaway",
    route: "Salem ↔ Ooty",
    description: "Refreshing weekend trip to the Nilgiris with our luxury Force Urbania.",
    discount: "₹500 OFF",
    validUntil: "2026-12-31",
    type: "Tourist",
    isActive: true,
    whatsappMsg: "Hi, I'm interested in the Weekend Hill Getaway offer to Ooty.",
    createdAt: new Date().toISOString(),
  },
];

export function OffersProvider({ children }: { children: React.ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOffers(JSON.parse(stored));
      } else {
        setOffers(DEFAULT_OFFERS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_OFFERS));
      }
    } catch {
      setOffers(DEFAULT_OFFERS);
    }
  }, []);

  const persist = useCallback((updated: Offer[]) => {
    setOffers(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // silent
    }
  }, []);

  const addOffer = useCallback(
    (offer: Omit<Offer, "id" | "createdAt">) => {
      const newOffer: Offer = {
        ...offer,
        id: `offer-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persist([...offers, newOffer]);
    },
    [offers, persist]
  );

  const updateOffer = useCallback(
    (id: string, changes: Partial<Offer>) => {
      persist(offers.map((o) => (o.id === id ? { ...o, ...changes } : o)));
    },
    [offers, persist]
  );

  const deleteOffer = useCallback(
    (id: string) => {
      persist(offers.filter((o) => o.id !== id));
    },
    [offers, persist]
  );

  const toggleOffer = useCallback(
    (id: string) => {
      persist(offers.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o)));
    },
    [offers, persist]
  );

  const activeOffers = offers.filter((o) => {
    if (!o.isActive) return false;
    if (o.validUntil) {
      return new Date(o.validUntil) >= new Date();
    }
    return true;
  });

  return (
    <OffersContext.Provider value={{ offers, addOffer, updateOffer, deleteOffer, toggleOffer, activeOffers }}>
      {children}
    </OffersContext.Provider>
  );
}

export function useOffers() {
  const ctx = useContext(OffersContext);
  if (!ctx) throw new Error("useOffers must be used inside OffersProvider");
  return ctx;
}
