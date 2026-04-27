"use client";

import { useRef, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  BarChart3,
  Shield,
  Globe,
  Cpu,
  Layers,
  ChevronRight,
  X
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "realtime",
    icon: Zap,
    title: "Real-Time Processing",
    description: "Process millions of data points per second with sub-millisecond latency. Your data never sleeps.",
    details: ["Sub-millisecond latency", "Dynamic auto-scaling", "Backpressure management", "Stream enrichment"],
    image: "/images/features/realtime.png",
    color: "#06B6D4",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Adaptive Analytics",
    description: "AI-powered visualizations that evolve with your data patterns.",
    details: ["Neural recognition", "Predictive trends", "Self-healing", "Anomaly detection"],
    image: "/images/features/analytics.png",
    color: "#8B5CF6",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "security",
    icon: Shield,
    title: "Zero-Trust Security",
    description: "End-to-end encryption with granular access controls.",
    details: ["AES-256 encryption", "Key management", "Identity proxying", "Compliance logs"],
    image: "/images/features/security.png",
    color: "#4F46E5",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "edge",
    icon: Globe,
    title: "Global Edge Network",
    description: "Deploy across 200+ edge locations. Speed of light, everywhere.",
    details: ["Anycast routing", "Edge-side compute", "Data residency", "Load balancing"],
    image: "/images/features/realtime.png",
    color: "#06B6D4",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "orchestration",
    icon: Cpu,
    title: "Smart Orchestration",
    description: "Intelligent workflow automation that routes data to the right destination.",
    details: ["Logic-based routing", "Conditional triggers", "Retry & recovery", "Hybrid-cloud"],
    image: "/images/features/analytics.png",
    color: "#8B5CF6",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    id: "fabric",
    icon: Layers,
    title: "Unified Data Fabric",
    description: "Connect any source, any format, any volume. One fabric.",
    details: ["Schema-less ingestion", "Auto-conversion", "Unified query API", "Multi-source joining"],
    image: "/images/features/security.png",
    color: "#4F46E5",
    span: "md:col-span-1 md:row-span-1"
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        layout: { type: "spring", stiffness: 200, damping: 25, bounce: 0 },
        opacity: { duration: 0.8 },
        y: { duration: 0.8 }
      }}
      className={`relative group perspective-1000 ${isExpanded ? 'md:col-span-3' : feature.span}`}
    >
      <motion.div
        layout
        className={`relative h-full w-full glass rounded-[2.5rem] overflow-hidden border border-white/10 transition-all duration-500 will-change-transform
          ${isExpanded ? 'p-10 md:p-14 bg-[var(--surface-elevated)]' : 'p-8 hover:border-white/20'}
        `}
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
      >
        {/* Background Image with Theme-Aware Overlay */}
        <motion.div layout className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src={feature.image} 
            alt={feature.title} 
            fill 
            className={`object-cover transition-opacity duration-1000 ${isExpanded ? 'opacity-30' : 'opacity-10 group-hover:opacity-15'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] via-[var(--surface)]/80 to-transparent" />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-start justify-between mb-8">
            <motion.div 
              layout
              className={`rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-2xl transition-all duration-500
                ${isExpanded ? 'w-20 h-20' : 'w-16 h-16 group-hover:scale-105'}
              `}
            >
              <feature.icon 
                className={`${isExpanded ? 'w-10 h-10' : 'w-8 h-8'} transition-all`} 
                style={{ color: feature.color }} 
              />
            </motion.div>
            
            <motion.button
              layout
              onClick={toggle}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-50
                ${isExpanded ? 'bg-[var(--background)] border border-white/10 rotate-0' : 'bg-white/5 border border-white/5 group-hover:translate-x-1 group-hover:bg-white/10'}
              `}
            >
              {isExpanded ? (
                <X className="w-6 h-6 text-[var(--text-primary)]" />
              ) : (
                <ChevronRight className="w-6 h-6 text-[var(--text-primary)]" />
              )}
            </motion.button>
          </div>

          <motion.h3 
            layout
            className={`font-bold transition-all duration-500 text-[var(--text-primary)] 
              ${isExpanded ? 'text-4xl md:text-5xl mb-6' : 'text-2xl mb-4'}
            `}
            style={{ transform: "translateZ(0)" }}
          >
            {feature.title}
          </motion.h3>

          <motion.p 
            layout
            className={`text-[var(--text-muted)] leading-relaxed transition-all duration-500 font-medium
              ${isExpanded ? 'text-xl max-w-2xl mb-10' : 'text-base mb-6'}
            `}
            style={{ transform: "translateZ(0)" }}
          >
            {feature.description}
          </motion.p>

          <AnimatePresence mode="popLayout">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-6 pt-10 border-t border-white/10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {feature.details.map((detail, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col gap-2"
                    >
                      <div className="w-8 h-[2px]" style={{ backgroundColor: feature.color }} />
                      <span className="text-sm font-bold uppercase tracking-widest" style={{ color: feature.color }}>{`0${i+1}`}</span>
                      <span className="text-lg text-[var(--text-primary)] font-semibold">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <motion.div layout className="mt-auto">
              <button 
                onClick={toggle}
                className="text-xs font-bold uppercase tracking-[0.2em] text-insight-teal opacity-50 group-hover:opacity-100 transition-all hover:tracking-[0.3em]"
              >
                Learn More
              </button>
            </motion.div>
          )}
        </div>

        {/* Dynamic Glow */}
        <div 
          className="absolute -bottom-40 -right-40 w-80 h-80 blur-[120px] rounded-full opacity-5 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"
          style={{ backgroundColor: feature.color }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesBento() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="features" ref={sectionRef} className="relative py-32 overflow-hidden bg-[var(--background)]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-bold tracking-[0.3em] uppercase text-insight-teal mb-4 block"
          >
            Core Infrastructure
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-[var(--text-primary)]"
          >
            Engineered for <br />
            <span className="gradient-text">Absolute Flow</span>
          </motion.h2>
        </div>

        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto"
          >
            {features.map((feature, i) => (
              <FeatureCard key={feature.id} feature={feature} index={i} />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
