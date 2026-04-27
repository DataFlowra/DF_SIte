"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Terminal as TerminalIcon,
  Search,
  Settings,
  Bell
} from "lucide-react";

// Mock Data
const logEntries = [
  "[14:22:01] Flow established: US-East -> EU-West",
  "[14:22:04] Security handshake verified (AES-256)",
  "[14:22:08] Processing data packet: 824.5MB",
  "[14:22:12] Latency optimized: 12ms -> 4ms",
  "[14:22:15] Neural pattern: Anomaly detected (Low priority)",
  "[14:22:20] Edge node scaled: Singapore (SGP-1)",
];

const metrics = [
  { label: "Active Nodes", value: "1,284", icon: Globe, color: "#06B6D4" },
  { label: "Throughput", value: "8.4 GB/s", icon: Zap, color: "#8B5CF6" },
  { label: "Uptime", value: "99.99%", icon: ShieldCheck, color: "#10B981" },
  { label: "Latency", value: "4.2ms", icon: Activity, color: "#F59E0B" },
];

function Terminal() {
  const [entries, setEntries] = useState(logEntries);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => [...prev.slice(1), prev[0]]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 rounded-xl p-4 font-mono text-[10px] md:text-xs text-green-400 border border-white/5 h-full overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[10px] text-white/40 uppercase tracking-widest ml-2">Live Node Stream</span>
      </div>
      <div className="space-y-1.5">
        {entries.map((entry, i) => (
          <motion.div
            key={entry + i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="whitespace-nowrap"
          >
            <span className="text-white/30 mr-2">{entry.split(']')[0]}]</span>
            <span>{entry.split(']')[1]}</span>
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-3 bg-green-400 ml-1 translate-y-0.5"
        />
      </div>
    </div>
  );
}

function MainDashboard() {
  return (
    <div className="glass rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl w-full">
      {/* App Bar */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-insight-teal to-aura-violet flex items-center justify-center text-white font-bold">DF</div>
          <div>
            <h4 className="text-lg font-bold">Dataflowra Command</h4>
            <p className="text-xs text-[var(--text-muted)]">Enterprise Console v4.2</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[var(--text-muted)] text-sm">
            <Search className="w-4 h-4" />
            <span>Search flows...</span>
          </div>
          <Bell className="w-5 h-5 text-[var(--text-muted)]" />
          <Settings className="w-5 h-5 text-[var(--text-muted)]" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="glass-subtle p-4 rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5" style={{ color: m.color }}>
                <m.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{m.label}</span>
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart Visual */}
      <div className="glass-subtle rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h5 className="font-bold">Flow Intelligence</h5>
            <p className="text-[10px] text-[var(--text-muted)]">Real-time throughput analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-insight-teal" />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Inbound</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-aura-violet" />
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Outbound</span>
            </div>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div className="h-48 w-full relative">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient-teal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Base Path */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0 160 Q 100 140, 200 150 T 400 120 T 600 130 T 800 100 T 1000 110 T 1200 80 L 1200 200 L 0 200 Z"
              fill="url(#gradient-teal)"
              className="w-full"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              d="M0 160 Q 100 140, 200 150 T 400 120 T 600 130 T 800 100 T 1000 110 T 1200 80"
              fill="none"
              stroke="#06B6D4"
              strokeWidth="3"
            />
          </svg>
          
          {/* Pulsing Hotspots */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[40%] left-[60%] w-3 h-3 rounded-full bg-insight-teal shadow-[0_0_20px_rgba(6,182,212,0.8)] cursor-pointer group/hotspot"
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black text-white text-[10px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none border border-white/10">
              Edge Burst: 12.4 GB/s
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 overflow-hidden bg-[var(--background)]"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-insight-teal/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-24"
        >
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-insight-teal mb-4 block">The Interface</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-[var(--text-primary)]">
            Command Your <br />
            <span className="gradient-text">Data Universe</span>
          </h2>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-medium">
            A beautiful, high-performance command center designed for the scale of tomorrow. 
            Real-time observability meets absolute control.
          </p>
        </motion.div>

        {/* The Stack Showcase */}
        <div className="relative perspective-1000 min-h-[600px] md:min-h-[800px] flex items-center justify-center">
          {/* Layer 1: Global Node Map (Blurred Background) */}
          <motion.div
            animate={{ 
              x: mousePos.x * -0.5, 
              y: mousePos.y * -0.5,
              rotateX: mousePos.y * 0.1,
              rotateY: mousePos.x * -0.1,
            }}
            className="absolute inset-0 opacity-20 blur-sm flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full max-w-5xl rounded-[3rem] border border-white/5 bg-white/[0.02]" />
          </motion.div>

          {/* Layer 2: Main Dashboard */}
          <motion.div
            animate={{ 
              x: mousePos.x, 
              y: mousePos.y,
              rotateX: mousePos.y * 0.2,
              rotateY: mousePos.x * -0.2,
            }}
            className="relative z-20 w-full max-w-5xl"
          >
            <MainDashboard />
          </motion.div>

          {/* Layer 3: Side Terminal (Floating) */}
          <motion.div
            animate={{ 
              x: mousePos.x * 1.5 + 300, 
              y: mousePos.y * 1.5 + 200,
              rotateX: mousePos.y * 0.3,
              rotateY: mousePos.x * -0.3,
            }}
            className="hidden lg:block absolute z-30 w-80 h-64"
          >
            <Terminal />
          </motion.div>

          {/* Layer 4: Security Alert (Floating) */}
          <motion.div
            animate={{ 
              x: mousePos.x * 2 - 400, 
              y: mousePos.y * 2 - 150,
              rotateX: mousePos.y * 0.4,
              rotateY: mousePos.x * -0.4,
            }}
            className="hidden lg:block absolute z-30"
          >
            <div className="glass-subtle p-5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-insight-teal/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-insight-teal" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-insight-teal mb-1">Protection Layer</div>
                <div className="text-sm font-bold">Encrypted End-to-End</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
