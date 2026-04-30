"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, PieChart, Sparkles, Send, Loader2, Bot, Database } from "lucide-react";
import { api } from "@/lib/api-client";

export default function AnalyticsPage() {
  const [query, setQuery] = useState("");
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setInsight(null);

    try {
      const response = await api.post("/api/ai/generate", {
        messages: [
          { role: "system", content: "You are an expert AI data analyst powered by NVIDIA NeMo for FlowR AI. Analyze the user's prompt and provide a highly technical but easy-to-understand narrative summary of their hypothetical data trends. Format the response clearly." },
          { role: "user", content: query }
        ],
        model: "llama-3.1-8b-instant"
      });

      if (response.status === "success") {
        setInsight(response.data.choices[0].message.content);
      } else {
        throw new Error(response.message || "Failed to generate insight");
      }
    } catch (err) {
      setInsight("Neural analysis failed. Unable to process data request via the inference server at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Analytics Header & Neural Query Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aura-violet/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 rounded-full bg-aura-violet/10 border border-aura-violet/20 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-aura-violet animate-pulse" />
                <span className="text-[10px] font-black text-aura-violet uppercase tracking-widest">NVIDIA NeMo Active</span>
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 text-[var(--text-primary)]">
              Talk to Your <span className="gradient-text">Data</span>
            </h1>
            <p className="text-data-slate font-medium max-w-lg mb-8">
              Ask natural language questions. Our LLM parses your RAPIDS data processing engine output into clear, actionable summaries.
            </p>

            <form onSubmit={handleQuery} className="relative max-w-2xl group">
              <div className="absolute inset-0 bg-aura-violet/10 blur-xl rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Summarize revenue trends and identify any latency drops in EMEA..."
                  className="w-full bg-[var(--surface-elevated)] border border-white/10 rounded-2xl pl-6 pr-16 py-5 focus:outline-none focus:border-aura-violet/50 transition-all text-sm text-[var(--text-primary)] shadow-2xl"
                />
                <button
                  type="submit"
                  disabled={!query.trim() || isLoading}
                  className="absolute right-3 p-3 bg-aura-violet text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>
          
          <div className="hidden lg:flex w-48 h-48 rounded-full border border-white/5 bg-[var(--surface-elevated)] items-center justify-center relative shadow-3xl">
             <div className="absolute inset-0 border-[2px] border-dashed border-aura-violet/20 rounded-full animate-[spin_20s_linear_infinite]" />
             <div className="absolute inset-4 border border-insight-teal/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
             <Database className="w-16 h-16 text-flow-indigo opacity-50" />
             {isLoading && (
               <motion.div 
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <Sparkles className="w-20 h-20 text-aura-violet blur-sm" />
               </motion.div>
             )}
          </div>
        </div>
      </motion.div>

      {/* Generative Insight Response Area */}
      <AnimatePresence mode="wait">
        {(insight || isLoading) && (
          <motion.div
            key="insight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-[2.5rem] p-10 border border-aura-violet/30 relative overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.1)]"
          >
            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
              <div className="w-12 h-12 rounded-2xl bg-aura-violet/20 flex items-center justify-center text-aura-violet border border-aura-violet/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Neural Summary</h3>
                <span className="text-[10px] font-black text-data-slate uppercase tracking-widest">Inference Result</span>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-aura-violet">
                <Loader2 className="w-10 h-10 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-widest animate-pulse">Running Model Inference...</span>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="prose prose-invert max-w-none"
              >
                <div className="text-lg text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                  {insight}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Traditional Analytics (Simulated) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-subtle p-10 rounded-[2.5rem] border border-white/5 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center">
            <BarChart3 size={48} className="text-insight-teal mb-6 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            <h4 className="text-lg font-bold text-white mb-2">Throughput Distribution</h4>
            <p className="text-sm text-data-slate">GPU-accelerated visualization via cuDF pending data connection.</p>
          </div>
        </div>
        <div className="glass-subtle p-10 rounded-[2.5rem] border border-white/5 min-h-[300px] flex items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center">
            <PieChart size={48} className="text-aura-violet mb-6 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            <h4 className="text-lg font-bold text-white mb-2">Regional Traffic</h4>
            <p className="text-sm text-data-slate">Geospatial distribution metrics pending live feed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
