"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  MapPin, 
  Send, 
  Loader2,
  CheckCircle2,
  Cpu,
  Globe,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api } from "@/lib/api-client";

function DataStream({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ y: "-100%", x: `${index * 15}%`, opacity: 0 }}
      animate={{ 
        y: "200%", 
        opacity: [0, 0.2, 0] 
      }}
      transition={{ 
        duration: 5 + index, 
        repeat: Infinity, 
        ease: "linear",
        delay: index * 0.5 
      }}
      className="absolute top-0 w-px h-64 bg-gradient-to-b from-transparent via-insight-teal to-transparent"
    />
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!executeRecaptcha) {
      setError("reCAPTCHA service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact");
      const result = await api.post("/api/mail/contact", { ...formData, recaptcha_token: recaptchaToken });
      if (result.status === "success") {
        setSuccess(true);
        setFormData({ name: "", email: "" , message: "" });
      } else {
        setError(result.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-48 overflow-hidden bg-[var(--background)]">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <DataStream key={i} index={i} />
        ))}
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-insight-teal/5 blur-[160px] rounded-full -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left: Content & Form */}
          <motion.div
            style={{ rotateX: springRotateX }}
            className="perspective-2000"
          >
            <div className="mb-16 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                className="h-1 bg-insight-teal mb-8"
              />
              <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                Get in <br />
                <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-xl text-[var(--text-muted)] font-medium max-w-lg leading-relaxed">
                Have a question or want to learn more? Our team is here to help you build the perfect data solution.
              </p>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                className="glass p-12 rounded-[3rem] border-insight-teal/30 text-center shadow-glow-sm"
              >
                <div className="w-20 h-20 bg-insight-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-insight-teal" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent</h3>
                <p className="text-[var(--text-muted)] mb-8">We've received your inquiry. A member of our team will contact you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6 glass p-8 md:p-12 rounded-[3rem] border-white/10 shadow-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MessageSquare className="w-24 h-24" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-insight-teal ml-1">Your Name</label>
                    <input 
                      required name="name" value={formData.name} onChange={handleChange}
                      type="text" placeholder="Full Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/40 focus:bg-white/[0.07] transition-all text-[var(--text-primary)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-insight-teal ml-1">Email Address</label>
                    <input 
                      required name="email" value={formData.email} onChange={handleChange}
                      type="email" placeholder="email@example.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/40 focus:bg-white/[0.07] transition-all text-[var(--text-primary)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-insight-teal ml-1">Your Message</label>
                  <textarea 
                    required name="message" value={formData.message} onChange={handleChange}
                    rows={4} placeholder="Tell us about your project..."
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/40 focus:bg-white/[0.07] transition-all resize-none text-[var(--text-primary)]"
                  />
                </div>
                <button 
                  disabled={isLoading} type="submit"
                  className="w-full py-6 rounded-2xl gradient-flow text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </motion.form>
            )}
          </motion.div>

          {/* Right: Map & Interface */}
          <div className="relative space-y-12">
            {/* Map Cluster */}
            <motion.div 
              style={{ rotateX: useTransform(scrollYProgress, [0, 1], [-10, 10]) }}
              className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl h-[450px] group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.3967!3d37.7919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806655c68b6d%3A0x6a28292074e6435c!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1625123456789!5m2!1sen!2sus" 
                width="100%" height="100%" style={{ border: 0 }} 
                className="filter grayscale invert-[0.9] contrast-150 brightness-75 opacity-60 group-hover:opacity-100 transition-opacity duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80" />

              {/* Map Hotspots */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-insight-teal rounded-full shadow-glow"
              />
            </motion.div>

            {/* Interface Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-subtle p-6 rounded-3xl border border-white/5 group hover:border-insight-teal/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-insight-teal">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-insight-teal">Headquarters</span>
                </div>
                <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                  633 W 5th St, <br /> Los Angeles, CA 90071, USA
                </p>
              </div>

              <div className="glass-subtle p-6 rounded-3xl border border-white/5 group hover:border-aura-violet/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-aura-violet">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-aura-violet">Support</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-[var(--text-primary)]">help@dataflowra.com</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">+1 (323) 555-4479</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-8 py-4 glass-subtle rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-insight-teal animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Cluster Status: Online</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-insight-teal">Response Time: &lt; 2h</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

