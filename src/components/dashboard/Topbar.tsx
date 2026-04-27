"use client";

import { Search, Bell, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user } = useAuth();

  return (
    <header className="w-full flex items-center justify-between gap-6">
      {/* Mobile Menu Toggle (only visible on small screens) */}
      <button 
        onClick={onMenuClick}
        className="md:hidden glass p-3 rounded-xl border border-white/10 text-[var(--text-muted)] active:scale-95 transition-transform"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumbs / Page Title (Desktop) */}
      <div className="hidden md:block">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-70">
          Main Console / <span className="text-[var(--text-primary)] opacity-100">Overview</span>
        </h2>
      </div>

      {/* Global Actions */}
      <div className="flex-1 flex items-center justify-end gap-4">
        {/* Search Bar */}
        <div className="hidden sm:flex items-center flex-1 max-w-md relative group">
          <div className="absolute inset-0 bg-insight-teal/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative w-full flex items-center glass-subtle rounded-2xl px-4 py-2.5 border border-white/5 group-focus-within:border-insight-teal/30 transition-all">
            <Search className="w-4 h-4 text-[var(--text-muted)] mr-3" />
            <input 
              type="text" 
              placeholder="Search dataflows, nodes, or alerts..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[var(--text-muted)]/50"
            />
            <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">
              ⌘ K
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="relative p-3 rounded-2xl glass-subtle border border-white/5 text-[var(--text-muted)] hover:text-insight-teal hover:border-insight-teal/20 transition-all group">
            <Bell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-insight-teal border-2 border-[var(--background)] animate-pulse" />
          </button>
          
          <div className="h-8 w-px bg-white/5 mx-1" />

          <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all text-left">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-insight-teal/20 to-aura-violet/20 flex items-center justify-center text-insight-teal overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="hidden lg:block">
              <div className="text-[10px] font-bold uppercase tracking-widest text-insight-teal leading-none mb-1">
                {user?.current_plan || "Free"} Plan
              </div>
              <div className="text-xs font-bold leading-none">
                {user?.first_name} {user?.last_name}
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
