"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, AlertTriangle, ShieldAlert } from "lucide-react";

export default function SecurityStatus() {
  return (
    <div className="glass-subtle p-8 rounded-[2rem] border border-white/10 h-full flex flex-col relative overflow-hidden group">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-insight-teal/10 flex items-center justify-center text-insight-teal animate-pulse-glow">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Security Vault</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-insight-teal">All Layers Active</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {/* Status Item 1 */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group/item hover:border-insight-teal/20 transition-all">
          <div className="flex items-center gap-4">
            <Lock size={16} className="text-[var(--text-muted)] group-hover/item:text-insight-teal transition-colors" />
            <span className="text-sm font-semibold">End-to-End Encryption</span>
          </div>
          <span className="text-[10px] font-bold text-insight-teal uppercase tracking-widest bg-insight-teal/10 px-2 py-1 rounded-md">AES-256</span>
        </div>

        {/* Status Item 2 */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group/item hover:border-aura-violet/20 transition-all">
          <div className="flex items-center gap-4">
            <ShieldAlert size={16} className="text-[var(--text-muted)] group-hover/item:text-aura-violet transition-colors" />
            <span className="text-sm font-semibold">Intrusion Detection</span>
          </div>
          <span className="text-[10px] font-bold text-aura-violet uppercase tracking-widest bg-aura-violet/10 px-2 py-1 rounded-md">Enabled</span>
        </div>

        {/* Status Item 3 */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group/item hover:border-green-500/20 transition-all">
          <div className="flex items-center gap-4">
            <AlertTriangle size={16} className="text-[var(--text-muted)] group-hover/item:text-green-500 transition-colors" />
            <span className="text-sm font-semibold">Compliance Status</span>
          </div>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-md">SOC2 Type II</span>
        </div>
      </div>

      {/* Interactive CTA */}
      <button className="w-full mt-8 py-4 rounded-xl gradient-flow text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all">
        Security Audit Log
      </button>

      {/* Background Icon */}
      <ShieldCheck className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-700" />
    </div>
  );
}
