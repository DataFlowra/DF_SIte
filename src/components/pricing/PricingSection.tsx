"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { api } from "@/lib/api-client";
import Link from "next/link";

interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string;
  monthly_price: number | null;
  yearly_price: number | null;
  currency: string;
  features: string[];
  popular: boolean;
}

export default function PricingSection() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    async function fetchPlans() {
      const response = await api.get("/api/subscription-plans");
      if (response.status === "success") {
        setPlans(response.data);
      }
      setLoading(false);
    }
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-insight-teal animate-spin" />
      </div>
    );
  }

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle border border-insight-teal/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-insight-teal" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-insight-teal">Scalable Pricing</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Choose Your <span className="gradient-text">Data Velocity</span>
          </h2>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <span className={`text-sm font-bold transition-colors ${billingCycle === "monthly" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-14 h-7 rounded-full glass border border-white/10 relative p-1"
            >
              <motion.div 
                animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                className="w-5 h-5 rounded-full bg-insight-teal shadow-glow-sm"
              />
            </button>
            <span className={`text-sm font-bold transition-colors ${billingCycle === "yearly" ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"}`}>
              Yearly <span className="text-insight-teal text-[10px] ml-1 bg-insight-teal/10 px-2 py-0.5 rounded-full uppercase">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 ${
                plan.popular 
                ? "glass border-insight-teal/30 shadow-glow-sm scale-105 z-10" 
                : "glass border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-insight-teal text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-[var(--text-muted)] min-h-[40px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">
                    {plan.monthly_price === null ? "Custom" : `$${billingCycle === "monthly" ? plan.monthly_price : plan.yearly_price}`}
                  </span>
                  {plan.monthly_price !== null && (
                    <span className="text-[var(--text-muted)] font-bold uppercase tracking-widest text-[10px]">/ month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                    <Check className="w-4 h-4 text-insight-teal mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.monthly_price === null ? "/contact" : `/checkout/${plan.slug}?cycle=${billingCycle}`}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                  plan.popular
                  ? "gradient-flow text-white shadow-xl shadow-insight-teal/20 hover:scale-[1.02]"
                  : "glass border border-white/10 text-[var(--text-primary)] hover:bg-white/5"
                }`}
              >
                {plan.monthly_price === null ? "Contact Sales" : "Choose Plan"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-insight-teal/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </section>
  );
}
