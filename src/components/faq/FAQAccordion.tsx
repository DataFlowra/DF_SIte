"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Zap, Shield, Globe, HelpCircle } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    icon: Globe,
    question: "What is a data command center in Dataflowra?",
    answer: "It is a unified interface that combines analytics, monitoring, and data visualization into a single operational system.",
    color: "#06B6D4"
  },
  {
    icon: Zap,
    question: "Why is real-time data important?",
    answer: "Real-time data allows businesses to make immediate decisions based on current conditions, improving accuracy and responsiveness.",
    color: "#8B5CF6"
  },
  {
    icon: HelpCircle,
    question: "Does Dataflowra include system monitoring features?",
    answer: "Yes, it includes infrastructure metrics like latency, processing load, and system performance indicators.",
    color: "#4F46E5"
  },
  {
    icon: Zap,
    question: "How does it improve business efficiency?",
    answer: "By centralizing tools and reducing manual reporting delays, it significantly speeds up decision-making processes.",
    color: "#10B981"
  }
];

function ParallaxImage({ src, y, x, rotate, scale, className }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, y]);
  const parallaxX = useTransform(scrollYProgress, [0, 1], [0, x]);

  return (
    <motion.div
      ref={ref}
      style={{ x: parallaxX, y: parallaxY }}
      className={`absolute z-0 pointer-events-none ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
        whileInView={{ opacity: 0.15, scale, rotate }}
        transition={{ duration: 1.5, type: "spring" }}
        className="w-96 h-96 blur-[2px] rounded-[3rem] overflow-hidden border border-white/5"
      >
        <Image 
          src={src} 
          alt="" 
          fill 
          className="object-cover grayscale contrast-125"
        />
      </motion.div>
    </motion.div>
  );
}

export default function FAQAccordion() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={sectionRef} className="relative py-48 overflow-hidden bg-[var(--background)]">
      {/* High-Visibility Parallax Background Layers */}
      <ParallaxImage 
        src="/images/1st question.webp" 
        y={-150} x={-100} rotate={15} scale={2} 
        className="-top-40 left-0" 
      />
      <ParallaxImage 
        src="/images/2nd question.webp" 
        y={100} x={150} rotate={-20} scale={1.8} 
        className="-top-20 -right-20" 
      />
      <ParallaxImage 
        src="/images/3rd question.webp" 
        y={-120} x={-50} rotate={10} scale={2.2} 
        className="top-1/2 -left-40" 
      />
      <ParallaxImage 
        src="/images/4th question.webp" 
        y={180} x={120} rotate={45} scale={1.5} 
        className="bottom-0 right-10" 
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            className="text-sm font-bold tracking-[0.3em] uppercase text-aura-violet mb-4 block"
          >
            Support Center
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter"
          >
            Future of <span className="gradient-text">Data Insights</span>
          </motion.h2>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
            Everything you need to know about the platform. <br />
            Simple answers for complex data questions.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full group relative text-left transition-all duration-500 rounded-[2rem] border overflow-hidden
                    ${isOpen 
                      ? 'bg-[var(--surface-elevated)] border-white/20 shadow-2xl scale-[1.02]' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  <div className="px-8 py-8 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                          ${isOpen ? 'bg-white/10' : 'bg-white/5 group-hover:bg-white/10'}
                        `}
                        style={{ color: isOpen ? faq.color : 'inherit' }}
                      >
                        <faq.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xl font-bold transition-all duration-300 ${isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'}`}>
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                        ${isOpen ? 'bg-white/10 text-white' : 'text-[var(--text-muted)]'}
                      `}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-24 pb-12 -mt-2">
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl"
                          >
                            {faq.answer}
                          </motion.div>
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="h-[2px] w-12 mt-8 origin-left"
                            style={{ backgroundColor: faq.color }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Glow */}
                  {isOpen && (
                    <div 
                      className="absolute -right-20 -top-20 w-40 h-40 blur-[80px] opacity-20 rounded-full"
                      style={{ backgroundColor: faq.color }}
                    />
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
