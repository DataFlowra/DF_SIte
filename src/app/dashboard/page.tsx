"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Activity,
  ArrowRight,
  Database,
  Search,
  LineChart,
  HardDrive,
  Cpu,
  RefreshCcw,
  AlertTriangle
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import TerminalWidget from "@/components/dashboard/TerminalWidget";
import SecurityStatus from "@/components/dashboard/SecurityStatus";
import DailyBriefing from "@/components/dashboard/DailyBriefing";
import ResourceAllocation from "@/components/dashboard/ResourceAllocation";
import GlobalMap from "@/components/dashboard/GlobalMap";

const stats = [
  { label: "Edge Nodes", value: "1,284", icon: Globe, color: "#06B6D4", trend: { value: "12", isUp: true } },
  { label: "Throughput", value: "8.4 GB/s", icon: Zap, color: "#4F46E5", trend: { value: "8", isUp: true } },
  { label: "Uptime", value: "99.99%", icon: ShieldCheck, color: "#10B981", trend: { value: "0.01", isUp: true } },
  { label: "Global Latency", value: "4.2ms", icon: Activity, color: "#F59E0B", trend: { value: "1.4", isUp: false } },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Top Section: Daily Briefing & Resource Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
        >
          <DailyBriefing />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
        >
           <ResourceAllocation />
        </motion.div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Simulation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 flex flex-col gap-4"
        >
          <ActivityChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-[2rem] p-6 border border-[var(--glass-border)] flex items-center gap-6 group hover:border-insight-teal/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-insight-teal/10 flex items-center justify-center text-insight-teal group-hover:scale-110 transition-transform">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-1 text-left">Auto-Scaling</h4>
                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed text-left">Dynamic resource allocation active in 12 nodes.</p>
              </div>
            </div>
            <div className="glass rounded-[2rem] p-6 border border-[var(--glass-border)] flex items-center gap-6 group hover:border-aura-violet/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-aura-violet/10 flex items-center justify-center text-aura-violet group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-1 text-left">Neural Health</h4>
                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed text-left">Optimization threshold maintained at 98.4%.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <SecurityStatus />
          <TerminalWidget />
        </motion.div>
      </div>

      {/* Global Intel Section */}
      <GlobalMap />
    </div>
  );
}
