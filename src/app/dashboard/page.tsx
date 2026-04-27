"use client";

import { motion } from "framer-motion";
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Activity,
  ArrowRight
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import TerminalWidget from "@/components/dashboard/TerminalWidget";
import SecurityStatus from "@/components/dashboard/SecurityStatus";

const stats = [
  { label: "Active Nodes", value: "1,284", icon: Globe, color: "#06B6D4", trend: { value: "12", isUp: true } },
  { label: "Throughput", value: "8.4 GB/s", icon: Zap, color: "#8B5CF6", trend: { value: "8", isUp: true } },
  { label: "Uptime", value: "99.99%", icon: ShieldCheck, color: "#10B981", trend: { value: "0.01", isUp: true } },
  { label: "Latency", value: "4.2ms", icon: Activity, color: "#F59E0B", trend: { value: "1.4", isUp: false } },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-6"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="glass rounded-[2rem] p-8 border border-white/10 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Systems Operational</h1>
            <p className="text-[var(--text-muted)] font-medium max-w-lg">
              Dataflowra engine is processing <span className="text-insight-teal font-bold">12.4M</span> messages per second across 
              all edge nodes. No active threats detected in the last 24 hours.
            </p>
          </div>
          <button className="flex items-center gap-3 px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all group shrink-0">
            Export Report
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-insight-teal/5 to-transparent pointer-events-none" />
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Activity Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <ActivityChart />
        </motion.div>

        {/* Security Status */}
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <SecurityStatus />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Terminal Live Stream */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <TerminalWidget />
        </motion.div>

        {/* Quick Actions / Node Map Mini */}
        <motion.div variants={itemVariants} className="lg:col-span-5 glass p-8 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-insight-teal mb-6">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Edge Map Explorer</h3>
          <p className="text-sm text-[var(--text-muted)] mb-8 max-w-xs">
            Visualize your data distribution globally. View traffic density and node health in real-time.
          </p>
          <button className="px-8 py-3 glass-subtle border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all">
            Open Global Map
          </button>
          
          {/* Decorative SVG Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
