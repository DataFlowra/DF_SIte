"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "../Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden bg-[var(--background)]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-insight-teal/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-aura-violet/10 blur-[140px] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Home */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10 text-center"
        >
          <Link href="/" className="flex items-center mb-8 group" data-hoverable>
            <Logo width={200} height={60} />
          </Link>

          <h1 className="text-4xl font-bold tracking-tighter mb-3 leading-tight text-[var(--text-primary)]">
            {title}
          </h1>
          <p className="text-[var(--text-muted)] font-medium">
            {subtitle}
          </p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            {children}
          </div>

          {/* Subtle Glow */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-insight-teal/10 blur-[60px] rounded-full pointer-events-none" />
        </motion.div>

        {/* Footer info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-50"
        >
          Secured by Dataflowra Cloud Shield • ReCAPTCHA V3 Active
        </motion.p>
      </div>
    </div>
  );
}
