"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "Dataflowra saved us 40 hours per week on data pipeline management. The real-time dashboard is a game-changer.",
    author: "Sarah Chen",
    role: "VP Engineering, NeuralPath",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    color: "#06B6D4"
  },
  {
    id: 2,
    quote: "We reduced our data latency by 95% after switching. Our customers now get instant updates instead of waiting.",
    author: "Marcus Rivera",
    role: "CTO, CloudScale",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    color: "#8B5CF6"
  },
  {
    id: 3,
    quote: "The zero-trust security model gave us confidence to process sensitive data. Compliance is finally seamless.",
    author: "Aisha Okonkwo",
    role: "Head of Data, QuantumSync",
    avatar: "https://i.pravatar.cc/150?u=aisha",
    color: "#4F46E5"
  },
  {
    id: 4,
    quote: "The most intuitive data orchestration platform I've ever used. It just flows where others struggle.",
    author: "James Wilson",
    role: "Lead Architect, Velocity Labs",
    avatar: "https://i.pravatar.cc/150?u=james",
    color: "#06B6D4"
  },
  {
    id: 5,
    quote: "Scaling our infrastructure used to take weeks. With Dataflowra, it's a matter of minutes and a few clicks.",
    author: "Elena Rodriguez",
    role: "DevOps Lead, StreamCore",
    avatar: "https://i.pravatar.cc/150?u=elena",
    color: "#8B5CF6"
  }
];

function ProgressBorder({ progress, color }: { progress: number, color: string }) {
  // Rounded Rect math
  const w = 72;
  const h = 72;
  const r = 18;
  const perimeter = 2 * (w + h) - 8 * r + 2 * Math.PI * r;
  const offset = perimeter - (progress / 100) * perimeter;

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
      viewBox="0 0 80 80"
      style={{ zIndex: 10 }}
    >
      <rect
        x="4"
        y="4"
        width={w}
        height={h}
        rx={r}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="4"
      />
      <rect
        x="4"
        y="4"
        width={w}
        height={h}
        rx={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={perimeter}
        style={{ 
          strokeDashoffset: offset,
          filter: `drop-shadow(0 0 6px ${color})`
        }}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;

    const intervalTime = 50; 
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, isInView, activeIndex]);

  useEffect(() => {
    if (progress >= 100) {
      next();
    }
  }, [progress, next]);

  const activeTestimonial = testimonials[activeIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-32 overflow-hidden bg-[var(--background)]">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
            style={{ background: `radial-gradient(circle, ${activeTestimonial.color} 0%, transparent 70%)` }}
          />
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="text-sm font-bold tracking-[0.3em] uppercase text-insight-teal mb-4 block"
          >
            Social Proof
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
          >
            Trusted by the <br />
            <span className="gradient-text">Architects of Tomorrow</span>
          </motion.h2>
        </div>

        <div 
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel Area */}
          <div className="relative h-[450px] md:h-[400px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 flex items-center justify-center px-4"
              >
                <div className="glass rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative w-full h-full flex flex-col justify-center">
                  <Quote className="absolute top-10 right-10 w-20 h-20 text-white/5 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <p className="text-2xl md:text-4xl font-medium leading-tight mb-10 text-[var(--text-primary)] italic">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <Image 
                          src={activeTestimonial.avatar} 
                          alt={activeTestimonial.author} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[var(--text-primary)]">{activeTestimonial.author}</h4>
                        <p className="text-sm text-insight-teal font-bold uppercase tracking-widest">{activeTestimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-12 z-30">
            <button 
              onClick={prev}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-12 z-30">
            <button 
              onClick={next}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>

        {/* Bottom Pagination & Avatar Reel */}
        <div className="mt-16 flex flex-col items-center gap-10">
          <div className="flex items-center gap-6 md:gap-10">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  let newDir = i > activeIndex ? 1 : -1;
                  if (activeIndex === testimonials.length - 1 && i === 0) newDir = 1;
                  if (activeIndex === 0 && i === testimonials.length - 1) newDir = -1;
                  
                  setDirection(newDir);
                  setActiveIndex(i);
                  setProgress(0);
                }}
                className={`relative w-20 h-20 transition-all duration-500 rounded-2xl flex items-center justify-center
                  ${activeIndex === i ? 'scale-110' : 'grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:scale-105'}
                `}
              >
                {/* Rounded Rect Progress Border */}
                {activeIndex === i && (
                  <ProgressBorder progress={progress} color={t.color} />
                )}
                
                <motion.div 
                  layoutId={`avatar-box-${t.id}`}
                  className="relative w-16 h-16 rounded-[1rem] overflow-hidden border border-white/10 shadow-lg z-0"
                >
                  <Image 
                    src={t.avatar} 
                    alt={t.author} 
                    fill 
                    className="object-cover"
                  />
                </motion.div>
              </button>
            ))}
          </div>

          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--text-muted)]">
            Viewing {activeIndex + 1} of {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
