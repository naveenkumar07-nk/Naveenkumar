"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Tag,
  Bus,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  Eye,
  CalendarDays,
  Route,
  Megaphone,
  ChevronRight,
  Clock,
  Flame,
} from "lucide-react";
import { useOffers, Offer, OfferType } from "@/context/OffersContext";

const AUTH_KEY = "shankar_admin_auth";

const OFFER_TYPES: OfferType[] = ["Corporate", "Family", "Devotional", "Tourist", "Festival", "Weekend"];

const TYPE_COLORS: Record<OfferType, string> = {
  Corporate: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  Family: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  Devotional: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  Tourist: "text-green-400 bg-green-400/10 border-green-400/30",
  Festival: "text-rose-400 bg-rose-400/10 border-rose-400/30",
  Weekend: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
};

const ROUTES = [
  "Salem ↔ Bangalore (Bengaluru)",
  "Salem ↔ Chennai",
  "Salem ↔ Kerala (Cochin / Munnar / Sabarimala)",
  "Salem ↔ Ooty & Kodaikanal",
  "Salem ↔ Tirupati & Rameshwaram",
  "Salem ↔ Pondicherry",
  "Salem ↔ Madurai",
  "Salem ↔ Coimbatore",
  "Custom Route",
];

type NavTab = "overview" | "offers";

const emptyForm = {
  title: "",
  route: ROUTES[0],
  customRoute: "",
  description: "",
  discount: "",
  validUntil: "",
  type: "Tourist" as OfferType,
  isActive: true,
  whatsappMsg: "",
};

