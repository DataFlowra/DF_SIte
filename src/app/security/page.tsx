"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Zap, Database, Server } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-insight-teal/20 mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-insight-teal" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-insight-teal">Security Protocols</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Security <span className="gradient-text">Architecture</span></h1>
            <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs">Bank-grade encryption for the data era</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { 
                icon: Lock, 
                title: "Data Encryption", 
                desc: "All data is encrypted at rest using AES-256 and in transit via TLS 1.3 with Perfect Forward Secrecy." 
              },
              { 
                icon: Eye, 
                title: "Continuous Monitoring", 
                desc: "24/7 automated security monitoring and threat detection using advanced AI-driven behavioral analysis." 
              },
              { 
                icon: Zap, 
                title: "Incident Response", 
                desc: "Dedicated security team with a 15-minute response time for critical infrastructure alerts." 
              },
              { 
                icon: Database, 
                title: "Data Isolation", 
                desc: "Logical and physical separation of customer data to ensure zero cross-contamination." 
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border border-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-insight-teal/10 flex items-center justify-center text-insight-teal mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="glass p-12 rounded-[3rem] border border-white/10">
            <h2 className="text-3xl font-black mb-8">Infrastructure Security</h2>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                  <Server size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Edge Node Protection</h4>
                  <p className="text-[var(--text-muted)] text-sm">Every edge node in the Dataflowra network is hardened and isolated. We use hardware-based Root of Trust and secure boot sequences to ensure integrity.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Vulnerability Management</h4>
                  <p className="text-[var(--text-muted)] text-sm">We conduct regular third-party penetration tests and run an active bug bounty program to identify and remediate potential security risks proactively.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 rounded-[2rem] bg-insight-teal/5 border border-insight-teal/10">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <ShieldCheck className="text-insight-teal w-4 h-4" />
                Report a Security Issue
              </h4>
              <p className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-widest font-bold">Safe Harbor Policy</p>
              <p className="text-sm text-[var(--text-muted)] mb-6">If you believe you've found a security vulnerability in our platform, please report it to our security team immediately at:</p>
              <a href="mailto:help@dataflowra.com" className="text-insight-teal font-black text-sm uppercase tracking-widest hover:underline">help@dataflowra.com</a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
