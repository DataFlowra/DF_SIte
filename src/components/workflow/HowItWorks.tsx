"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Connect",
    subtitle: "Plug into any data source",
    description:
      "Connect databases, APIs, streams, and files in seconds. Our universal connectors speak every data language.",
    color: "#06B6D4",
    iconImage: "/images/Connect.webp",
    icon: (isActive: boolean) => (
      <div className="relative w-24 h-24">
        <Image 
          src="/images/Connect.webp" 
          alt="Connect" 
          fill 
          className={`object-contain transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : 'scale-100'}`}
        />
      </div>
    ),
  },
  {
    number: "02",
    title: "Transform",
    subtitle: "Shape your data in motion",
    description:
      "Apply real-time transformations, filtering, and enrichment. Watch raw chaos become structured intelligence.",
    color: "#8B5CF6",
    iconImage: "/images/Transform.webp",
    icon: (isActive: boolean) => (
      <div className="relative w-24 h-24">
        <Image 
          src="/images/Transform.webp" 
          alt="Transform" 
          fill 
          className={`object-contain transition-all duration-500 ${isActive ? 'scale-110 -rotate-3' : 'scale-100'}`}
        />
      </div>
    ),
  },
  {
    number: "03",
    title: "Deliver",
    subtitle: "Insights at the speed of thought",
    description:
      "Push processed data to dashboards, alerts, and APIs instantly. Real-time delivery that never misses a beat.",
    color: "#4F46E5",
    iconImage: "/images/Deliver.webp",
    icon: (isActive: boolean) => (
      <div className="relative w-24 h-24">
        <Image 
          src="/images/Deliver.webp" 
          alt="Deliver" 
          fill 
          className={`object-contain transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : 'scale-100'}`}
        />
      </div>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold tracking-wider uppercase text-flow-indigo mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Three Steps to{" "}
            <span className="gradient-text">Flow</span>
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Hover over each step to see the magic happen.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              className="relative group"
              data-hoverable
            >
              <div className="glass rounded-2xl p-8 h-full transition-all duration-500 group-hover:shadow-2xl relative overflow-hidden">
                {/* Active glow */}
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${step.color}15, transparent 70%)`,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Step Number */}
                <div
                  className="text-6xl font-black opacity-10 absolute top-4 right-6 transition-all duration-500 group-hover:opacity-20"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Interactive Icon */}
                <div className="relative z-10 mb-6 flex justify-center">
                  {step.icon(activeStep === i)}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3
                    className="text-2xl font-bold mb-1 transition-colors duration-300"
                    style={{
                      color:
                        activeStep === i ? step.color : "var(--text-primary)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: step.color }}
                    initial={{ width: "0%" }}
                    animate={{
                      width: activeStep === i ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Connector Line (between steps) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px]">
                  <div className="w-full h-full bg-gradient-to-r from-[var(--text-muted)] to-transparent opacity-20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
