"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, Layers, GitBranch, Play, CheckCircle2, Loader2, Database, Network } from "lucide-react";
import { api } from "@/lib/api-client";

export default function PipelineOrchestrationPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    setSynced(false);
    
    try {
      // Logic sync with backend
      await api.post("/api/ai/generate", {
        messages: [{ role: "user", content: "Broadcasting pipeline sync signal." }],
        model: "llama-3.1-8b-instant"
      });
      setSynced(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
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
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Data Orchestration</span>
          <h1 className="text-4xl font-black tracking-tighter mb-4 text-white">Pipeline Flow</h1>
          <p className="text-base text-data-slate font-medium max-w-xl leading-relaxed">
            Manage the end-to-end data lifecycle. Orchestrate ingestion points, 
            transformation logic, and multi-region synchronization.
          </p>
        </div>
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none text-insight-teal">
           <Workflow size={200} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Builder Visual */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden h-[500px] flex flex-col items-center justify-center">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
           
           <div className="relative flex items-center justify-center gap-20">
              {[
                { icon: Database, label: "INGEST" },
                { icon: Layers, label: "PROCESS" },
                { icon: GitBranch, label: "ROUTE" },
                { icon: Network, label: "SYNC" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-6 relative">
                   <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: i * 0.2 }}
                     className="w-20 h-20 rounded-3xl bg-[var(--surface-elevated)] border border-white/10 flex items-center justify-center text-flow-indigo shadow-2xl relative z-10"
                   >
                      <step.icon size={32} />
                   </motion.div>
                   <span className="text-[10px] font-black text-data-slate uppercase tracking-widest">{step.label}</span>
                   
                   {i < 3 && (
                     <div className="absolute left-full top-10 w-20 h-px bg-gradient-to-r from-flow-indigo/50 to-transparent" />
                   )}

                   {/* Flow Particles */}
                   {i < 3 && (
                     <motion.div
                       animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                       className="absolute left-20 top-10 w-2 h-2 rounded-full bg-insight-teal blur-[1px]"
                     />
                   )}
                </div>
              ))}
           </div>

           <div className="mt-20">
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className="px-10 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                 {isSyncing ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                 {synced ? "Pipeline Synced" : "Start Global Sync"}
              </button>
           </div>
        </div>

        {/* Sync Summary */}
        <div className="glass rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-between">
           <div>
              <h3 className="text-xl font-bold text-white mb-6">Orchestration Info</h3>
              <div className="space-y-6">
                 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-black text-data-slate uppercase mb-1">Active Schedulers</div>
                    <div className="text-sm font-bold text-white">24 Continuous Threads</div>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-black text-data-slate uppercase mb-1">Backlog Buffer</div>
                    <div className="text-sm font-bold text-insight-teal">0.00ms Nominal</div>
                 </div>
              </div>
           </div>

           <AnimatePresence>
             {synced && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-4"
               >
                  <CheckCircle2 className="text-green-500" size={24} />
                  <p className="text-xs font-medium text-white">All regional pipelines are now operating on Version 4.2.1-stable.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
