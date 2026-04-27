"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section id="cta" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[4rem] p-12 md:p-24 relative overflow-hidden border border-white/10 shadow-2xl">
          {/* Animated Background Atmosphere */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-insight-teal/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aura-violet/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-subtle border border-insight-teal/30 mb-10 shadow-glow-sm"
            >
              <Sparkles className="w-4 h-4 text-insight-teal" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-insight-teal">Zero Latency Future</span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
              Ready to Accelerate <br />
              <span className="gradient-text">Your Data Flow?</span>
            </h2>

            <p className="text-xl md:text-2xl text-[var(--text-muted)] font-medium mb-16 leading-relaxed">
              Join the elite teams building the next generation of distributed infrastructure. 
              Deploy your first node in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full justify-center">
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-black font-black rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-insight-teal/30 w-full sm:w-auto"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-12 py-6 glass border border-white/10 font-bold rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95 w-full sm:w-auto"
              >
                Schedule a Technical Demo
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8 opacity-40">
              <div className="text-[10px] font-bold uppercase tracking-widest">Enterprise Ready</div>
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="text-[10px] font-bold uppercase tracking-widest">SOC2 Type II</div>
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="text-[10px] font-bold uppercase tracking-widest">99.99% SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
