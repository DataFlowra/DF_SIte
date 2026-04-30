"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Activity,
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
  BarChart3,
  Terminal,
  ZapOff,
  Search,
  LineChart,
  HardDrive
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

// --- NVIDIA Powered Visuals ---

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
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">cuDF Engine</h4>
              <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Powered by NVIDIA RAPIDS</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-insight-teal font-black animate-pulse">GPU_ACCELERATED: ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4 px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 flex flex-col gap-2 h-full justify-end">
              <motion.div 
                animate={{ height: [40, Math.random() * 100 + 60, 40] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                className="w-full bg-gradient-to-t from-flow-indigo to-insight-teal rounded-t-lg opacity-40 shadow-glow-sm"
              />
              <div className="h-1 w-full bg-white/5 rounded-full" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="space-y-1">
            <div className="text-[8px] text-data-slate uppercase font-black">ETL Throughput</div>
            <div className="text-sm font-mono font-bold text-white">4.2 GB/s</div>
          </div>
          <div className="space-y-1">
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
      <div className="p-10 flex flex-col h-full gap-6">
        <div className="flex items-center gap-3 pb-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-aura-violet/10 flex items-center justify-center border border-aura-violet/20 text-aura-violet">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Generative Insight</h4>
            <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Fine-tuned NVIDIA NeMo LLM</p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-3 h-3 text-aura-violet" />
              <span className="text-[8px] font-mono text-data-slate">ANALYSIS_PROMPT &gt; Summarize revenue trends</span>
            </div>
            <div className="text-[11px] font-medium text-white/80 leading-relaxed italic">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                "Based on RAPIDS data processing, revenue increased by 14% this quarter, primarily driven by cuML identified patterns in EMEA regions..."
              </motion.span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-3 bg-aura-violet ml-1 align-middle"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 glass-subtle rounded-xl border border-white/5 p-4 flex flex-col justify-center">
              <span className="text-[8px] text-data-slate uppercase font-black mb-1 text-center">Narrative Confidence</span>
              <div className="flex justify-center items-end gap-2">
                <span className="text-xl font-black text-aura-violet">98.4</span>
                <span className="text-[10px] font-bold text-data-slate mb-1">%</span>
              </div>
            </div>
            <div className="h-24 glass-subtle rounded-xl border border-white/5 p-4 flex flex-col justify-center overflow-hidden">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="w-12 h-12 border-2 border-dashed border-aura-violet/30 rounded-full mx-auto flex items-center justify-center"
               >
                 <Sparkles className="w-4 h-4 text-aura-violet/50" />
               </motion.div>
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
      <div className="p-10 flex flex-col h-full gap-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center border border-insight-teal/20 text-insight-teal">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Real-time Watchdog</h4>
              <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">Powered by NVIDIA Morpheus</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-ping" />
            <span className="text-[8px] font-black text-green-500 uppercase">Monitoring</span>
          </div>
        </div>

        <div className="flex-1 relative bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
           <svg className="w-full h-full" viewBox="0 0 400 200">
             <motion.path
               d="M0 100 L 50 100 L 70 40 L 90 160 L 110 100 L 400 100"
               fill="none"
               stroke="#06B6D4"
               strokeWidth="2"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
             />
             <motion.circle
               animate={{ cx: [0, 400], opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
               r="4"
               fill="#fff"
               className="shadow-[0_0_10px_#fff]"
             />
           </svg>
           <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
              <div className="text-[8px] font-mono text-insight-teal">SIGNAL: STABLE</div>
              <div className="text-[8px] font-mono text-white/20">THREAT_LEVEL: 0.00%</div>
           </div>
        </div>

        <div className="p-4 bg-flow-indigo/10 rounded-xl border border-flow-indigo/20 flex items-center gap-4">
           <ZapOff className="w-4 h-4 text-flow-indigo" />
           <div className="flex-1">
              <div className="text-[8px] font-black text-flow-indigo uppercase tracking-widest">Anomaly Detection</div>
              <div className="text-[10px] font-bold text-[var(--text-primary)]">Auto-Alert System Active</div>
           </div>
           <div className="text-[10px] font-mono font-bold text-flow-indigo">LIVE</div>
        </div>
      </div>
    </div>
  );
}

function TritonVisual() {
  return (
    <div className="relative w-full h-full bg-[var(--surface)] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
      <div className="p-10 flex flex-col h-full justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center border border-flow-indigo/20 text-flow-indigo">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">Unified Inference</h4>
            <p className="text-[8px] text-data-slate uppercase font-bold tracking-tighter">NVIDIA Triton & TensorRT</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-8">
           <div className="relative w-48 h-48 flex items-center justify-center">
             <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />
             <div className="absolute inset-4 border border-flow-indigo/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
             <Cpu className="w-16 h-16 text-flow-indigo relative z-10" />
             
             {[0, 1, 2].map((i) => (
               <motion.div
                 key={i}
                 className="absolute w-24 h-12 bg-[var(--surface-elevated)] border border-white/5 rounded-lg p-2 flex flex-col justify-center"
                 style={{
                    transform: `rotate(${i * 120}deg) translateY(-80px) rotate(-${i * 120}deg)`
                 }}
               >
                 <span className="text-[6px] font-black text-data-slate uppercase text-center">Model Hosted</span>
                 <span className="text-[8px] font-bold text-flow-indigo text-center truncate">{i === 0 ? "RAPIDS_ML" : i === 1 ? "NEMO_LLM" : "MORPHEUS_RT"}</span>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <HardDrive className="w-3 h-3 text-insight-teal" />
              <div className="flex-1">
                 <div className="text-[7px] font-black text-data-slate uppercase">Optimization</div>
                 <div className="text-[9px] font-bold text-white uppercase tracking-tighter">TensorRT Enabled</div>
              </div>
           </div>
           <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
              <Network className="w-3 h-3 text-flow-indigo" />
              <div className="flex-1">
                 <div className="text-[7px] font-black text-data-slate uppercase">Scalability</div>
                 <div className="text-[9px] font-bold text-white uppercase tracking-tighter">Auto-Scale ON</div>
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
    description: "High-speed data processing and ML powering core analytics. cuDF handles ETL at incredible speeds, ensuring your backend remains scalable.",
    stats: "NVIDIA RAPIDS",
    visual: RapidsVisual,
    color: "text-flow-indigo",
    tag: "QUANTITATIVE_BRAIN"
  },
  {
    title: "Generative Insights",
    description: "Translating complex findings into human-readable narratives. A specialized LLM that understands business metrics for clear summaries.",
    stats: "NVIDIA NeMo",
    visual: NemoVisual,
    color: "text-aura-violet",
    tag: "THE_COMMUNICATOR"
  },
  {
    title: "Real-Time Alerting",
    description: "Specialized stream processing framework for anomaly detection. Monitor live data and trigger proactive alerts instantly.",
    stats: "NVIDIA Morpheus",
    visual: MorpheusVisual,
    color: "text-insight-teal",
    tag: "REALTIME_WATCHDOG"
  },
  {
    title: "Production Deployment",
    description: "A single, unified server to deploy models efficiently. Optimized for lowest possible latency and operational cost.",
    stats: "Triton & TensorRT",
    visual: TritonVisual,
    color: "text-flow-indigo",
    tag: "UNIFIED_INFERENCE"
  }
];

function ShowcaseHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[var(--background)]">
      {/* Dynamic Background Atmosphere */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-flow-indigo/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-insight-teal/5 blur-[180px] rounded-full" />
        
        {/* Pulsing Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-[9rem] font-black tracking-tighter mb-8 leading-none text-[var(--text-primary)]"
        >
          FlowR <span className="gradient-text">AI</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <p className="text-xl md:text-2xl text-data-slate font-medium leading-relaxed">
            The world's first autonomous data engine. <br className="hidden md:block" />
            Built on NVIDIA's high-performance AI stack.
          </p>
        </motion.div>
      </div>

      {/* Re-designed Pill Anchor (Bottom) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-data-slate mb-6">
            Platform Tech
          </span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-flow-indigo via-insight-teal to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"
            />
          </div>
        </div>
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-flow-indigo" />
                <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.3em]">Operational Stack</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-[var(--text-primary)]">
                Intelligent <br />
                <span className="gradient-text">Protocol</span>
              </h2>
              <p className="text-lg text-data-slate font-medium leading-relaxed max-w-md">
                Step into the unified intelligence pipeline. Powered by industry-standard NVIDIA SDKs.
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
                      <h4 className={`text-lg font-bold transition-all duration-300 ${activeIdx === i ? "text-[var(--text-primary)]" : "text-data-slate group-hover:text-white"}`}>
                        {feature.title}
                      </h4>
                      
                      <AnimatePresence>
                        {activeIdx === i && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="text-xs text-data-slate leading-relaxed max-w-xs"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-mono font-black ${activeIdx === i ? "text-insight-teal" : "text-white/5"}`}>
                        {feature.stats}
                      </div>
                    </div>
                  </div>

                  {activeIdx === i && (
                    <motion.div 
                      layoutId="showcase-active-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-flow-indigo shadow-[0_0_15px_#4F46E5]"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative aspect-square lg:h-[600px]">
             {/* Decorative Background for visual */}
            <div className="absolute inset-0 bg-flow-indigo/5 blur-[120px] rounded-full -z-10" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full relative"
              >
                {(() => {
                  const Visual = features[activeIdx].visual;
                  return <Visual />;
                })()}

                {/* Technical Overlay */}
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

function TechStackSection() {
  return (
    <section className="py-32 px-6 border-y border-white/5 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
           <div className="max-w-xl">
              <span className="text-[10px] font-black text-flow-indigo uppercase tracking-[0.4em] mb-4 block">Unified Intelligence Pipeline</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[var(--text-primary)]">
                Built on <span className="gradient-text">NVIDIA</span> High-Performance Infrastructure
              </h2>
           </div>
           <p className="text-data-slate font-medium max-w-sm">
             FlowR AI is architected from the ground up to leverage GPU-acceleration for every stage of the data lifecycle.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "NVIDIA RAPIDS", desc: "The quantitative brain, crunching historical data and powering core dashboards at lightspeed.", icon: Database },
             { title: "NVIDIA NeMo", desc: "The communicator, translating RAPIDS findings into human-readable, easy-to-understand summaries.", icon: MessageSquare },
             { title: "NVIDIA Morpheus", desc: "The real-time watchdog layer, providing instant alerts on streaming data signals.", icon: Zap }
           ].map((tech, i) => (
             <div key={i} className="p-8 rounded-[2rem] bg-[var(--surface)] border border-white/5 group hover:border-flow-indigo/20 transition-all">
                <tech.icon className="w-8 h-8 text-flow-indigo mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{tech.title}</h3>
                <p className="text-sm text-data-slate leading-relaxed">{tech.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-48 relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-[var(--text-primary)]">
            Ready for <br />
            <span className="gradient-text">FlowR AI?</span>
          </h2>
          <p className="text-xl text-data-slate font-medium mb-16">
            Join the vanguard of data-driven enterprises today.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link
            href="/register"
            scroll={false}
            className="group relative px-12 py-6 bg-flow-indigo text-white font-black text-sm uppercase tracking-widest rounded-2xl overflow-hidden shadow-2xl shadow-flow-indigo/20 transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Start Free Trial</span>
          </Link>
          <Link
            href="/"
            scroll={false}
            className="px-12 py-6 glass border border-white/5 font-black text-sm uppercase tracking-widest rounded-2xl text-data-slate hover:text-white hover:bg-white/5 transition-all"
          >
            Back to Base
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ShowcasePage() {
  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--text-primary)] selection:bg-flow-indigo/30">
      <Navbar />

      <main>
        <ShowcaseHero />
        <InteractiveExplorer />
        <TechStackSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
