"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Zap, Sliders, ShieldCheck, RefreshCcw, Save, Loader2, Database, BrainCircuit } from "lucide-react";
import { api } from "@/lib/api-client";

export default function NeuralControlPage() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [config, setFormData] = useState({
    model: "llama-3.1-8b-instant",
    throughput: 85,
    concurrency: 12,
    caching: true
  });

  const handleDeploy = async () => {
    setIsDeploying(true);
    setStatus(null);
    
    try {
      // Simulate/Trigger model reconfiguration via AI endpoint
      const response = await api.post("/api/ai/generate", {
        messages: [
          { role: "system", content: "You are the FlowR AI System Architect." },
          { role: "user", content: `Acknowledge a model reconfiguration to ${config.model} with ${config.throughput}% throughput and ${config.concurrency} concurrent streams. Keep it technical and short.` }
        ],
        model: "llama-3.1-8b-instant"
      });

      if (response.status === "success") {
        setStatus("Configuration successfully synchronized with edge clusters.");
      }
    } catch (err) {
      setStatus("Protocol error: Failed to broadcast new parameters.");
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Intelligence Architecture</span>
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-white">Neural Control Center</h1>
          <p className="text-base text-data-slate font-medium max-w-xl leading-relaxed">
            Adjust autonomous engine parameters. Real-time tuning of model selection, 
            inference throughput, and concurrent stream allocation.
          </p>
        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none">
           <BrainCircuit size={200} className="text-flow-indigo" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-8 space-y-6">
           <div className="glass rounded-[2rem] p-8 border border-white/5">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
                    <Sliders size={18} />
                 </div>
                 <h3 className="text-xl font-bold text-white">Parameter Tuning</h3>
              </div>

              <div className="space-y-8">
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-data-slate">
                       <span>Inference Throughput</span>
                       <span className="text-flow-indigo">{config.throughput}%</span>
                    </div>
                    <input 
                      type="range" min="10" max="100" step="5"
                      value={config.throughput}
                      onChange={(e) => setFormData({...config, throughput: parseInt(e.target.value)})}
                      className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-flow-indigo"
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-data-slate block ml-1">Inference Model</label>
                       <select 
                         value={config.model}
                         onChange={(e) => setFormData({...config, model: e.target.value})}
                         className="w-full bg-[var(--surface-elevated)] border border-white/5 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-flow-indigo/50 transition-all text-white"
                       >
                          <option value="llama-3.1-8b-instant">Llama 3.1 8B (Instant)</option>
                          <option value="llama-3.1-70b-versatile">Llama 3.1 70B (Versatile)</option>
                          <option value="mistral-7b-v0.3">Mistral 7B (v0.3)</option>
                       </select>
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-data-slate block ml-1">Stream Concurrency</label>
                       <div className="flex items-center gap-4">
                          <input 
                            type="number" 
                            value={config.concurrency}
                            onChange={(e) => setFormData({...config, concurrency: parseInt(e.target.value)})}
                            className="flex-1 bg-[var(--surface-elevated)] border border-white/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-flow-indigo/50 transition-all text-white"
                          />
                          <span className="text-[10px] text-data-slate font-black uppercase">Nodes</span>
                       </div>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" checked={config.caching}
                            onChange={(e) => setFormData({...config, caching: e.target.checked})}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 accent-insight-teal"
                          />
                          <span className="text-xs font-medium text-data-slate">Edge Caching</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-insight-teal animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-insight-teal">Optimizer Active</span>
                       </div>
                    </div>
                    <button 
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="w-full md:w-auto px-10 py-4 rounded-xl bg-flow-indigo text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-flow-indigo/20 disabled:opacity-50"
                    >
                       {isDeploying ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                       Synchronize Stack
                    </button>
                 </div>
              </div>
           </div>

           <AnimatePresence>
             {status && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="p-6 rounded-2xl bg-insight-teal/10 border border-insight-teal/20 flex items-center gap-4"
               >
                  <ShieldCheck className="w-6 h-6 text-insight-teal" />
                  <p className="text-sm font-medium text-[var(--text-primary)]">{status}</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Status Side */}
        <div className="lg:col-span-4 space-y-6">
           <div className="glass rounded-[2rem] p-8 border border-white/5 h-full flex flex-col">
              <h4 className="text-xs font-black text-data-slate uppercase tracking-[0.2em] mb-8">Node Distribution</h4>
              <div className="flex-1 flex flex-col justify-center gap-10">
                 {[
                   { label: "US-East (Virginia)", val: 92, color: "bg-flow-indigo" },
                   { label: "EU-West (London)", val: 45, color: "bg-insight-teal" },
                   { label: "AP-East (Tokyo)", val: 12, color: "bg-aura-violet" },
                 ].map((node, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold text-white">
                         <span>{node.label}</span>
                         <span className="font-mono">{node.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${node.val}%` }}
                           transition={{ duration: 1.5, delay: i * 0.2 }}
                           className={`h-full ${node.color}`}
                         />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                 <Database className="w-4 h-4 text-flow-indigo" />
                 <div className="text-[10px] font-mono text-data-slate">STABLE_CLUSTER_VER: 0x9AF2</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
