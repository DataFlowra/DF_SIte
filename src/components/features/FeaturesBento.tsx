"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  BarChart3,
  Shield,
  Globe,
  Cpu,
  Layers,
  ChevronRight,
  X,
  Plus
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    id: "realtime",
    icon: Zap,
    iconImage: "/images/Real-Time Processing (2).webp",
    title: "Real-Time Processing",
    description: "Process millions of data points per second with sub-millisecond latency. Your data never sleeps.",
    details: ["Sub-millisecond latency", "Dynamic auto-scaling", "Backpressure management", "Stream enrichment"],
    image: "/images/Real-Time Processing.webp",
    color: "#06B6D4",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "analytics",
    icon: BarChart3,
    iconImage: "/images/Adaptive Analytics (2).webp",
    title: "Adaptive Analytics",
    description: "AI-powered visualizations that evolve with your data patterns.",
    details: ["Neural recognition", "Predictive trends", "Self-healing", "Anomaly detection"],
    image: "/images/Adaptive Analytics.webp",
    color: "#8B5CF6",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "security",
    icon: Shield,
    iconImage: "/images/Zero-Trust Security (2).webp",
    title: "Zero-Trust Security",
    description: "End-to-end encryption with granular access controls.",
    details: ["AES-256 encryption", "Key management", "Identity proxying", "Compliance logs"],
    image: "/images/Zero-Trust Security.webp",
    color: "#4F46E5",
    span: "md:col-span-1 md:row-span-2"
  },
  {
    id: "edge",
    icon: Globe,
    iconImage: "/images/Global Edge Network (2).webp",
    title: "Global Edge Network",
    description: "Deploy across 200+ edge locations. Speed of light, everywhere.",
    details: ["Anycast routing", "Edge-side compute", "Data residency", "Load balancing"],
    image: "/images/Global Edge Network.webp",
    color: "#06B6D4",
    span: "md:col-span-1 md:row-span-1"
  },
  {
    id: "orchestration",
    icon: Cpu,
    iconImage: "/images/Smart Orchestration (2).webp",
    title: "Smart Orchestration",
    description: "Intelligent workflow automation that routes data to the right destination.",
    details: ["Logic-based routing", "Conditional triggers", "Retry & recovery", "Hybrid-cloud"],
    image: "/images/Smart Orchestration.webp",
    color: "#8B5CF6",
    span: "md:col-span-2 md:row-span-1"
  },
  {
    id: "fabric",
    icon: Layers,
    iconImage: "/images/Unified Data Fabric (2).webp",
    title: "Unified Data Fabric",
    description: "Connect any source, any format, any volume. One fabric.",
    details: ["Schema-less ingestion", "Auto-conversion", "Unified query API", "Multi-source joining"],
    image: "/images/Unified Data Fabric.webp",
    color: "#4F46E5",
    span: "md:col-span-1 md:row-span-1"
  }
];

export default function FeaturesBento() {
  const [activeFeature, setActiveFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="features" className="relative py-32 overflow-hidden bg-[var(--background)]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
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

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveFeature(feature)}
              className={`relative group cursor-pointer h-full glass rounded-[2.5rem] p-8 border border-white/10 overflow-hidden transition-all duration-500 hover:border-flow-indigo/30 shadow-2xl ${feature.span}`}
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 group-hover:scale-105">
                <Image 
                  src={feature.image} 
                  alt="" 
                  fill 
                  className="object-cover opacity-30 group-hover:opacity-50 transition-opacity" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)]/90 via-[var(--surface)]/40 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Image src={feature.iconImage} alt={feature.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-flow-indigo/20 group-hover:border-flow-indigo/30 transition-all">
                    <Plus className="w-5 h-5 text-[var(--text-muted)] group-hover:text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-medium">
                  {feature.description}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-insight-teal opacity-60 group-hover:opacity-100 transition-all">
                    Examine Architecture
                  </span>
                </div>
              </div>

              {/* Hover Glow */}
              <div 
                className="absolute -bottom-40 -right-40 w-80 h-80 blur-[120px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: feature.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {activeFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
              className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-2xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-[var(--surface)] rounded-[3.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row h-full max-h-[800px]"
            >
              {/* Image Side */}
              <div className="relative flex-1 h-64 md:h-auto overflow-hidden">
                <Image 
                  src={activeFeature.image} 
                  alt={activeFeature.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 text-left">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden border border-white/20 mb-6 shadow-2xl relative">
                    <Image src={activeFeature.iconImage} alt="" fill className="object-cover" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
                    {activeFeature.title.split(' ')[0]} <br />
                    <span className="text-insight-teal">{activeFeature.title.split(' ').slice(1).join(' ')}</span>
                  </h2>
                </div>
              </div>

              {/* Info Side */}
              <div className="flex-1 p-10 md:p-16 overflow-y-auto custom-scrollbar flex flex-col justify-center text-left">
                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-flow-indigo mb-4 block">Detailed Protocol</span>
                  <p className="text-lg md:text-xl text-[var(--text-muted)] font-medium leading-relaxed">
                    {activeFeature.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 border-b border-white/5 pb-4">Key Performance Indicators</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activeFeature.details.map((detail, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-flow-indigo group-hover:scale-150 group-hover:bg-insight-teal transition-all duration-300" />
                        <span className="text-sm font-bold text-[var(--text-primary)]">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 flex items-center gap-6">
                  <button 
                    onClick={() => setActiveFeature(null)}
                    className="px-10 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    Close Protocol
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveFeature(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-black/20 hover:bg-black/40 border border-white/5 text-white transition-all z-20"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
