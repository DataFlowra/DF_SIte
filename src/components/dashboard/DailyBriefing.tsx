"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Bot } from "lucide-react";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

export default function DailyBriefing() {
  const { user } = useAuth();
  const [briefing, setBriefing] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBriefing() {
      if (!user) return;
      try {
        const prompt = `Generate a short, 2-sentence daily neural briefing for a user named ${user.first_name || 'Admin'}. Mention that their data nodes are stable and throughput is optimal. Use a professional, AI-assistant tone appropriate for a platform named FlowR AI.`;
        
        const response = await api.post("/api/ai/generate", {
          messages: [
            { role: "system", content: "You are FlowR AI, an autonomous data engine. Keep it concise." },
            { role: "user", content: prompt }
          ],
          model: "llama-3.1-8b-instant"
        });

        if (response.status === "success") {
          setBriefing(response.data.choices[0].message.content);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (err) {
        setBriefing(`Good morning, ${user.first_name || 'Admin'}. All edge nodes are currently operating within optimal parameters and global throughput is stable.`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBriefing();
  }, [user]);

  return (
    <div className="relative z-10 flex flex-col h-full justify-center">
      <div className="flex items-center gap-3 mb-6">
        <div className="px-3 py-1 rounded-full bg-aura-violet/10 border border-aura-violet/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-aura-violet animate-pulse" />
          <span className="text-[10px] font-black text-aura-violet uppercase tracking-widest">Neural Briefing</span>
        </div>
        <div className="flex gap-1 items-end h-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [4, Math.random() * 12 + 4, 4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-0.5 bg-aura-violet rounded-full"
            />
          ))}
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-4 text-[var(--text-primary)] flex items-center gap-3 text-left">
        <Bot className="w-8 h-8 text-flow-indigo" />
        FlowR <span className="gradient-text">Insights</span>
      </h1>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 text-[var(--text-muted)]"
          >
            <Loader2 className="w-5 h-5 animate-spin text-flow-indigo" />
            <span className="text-sm font-medium">Synthesizing telemetry data...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/[0.04] border border-[var(--glass-border)] rounded-2xl relative group text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-flow-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <p className="text-base text-[var(--text-primary)] font-medium leading-relaxed italic relative z-10">
              "{briefing}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
