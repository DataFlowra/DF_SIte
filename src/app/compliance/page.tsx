"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";
import { Scale, Shield, Globe, CheckCircle2, FileCheck } from "lucide-react";
import Link from "next/link";

export default function CompliancePage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-aura-violet/20 mb-6">
              <Scale className="w-3.5 h-3.5 text-aura-violet" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-aura-violet">Global Standards</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Regulatory <span className="gradient-text">Compliance</span></h1>
            <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs">Commitment to global data protection laws</p>
          </motion.div>

          <div className="glass p-12 rounded-[3rem] border border-white/10 prose prose-invert prose-insight max-w-none">
            <section className="mb-16">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                <Globe className="text-aura-violet" />
                Global Frameworks
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-insight-teal w-5 h-5" />
                    GDPR
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    We are fully compliant with the General Data Protection Regulation (GDPR). We respect the privacy rights of EU citizens and provide tools to exercise those rights, including data portability and the right to be forgotten.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/5">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-insight-teal w-5 h-5" />
                    CCPA / CPRA
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    As a California-based company, we adhere to the California Consumer Privacy Act. We provide transparent information about data collection and never sell your personal information.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                <Shield className="text-aura-violet" />
                Certifications
              </h2>
              <div className="space-y-6">
                {[
                  { title: "SOC 2 Type II", status: "In Progress", desc: "We are currently undergoing our SOC 2 Type II audit to demonstrate our commitment to operational excellence and security." },
                  { title: "ISO/IEC 27001", status: "Compliant", desc: "Our information security management system (ISMS) aligns with ISO 27001 standards for data integrity and availability." },
                  { title: "HIPAA", status: "BAA Available", desc: "For healthcare customers, we offer Business Associate Agreements (BAA) to ensure protected health information (PHI) is handled correctly." }
                ].map((cert) => (
                  <div key={cert.title} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 gap-4">
                    <div>
                      <h4 className="font-bold text-white mb-1">{cert.title}</h4>
                      <p className="text-xs text-[var(--text-muted)]">{cert.desc}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest self-start md:self-center ${cert.status === "Compliant" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-aura-violet/10 text-aura-violet border border-aura-violet/20"}`}>
                      {cert.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 pt-16 border-t border-white/10">
              <div className="flex items-start gap-6 p-8 rounded-[2.5rem] bg-aura-violet/5 border border-aura-violet/10">
                <FileCheck className="text-aura-violet shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Request Compliance Documents</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-6">Need our latest SOC 2 report or DPA? Our compliance portal is available for enterprise customers and prospects under NDA.</p>
                  <Link href="/#contact" className="inline-flex px-8 py-3 rounded-xl gradient-flow text-white font-black text-xs uppercase tracking-widest shadow-xl">Access Portal</Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
