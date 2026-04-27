"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function ActivityChart() {
  return (
    <div className="glass rounded-[2rem] border border-white/10 p-8 flex flex-col h-full relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-insight-teal/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h3 className="text-xl font-bold mb-1">Flow Intelligence</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Real-time Global Throughput</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-insight-teal" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aura-violet" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Outbound</span>
          </div>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <Info size={14} className="text-[var(--text-muted)] cursor-help" />
        </div>
      </div>

      <div className="flex-1 relative min-h-[240px]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chart-grad-teal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="chart-grad-violet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {[...Array(5)].map((_, i) => (
            <line 
              key={i} 
              x1="0" y1={i * 25 + "%"} x2="100%" y2={i * 25 + "%"} 
              stroke="white" strokeOpacity="0.03" strokeWidth="1" 
            />
          ))}

          {/* Data Path: Inbound */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0 180 Q 100 120, 200 150 T 400 80 T 600 130 T 800 60 T 1000 100 T 1200 40 L 1200 300 L 0 300 Z"
            fill="url(#chart-grad-teal)"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            d="M0 180 Q 100 120, 200 150 T 400 80 T 600 130 T 800 60 T 1000 100 T 1200 40"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Data Path: Outbound */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d="M0 220 Q 150 200, 300 210 T 500 160 T 750 190 T 1000 140 T 1200 180 L 1200 300 L 0 300 Z"
            fill="url(#chart-grad-violet)"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            d="M0 220 Q 150 200, 300 210 T 500 160 T 750 190 T 1000 140 T 1200 180"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </svg>

        {/* Hover Points / Hotspots */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-[25%] left-[58%] w-4 h-4 rounded-full bg-insight-teal shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        />
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-6 px-2">
        {["14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map((t) => (
          <span key={t} className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">{t}</span>
        ))}
      </div>
    </div>
  );
}
