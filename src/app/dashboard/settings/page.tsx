"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Shield, Bell, User, CreditCard, ChevronRight, Key, Globe, Mail } from "lucide-react";
import Link from "next/link";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile Information", desc: "Update your personal details and avatar.", href: "#" },
      { icon: Mail, label: "Email Preferences", desc: "Manage your communication and newsletter settings.", href: "#" },
    ]
  },
  {
    title: "Security",
    items: [
      { icon: Shield, label: "Security & Privacy", desc: "Manage two-factor authentication and session data.", href: "#" },
      { icon: Key, label: "API Access Tokens", desc: "Generate and manage keys for programmatic access.", href: "#" },
    ]
  },
  {
    title: "Infrastructure",
    items: [
      { icon: Globe, label: "Regional Defaults", desc: "Set your preferred edge node deployments.", href: "#" },
      { icon: Bell, label: "Alert Configuration", desc: "Customize thresholds for Morpheus watchdog.", href: "#" },
    ]
  },
  {
    title: "Billing",
    items: [
      { icon: CreditCard, label: "Plan & Payment", desc: "Manage your subscription and view invoices.", href: "#" },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">System Configuration</span>
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-white">Control Center</h1>
          <p className="text-base text-data-slate font-medium max-w-xl leading-relaxed">
            Orchestrate your experience. Manage your identity, security protocols, 
            and infrastructure scaling parameters from a single interface.
          </p>
        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none">
           <SettingsIcon size={200} className="text-flow-indigo" />
        </div>
      </motion.div>

      <div className="max-w-5xl space-y-12">
        {settingsGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-data-slate ml-4">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full glass-subtle p-6 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-flow-indigo/30 transition-all cursor-pointer shadow-lg"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-data-slate group-hover:text-flow-indigo transition-colors border border-white/5 group-hover:border-flow-indigo/20 shadow-inner">
                        <item.icon size={24} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-white group-hover:text-[var(--text-primary)] transition-colors">{item.label}</h3>
                        <p className="text-xs text-data-slate font-medium leading-relaxed max-w-[200px]">{item.desc}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-data-slate group-hover:text-white transition-all group-hover:bg-flow-indigo/20">
                      <ChevronRight size={18} />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
