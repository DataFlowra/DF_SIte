"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect",
    subtitle: "Plug into any data source",
    description:
      "Connect databases, APIs, streams, and files in seconds. Our universal connectors speak every data language.",
    color: "#06B6D4",
    icon: (isActive: boolean) => (
      <svg viewBox="0 0 80 80" className="w-20 h-20">
        <motion.circle
          cx="25"
          cy="40"
          r="8"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="2"
          animate={isActive ? { cx: [25, 35, 25] } : { cx: 25 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="55"
          cy="40"
          r="8"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="2"
          animate={isActive ? { cx: [55, 45, 55] } : { cx: 55 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.line
          x1="33"
          y1="40"
          x2="47"
          y2="40"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeDasharray="4 4"
          animate={
            isActive
              ? { strokeDashoffset: [14, 0], opacity: [0, 1] }
              : { opacity: 0 }
          }
          transition={{ duration: 1, repeat: Infinity }}
        />
        {isActive && (
          <motion.circle
            cx="40"
            cy="40"
            r="3"
            fill="#06B6D4"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        )}
      </svg>
    ),
  },
  {
    number: "02",
    title: "Transform",
    subtitle: "Shape your data in motion",
    description:
      "Apply real-time transformations, filtering, and enrichment. Watch raw chaos become structured intelligence.",
    color: "#8B5CF6",
    icon: (isActive: boolean) => (
      <svg viewBox="0 0 80 80" className="w-20 h-20">
        {/* Chaotic lines */}
        {[0, 1, 2, 3, 4].map((i) => {
          const qx = [35, 38, 32, 36, 34][i];
          const qy = [18, 30, 40, 55, 70][i];
          return (
            <motion.path
              key={i}
              d={`M 10 ${20 + i * 12} Q ${qx} ${qy}, 40 40`}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isActive
                  ? { pathLength: 1, opacity: [0, 0.8, 0.4] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ delay: i * 0.15, duration: 0.8, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
            />
          );
        })}
        {/* Organized output lines */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={`out-${i}`}
            x1="44"
            y1="40"
            x2="70"
            y2={30 + i * 10}
            stroke="#06B6D4"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isActive
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
          />
        ))}
        <motion.circle
          cx="40"
          cy="40"
          r="6"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="2"
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "40px 40px" }}
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Deliver",
    subtitle: "Insights at the speed of thought",
    description:
      "Push processed data to dashboards, alerts, and APIs instantly. Real-time delivery that never misses a beat.",
    color: "#4F46E5",
    icon: (isActive: boolean) => (
      <svg viewBox="0 0 80 80" className="w-20 h-20">
        {/* Chart building itself */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={18 + i * 10}
            y={60}
            width="7"
            rx="2"
            fill={
              i % 2 === 0 ? "#06B6D4" : "#8B5CF6"
            }
            initial={{ height: 0, y: 60 }}
            animate={
              isActive
                ? {
                    height: [0, 15 + i * 7],
                    y: [60, 60 - (15 + i * 7)],
                  }
                : { height: 0, y: 60 }
            }
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          />
        ))}
        {/* Checkmark */}
        <motion.path
          d="M55 25 L60 30 L70 18"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isActive
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </svg>
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
