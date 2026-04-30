"use client";

import { useState, useEffect } from "react";
import { Search, Bell, User, Menu, Cpu, Wifi, Command, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [latency, setLatency] = useState(12);

  // Simulated live latency tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() * 4 - 2))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return "Overview";
    return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1).replace('-', ' ');
  };

  return (
    <header className="w-full flex items-center justify-between gap-6 py-4">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-white/5 text-data-slate active:scale-95 transition-transform"
      >
        <Menu size={20} />
      </button>

      {/* Dynamic Breadcrumbs */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-data-slate opacity-50">Main Console</span>
          <span className="text-white/10">/</span>
          <motion.span 
            key={pathname}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-flow-indigo"
          >
            {getPageTitle()}
          </motion.span>
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex-1 flex items-center justify-end gap-6">
        
        {/* Real-time System Metrics (Active Elements) */}
        <div className="hidden xl:flex items-center gap-6 px-6 py-2 rounded-2xl bg-white/[0.02] border border-white/5">
           <div className="flex items-center gap-3">
              <Wifi size={14} className="text-insight-teal animate-pulse" />
              <div className="flex flex-col">
                 <span className="text-[7px] font-black text-data-slate uppercase">Latency</span>
                 <span className="text-[10px] font-mono font-bold text-white">{latency.toFixed(0)}ms</span>
              </div>
           </div>
           <div className="w-px h-6 bg-white/5" />
           <div className="flex items-center gap-3">
              <Cpu size={14} className="text-flow-indigo" />
              <div className="flex flex-col">
                 <span className="text-[7px] font-black text-data-slate uppercase">Core Load</span>
                 <span className="text-[10px] font-mono font-bold text-white">0.02%</span>
              </div>
           </div>
        </div>

        {/* Search Hub */}
        <div className="hidden md:flex items-center flex-1 max-w-xs relative group">
          <div className="absolute inset-0 bg-flow-indigo/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative w-full flex items-center bg-[var(--surface-elevated)] rounded-xl px-4 py-2 border border-white/5 group-focus-within:border-flow-indigo/30 transition-all shadow-sm">
            <Search className="w-4 h-4 text-data-slate mr-3" />
            <input 
              type="text" 
              placeholder="Quick search..."
              className="bg-transparent border-none outline-none text-xs w-full text-[var(--text-primary)] placeholder:text-data-slate/40"
            />
            <div className="flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded bg-black/20 border border-white/5 text-[8px] font-black text-data-slate">
              <Command size={8} />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* User & Notifications */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-white/5 text-data-slate hover:text-flow-indigo hover:border-flow-indigo/20 transition-all group"
          >
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-flow-indigo shadow-[0_0_8px_#4F46E5] animate-pulse" />
          </button>
          
          <div className="h-8 w-px bg-white/5" />

          <Link href="/dashboard/settings" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <div className="text-[9px] font-black uppercase tracking-widest text-flow-indigo leading-none mb-1 group-hover:text-insight-teal transition-colors">
                {user?.current_plan || "Free"} Node
              </div>
              <div className="text-xs font-bold text-[var(--text-primary)]">
                {user?.first_name}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-flow-indigo/20 to-insight-teal/20 p-px group-hover:scale-105 transition-transform border border-white/5 overflow-hidden">
              <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center text-flow-indigo">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Notification Dropdown (Active Element) */}
      <AnimatePresence>
        {notificationsOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-20 right-6 w-80 bg-[var(--surface-elevated)] border border-white/10 rounded-[2rem] shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Event Stream</span>
                <span className="text-[8px] font-mono text-flow-indigo animate-pulse">LIVE</span>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { title: "Node SGP-42 Online", type: "INF", time: "2m ago" },
                  { title: "DDoS Mitigation Active", type: "SEC", time: "15m ago" },
                  { title: "Query Cache Flushed", type: "SYS", time: "1h ago" }
                ].map((n, i) => (
                  <div key={i} className="p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-[var(--text-primary)]">{n.title}</span>
                      <span className="text-[8px] font-mono text-data-slate">{n.time}</span>
                    </div>
                    <span className="text-[8px] font-black text-flow-indigo tracking-widest">{n.type}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-black/20 text-center">
                 <button className="text-[10px] font-black uppercase tracking-widest text-data-slate hover:text-white transition-colors">Clear All Events</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
