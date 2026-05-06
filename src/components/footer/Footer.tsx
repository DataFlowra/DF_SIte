"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUp, Zap, X, Send, ShieldCheck, Heart, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api } from "@/lib/api-client";
import Logo from "../Logo";

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    if (!executeRecaptcha) {
      setError("reCAPTCHA service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("newsletter");
      
      const result = await api.post("/api/mail/newsletter", {
        email,
        name: "Subscriber", // Required by backend API
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        setSubmitted(true);
        setEmail("");
        // Keep the success state for 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    company: [
      { name: "About", href: "/#hero" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "#" },
      { name: "FAQ", href: "/#faq" },
    ],
    ecosystem: [
      { name: "Crunchbase", href: "https://www.crunchbase.com/organization/dataflowra" },
      { name: "F6S", href: "https://www.f6s.com/dataflowra" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  };

  return (
    <footer id="footer" ref={sectionRef} className="relative pt-32 pb-12 overflow-hidden bg-[var(--background)]">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-insight-teal/5 blur-[150px] rounded-full opacity-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8 group cursor-default"
            >
              <Logo width={180} height={50} />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-bold mb-8 leading-tight max-w-sm text-[var(--text-primary)]"
            >
              Architecting the future of <br />
              <span className="gradient-text">Data Infrastructure</span>
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="max-w-md">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-insight-teal/20 to-aura-violet/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center glass rounded-2xl p-2 border border-white/10 shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="relative z-10 flex-1 px-5 py-4 bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)] min-w-0 text-[var(--text-primary)]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading || submitted}
                      className="relative z-10 flex-shrink-0 px-8 py-4 rounded-xl gradient-flow text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </motion.span>
                        ) : submitted ? (
                          <motion.span
                            key="submitted"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            Synced <ShieldCheck className="w-4 h-4" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="submit"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            Join <Send className="w-4 h-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest"
                  >
                    {error}
                  </motion.p>
                )}
              </form>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mt-6 opacity-60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-insight-teal animate-pulse" />
                Zero noise. Pure technical insights.
              </p>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-insight-teal mb-10">Company</h4>
              <ul className="space-y-5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      scroll={false}
                      className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-insight-teal mr-0 group-hover:mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-flow-indigo mb-10">Ecosystem</h4>
              <ul className="space-y-5">
                {footerLinks.ecosystem.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-flow-indigo mr-0 group-hover:mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-aura-violet mb-10">Legal</h4>
              <ul className="space-y-5">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-aura-violet mr-0 group-hover:mr-3 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 md:pr-32">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1.5 justify-center md:justify-start">
              © {new Date().getFullYear()} Dataflowra. 
              <span className="hidden sm:inline opacity-30 mx-1">|</span>
              Made with <Heart className="w-3 h-3 text-red-500/60 fill-current" /> for the data universe.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: FaXTwitter, href: "https://x.com/dataflowra", label: "X (Twitter)", color: "hover:text-white" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/company/dataflowra", label: "LinkedIn", color: "hover:text-insight-teal" },
              { icon: FaYoutube, href: "https://www.youtube.com/@Dataflowra", label: "YouTube", color: "hover:text-red-500" },
              { icon: FaFacebook, href: "https://www.facebook.com/Dataflowra/", label: "Facebook", color: "hover:text-blue-500" },
              { icon: FaPinterest, href: "https://www.pinterest.com/Dataflowra_/", label: "Pinterest", color: "hover:text-red-600" },
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`w-12 h-12 rounded-xl glass flex items-center justify-center text-[var(--text-muted)] ${social.color} hover:border-white/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            
            <div className="w-px h-8 bg-white/5 mx-2" />
            
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-insight-teal border border-insight-teal/20 hover:bg-insight-teal/10 transition-all hover:-translate-y-1 group"
              title="Back to Top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
