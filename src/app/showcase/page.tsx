"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Globe, 
  Sparkles, 
  Cpu, 
  MessageSquare, 
  ArrowRight, 
  Send, 
  Database, 
  Layers, 
  Network, 
  Lock, 
  Terminal, 
  ZapOff, 
  HardDrive 
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

// --- Specialized Visuals ---

function RapidsVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--surface)] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
      <div className="absolute inset-0 flex flex-col p-10 justify-between">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center border border-flow-indigo/20 text-flow-indigo">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest text-left">Processing Engine</h4>
              <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">GPU Accelerated Analytics</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-insight-teal font-black animate-pulse">OPTIMIZED_MODE: ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 flex flex-col gap-2 h-full justify-end">
              <motion.div 
                animate={{ height: [40, Math.random() * 80 + 40, 40] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-full bg-gradient-to-t from-flow-indigo to-insight-teal rounded-t-lg opacity-40 shadow-glow-sm"
              />
              <div className="h-1 w-full bg-white/5 rounded-full" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="space-y-1 text-left">
            <div className="text-[8px] text-data-slate uppercase font-black">Data Ingestion</div>
            <div className="text-sm font-mono font-bold text-[var(--text-primary)]">4.2 GB/s</div>
          </div>
          <div className="space-y-1 text-left">
            <div className="text-[8px] text-data-slate uppercase font-black">Query Latency</div>
            <div className="text-sm font-mono font-bold text-green-400">0.002ms</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NemoVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--surface)] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <div className="p-10 flex flex-col h-full gap-6 text-left relative">
        {/* Token Flow Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, y: i * 60, opacity: 0 }}
              animate={{ x: 600, opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.8, ease: "linear" }}
              className="absolute w-2 h-2 bg-aura-violet rounded-sm blur-[1px]"
            />
          ))}
        </div>

        <div className="flex items-center gap-3 pb-6 border-b border-white/5 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-aura-violet/10 flex items-center justify-center border border-aura-violet/20 text-aura-violet">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Generative Insight</h4>
            <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Autonomous Intelligence Layer</p>
          </div>
        </div>

        <div className="flex-1 space-y-4 relative z-10">
          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-aura-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-aura-violet animate-pulse" />
              <span className="text-[8px] font-mono text-aura-violet uppercase tracking-widest font-black">AI_CORE_ACTIVE</span>
            </div>
            <div className="text-xs font-medium text-[var(--text-primary)]/90 leading-relaxed italic relative min-h-[60px]">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                "Neural architecture has synthesized 2.4TB of telemetry. Trend analysis suggests a 14% efficiency gain in EMEA clusters after autonomous routing optimization..."
              </motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-aura-violet ml-2 align-middle shadow-[0_0_10px_#8B5CF6]"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 glass-subtle rounded-2xl border border-white/5 p-4 flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-aura-violet/30 to-transparent" />
              <span className="text-[8px] text-data-slate uppercase font-black mb-2">Confidence Score</span>
              <div className="flex items-baseline gap-1">
                <motion.span 
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-black text-aura-violet tracking-tighter"
                >
                  98.4
                </motion.span>
                <span className="text-xs font-bold text-data-slate">%</span>
              </div>
            </div>
            <div className="h-28 glass-subtle rounded-2xl border border-white/5 p-4 flex flex-col justify-center items-center overflow-hidden">
               <div className="relative">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="w-14 h-14 border-2 border-dashed border-aura-violet/20 rounded-full flex items-center justify-center"
                 />
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-2 border border-aura-violet/40 border-t-transparent rounded-full"
                 />
                 <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-aura-violet" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MorpheusVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--surface)] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <div className="p-10 flex flex-col h-full gap-6 text-left relative">
        <div className="flex justify-between items-start mb-2 relative z-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center border border-insight-teal/20 text-insight-teal shadow-glow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Real-time Watchdog</h4>
              <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Proactive Anomaly Detection</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
              <span className="text-[8px] font-black text-green-500 uppercase">System Online</span>
            </div>
            <span className="text-[10px] font-mono text-insight-teal font-bold animate-pulse">0.00ms DELAY</span>
          </div>
        </div>

        <div className="flex-1 relative bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden group">
           {/* Grid Helper */}
           <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
           
           <svg className="w-full h-full relative z-10" viewBox="0 0 400 200">
             {/* Dynamic Multi-layered Wave */}
             <motion.path
               d="M0 100 Q 50 100, 75 100 T 150 100 T 225 100 T 300 100 T 400 100"
               fill="none"
               stroke="#06B6D4"
               strokeWidth="1"
               strokeOpacity="0.2"
             />
             <motion.path
               d="M0 100 L 40 100 L 60 40 L 80 160 L 100 100 L 140 100 L 160 140 L 180 60 L 200 100 L 400 100"
               fill="none"
               stroke="#06B6D4"
               strokeWidth="2"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1, x: [0, -100, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />
             
             {/* Detection Pings */}
             {[80, 180, 320].map((x, i) => (
               <motion.circle
                 key={i}
                 cx={x} cy="100" r="3"
                 fill="#06B6D4"
                 animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
               />
             ))}
           </svg>

           <div className="absolute bottom-4 left-4 flex gap-4 items-center">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-insight-teal" />
                 <span className="text-[8px] font-mono text-data-slate uppercase">Signal Lock</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                 <span className="text-[8px] font-mono text-data-slate uppercase">Drift: 0.04%</span>
              </div>
           </div>
        </div>

        <div className="p-5 bg-flow-indigo/10 rounded-2xl border border-flow-indigo/20 flex items-center gap-5 transition-all group hover:bg-flow-indigo/20">
           <div className="w-10 h-10 rounded-xl bg-flow-indigo flex items-center justify-center shadow-lg">
              <ZapOff className="w-5 h-5 text-white" />
           </div>
           <div className="flex-1">
              <div className="text-[8px] font-black text-flow-indigo uppercase tracking-[0.2em] mb-1">Advanced Logic</div>
              <div className="text-[11px] font-bold text-[var(--text-primary)]">Automated Threat Mitigation</div>
           </div>
           <div className="px-3 py-1 rounded bg-flow-indigo/20 text-[9px] font-black text-flow-indigo">ENABLED</div>
        </div>
      </div>
    </div>
  );
}

function TritonVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--surface)] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <div className="p-10 flex flex-col h-full justify-between text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center border border-flow-indigo/20 text-flow-indigo">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Global Inference</h4>
            <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Enterprise Deployment</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-4">
           <div className="relative w-40 h-40 flex items-center justify-center">
             <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
             <Cpu className="w-12 h-12 text-flow-indigo relative z-10" />
             
             {[0, 1, 2].map((i) => (
               <motion.div
                 key={i}
                 className="absolute w-20 h-10 bg-[var(--surface-elevated)] border border-white/5 rounded-lg p-1.5 flex flex-col justify-center items-center shadow-lg"
                 style={{
                    transform: `rotate(${i * 120}deg) translateY(-70px) rotate(-${i * 120}deg)`
                 }}
               >
                 <span className="text-[6px] font-black text-data-slate uppercase">Node</span>
                 <span className="text-[8px] font-bold text-flow-indigo truncate">{i === 0 ? "ANALYTICS" : i === 1 ? "INSIGHT" : "REALTIME"}</span>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-2">
              <HardDrive className="w-3 h-3 text-insight-teal" />
              <div className="flex-1">
                 <div className="text-[7px] font-black text-data-slate uppercase">System</div>
                 <div className="text-[9px] font-bold text-[var(--text-primary)] uppercase tracking-tighter">Optimized</div>
              </div>
           </div>
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-2">
              <Network className="w-3 h-3 text-flow-indigo" />
              <div className="flex-1">
                 <div className="text-[7px] font-black text-data-slate uppercase">Network</div>
                 <div className="text-[9px] font-bold text-[var(--text-primary)] uppercase tracking-tighter">Active</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Data Analytics & Dashboards",
    description: "High-speed processing powering core analytics. Accelerate ETL at incredible speeds, ensuring your infrastructure remains scalable.",
    stats: "Analytics Engine",
    visual: RapidsVisual,
    color: "text-flow-indigo",
    tag: "BRAIN"
  },
  {
    title: "Generative Insights",
    description: "Translating complex findings into readable narratives. A specialized model that understands business metrics for clear summaries.",
    stats: "Insight Layer",
    visual: NemoVisual,
    color: "text-aura-violet",
    tag: "COMMUNICATOR"
  },
  {
    title: "Real-Time Alerting",
    description: "Specialized stream processing for anomaly detection. Monitor live data and trigger proactive alerts instantly.",
    stats: "Real-time AI",
    visual: MorpheusVisual,
    color: "text-insight-teal",
    tag: "WATCHDOG"
  },
  {
    title: "Production Deployment",
    description: "A single, unified server to deploy models efficiently. Optimized for lowest possible latency and operational cost.",
    stats: "Deployment Hub",
    visual: TritonVisual,
    color: "text-flow-indigo",
    tag: "INFERENCE"
  }
];

function ShowcaseHero() {
  const { user } = useAuth();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[var(--background)]">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-flow-indigo/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-insight-teal/5 blur-[180px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <span className="px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.4em] text-data-slate">
            The Next Generation
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-[var(--text-primary)]"
        >
          FlowR <span className="gradient-text">AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-data-slate font-medium leading-relaxed max-w-xl mx-auto mb-12"
        >
          The world's first autonomous data engine. <br className="hidden md:block" />
          Designed for high-performance intelligence at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href={user ? "/dashboard" : "/login"}
            target="_blank"
            className="px-10 py-5 bg-flow-indigo text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-2xl shadow-flow-indigo/20 hover:scale-105 transition-transform"
          >
            {user ? "Go to Dashboard" : "Try FlowR AI"}
          </Link>
          <Link
            href="/"
            className="px-10 py-5 glass border border-white/5 font-black text-xs uppercase tracking-widest rounded-xl text-data-slate hover:text-[var(--text-primary)] transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>

      <motion.div style={{ opacity }} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-data-slate mb-4">
          Explore Platform Tech
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-flow-indigo via-insight-teal to-transparent" />
      </motion.div>
    </section>
  );
}

function InteractiveExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-12 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-flow-indigo" />
                <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.3em]">Infrastructure</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter leading-tight text-[var(--text-primary)]">
                Operational <br />
                <span className="gradient-text">Intelligence</span>
              </h2>
              <p className="text-base text-data-slate font-medium leading-relaxed max-w-sm">
                A unified pipeline built for raw ingestion, real-time alerting, and automated summaries.
              </p>
            </motion.div>
            
            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-6 rounded-[1.5rem] border transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                    activeIdx === i 
                    ? "bg-[var(--surface)] border-flow-indigo/20 shadow-xl" 
                    : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[7px] font-black uppercase tracking-widest ${activeIdx === i ? feature.color : "text-white/20"}`}>
                          {feature.tag}
                        </span>
                        <div className={`w-1 h-1 rounded-full ${activeIdx === i ? "bg-flow-indigo animate-ping" : "bg-white/10"}`} />
                      </div>
                      <h4 className={`text-lg font-bold transition-all duration-300 ${activeIdx === i ? "text-[var(--text-primary)]" : "text-data-slate group-hover:text-[var(--text-primary)]"}`}>
                        {feature.title}
                      </h4>
                      
                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-data-slate leading-relaxed max-w-xs"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="text-right">
                      <div className={`text-[9px] font-mono font-black ${activeIdx === i ? "text-insight-teal" : "text-white/5"}`}>
                        {feature.stats}
                      </div>
                    </div>
                  </div>

                  {activeIdx === i && (
                    <motion.div 
                      layoutId="active-ind"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-flow-indigo"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative aspect-square lg:h-[600px]">
            <div className="absolute inset-0 bg-flow-indigo/5 blur-[120px] rounded-full -z-10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                {(() => {
                  const Visual = features[activeIdx].visual;
                  return <Visual />;
                })()}

                <div className="absolute top-4 left-6 flex items-center gap-2 glass-subtle px-3 py-1.5 rounded-full border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] text-white/50">{features[activeIdx].stats} Active</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechStackGrid() {
  return (
    <section className="py-24 px-6 bg-[var(--background)] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 max-w-2xl text-left">
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Foundational Core</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--text-primary)] mb-6">
            The Intelligence <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-data-slate font-medium leading-relaxed">
            FlowR AI is powered by high-performance AI frameworks, enabling sub-millisecond data processing and generative intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "RAPIDS Engine", 
              subtitle: "The Quantitative Brain",
              desc: "GPU-accelerated processing (cuDF, cuML) for end-to-end data science. Handles historical data crunching at lightspeed.", 
              icon: Database,
              color: "border-flow-indigo/20"
            },
            { 
              title: "Generative Framework", 
              subtitle: "The Communicator",
              desc: "Specialized models that understand complex business metrics. Translates findings into human-readable insights and summaries.", 
              icon: MessageSquare,
              color: "border-aura-violet/20"
            },
            { 
              title: "Morpheus RT", 
              subtitle: "The Real-time Watchdog",
              desc: "High-performance pipelines for anomaly and signal detection. Provides proactive alerts on live data signals.", 
              icon: Zap,
              color: "border-insight-teal/20"
            }
          ].map((tech, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-[2rem] bg-[var(--surface)] border ${tech.color} group hover:scale-[1.02] transition-all`}
            >
              <tech.icon className="w-8 h-8 text-flow-indigo mb-6 group-hover:scale-110 transition-transform" />
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">{tech.title}</h3>
                <span className="text-[10px] font-black text-data-slate uppercase tracking-widest">{tech.subtitle}</span>
              </div>
              <p className="text-sm text-data-slate leading-relaxed">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PipelineVisual() {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)] mb-6">
            Unified Data <span className="gradient-text">Pipeline</span>
          </h2>
          <p className="text-data-slate max-w-xl mx-auto font-medium">
            A continuous loop of ingestion, optimization, and communication.
          </p>
        </div>

        <div className="relative h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center gap-12 md:gap-32">
            {[
              { label: "Raw Ingestion", icon: HardDrive, color: "text-data-slate" },
              { label: "RAPIDS Processing", icon: Cpu, color: "text-flow-indigo" },
              { label: "NeMo Inference", icon: Sparkles, color: "text-aura-violet" },
              { label: "User Insight", icon: Globe, color: "text-insight-teal" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-6 relative z-10">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: i * 0.2 }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--surface)] border border-white/5 flex items-center justify-center ${step.color} shadow-2xl shadow-black/40`}
                >
                  <step.icon className="w-8 h-8 md:w-10 md:h-10" />
                </motion.div>
                <span className="text-[10px] font-black uppercase tracking-widest text-data-slate whitespace-nowrap">{step.label}</span>
                
                {i < 3 && (
                  <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-flow-indigo to-transparent opacity-20" />
                )}
              </div>
            ))}
          </div>

          {/* Flow Particles */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  x: ["0%", "100%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 0.5,
                  ease: "linear" 
                }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-flow-indigo blur-[1px]"
                style={{ left: `${i * 8}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OptimizedInfrastructure() {
  return (
    <section className="py-24 px-6 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1">
          <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Production Deployment</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)] mb-8 leading-tight">
            Optimized for <br />
            <span className="gradient-text">Lowest Latency</span>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-flow-indigo/10 flex items-center justify-center shrink-0 text-flow-indigo border border-flow-indigo/20">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">NVIDIA Triton Inference Server</h4>
                <p className="text-sm text-data-slate leading-relaxed">A unified tool to host RAPIDS models, NeMo LLMs, and Morpheus pipelines side-by-side with dynamic batching.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-xl bg-insight-teal/10 flex items-center justify-center shrink-0 text-insight-teal border border-insight-teal/20">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">NVIDIA TensorRT</h4>
                <p className="text-sm text-data-slate leading-relaxed">High-performance deep learning inference optimizer and runtime for the lowest possible latency and operational cost.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg aspect-video bg-[var(--surface)] rounded-[2.5rem] border border-white/5 relative overflow-hidden flex items-center justify-center shadow-3xl">
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           <div className="relative flex flex-col items-center">
              <Cpu className="w-24 h-24 text-flow-indigo mb-6 animate-pulse" />
              <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [12, 32, 12] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1.5 bg-flow-indigo rounded-full" 
                  />
                ))}
              </div>
              <div className="mt-8 text-[10px] font-mono text-data-slate uppercase tracking-[0.3em]">Hardware Abstraction Layer Active</div>
           </div>
        </div>
      </div>
    </section>
  );
}

export default function ShowcasePage() {
  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--text-primary)] selection:bg-flow-indigo/30">
      <Navbar />

      <main className="pb-32">
        <ShowcaseHero />
        <InteractiveExplorer />
        <TechStackGrid />
        <PipelineVisual />
        <OptimizedInfrastructure />
      </main>

      <Footer />
    </div>
  );
}
