"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Network, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  BrainCircuit,
  Workflow,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "../Logo";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Network, label: "Edge Nodes", href: "/dashboard/nodes" },
  { 
    icon: BrainCircuit, 
    label: "Intelligence", 
    href: "/dashboard/intelligence",
    subItems: [
      { label: "Neural Control", href: "/dashboard/intelligence/neural" },
      { label: "Pipeline Orchestration", href: "/dashboard/intelligence/pipeline" }
    ]
  },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { 
    icon: Settings, 
    label: "Settings", 
    href: "/dashboard/settings",
    subItems: [
      { label: "Overview", href: "/dashboard/settings" },
      { label: "Profile", href: "/dashboard/settings/profile" },
      { label: "Security", href: "/dashboard/settings/security" },
      { label: "Billing", href: "/dashboard/settings/billing" }
    ]
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const normalizedPathname = normalizePath(pathname);
  const { logout } = useAuth();

  // Automatically open the correct submenu based on current path
  useEffect(() => {
    const activeItem = navItems.find(item => 
      item.subItems?.some(sub => normalizedPathname === normalizePath(sub.href))
    );
    if (activeItem) {
      setOpenSubMenu(activeItem.label);
    }
  }, [normalizedPathname]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await logout();
    }
  };

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const sidebarInnerContent = (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand Logo Section */}
      <div className="p-8 flex items-center justify-between gap-3 overflow-hidden relative shrink-0 min-h-[100px]">
        {/* Subtle technical background for logo area */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#4F46E5 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
        
        <div className="flex items-center relative z-10 w-full">
          {collapsed && !mobileOpen ? (
            <div className="w-full flex justify-center">
              <Logo variant="icon" width={32} height={32} className="shrink-0" />
            </div>
          ) : (
            <Logo variant="full" width={160} height={45} className="shrink-0" />
          )}
        </div>
        {mobileOpen && (
          <button onClick={() => setMobileOpen?.(false)} className="md:hidden text-[var(--text-muted)] p-2 shrink-0">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => {
          const itemHref = normalizePath(item.href);
          const isParentOfActive = item.subItems?.some(s => normalizedPathname === normalizePath(s.href));
          const isDirectActive = normalizedPathname === itemHref;
          const isActive = isDirectActive || isParentOfActive;
          const hasSubItems = !!item.subItems;
          const isSubMenuOpen = openSubMenu === item.label;

          return (
            <div key={item.label} className="space-y-1">
              {hasSubItems ? (
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                    isActive 
                    ? "bg-gradient-to-r from-flow-indigo to-flow-indigo/80 text-white shadow-[0_0_30px_rgba(79,70,229,0.5)] border border-white/30 scale-[1.02]" 
                    : "text-data-slate hover:text-[var(--text-primary)] hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-500 ${isActive ? "text-white scale-110" : "group-hover:text-flow-indigo"}`} />
                  {(!collapsed || mobileOpen) && (
                    <>
                      <span className={`text-sm font-black uppercase tracking-widest flex-1 text-left whitespace-nowrap ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''} ${isActive ? 'text-white' : ''}`} />
                    </>
                  )}
                  {isDirectActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute left-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_20px_#fff] rounded-r-xl"
                    />
                  )}
                </button>
              ) : (
                <Link href={item.href} onClick={() => setMobileOpen?.(false)}>
                  <div
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                      normalizedPathname === itemHref 
                      ? "bg-gradient-to-r from-flow-indigo to-flow-indigo/80 text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] border border-white/20 scale-[1.02]" 
                      : "text-data-slate hover:text-[var(--text-primary)] hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 shrink-0 transition-transform duration-500 ${normalizedPathname === itemHref ? "text-white scale-110" : "group-hover:text-flow-indigo"}`} />
                    {(!collapsed || mobileOpen) && (
                      <span className={`text-sm font-black uppercase tracking-widest whitespace-nowrap ${normalizedPathname === itemHref ? 'text-white' : ''}`}>{item.label}</span>
                    )}
                    {normalizedPathname === itemHref && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute left-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_20px_#fff] rounded-r-xl"
                      />
                    )}
                  </div>
                </Link>
              )}

              {/* Submenu Rendering */}
              <AnimatePresence>
                {hasSubItems && isSubMenuOpen && (!collapsed || mobileOpen) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-12 space-y-1"
                  >
                    {item.subItems?.map((sub) => {
                      const subHref = normalizePath(sub.href);
                      const isSubActive = normalizedPathname === subHref;
                      return (
                        <Link key={sub.href} href={sub.href} onClick={() => setMobileOpen?.(false)}>
                          <div className={`py-2 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isSubActive ? 'text-white' : 'text-data-slate hover:text-white'}`}>
                            {isSubActive && <div className="w-1 h-1 rounded-full bg-insight-teal shadow-[0_0_8px_#06B6D4]" />}
                            <span className={isSubActive ? "underline decoration-insight-teal decoration-2 underline-offset-4" : ""}>
                              {sub.label}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 space-y-2 shrink-0 bg-[var(--surface)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
        >
          <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
          {(!collapsed || mobileOpen) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-semibold whitespace-nowrap"
            >
              Logout
            </motion.span>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col sticky top-0 h-screen bg-[var(--surface)] border-r border-white/5 transition-all duration-500 z-30 relative shrink-0 ${
          collapsed ? "w-24" : "w-72"
        }`}
      >
        {/* Sidebar Toggle (Desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-insight-teal border border-white/20 flex items-center justify-center text-white z-40 shadow-lg hover:scale-110 transition-transform"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {sidebarInnerContent}
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
              {sidebarInnerContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
