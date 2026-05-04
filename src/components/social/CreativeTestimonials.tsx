"use client";

import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2, ShieldCheck, Zap, Activity } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Engineering, NeuralPath",
    quote: "Dataflowra saved us 40 hours per week on data management. The real-time dashboard is a complete game-changer for our scale.",
    avatar: "/images/Sarah Chen.webp",
    tag: "EFFICIENCY",
    icon: Zap,
    color: "#06B6D4"
  },
  {
    name: "Marcus Thorne",
    role: "CTO, CloudScale",
    quote: "We reduced our data latency by 95% after switching. Our customers now get instant updates instead of waiting for batch processes.",
    avatar: "/images/Marcus Thorne.webp",
    tag: "PERFORMANCE",
    icon: Activity,
    color: "#4F46E5"
  },
  {
    name: "Alex Rivet",
    role: "Lead Architect, QuantumSync",
    quote: "The zero-trust security model gave us the confidence to process sensitive data at the edge. Compliance is finally seamless.",
    avatar: "/images/Alex Rivet.webp",
    tag: "SECURITY",
    icon: ShieldCheck,
    color: "#8B5CF6"
  }
];

export default function CreativeTestimonials() {
  return (
    <section className="py-32 relative overflow-hidden bg-[var(--background)]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-flow-indigo/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-insight-teal/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle border border-flow-indigo/20 mb-6"
          >
            <Star className="w-3.5 h-3.5 text-flow-indigo fill-flow-indigo" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-flow-indigo">Architect Testimonials</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-[var(--text-primary)]">
            Trusted by the <br />
            <span className="gradient-text">Data Pioneers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group h-full"
            >
              <div className="h-full glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden flex flex-col group-hover:border-flow-indigo/30 transition-all duration-500 shadow-2xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <t.icon size={120} />
                </div>

                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-white/10`} style={{ color: t.color, backgroundColor: `${t.color}10` }}>
                      {t.tag}
                    </div>
                    <div className="flex items-center gap-1">
                       <CheckCircle2 size={10} className="text-green-500" />
                       <span className="text-[8px] font-mono text-data-slate uppercase">Verified Node</span>
                    </div>
                  </div>

                  <Quote className="w-10 h-10 text-flow-indigo mb-6 opacity-20" />
                  
                  <p className="text-lg font-medium text-[var(--text-primary)] leading-relaxed mb-12 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-5 mt-auto pt-8 border-t border-white/5">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <Image 
                      src={t.avatar} 
                      alt={t.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-data-slate font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute -bottom-20 -right-20 w-40 h-40 blur-[60px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ backgroundColor: t.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
