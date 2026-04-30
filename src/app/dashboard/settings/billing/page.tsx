"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, ArrowRight, Loader2, Receipt, Zap, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api-client";
import Link from "next/link";

export default function BillingSettingsPage() {
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await api.get("/api/payments/last-plan");
        if (response.status === "success") {
          setPlan(response.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlan();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-flow-indigo animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard/settings" className="text-data-slate hover:text-white transition-colors">
          Settings
        </Link>
        <span className="text-white/10">/</span>
        <h1 className="text-xl font-bold text-white uppercase tracking-widest">Billing & Subscription</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Active Plan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan?.name || "Standard Node"}</h3>
                    <p className="text-xs text-data-slate font-bold uppercase tracking-widest mt-1">Current Active License</p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest">
                  Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
                 <div className="space-y-4">
                    <div className="text-[10px] font-black text-data-slate uppercase tracking-widest">Included Capabilities</div>
                    <ul className="space-y-3">
                       {(plan?.features || ["Unlimited Nodes", "Real-time Monitoring", "24/7 Priority Support"]).map((f: string, i: number) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                            <Check size={14} className="text-flow-indigo" />
                            <span>{f}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-4">
                    <div className="text-[10px] font-black text-data-slate uppercase tracking-widest">Billing Cycle</div>
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                       <div className="text-2xl font-black text-white">$49.00 <span className="text-xs text-data-slate font-medium">/ month</span></div>
                       <p className="text-[10px] text-data-slate uppercase mt-2 font-black">Next renewal: May 12, 2026</p>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex gap-4">
                 <button className="px-8 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Upgrade Plan</button>
                 <button className="px-8 py-4 rounded-xl glass border border-white/10 text-data-slate font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">Cancel Subscription</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-flow-indigo/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Billing History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5"
          >
             <div className="flex items-center gap-4 mb-8">
                <Receipt className="text-data-slate" size={20} />
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">Transmission History</h3>
             </div>
             <div className="space-y-4">
                {[
                  { id: "#INV-9241", date: "Apr 12, 2026", amount: "$49.00", status: "Paid" },
                  { id: "#INV-8122", date: "Mar 12, 2026", amount: "$49.00", status: "Paid" },
                  { id: "#INV-7401", date: "Feb 12, 2026", amount: "$49.00", status: "Paid" },
                ].map((inv) => (
                  <div key={inv.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-colors">
                     <div className="flex items-center gap-6">
                        <span className="text-xs font-bold text-white">{inv.id}</span>
                        <span className="text-xs text-data-slate font-medium">{inv.date}</span>
                     </div>
                     <div className="flex items-center gap-8">
                        <span className="text-sm font-bold text-white">{inv.amount}</span>
                        <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">{inv.status}</div>
                        <button className="p-2 text-data-slate hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                           <ArrowRight size={14} />
                        </button>
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           {/* Payment Method */}
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5"
          >
             <h4 className="text-[10px] font-black text-data-slate uppercase tracking-[0.2em] mb-8">Settlement Method</h4>
             <div className="p-6 rounded-2xl bg-gradient-to-br from-flow-indigo to-flow-indigo/40 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                   <div className="flex justify-between items-start">
                      <ShieldCheck size={24} className="text-white/80" />
                      <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Verified</span>
                   </div>
                   <div>
                      <div className="text-lg font-mono font-bold text-white mb-1">•••• •••• •••• 4242</div>
                      <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase">
                         <span>Exp: 12/28</span>
                         <span>Visa</span>
                      </div>
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
             </div>
             <button className="w-full mt-10 py-3 rounded-xl border border-white/5 text-data-slate text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                Update Payment Details
             </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
