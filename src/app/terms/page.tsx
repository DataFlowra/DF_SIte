"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { motion } from "framer-motion";
import { FileText, Gavel, AlertTriangle, Globe, Scale } from "lucide-react";

export default function TermsOfServicePage() {
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
              <FileText className="w-3.5 h-3.5 text-aura-violet" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-aura-violet">Service Agreement</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Terms of <span className="gradient-text">Service</span></h1>
            <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-xs">Last updated: April 30, 2026</p>
          </motion.div>

          <div className="glass p-12 rounded-[3rem] border border-white/10 prose prose-invert prose-insight max-w-none">
            <p className="lead text-lg text-[var(--text-muted)] mb-12">
              Welcome to DataVerg. Please read these terms and conditions carefully before using Our Service.
            </p>

            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-aura-violet/10 flex items-center justify-center text-aura-violet">
                  <Globe size={20} />
                </div>
                <h2 className="text-2xl font-bold m-0">1. Acceptance of Terms</h2>
              </div>
              <p className="text-[var(--text-muted)]">
                By accessing or using the Service, You agree to be bound by these Terms. If You disagree with any part of the terms then You may not access the Service. These Terms apply to all visitors, users and others who access or use the Service.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center text-insight-teal">
                  <Gavel size={20} />
                </div>
                <h2 className="text-2xl font-bold m-0">2. User Accounts</h2>
              </div>
              <div className="space-y-4 text-[var(--text-muted)]">
                <p>When You create an account with Us, You must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for safeguarding the password that You use to access the Service.</li>
                  <li>You agree not to disclose Your password to any third party.</li>
                  <li>You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-aura-violet/10 flex items-center justify-center text-aura-violet">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="text-2xl font-bold m-0">3. Intellectual Property</h2>
              </div>
              <p className="text-[var(--text-muted)]">
                The Service and its original content, features and functionality are and will remain the exclusive property of DataVerg Tech LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center text-insight-teal">
                  <Scale size={20} />
                </div>
                <h2 className="text-2xl font-bold m-0">4. Limitation of Liability</h2>
              </div>
              <p className="text-[var(--text-muted)] italic border-l-4 border-insight-teal/30 pl-6 py-2">
                In no event shall DataVerg Tech LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from Your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">5. Governing Law</h2>
              <p className="text-[var(--text-muted)]">
                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mt-16 pt-16 border-t border-white/10 text-center">
              <h2 className="text-2xl font-bold mb-4">Questions?</h2>
              <p className="text-[var(--text-muted)] mb-8">If you have any questions about these Terms, please contact us at <a href="mailto:legal@dataverg.com" className="text-aura-violet hover:underline">legal@dataverg.com</a></p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
