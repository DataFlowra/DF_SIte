"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Network, 
  BarChart3, 
  Settings, 
  Zap,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Network, label: "Edge Nodes", href: "/dashboard/nodes" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* Sidebar Toggle (Desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-insight-teal border border-white/20 hidden md:flex items-center justify-center text-white z-20 shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Brand Logo */}
      <div className="p-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-flow flex items-center justify-center shrink-0">
            <Zap className="text-white w-6 h-6" />
          </div>
          {(!collapsed || mobileOpen) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold tracking-tight"
            >
              Data<span className="gradient-text">flowra</span>
            </motion.span>
          )}
        </div>
        {mobileOpen && (
          <button onClick={() => setMobileOpen?.(false)} className="md:hidden text-[var(--text-muted)] p-2">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen?.(false)}>
              <div
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative ${
                  isActive 
                  ? "bg-insight-teal/10 text-insight-teal border border-insight-teal/20" 
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/5 border border-transparent"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-insight-teal" : "group-hover:text-insight-teal transition-colors"}`} />
                {(!collapsed || mobileOpen) && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-semibold"
                  >
                    {item.label}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-6 bg-insight-teal rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User Area */}
      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/5 transition-all group">
          <LogOut className="w-5 h-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span className="text-sm font-semibold">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        className="hidden md:flex flex-col glass rounded-[2rem] border border-white/10 transition-all duration-500 relative overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen?.(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-[var(--background)] border-r border-white/10 z-[70] md:hidden flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
