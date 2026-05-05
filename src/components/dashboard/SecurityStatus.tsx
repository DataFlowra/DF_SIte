"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, AlertTriangle, ShieldAlert, Loader2, Activity } from "lucide-react";

interface Anomaly {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  node: string;
  timestamp: Date;
}

export default function SecurityStatus() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [mitigating, setMitigating] = useState<string | null>(null);

  // Simulate incoming anomalies powered by Morpheus
  useEffect(() => {
    const triggerAnomaly = () => {
      const types: ("warning" | "critical")[] = ["warning", "warning", "critical"];
      const type = types[Math.floor(Math.random() * types.length)];
      
      const messages = {
        warning: [
          "Unusual traffic pattern detected",
          "Latency variance > 20% from baseline",
          "Unexpected port scan signature"
        ],
        critical: [
          "DDoS heuristic match threshold exceeded",
          "Unauthorized credential stuffing attempt",
          "Sudden drop in node heartbeat"
        ]
      };

      const nodes = ["US-East-1", "EU-Central", "AP-South-1", "SGP-Edge"];

      const newAnomaly: Anomaly = {
        id: Math.random().toString(36).substring(2, 9),
        type,
        message: messages[type][Math.floor(Math.random() * messages[type].length)],
        node: nodes[Math.floor(Math.random() * nodes.length)],
        timestamp: new Date()
      };

      setAnomalies(prev => [newAnomaly, ...prev].slice(0, 3));
    };

    // Trigger first anomaly after a short delay
    const initialTimer = setTimeout(triggerAnomaly, 3000);
    
    // Then occasionally trigger new ones
    const interval = setInterval(() => {
      if (Math.random() > 0.6) triggerAnomaly();
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleMitigate = (id: string) => {
    setMitigating(id);
    
    // Simulate backend mitigation action
    setTimeout(() => {
      setAnomalies(prev => prev.filter(a => a.id !== id));
      setMitigating(null);
    }, 2000);
  };

  const hasCritical = anomalies.some(a => a.type === "critical");

  return (
    <motion.div 
      animate={{ 
        boxShadow: hasCritical ? "0 0 40px rgba(239,68,68,0.2)" : "0 0 0px rgba(0,0,0,0)",
        borderColor: hasCritical ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.05)"
      }}
      transition={{ duration: 1 }}
      className="glass rounded-[2.5rem] border p-6 flex flex-col h-full min-h-[350px] relative overflow-hidden transition-colors"
    >
      {/* Background Pulse if Critical */}
      <AnimatePresence>
        {hasCritical && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-red-500 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4 relative z-10 text-left">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-glow-sm transition-colors ${
            hasCritical ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-insight-teal/10 text-insight-teal border-insight-teal/20"
          }`}>
            {hasCritical ? <ShieldAlert className="w-5 h-5 animate-pulse" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Watchdog Feed</h3>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase tracking-widest ${hasCritical ? "text-red-500" : "text-insight-teal"}`}>
                {hasCritical ? "Active Threats" : "Monitoring Secure"}
              </span>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2">
          <Zap className="w-3 h-3 text-flow-indigo animate-pulse" />
          <span className="text-[8px] font-mono text-data-slate uppercase tracking-tighter">Morpheus</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 relative z-10">
        <AnimatePresence mode="popLayout">
          {anomalies.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="h-full flex flex-col items-center justify-center text-center opacity-50"
             >
                <Activity className="w-10 h-10 text-insight-teal mb-4 animate-pulse" />
                <p className="text-xs font-bold text-data-slate uppercase tracking-widest">No Anomalies Detected</p>
                <p className="text-[10px] font-mono mt-2">Telemetry streaming at nominal capacity</p>
             </motion.div>
          ) : (
            anomalies.map((anomaly) => (
              <motion.div
                key={anomaly.id}
                layout
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                className={`p-4 rounded-2xl border transition-all ${
                  anomaly.type === "critical" 
                  ? "bg-red-500/10 border-red-500/20" 
                  : "bg-yellow-500/10 border-yellow-500/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-4 h-4 ${anomaly.type === "critical" ? "text-red-400" : "text-yellow-400"}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]">
                      {anomaly.node}
                    </span>
                  </div>
                  <span className="text-[8px] font-mono text-data-slate">
                    {anomaly.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                
                <p className={`text-xs font-medium mb-3 ${anomaly.type === "critical" ? "text-red-200" : "text-yellow-200"}`}>
                  {anomaly.message}
                </p>

                {anomaly.type === "critical" && (
                  <button 
                    onClick={() => handleMitigate(anomaly.id)}
                    disabled={mitigating === anomaly.id}
                    className="w-full py-2.5 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {mitigating === anomaly.id ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /> Executing Mitigation...</>
                    ) : (
                      "Execute Mitigation"
                    )}
                  </button>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
    </motion.div>
  );
}
