"use client";

import { motion } from "framer-motion";
import { Settings as SettingsIcon, Shield, Bell, User, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-[2rem] p-8 border border-white/10">
        <h1 className="text-3xl font-black tracking-tight mb-2">Control Center</h1>
        <p className="text-[var(--text-muted)]">Configure your account, security, and billing preferences.</p>
      </div>

      <div className="max-w-4xl space-y-4">
        {[
          { icon: User, label: "Profile Settings", desc: "Update your personal information and avatar." },
          { icon: Shield, label: "Security & Privacy", desc: "Manage two-factor authentication and API keys." },
          { icon: Bell, label: "Notifications", desc: "Choose which alerts you want to receive." },
          { icon: CreditCard, label: "Billing & Plan", desc: "View invoices and manage your subscription." },
        ].map((item, i) => (
          <div 
            key={i}
            className="glass-subtle p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-insight-teal/20 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--text-muted)] group-hover:text-insight-teal transition-colors">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold">{item.label}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
