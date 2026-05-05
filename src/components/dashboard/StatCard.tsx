"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: LucideIcon;
  color: string;
}

export default function StatCard({ label, value, trend, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-subtle p-6 rounded-3xl border border-white/5 group hover:border-white/10 transition-all shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500" 
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`text-[10px] font-bold px-2 py-1 rounded-lg ${trend.isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
            {trend.isUp ? "+" : "-"}{trend.value}%
          </div>
        )}
      </div>
      
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">{value}</h3>
      </div>
      
      {/* Decorative Glow */}
      <div 
        className="absolute bottom-0 right-0 w-16 h-16 blur-[30px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}
