"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, RefreshCw } from "lucide-react";

const mockLogs = [
  "INF Connection established to US-East-1 (AWS)",
  "SEC Handshake verified: Node SGP-42 (AES-256)",
  "DB  Batch sync completed: 4.2k records",
  "ERR Latency spike detected: SFO-Edge-3 (42ms)",
  "INF Node scaling initiated: Frankfurt (FRA-9)",
  "SEC Threat neutralized: Rate limit applied to 184.22.x.x",
  "INF Heartbeat received from 124 active nodes",
  "SYS Garbage collection: Freed 12.4GB memory",
];

export default function TerminalWidget() {
  const [logs, setLogs] = useState<string[]>(mockLogs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs((prev) => [...prev.slice(-19), `[${timestamp}] ${nextLog}`]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="glass rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-full min-h-[400px]">
      {/* Terminal Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2 ml-2">
            <TerminalIcon size={12} className="text-insight-teal" />
            Node Live Stream
          </span>
        </div>
        <div className="flex items-center gap-4 text-[var(--text-muted)]">
          <RefreshCw size={14} className="hover:text-insight-teal transition-colors cursor-pointer" />
          <Maximize2 size={14} className="hover:text-insight-teal transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar bg-black/20"
      >
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => {
            const isErr = log.includes("ERR") || log.includes("Threat");
            const isSec = log.includes("SEC");
            return (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1.5 flex gap-3"
              >
                <span className={`shrink-0 ${isErr ? "text-red-400" : isSec ? "text-aura-violet" : "text-insight-teal"} opacity-80`}>
                  {log.split(']')[0] ? log.split(']')[0] + ']' : '>'}
                </span>
                <span className={`${isErr ? "text-red-300" : isSec ? "text-aura-violet/80" : "text-white/80"}`}>
                  {log.split(']')[1] || log}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-insight-teal/50 ml-1 translate-y-1"
        />
      </div>
    </div>
  );
}
