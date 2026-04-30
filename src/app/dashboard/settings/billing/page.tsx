"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, ArrowRight, Loader2, Receipt, Zap, ShieldCheck, X, Sparkles } from "lucide-react";
import { api } from "@/lib/api-client";
import Link from "next/link";
import CardInput from "@/components/checkout/CardInput";

export default function BillingSettingsPage() {
  const [plan, setPlan] = useState<any>(null);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [newCardData, setNewCardData] = useState<any>(null);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [planRes, allPlansRes] = await Promise.all([
          api.get("/api/payments/last-plan"),
          api.get("/api/subscription-plans")
        ]);

        if (planRes.status === "success") {
          setPlan(planRes.data);
        }
        if (allPlansRes.status === "success") {
          setAvailablePlans(allPlansRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUpdatePayment = async () => {
    setIsUpdating(true);
    setUpdateMessage(null);
    try {
      // Simulate payment method update
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUpdateMessage({ type: "success", text: "Payment method updated successfully!" });
      setTimeout(() => setShowPaymentModal(false), 2000);
    } catch (err) {
      setUpdateMessage({ type: "error", text: "Failed to update payment method." });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpgradePlan = async (planSlug: string) => {
    setIsUpdating(true);
    try {
      // In a real app, this would redirect to checkout or process directly if card exists
      window.location.href = `/checkout?plan=${planSlug}&cycle=${billingCycle}`;
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

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
        <Link href="/dashboard/settings" className="text-data-slate hover:text-[var(--text-primary)] transition-colors">
          Settings
        </Link>
        <span className="text-[var(--text-primary)] opacity-10">/</span>
        <h1 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-widest">Billing & Subscription</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {/* Active Plan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)] relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{plan?.name || "Standard Node"}</h3>
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
                    <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--glass-border)]">
                       <div className="text-2xl font-black text-[var(--text-primary)]">$49.00 <span className="text-xs text-data-slate font-medium">/ month</span></div>
                       <p className="text-[10px] text-data-slate uppercase mt-2 font-black">Next renewal: May 12, 2026</p>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-[var(--glass-border)] flex gap-4">
                 <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-8 py-4 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                 >
                  Upgrade Plan
                 </button>
                 <button className="px-8 py-4 rounded-xl glass border border-[var(--glass-border)] text-data-slate font-black text-xs uppercase tracking-widest hover:bg-[var(--text-primary)]/5 transition-all">Cancel Subscription</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-flow-indigo/5 to-transparent pointer-events-none" />
          </motion.div>

          {/* Billing History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)]"
          >
             <div className="flex items-center gap-4 mb-8">
                <Receipt className="text-data-slate" size={20} />
                <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-tight">Transmission History</h3>
             </div>
             <div className="space-y-4">
                {[
                  { id: "#INV-9241", date: "Apr 12, 2026", amount: "$49.00", status: "Paid" },
                  { id: "#INV-8122", date: "Mar 12, 2026", amount: "$49.00", status: "Paid" },
                  { id: "#INV-7401", date: "Feb 12, 2026", amount: "$49.00", status: "Paid" },
                ].map((inv) => (
                  <div key={inv.id} className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--glass-border)] flex items-center justify-between group hover:bg-[var(--surface-elevated)] transition-colors">
                     <div className="flex items-center gap-6">
                        <span className="text-xs font-bold text-[var(--text-primary)]">{inv.id}</span>
                        <span className="text-xs text-data-slate font-medium">{inv.date}</span>
                     </div>
                     <div className="flex items-center gap-8">
                        <span className="text-sm font-bold text-[var(--text-primary)]">{inv.amount}</span>
                        <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">{inv.status}</div>
                        <button className="p-2 text-data-slate hover:text-[var(--text-primary)] transition-colors opacity-0 group-hover:opacity-100">
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
            className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)]"
          >
             <h4 className="text-[10px] font-black text-data-slate uppercase tracking-[0.2em] mb-8">Settlement Method</h4>
             <div className="p-6 rounded-2xl bg-gradient-to-br from-flow-indigo to-flow-indigo/40 border border-[var(--glass-border)] shadow-2xl relative overflow-hidden group">
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
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--text-primary)]/5 rounded-full blur-2xl group-hover:bg-[var(--text-primary)]/10 transition-colors" />
             </div>
             <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full mt-10 py-3 rounded-xl border border-[var(--glass-border)] text-data-slate text-[10px] font-black uppercase tracking-widest hover:bg-[var(--text-primary)]/5 transition-all"
             >
                Update Payment Details
             </button>
          </motion.div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowUpgradeModal(false)}
            className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border border-white/10 relative z-10 p-12"
          >
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tighter mb-4">Upgrade Your Node</h2>
              <p className="text-data-slate font-bold uppercase tracking-widest text-xs">Select a higher transmission capacity</p>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-xs font-black uppercase tracking-widest ${billingCycle === "monthly" ? "text-flow-indigo" : "text-data-slate"}`}>Monthly</span>
                <button 
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  className="w-12 h-6 rounded-full glass border border-white/10 relative p-1"
                >
                  <motion.div 
                    animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                    className="w-4 h-4 rounded-full bg-flow-indigo shadow-glow-sm"
                  />
                </button>
                <span className={`text-xs font-black uppercase tracking-widest ${billingCycle === "yearly" ? "text-flow-indigo" : "text-data-slate"}`}>
                  Yearly <span className="text-green-500 ml-1">-20%</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((p) => (
                <div key={p.slug} className={`p-8 rounded-[2.5rem] border ${p.slug === plan?.slug ? "bg-flow-indigo/5 border-flow-indigo/30" : "glass border-white/10"}`}>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                    <div className="text-2xl font-black">
                      ${billingCycle === "monthly" ? p.monthly_price : p.yearly_price}
                      <span className="text-[10px] text-data-slate font-bold uppercase ml-1">/ mo</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.slice(0, 5).map((f: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-data-slate font-bold uppercase tracking-tight">
                        <Check size={12} className="text-flow-indigo shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    disabled={p.slug === plan?.slug}
                    onClick={() => handleUpgradePlan(p.slug)}
                    className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      p.slug === plan?.slug 
                      ? "bg-white/5 text-data-slate cursor-not-allowed" 
                      : "bg-[var(--text-primary)] text-[var(--background)] hover:scale-[1.02]"
                    }`}
                  >
                    {p.slug === plan?.slug ? "Current Plan" : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowPaymentModal(false)}
            className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass w-full max-w-lg rounded-[3rem] border border-white/10 relative z-10 p-10"
          >
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight mb-2">Update Settlement</h2>
              <p className="text-data-slate font-bold uppercase tracking-widest text-[10px]">Securely update your payment method</p>
            </div>

            {updateMessage && (
              <div className={`p-4 rounded-xl mb-6 text-[10px] font-black uppercase tracking-widest text-center border ${
                updateMessage.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}>
                {updateMessage.text}
              </div>
            )}

            <div className="space-y-6">
              <CardInput onCardChange={setNewCardData} />
              
              <div className="pt-4">
                <button 
                  disabled={isUpdating}
                  onClick={handleUpdatePayment}
                  className="w-full py-4 rounded-2xl bg-flow-indigo text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-flow-indigo/20 disabled:opacity-50"
                >
                  {isUpdating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-[8px] text-data-slate font-black uppercase tracking-[0.2em]">
                <div className="flex items-center gap-1"><Lock size={10} /> Secure</div>
                <div className="flex items-center gap-1"><ShieldCheck size={10} /> Encrypted</div>
                <div className="flex items-center gap-1"><Sparkles size={10} /> Real-time</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
