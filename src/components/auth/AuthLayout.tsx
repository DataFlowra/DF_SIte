"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import Logo from "../Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);

  return (
    <div ref={containerRef} className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--background)]">
      {/* Visual Side (Left) */}
      <div className="hidden lg:block sticky top-0 h-screen overflow-hidden bg-[var(--surface)]">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--background)]/20 to-transparent" />
        <Image
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
          alt="Technical Background"
          fill
          className="object-cover grayscale contrast-125 opacity-30"
          priority
        />
        {/* Animated Accents on Image */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-flow-indigo/20 blur-[120px] rounded-full" 
          />
        </div>

        {/* Parallax Content on Image */}
        <motion.div 
          style={{ y: textY, opacity }}
          className="absolute bottom-20 left-20 z-20 max-w-md"
        >
          <h2 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter mb-6">
            Simple tools for <br />
            <span className="gradient-text">complex data.</span>
          </h2>
          <p className="text-lg text-data-slate font-medium leading-relaxed">
            FlowR AI makes it easy for anyone to understand and manage their data in real-time.
          </p>
        </motion.div>
      </div>

      {/* Form Side (Right) */}
      <div className="relative flex flex-col items-center p-8 md:p-12">
        {/* Mobile Atmosphere */}
        <div className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-insight-teal/5 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-flow-indigo/5 blur-[140px] rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 w-full max-w-md flex flex-col h-full justify-between py-8">
          <div>
            {/* Back Home */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-data-slate hover:text-[var(--text-primary)] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to home
              </Link>
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <Link href="/" className="inline-block mb-8 group" data-hoverable>
                <Logo width={160} height={45} />
              </Link>

              <h1 className="text-4xl font-black tracking-tighter mb-3 leading-none text-[var(--text-primary)]">
                {title}
              </h1>
              <p className="text-lg text-data-slate font-medium">
                {subtitle}
              </p>
            </motion.div>

            {/* Auth Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full"
            >
              {children}
            </motion.div>
          </div>

          {/* Simple Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.2em] text-data-slate opacity-40"
          >
            Secured Connection • Encrypted Data
          </motion.p>
        </div>
      </div>
    </div>
  );
}
