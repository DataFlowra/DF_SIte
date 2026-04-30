"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isShowcasePage = pathname === "/showcase" || pathname.startsWith("/showcase/");
  const ctaLink = user ? "/dashboard" : (isShowcasePage ? "/login" : "/showcase");
  const ctaText = user ? "Go to Dashboard" : (isShowcasePage ? "Sign In" : "Get Started");

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
        <Link href="/" className="flex items-center group" data-hoverable>
          <Logo width={150} height={40} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              scroll={false}
              data-hoverable
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-insight-teal to-aura-violet group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href={ctaLink}
            scroll={false}
            data-hoverable
            className="relative inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden group"
          >
            <div className="absolute inset-0 gradient-flow transition-all duration-300 group-hover:opacity-90" />
            <span className="relative">{ctaText}</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--text-primary)]"
        >
          {mobileOpen ? <X /> : <Menu />}
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
                scroll={false}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-base font-bold text-insight-teal"
              >
                <Sparkles className="w-4 h-4" />
                Showcase
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={false}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={ctaLink}
                scroll={false}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-full gradient-flow mt-2"
              >
                {ctaText}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
