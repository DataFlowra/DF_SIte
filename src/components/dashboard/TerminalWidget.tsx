"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, RefreshCw, Search } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "INF" | "SEC" | "ERR" | "SYS" | "CMD";
  message: string;
}

const generateMockLog = (): LogEntry => {
  const types: ("INF" | "SEC" | "ERR" | "SYS")[] = ["INF", "INF", "INF", "SEC", "SYS", "ERR"];
  const type = types[Math.floor(Math.random() * types.length)];
  const messages: Record<string, string[]> = {
    INF: [
      "Connection established to US-East-1 (AWS)",
      "Batch sync completed: 4.2k records",
      "Node scaling initiated: Frankfurt (FRA-9)",
      "Heartbeat received from 124 active nodes",
      "Model inference completed in 0.04ms"
    ],
    SEC: [
      "Handshake verified: Node SGP-42 (AES-256)",
      "Threat neutralized: Rate limit applied to 184.22.x.x",
      "Quantum-safe key exchange initiated",
      "Anomaly detection alert resolved"
    ],
    ERR: [
      "Latency spike detected: SFO-Edge-3 (42ms)",
      "Packet drop rate > 0.01% on node EU-02",
      "Failed to sync with replica DB-04"
    ],
    SYS: [
      "Garbage collection: Freed 12.4GB memory",
      "TensorRT optimization complete for LLM",
      "Memory buffer flushed to cold storage"
    ]
  };
  
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  const message = messages[type][Math.floor(Math.random() * messages[type].length)];
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    timestamp,
    type,
    message
  };
};

export default function TerminalWidget() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial population
  useEffect(() => {
    const initialLogs = Array.from({ length: 10 }).map(generateMockLog);
    setLogs(initialLogs);
  }, []);

  // Live log stream
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-49), generateMockLog()]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current && !isPaused) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isPaused, filter]);

  // Handle terminal command input
  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = e.currentTarget.value.trim();
      if (cmd) {
        setLogs(prev => [...prev.slice(-49), {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          type: "CMD",
          message: `$ ${cmd}`
        }]);
        
        // Simple bash-like command parsing
        if (cmd.startsWith("grep ")) {
          setFilter(cmd.replace("grep ", "").trim());
        } else if (cmd === "clear") {
          setLogs([]);
          setFilter("");
        } else if (cmd === "reset") {
          setFilter("");
        } else if (cmd === "pause") {
          setIsPaused(true);
        } else if (cmd === "resume") {
          setIsPaused(false);
        }
        
        e.currentTarget.value = "";
      }
    }
  };

  const filteredLogs = logs.filter(log => {
    if (!filter) return true;
    if (log.type === "CMD") return true; // Always show commands
    return log.message.toLowerCase().includes(filter.toLowerCase()) || log.type.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="glass rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-full min-h-[400px] shadow-2xl">
      {/* Terminal Header */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[var(--surface-elevated)]">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2">
            <TerminalIcon size={14} className="text-flow-indigo" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate">
              Audit & Event Logs
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {filter && (
             <span className="px-2 py-0.5 rounded bg-flow-indigo/20 text-flow-indigo text-[9px] font-mono font-bold uppercase tracking-widest border border-flow-indigo/30">
               Filter: {filter}
             </span>
           )}
           <button 
             onClick={() => setIsPaused(!isPaused)} 
             className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${isPaused ? 'border-yellow-500/30 text-yellow-500 bg-yellow-500/10' : 'border-green-500/30 text-green-500 bg-green-500/10'}`}
           >
             {isPaused ? "PAUSED" : "LIVE"}
           </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar bg-[#0B0F1A]"
        onClick={() => { document.getElementById("terminal-input")?.focus(); }}
      >
        <AnimatePresence initial={false}>
          {filteredLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 flex gap-4 hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded"
            >
              <span className="shrink-0 text-data-slate opacity-50">
                [{log.timestamp}]
              </span>
              
              {log.type === "CMD" ? (
                <span className="text-white font-bold">{log.message}</span>
              ) : (
                <>
                  <span className={`shrink-0 font-bold w-8 ${
                    log.type === "ERR" ? "text-red-400" : 
                    log.type === "SEC" ? "text-aura-violet" : 
                    log.type === "SYS" ? "text-yellow-400" : 
                    "text-insight-teal"
                  }`}>
                    {log.type}
                  </span>
                  <span className={`flex-1 ${
                    log.type === "ERR" ? "text-red-300" : 
                    log.type === "SEC" ? "text-aura-violet/80" : 
                    "text-white/80"
                  }`}>
                    {log.message}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Terminal Input */}
        <div className="flex items-center gap-2 mt-4 text-flow-indigo">
          <span>root@flowr-ai:~$</span>
          <input
            id="terminal-input"
            type="text"
            className="flex-1 bg-transparent outline-none text-white/90 placeholder:text-white/20 caret-flow-indigo"
            placeholder="Try 'grep ERR' or 'clear'..."
            onKeyDown={handleCommand}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
