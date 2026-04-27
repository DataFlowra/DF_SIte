"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Send, 
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api } from "@/lib/api-client";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("contact");
      
      const result = await api.post("/api/mail/contact", {
        ...formData,
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
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
    <section id="contact" className="relative py-32 overflow-hidden bg-[var(--background)]">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-insight-teal/10 blur-[140px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-aura-violet/10 blur-[140px] rounded-full translate-x-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
          
          {/* Left Side: The Command Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-12">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-xs font-bold tracking-[0.4em] uppercase text-insight-teal mb-6 block"
              >
                Channel Established
              </motion.span>
              <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-[var(--text-primary)]">
                Start the <br />
                <span className="gradient-text">Dialogue</span>
              </h2>
              <p className="text-xl text-[var(--text-muted)] font-medium max-w-xl leading-relaxed">
                Connect with our architects to deploy your data infrastructure at the speed of light.
              </p>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-[2.5rem] border-insight-teal/20 text-center space-y-6"
              >
                <CheckCircle2 className="w-16 h-16 text-insight-teal mx-auto" />
                <h3 className="text-2xl font-bold">Message Transmitted</h3>
                <p className="text-[var(--text-muted)]">Thank you for reaching out. An architect will be in touch shortly via secure channel.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-xs font-bold uppercase tracking-widest text-insight-teal hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 glass p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-[var(--text-primary)] placeholder:text-white/20"
                    />
                  </div>
                  <div className="group space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">Email Address</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      placeholder="email@domain.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-[var(--text-primary)] placeholder:text-white/20"
                    />
                  </div>
                </div>
                <div className="group space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">Your Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all resize-none text-[var(--text-primary)] placeholder:text-white/20"
                  />
                </div>
                <button 
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-5 rounded-full gradient-flow text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-insight-teal/20 group disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Side: The Grid Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col"
          >
            {/* The Map Box */}
            <div className="flex-1 min-h-[500px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.3967!3d37.7919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806655c68b6d%3A0x6a28292074e6435c!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1625123456789!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                className="filter grayscale brightness-75 invert-[0.8] contrast-125 dark:invert dark:brightness-50 transition-all duration-700"
                loading="lazy"
              ></iframe>
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[3rem]" />
            </div>

            {/* Address & Quick Stats (Static & Elegant) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-insight-teal">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Global Headquarters</span>
                </div>
                <p className="text-lg font-medium text-[var(--text-primary)] leading-tight">
                  415 Mission Street, <br />
                  Suite 300, San Francisco, <br />
                  CA 94105, United States
                </p>
              </div>
              <div className="flex flex-col justify-end gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Inquiries</span>
                    <span className="text-sm font-bold text-insight-teal">hello@dataflowra.ai</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Direct Line</span>
                    <span className="text-sm font-bold text-aura-violet">+1 (555) FLOW</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 w-fit">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Support Live 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
