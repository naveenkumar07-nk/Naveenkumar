"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield, Lock, User } from "lucide-react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "shankar@2024";
const AUTH_KEY = "shankar_admin_auth";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    try {
      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === "true") {
        router.replace("/admin/dashboard");
        return;
      }
    } catch {
      // ignore
    }
    setChecking(false);
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch {
        // ignore
      }
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password. Please try again.");
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#07080c] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-[#d4af37]/50 mb-5 shadow-[0_0_40px_rgba(212,175,55,0.35)] bg-black/50">
            <Image
              src="/images/travelslogo.png"
              alt="Shankar Travels Logo"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-poppins font-black text-white tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-inter">
            Shankar Travels · Salem
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-[#11131a] border border-white/10 rounded-3xl p-8 shadow-2xl"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <h2 className="text-lg font-poppins font-bold text-white mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-[#d4af37]/60 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 rounded-xl text-white placeholder-slate-600 text-sm font-inter transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  id="admin-password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 focus:border-[#d4af37]/60 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 rounded-xl text-white placeholder-slate-600 text-sm font-inter transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#d4af37] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl font-inter">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-poppins font-extrabold text-sm tracking-widest uppercase rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6 font-inter">
            Secured · Shankar Travels Admin Panel
          </p>
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Default credentials: admin / shankar@2024
        </p>
      </div>
    </div>
  );
}
