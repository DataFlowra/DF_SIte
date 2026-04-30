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
import { useAuth } from "@/context/AuthContext";
import Logo from "../Logo";

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
  const { logout } = useAuth();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await logout();
    }
  };

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
      <div className="p-8 flex items-center justify-between gap-3 overflow-hidden">
        <div className="flex items-center">
          {collapsed ? (
            <Logo width={40} height={40} className="shrink-0" /> // Show small square-ish part or icon part if possible, otherwise just small logo
          ) : (
            <Logo width={140} height={40} className="shrink-0" />
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
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-insight-teal rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          {(!collapsed || mobileOpen) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col sticky top-0 h-screen bg-[var(--surface)] border-r border-white/5 transition-all duration-500 z-30 ${
          collapsed ? "w-24" : "w-72"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen?.(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[var(--surface)] border-r border-white/5 z-50 md:hidden flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
