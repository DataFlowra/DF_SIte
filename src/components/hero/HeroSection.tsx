"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

// Cinematic text reveal
const wordVariants = {
  hidden: { opacity: 0, y: 100, rotateX: 45, filter: "blur(15px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function GlassShard({ index }: { index: number }) {
  const y = [0, -20, 0];
  const rotate = [index * 15, index * 15 + 10, index * 15];
  
  return (
    <motion.div
      animate={{ y, rotate }}
      transition={{ 
        duration: 8 + index * 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="absolute glass-subtle rounded-xl opacity-20 pointer-events-none"
      style={{
        width: 100 + index * 50,
        height: 60 + index * 30,
        left: `${20 + index * 25}%`,
        top: `${15 + (index % 3) * 20}%`,
        zIndex: 2,
      }}
    />
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "Watch Your Data Wake Up";
  const words = headline.split(" ");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      {/* 3D Particle Layer */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/20 to-[var(--background)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,var(--background)_100%)] opacity-80" />
      </div>

      {/* Kinetic Shards */}
      {[0, 1, 2, 3].map((i) => (
        <GlassShard key={i} index={i} />
      ))}

      {/* Main Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20"
      >
        {/* Superior Pill Badge */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-subtle border border-insight-teal/20 mb-10 shadow-glow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-insight-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-insight-teal"></span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-insight-teal">
            The Flow State of Data
          </span>
        </motion.div>

        {/* Master Headline */}
        <h1 className="perspective-1000 mb-8">
          <span className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-2">
                <motion.span
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className={`inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter
                    ${(word === "Data" || word === "Wake") ? "gradient-text" : "text-[var(--text-primary)]"}
                  `}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Enhanced Subtitle */}
        <motion.p
          custom={1.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Transform raw streams into organized intelligence.{" "}
          <span className="text-insight-teal underline decoration-insight-teal/30 underline-offset-4">Dataflowra</span> makes your data move, breathe, and deliver at scale.
        </motion.p>

        {/* Action Engine */}
        <motion.div
          custom={1.6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-insight-teal/20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-insight-teal to-aura-violet opacity-0 group-hover:opacity-10 transition-opacity" />
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <Link
            href="/showcase"
            className="group inline-flex items-center gap-3 px-10 py-5 glass border border-white/10 font-bold rounded-full transition-all duration-300 hover:bg-white/5 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-insight-teal/10 transition-colors">
              <Play className="w-4 h-4 text-insight-teal fill-insight-teal" />
            </div>
            Watch Demo
          </Link>
        </motion.div>
      </motion.div>

      {/* Kinetic Scroll Anchor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)] opacity-50">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-insight-teal/50 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
