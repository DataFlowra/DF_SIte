"use client";

import { motion } from "framer-motion";
import { Network, Globe, Server, Activity, Cpu, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";

const nodes = [
  { id: "US-01", name: "US-East (Virginia)", status: "Active", load: 42, latency: 12, region: "North America" },
  { id: "US-02", name: "US-West (Oregon)", status: "Active", load: 31, latency: 45, region: "North America" },
  { id: "EU-01", name: "EU-West (London)", status: "Active", load: 28, latency: 88, region: "Europe" },
  { id: "EU-02", name: "EU-Central (Frankfurt)", status: "Active", load: 56, latency: 92, region: "Europe" },
  { id: "AP-01", name: "AP-South (Mumbai)", status: "Degraded", load: 89, latency: 142, region: "Asia" },
  { id: "AP-02", name: "AP-East (Tokyo)", status: "Active", load: 15, latency: 110, region: "Asia" },
];

function NodeSimulation({ load }: { load: number }) {
  return (
    <div className="flex items-center gap-1 h-3">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: i / 10 < load / 100 ? [0.3, 1, 0.3] : 0.1,
            backgroundColor: i / 10 < load / 100 ? (load > 80 ? "#ef4444" : "#4F46E5") : "var(--text-muted)"
          }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          className="w-1.5 h-full rounded-full"
        />
      ))}
    </div>
  );
}

export default function NodesPage() {
  const [nodeData, setNodeData] = useState(nodes);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodeData(prev => prev.map(n => ({
        ...n,
        load: Math.min(Math.max(n.load + (Math.random() * 6 - 3), 10), 95),
        latency: Math.max(n.latency + (Math.random() * 4 - 2), 5)
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)] relative overflow-hidden text-left"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Cluster Management</span>
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-[var(--text-primary)]">Global Edge Nodes</h1>
          <p className="text-base text-[var(--text-muted)] font-medium max-w-xl leading-relaxed">
            Direct orchestration of distributed computing nodes. Real-time load balancing and 
            latency optimization active across all verified regions.
          </p>
        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-10 pointer-events-none">
           <Network size={200} className="text-flow-indigo" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {nodeData.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-subtle p-8 rounded-[2rem] border border-[var(--glass-border)] group hover:border-flow-indigo/20 transition-all relative overflow-hidden text-left"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center text-flow-indigo border border-[var(--glass-border)] group-hover:scale-110 transition-transform">
                  {node.region === "Asia" ? <Zap size={24} /> : <Server size={24} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{node.name}</h3>
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{node.id} • {node.region}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                node.status === "Active" 
                ? "bg-green-500/10 text-green-500 border-green-500/20" 
                : "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse"
              }`}>
                {node.status}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-black text-[var(--text-muted)] uppercase mb-3 tracking-widest">
                   <span>Node Load</span>
                   <span className={node.load > 80 ? "text-red-500" : "text-[var(--text-primary)]"}>{node.load.toFixed(0)}%</span>
                </div>
                <NodeSimulation load={node.load} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-left">
                 <div>
                    <div className="text-[8px] font-black text-[var(--text-muted)] uppercase mb-1">Latency</div>
                    <div className="text-sm font-mono font-bold text-insight-teal">{node.latency.toFixed(0)}ms</div>
                 </div>
                 <div>
                    <div className="text-[8px] font-black text-[var(--text-muted)] uppercase mb-1">Up-link</div>
                    <div className="text-sm font-mono font-bold text-flow-indigo italic">Secure</div>
                 </div>
              </div>
            </div>

            <button className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
               <ArrowUpRight size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
