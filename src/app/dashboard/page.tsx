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
import { useState, useEffect } from "react";

const stats = [
  { label: "Edge Nodes", value: "1,284", icon: Globe, color: "#06B6D4", trend: { value: "12", isUp: true } },
  { label: "Throughput", value: "8.4 GB/s", icon: Zap, color: "#4F46E5", trend: { value: "8", isUp: true } },
  { label: "Uptime", value: "99.99%", icon: ShieldCheck, color: "#10B981", trend: { value: "0.01", isUp: true } },
  { label: "Global Latency", value: "4.2ms", icon: Activity, color: "#F59E0B", trend: { value: "1.4", isUp: false } },
];

function DataPulse() {
  return (
    <div className="flex gap-1 items-end h-4">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [4, Math.random() * 12 + 4, 4] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          className="w-0.5 bg-insight-teal rounded-full"
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [load, setLoad] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => Math.min(Math.max(prev + (Math.random() * 4 - 2), 30), 85));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section: Dashboard Banner & Real-time Load */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden flex flex-col justify-center"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full bg-insight-teal/10 border border-insight-teal/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-insight-teal animate-pulse" />
                <span className="text-[10px] font-black text-insight-teal uppercase tracking-widest">Protocol Active</span>
              </div>
              <DataPulse />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-4 text-[var(--text-primary)]">
              Operational <span className="gradient-text">Command</span>
            </h1>
            <p className="text-base text-data-slate font-medium max-w-lg leading-relaxed">
              Global infrastructure is synchronized. Intelligence engines are processing 
              live telemetry across <span className="text-white font-bold">254 regions</span>.
            </p>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-flow-indigo/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-between relative overflow-hidden"
        >
           <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-data-slate uppercase tracking-widest mb-1">System Load</div>
                <div className="text-2xl font-black text-white font-mono">{load.toFixed(1)}%</div>
              </div>
           </div>

           <div className="mt-8 space-y-4 relative z-10">
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: `${load}%` }}
                   className={`h-full transition-all duration-1000 ${load > 80 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-flow-indigo shadow-[0_0_10px_#4F46E5]'}`}
                 />
              </div>
              <div className="flex justify-between text-[8px] font-black text-data-slate uppercase tracking-tighter">
                 <span>Thruster 01: Nom</span>
                 <span>Buffer: Stable</span>
              </div>
           </div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.05),transparent_70%)]" />
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
          className="lg:col-span-8 flex flex-col gap-6"
        >
          <ActivityChart />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-[2rem] p-8 border border-white/5 flex items-center gap-6 group hover:border-insight-teal/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-insight-teal/10 flex items-center justify-center text-insight-teal group-hover:scale-110 transition-transform">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Auto-Scaling</h4>
                <p className="text-xs text-data-slate font-medium leading-relaxed">Dynamic resource allocation active in 12 nodes.</p>
              </div>
            </div>
            <div className="glass rounded-[2rem] p-8 border border-white/5 flex items-center gap-6 group hover:border-aura-violet/30 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-aura-violet/10 flex items-center justify-center text-aura-violet group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Neural Health</h4>
                <p className="text-xs text-data-slate font-medium leading-relaxed">Optimization threshold maintained at 98.4%.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <SecurityStatus />
          <TerminalWidget />
        </motion.div>
      </div>

      {/* Global Intel Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-[2.5rem] p-12 border border-white/5 relative overflow-hidden text-center"
      >
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo mx-auto mb-8 border border-flow-indigo/20 shadow-glow-sm">
            <Globe className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-4 text-white">Global Distribution Network</h2>
          <p className="text-data-slate max-w-2xl mx-auto mb-10 font-medium">
            Your data mesh is currently spanning across 6 continents with redundant fiber links. 
            Estimated synchronization time: <span className="text-flow-indigo font-bold">120ms</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             {["San Francisco", "London", "Tokyo", "Sydney", "Singapore", "New York"].map(city => (
               <div key={city} className="px-4 py-2 rounded-full glass-subtle border border-white/5 text-[10px] font-black uppercase tracking-widest text-data-slate">
                 {city} • <span className="text-green-500">Active</span>
               </div>
             ))}
          </div>
        </div>
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-large)" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
