"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, Zap } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("dataflowra-cookie-consent");
    if (!consent) {
      // Show after a short delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("dataflowra-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("dataflowra-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-[100]"
        >
          <div className="glass rounded-3xl p-6 md:p-8 border border-flow-indigo/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-flow-indigo/10 blur-[60px] rounded-full group-hover:bg-flow-indigo/20 transition-colors duration-700" />
            
            <div className="relative z-10 text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/30">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest leading-none">Cookie Consent</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-tighter">Privacy Protocol</span>
                    <div className="w-1 h-1 rounded-full bg-insight-teal animate-pulse" />
                  </div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium leading-relaxed mb-6">
                We use cookies to enhance your experience, analyze our traffic, and provide a secure environment. By clicking "Accept", you agree to our use of cookies.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 rounded-xl bg-flow-indigo text-white text-[10px] font-black uppercase tracking-widest hover:bg-flow-indigo-light active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-flow-indigo/20"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-6 py-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--glass-border)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--text-primary)] hover:text-[var(--background)] transition-all active:scale-[0.98]"
                >
                  Decline
                </button>
              </div>
            </div>
            
            {/* Close Trigger */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-data-slate hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