export default function AdminDashboard() {
  const router = useRouter();
  const { offers, addOffer, updateOffer, deleteOffer, toggleOffer, activeOffers } = useOffers();

  const [tab, setTab] = useState<NavTab>("overview");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [checking, setChecking] = useState(true);

  // Auth guard
  useEffect(() => {
    try {
      if (localStorage.getItem(AUTH_KEY) !== "true") {
        router.replace("/admin");
        return;
      }
    } catch {
      router.replace("/admin");
      return;
    }
    setChecking(false);
  }, [router]);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    router.push("/admin");
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  };

  const openEditForm = (offer: Offer) => {
    setEditingId(offer.id);
    setForm({
      title: offer.title,
      route: ROUTES.includes(offer.route) ? offer.route : "Custom Route",
      customRoute: ROUTES.includes(offer.route) ? "" : offer.route,
      description: offer.description,
      discount: offer.discount,
      validUntil: offer.validUntil,
      type: offer.type,
      isActive: offer.isActive,
      whatsappMsg: offer.whatsappMsg,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalRoute = form.route === "Custom Route" ? form.customRoute : form.route;
    const payload = {
      title: form.title.trim(),
      route: finalRoute.trim(),
      description: form.description.trim(),
      discount: form.discount.trim(),
      validUntil: form.validUntil,
      type: form.type,
      isActive: form.isActive,
      whatsappMsg:
        form.whatsappMsg.trim() ||
        `Hi, I'm interested in the ${form.title} offer for ${finalRoute}.`,
    };

    if (editingId) {
      updateOffer(editingId, payload);
      showToast("Offer updated successfully!");
    } else {
      addOffer(payload);
      showToast("Offer created and published!");
    }
    setShowForm(false);
    setEditingId(null);
    setTab("offers");
  };

  const handleDelete = (id: string) => {
    deleteOffer(id);
    setDeleteConfirm(null);
    showToast("Offer deleted.", "error");
  };

  const expiredCount = offers.filter((o) => {
    if (!o.validUntil) return false;
    return new Date(o.validUntil) < new Date();
  }).length;

  if (checking) {
    return (
      <div className="min-h-screen bg-[#07080c] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] flex flex-col lg:flex-row font-inter text-white">
      {/* ─── Sidebar ─────────────────────────────────────── */}
      <aside className="w-full lg:w-64 bg-[#0c0e15] border-b lg:border-b-0 lg:border-r border-white/8 flex lg:flex-col items-center lg:items-stretch justify-between lg:justify-start p-4 lg:p-0 shrink-0">
        {/* Logo */}
        <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-white/8">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.25)] bg-black/40">
            <Image
              src="/images/travelslogo.png"
              alt="Shankar Travels Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-poppins font-black text-white leading-tight">Shankar Travels</p>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d4af37]/40 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.25)] bg-black/40">
            <Image
              src="/images/travelslogo.png"
              alt="Shankar Travels Logo"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <p className="text-sm font-poppins font-black text-white">Admin</p>
        </div>

        {/* Nav links */}
        <nav className="flex lg:flex-col gap-1 lg:gap-0.5 lg:mt-4 lg:px-3">
          {[
            { id: "overview" as NavTab, icon: LayoutDashboard, label: "Overview" },
            { id: "offers" as NavTab, icon: Tag, label: "Offers" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => setTab(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                tab === id
                  ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={17} />
              <span className="hidden lg:block">{label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="lg:mt-auto lg:px-3 lg:pb-5">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/8 transition-all w-full"
          >
            <LogOut size={17} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#07080c]/90 backdrop-blur-xl z-20">
          <div>
            <h1 className="text-lg font-poppins font-black text-white capitalize">
              {tab === "overview" ? "Dashboard Overview" : "Offers Manager"}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button
            id="admin-new-offer-btn"
            onClick={openAddForm}
            className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all"
          >
            <Plus size={15} />
            <span>New Offer</span>
          </button>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {/* ── OVERVIEW TAB ─────────────────────────────────── */}
          {tab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Offers", value: offers.length, icon: Tag, color: "text-[#d4af37]", bg: "bg-[#d4af37]/10 border-[#d4af37]/20" },
                  { label: "Active Offers", value: activeOffers.length, icon: Flame, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
                  { label: "Live on Site", value: activeOffers.length, icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
                  { label: "Expired", value: expiredCount, icon: Clock, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
                ].map(({ label, value, icon: Icon, color, bg }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    className={`bg-[#11131a] border rounded-2xl p-5 ${bg}`}
                  >
                    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${bg} mb-3`}>
                      <Icon size={20} className={color} />
                    </div>
                    <p className={`text-3xl font-poppins font-black ${color}`}>{value}</p>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-0.5">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Site info cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Quick Links */}
                <div className="bg-[#11131a] border border-white/8 rounded-2xl p-6">
                  <h3 className="text-sm font-poppins font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={15} className="text-[#d4af37]" />
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Create a new offer", action: openAddForm },
                      { label: "View all offers", action: () => setTab("offers") },
                      { label: "Visit main website", action: () => window.open("/", "_blank") },
                    ].map(({ label, action }, i) => (
                      <button
                        key={i}
                        onClick={action}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/4 hover:bg-white/8 border border-white/6 hover:border-[#d4af37]/30 rounded-xl text-sm text-slate-300 hover:text-white transition-all group"
                      >
                        <span>{label}</span>
                        <ChevronRight size={15} className="text-slate-600 group-hover:text-[#d4af37] transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Route Coverage */}
                <div className="bg-[#11131a] border border-white/8 rounded-2xl p-6">
                  <h3 className="text-sm font-poppins font-bold text-white mb-4 flex items-center gap-2">
                    <Route size={15} className="text-[#d4af37]" />
                    Route Coverage
                  </h3>
                  <div className="space-y-2">
                    {ROUTES.slice(0, 5).map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60 shrink-0" />
                        <span className="text-xs text-slate-400 font-inter">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active offers preview */}
              <div className="bg-[#11131a] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-poppins font-bold text-white flex items-center gap-2">
                    <Megaphone size={15} className="text-[#d4af37]" />
                    Active Offers (Live on Website)
                  </h3>
                  <button
                    onClick={() => setTab("offers")}
                    className="text-xs text-[#d4af37] hover:text-amber-400 font-mono uppercase tracking-wider transition-colors"
                  >
                    Manage all →
                  </button>
                </div>
                {activeOffers.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    <Tag size={28} className="mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No active offers. Create one to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className="flex items-center gap-4 px-4 py-3 bg-white/4 border border-white/6 rounded-xl"
                      >
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${TYPE_COLORS[offer.type]}`}>
                          {offer.type}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{offer.title}</p>
                          <p className="text-xs text-slate-500 truncate">{offer.route}</p>
                        </div>
                        <span className="text-[#d4af37] font-poppins font-black text-sm shrink-0">{offer.discount}</span>
                        {offer.validUntil && (
                          <span className="text-[10px] text-slate-600 font-mono shrink-0 flex items-center gap-1">
                            <CalendarDays size={10} />
                            {new Date(offer.validUntil).toLocaleDateString("en-IN")}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── OFFERS TAB ───────────────────────────────────── */}
          {tab === "offers" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              {offers.length === 0 ? (
                <div className="text-center py-20 text-slate-600">
                  <Tag size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-poppins font-bold text-slate-500 mb-2">No offers yet</p>
                  <p className="text-sm mb-6">Create your first offer and it will appear on the website immediately.</p>
                  <button
                    onClick={openAddForm}
                    className="inline-flex items-center gap-2 py-2.5 px-6 bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                  >
                    <Plus size={14} /> Create Offer
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer, index) => {
                    const isExpired = offer.validUntil && new Date(offer.validUntil) < new Date();
                    return (
                      <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-[#11131a] border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4 transition-all ${
                          offer.isActive && !isExpired
                            ? "border-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.06)]"
                            : "border-white/6 opacity-70"
                        }`}
                      >
                        {/* Status dot */}
                        <div className="shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              offer.isActive && !isExpired ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" : isExpired ? "bg-red-500" : "bg-slate-600"
                            }`}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <h3 className="text-sm font-poppins font-bold text-white">{offer.title}</h3>
                            <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${TYPE_COLORS[offer.type]}`}>
                              {offer.type}
                            </span>
                            {isExpired && (
                              <span className="text-[10px] font-mono text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
                                EXPIRED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mb-0.5">{offer.route}</p>
                          <p className="text-xs text-slate-600 truncate">{offer.description}</p>
                        </div>

                        {/* Discount badge */}
                        <div className="shrink-0">
                          <span className="text-[#d4af37] font-poppins font-black text-base">{offer.discount}</span>
                          {offer.validUntil && (
                            <p className="text-[10px] text-slate-600 font-mono flex items-center gap-1 mt-0.5">
                              <CalendarDays size={9} />
                              Until {new Date(offer.validUntil).toLocaleDateString("en-IN")}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Toggle */}
                          <button
                            onClick={() => toggleOffer(offer.id)}
                            title={offer.isActive ? "Deactivate" : "Activate"}
                            className="p-2 rounded-xl hover:bg-white/6 text-slate-500 hover:text-[#d4af37] transition-all"
                          >
                            {offer.isActive ? <ToggleRight size={20} className="text-green-400" /> : <ToggleLeft size={20} />}
                          </button>
                          {/* Edit */}
                          <button
                            onClick={() => openEditForm(offer)}
                            title="Edit"
                            className="p-2 rounded-xl hover:bg-white/6 text-slate-500 hover:text-[#d4af37] transition-all"
                          >
                            <Pencil size={16} />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setDeleteConfirm(offer.id)}
                            title="Delete"
                            className="p-2 rounded-xl hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* ─── Offer Form Modal ─────────────────────────────── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-[#11131a] border border-white/12 rounded-3xl p-7 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-poppins font-black text-white">
                  {editingId ? "Edit Offer" : "Create New Offer"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 rounded-xl hover:bg-white/8 text-slate-500 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Offer Title *
                  </label>
                  <input
                    id="offer-title"
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. Festival Season Special"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 rounded-xl text-white placeholder-slate-600 text-sm transition-all"
                  />
                </div>

                {/* Route */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Route *
                  </label>
                  <select
                    id="offer-route"
                    value={form.route}
                    onChange={(e) => setForm({ ...form, route: e.target.value as string })}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 rounded-xl text-white text-sm transition-all appearance-none"
                  >
                    {ROUTES.map((r) => (
                      <option key={r} value={r} className="bg-[#11131a]">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom route input */}
                {form.route === "Custom Route" && (
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Custom Route *
                    </label>
                    <input
                      id="offer-custom-route"
                      type="text"
                      value={form.customRoute}
                      onChange={(e) => setForm({ ...form, customRoute: e.target.value })}
                      required
                      placeholder="e.g. Salem ↔ Mysore"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 rounded-xl text-white placeholder-slate-600 text-sm transition-all"
                    />
                  </div>
                )}

                {/* Type & Discount */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Type *
                    </label>
                    <select
                      id="offer-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as OfferType })}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none rounded-xl text-white text-sm appearance-none"
                    >
                      {OFFER_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-[#11131a]">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Discount *
                    </label>
                    <input
                      id="offer-discount"
                      type="text"
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: e.target.value })}
                      required
                      placeholder="e.g. 20% OFF or ₹500 OFF"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none rounded-xl text-white placeholder-slate-600 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Description *
                  </label>
                  <textarea
                    id="offer-description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={3}
                    placeholder="Brief description of this offer..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/15 rounded-xl text-white placeholder-slate-600 text-sm resize-none transition-all"
                  />
                </div>

                {/* Valid Until */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Valid Until
                  </label>
                  <input
                    id="offer-valid-until"
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm({ ...form, validUntil: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none rounded-xl text-white text-sm transition-all"
                  />
                </div>

                {/* WhatsApp message */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    WhatsApp Message (auto-generated if empty)
                  </label>
                  <textarea
                    id="offer-whatsapp-msg"
                    value={form.whatsappMsg}
                    onChange={(e) => setForm({ ...form, whatsappMsg: e.target.value })}
                    rows={2}
                    placeholder="Message sent when customer clicks Book Now..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-[#d4af37]/50 focus:outline-none rounded-xl text-white placeholder-slate-600 text-sm resize-none transition-all"
                  />
                </div>

                {/* Active toggle */}
                <div className="flex items-center gap-3 py-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`relative w-11 h-6 rounded-full transition-colors ${form.isActive ? "bg-green-400" : "bg-slate-700"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.isActive ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                  <span className="text-sm text-slate-300 font-inter">
                    {form.isActive ? "Active — visible on website" : "Inactive — hidden from website"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 bg-white/6 border border-white/10 hover:bg-white/10 text-slate-300 font-poppins font-bold text-xs tracking-widest uppercase rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    id="offer-submit-btn"
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-poppins font-extrabold text-xs tracking-widest uppercase rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={14} />
                    {editingId ? "Save Changes" : "Publish Offer"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirm Modal ──────────────────────────── */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#11131a] border border-red-500/20 rounded-2xl p-7 w-full max-w-sm shadow-2xl"
            >
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={22} className="text-red-400" />
                </div>
                <h3 className="text-lg font-poppins font-black text-white mb-2">Delete Offer?</h3>
                <p className="text-sm text-slate-400 mb-6">This will permanently remove the offer from the website.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 py-2.5 bg-white/6 border border-white/10 text-slate-300 font-poppins font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    id="confirm-delete-btn"
                    onClick={() => handleDelete(deleteConfirm!)}
                    className="flex-1 py-2.5 bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 font-poppins font-bold text-xs tracking-widest uppercase rounded-xl transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Toast ────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold font-inter ${
              toast.type === "success"
                ? "bg-[#11131a] border-[#d4af37]/30 text-white"
                : "bg-[#11131a] border-red-500/30 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={16} className="text-[#d4af37]" />
            ) : (
              <Trash2 size={16} className="text-red-400" />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
