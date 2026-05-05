"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Terminal as TerminalIcon,
  Search,
  Settings,
  Bell,
  Cpu,
  Database,
  Share2,
  Code
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
  { label: "Throughput", value: "8.4 GB/s", icon: Zap, color: "#4F46E5" },
  { label: "Uptime", value: "99.99%", icon: ShieldCheck, color: "#10B981" },
  { label: "Latency", value: "4.2ms", icon: Activity, color: "#F59E0B" },
];

function FloatingNode({ icon: Icon, label, delay = 0, x, y, scrollY }: any) {
  const moveY = useTransform(scrollY, [0, 1], [0, y * 1.5]);
  const smoothY = useSpring(moveY, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      style={{ y: smoothY, left: x }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="absolute glass-subtle p-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-xl z-30 whitespace-nowrap pointer-events-none md:pointer-events-auto will-change-transform"
    >
      <div className="w-8 h-8 rounded-lg bg-insight-teal/10 flex items-center justify-center text-insight-teal">
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">{label}</span>
    </motion.div>
  );
}

function CodeSnippet({ scrollY, y, x, code }: any) {
  const moveY = useTransform(scrollY, [0, 1], [0, y * 2]);
  const smoothY = useSpring(moveY, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ y: smoothY, left: x }}
      className="absolute font-mono text-[8px] text-insight-teal/40 pointer-events-none z-0 hidden md:block will-change-transform"
    >
      <pre>{code}</pre>
    </motion.div>
  );
}

function Terminal() {
  const [entries, setEntries] = useState(logEntries);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries((prev) => [...prev.slice(1), prev[0]]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 rounded-xl p-4 font-mono text-[10px] md:text-xs text-green-400 border border-white/5 h-full overflow-hidden shadow-2xl text-left">
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
    <div className="glass rounded-[2.5rem] p-6 md:p-10 border border-white/10 shadow-2xl w-full text-left">
      {/* App Bar */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-insight-teal to-aura-violet flex items-center justify-center text-white font-bold shadow-glow-sm">DF</div>
          <div>
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Dataflowra Command</h4>
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
            <div className="text-2xl font-bold text-[var(--text-primary)]">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart Visual */}
      <div className="glass-subtle rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h5 className="font-bold text-[var(--text-primary)]">Flow Intelligence</h5>
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

  // Parallax transforms with spring smoothing
  const backgroundYRaw = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const backgroundY = useSpring(backgroundYRaw as any, springConfig);

  const dashboardYRaw = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const dashboardY = useSpring(dashboardYRaw, springConfig);

  const foregroundYRaw = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const foregroundY = useSpring(foregroundYRaw, springConfig);

  const rotateSlightRaw = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rotateSlight = useSpring(rotateSlightRaw, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 15,
      y: (clientY / innerHeight - 0.5) * 15,
    });
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-48 overflow-hidden bg-[var(--background)]"
    >
      {/* Background Atmosphere */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-insight-teal/5 blur-[150px] rounded-full" />
        
        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
        
        <CodeSnippet scrollY={scrollYProgress} x="15%" y={-80} code={`pipeline {\n  stage('ingest') {\n    sync(edge_nodes)\n  }\n}`} />
        <CodeSnippet scrollY={scrollYProgress} x="85%" y={100} code={`const flow = new Flow({\n  source: 'AWS',\n  target: 'GCP'\n})`} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-insight-teal mb-4 block">The Interface</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-[var(--text-primary)] text-center">
            Command Your <br />
            <span className="gradient-text">Data Universe</span>
          </h2>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-medium text-center">
            A beautiful, high-performance command center designed for the scale of tomorrow. 
            Real-time observability meets absolute control.
          </p>
        </motion.div>

        {/* The Stack Showcase */}
        <div className="relative perspective-2000 min-h-[700px] md:min-h-[900px] flex items-center justify-center">
          {/* Floating Data Nodes */}
          <div className="hidden lg:block">
            <FloatingNode icon={Cpu} label="Neural Edge NYC-01" x="5%" y={-60} scrollY={scrollYProgress} delay={0.2} />
            <FloatingNode icon={Database} label="Sync Cluster" x="80%" y={40} scrollY={scrollYProgress} delay={0.4} />
            <FloatingNode icon={Share2} label="P2P Mesh Network" x="10%" y={140} scrollY={scrollYProgress} delay={0.6} />
          </div>

          {/* Layer 1: Global Node Map (Blurred Background) */}
          <motion.div
            style={{ 
              y: backgroundY,
              rotateZ: rotateSlight
            }}
            animate={{ 
              x: mousePos.x * -0.4, 
              y: mousePos.y * -0.4,
              rotateX: mousePos.y * 0.05,
              rotateY: mousePos.x * -0.05,
            }}
            className="absolute inset-0 opacity-20 blur-sm flex items-center justify-center pointer-events-none will-change-transform"
          >
            <div className="w-full h-full max-w-5xl rounded-[3rem] border border-white/5 bg-white/[0.02]" />
          </motion.div>

          {/* Layer 2: Main Dashboard */}
          <motion.div
            style={{ 
              y: dashboardY,
              rotateZ: rotateSlight
            }}
            animate={{ 
              x: mousePos.x, 
              y: mousePos.y,
              rotateX: mousePos.y * 0.15,
              rotateY: mousePos.x * -0.15,
            }}
            className="relative z-20 w-full max-w-5xl will-change-transform"
          >
            <MainDashboard />
          </motion.div>

          {/* Layer 3: Side Terminal (Floating) */}
          <motion.div
            style={{ y: foregroundY }}
            animate={{ 
              x: mousePos.x * 1.2 + 380, 
              y: mousePos.y * 1.2 + 280,
              rotateX: mousePos.y * 0.2,
              rotateY: mousePos.x * -0.2,
            }}
            className="hidden xl:block absolute z-30 w-80 h-72 will-change-transform"
          >
            <Terminal />
          </motion.div>

          {/* Layer 4: Security Alert (Floating) */}
          <motion.div
            style={{ y: foregroundY }}
            animate={{ 
              x: mousePos.x * 1.5 - 480, 
              y: mousePos.y * 1.5 - 250,
              rotateX: mousePos.y * 0.25,
              rotateY: mousePos.x * -0.25,
            }}
            className="hidden xl:block absolute z-30 will-change-transform"
          >
            <div className="glass-subtle p-6 rounded-2xl border border-white/10 shadow-3xl flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-insight-teal/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-insight-teal" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase text-insight-teal mb-1 text-left">Protection Layer</div>
                <div className="text-base font-bold text-left text-[var(--text-primary)]">Encrypted End-to-End</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
