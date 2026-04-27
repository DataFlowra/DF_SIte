"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Activity,
  Globe,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";

// --- Components ---

function ShowcaseHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-insight-teal/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aura-violet/10 blur-[120px] rounded-full" />
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle border border-insight-teal/20 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-insight-teal" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-insight-teal">Inside the Platform</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
        >
          Product <span className="gradient-text">Showcase</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium"
        >
          Step into the engine room of Dataflowra. Explore the architecture, 
          the speed, and the intelligence behind your data.
        </motion.p>
      </div>

      {/* Floating Elements */}
      <motion.div style={{ y: y2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)] opacity-50">Explore Depth</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-insight-teal to-transparent" />
      </motion.div>
    </section>
  );
}

const features = [
  {
    title: "Stream Processing",
    description: "Handle millions of events per second with sub-millisecond latency. Our custom engine scales horizontally across global regions.",
    icon: Zap,
    color: "#06B6D4",
    stats: "2.4M msg/s"
  },
  {
    title: "Neural Analytics",
    description: "Identify patterns and anomalies automatically. AI-driven insights that learn from your unique data flow.",
    icon: Activity,
    color: "#8B5CF6",
    stats: "99.2% Accuracy"
  },
  {
    title: "Edge Distribution",
    description: "Deploy logic closer to your users. 250+ edge locations worldwide for global data consistency.",
    icon: Globe,
    color: "#10B981",
    stats: "12ms Latency"
  },
  {
    title: "Secure Vault",
    description: "Enterprise-grade encryption for all data in transit and at rest. Fully compliant with global standards.",
    icon: Shield,
    color: "#F59E0B",
    stats: "AES-256"
  }
];

function InteractiveExplorer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
              Engineered for <br />
              <span className="gradient-text">Absolute Performance</span>
            </h2>
            
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                    activeIdx === i 
                    ? "glass border-insight-teal shadow-glow-sm" 
                    : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${activeIdx === i ? "bg-insight-teal/10" : "bg-white/5"}`}>
                      <feature.icon className={`w-6 h-6 ${activeIdx === i ? "text-insight-teal" : "text-[var(--text-muted)]"}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${activeIdx === i ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
                        {feature.title}
                      </h4>
                      {activeIdx === i && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>
                    <div className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                      {feature.stats}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full glass rounded-[3rem] border border-white/10 p-12 flex items-center justify-center relative overflow-hidden"
              >
                {/* Simulated Feature Visual */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-insight-teal to-aura-violet" />
                  <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-insight-teal to-aura-violet flex items-center justify-center shadow-2xl mb-8">
                    {(() => {
                      const Icon = features[activeIdx].icon;
                      return <Icon className="w-12 h-12 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{features[activeIdx].title}</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div 
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, delay: s * 0.2 }}
                          className="w-full h-full bg-insight-teal"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function NodeMapVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-32 overflow-hidden bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Global Intelligence Network</h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
          Our distributed network ensures that your data is always exactly where it needs to be, 
          when it needs to be there.
        </p>
      </div>

      <div className="relative h-[600px] max-w-5xl mx-auto">
        {/* SVG Network Map */}
        <svg viewBox="0 0 1000 600" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lines */}
          <motion.path
            d="M200 300 Q 500 100 800 300 T 500 500 T 200 300"
            fill="none"
            stroke="url(#line-grad)"
            strokeWidth="1"
            style={{ pathLength }}
          />
          <motion.path
            d="M100 200 L 900 400 M 300 500 L 700 100"
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />

          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Nodes */}
          {[
            { x: 200, y: 300, label: "London" },
            { x: 800, y: 300, label: "Tokyo" },
            { x: 500, y: 100, label: "New York" },
            { x: 500, y: 500, label: "Sydney" },
            { x: 100, y: 200, label: "San Francisco" },
            { x: 900, y: 400, label: "Singapore" }
          ].map((node, i) => (
            <g key={i}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="#06B6D4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                filter="url(#glow)"
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="12"
                stroke="#06B6D4"
                strokeWidth="1"
                fill="none"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <text 
                x={node.x} 
                y={node.y + 25} 
                className="text-[10px] fill-[var(--text-muted)] font-bold uppercase tracking-widest text-center"
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Data Packets */}
        <div className="absolute inset-0 pointer-events-none">
          {[1, 2, 3, 4, 5].map((p) => (
            <motion.div
              key={p}
              animate={{ 
                x: ["10%", "90%", "10%"],
                y: ["20%", "50%", "80%", "20%"]
              }}
              transition={{ duration: 10 + p * 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-2 h-2 rounded-full bg-insight-teal blur-[2px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-insight-teal/5" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
          Ready to See Your <br />
          <span className="gradient-text">Data in Motion?</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/register"
            className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Start Free Trial
          </Link>
          <Link
            href="/"
            className="px-10 py-5 glass border border-white/10 font-bold rounded-full hover:bg-white/5 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ShowcasePage() {
  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--text-primary)]">
      <Navbar />
      
      <main>
        <ShowcaseHero />
        <InteractiveExplorer />
        <NodeMapVisual />
        
        {/* Additional "Creative" Section: The Data Tunnel */}
        <section className="h-[150vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center z-20 max-w-xl px-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Limitless Throughput</h2>
              <p className="text-[var(--text-muted)] text-lg">
                No bottlenecks. No delays. Our architecture is built to handle the future of data.
              </p>
            </motion.div>

            {/* Tunnel Visual */}
            <div className="absolute inset-0 perspective-1000">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, z: -1000 * i }}
                  animate={{ 
                    z: [-1000 * i, 1000],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "linear" 
                  }}
                  className="absolute inset-0 border-[2px] border-insight-teal/20 rounded-[5rem]"
                  style={{
                    width: "80%",
                    height: "80%",
                    left: "10%",
                    top: "10%"
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
