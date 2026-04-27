"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" data-hoverable>
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg gradient-flow opacity-80 group-hover:opacity-100 transition-opacity" />
            <svg
              viewBox="0 0 32 32"
              className="relative w-8 h-8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8L16 4L24 8L24 16L16 24L8 16Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M16 12L20 14L20 18L16 20L12 18L12 14Z"
                fill="white"
                opacity="0.6"
              />
              <circle cx="16" cy="16" r="2" fill="white" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Data<span className="gradient-text">flowra</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/showcase"
            data-hoverable
            className="flex items-center gap-1.5 text-sm font-bold text-insight-teal hover:text-[var(--text-primary)] transition-colors relative group px-3 py-1 rounded-full bg-insight-teal/10 border border-insight-teal/20 shadow-glow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Showcase
          </Link>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-hoverable
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-insight-teal to-aura-violet group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="#cta"
            data-hoverable
            className="relative inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group"
          >
            <div className="absolute inset-0 gradient-flow transition-all duration-300 group-hover:opacity-90" />
            <span className="relative">Get Started</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-hoverable
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link
                href="/showcase"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-base font-bold text-insight-teal"
              >
                <Sparkles className="w-4 h-4" />
                Showcase
              </Link>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-full gradient-flow mt-2"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
