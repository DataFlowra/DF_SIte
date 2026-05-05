"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  Lock,
  Calendar
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import CardInput from "@/components/checkout/CardInput";

interface Plan {
  id: number;
  name: string;
  slug: string;
  description: string;
  monthly_price: number | null;
  yearly_price: number | null;
  currency: string;
  features: string[];
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("plan") || "starter";
  const billingCycle = searchParams.get("cycle") || "monthly";
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    card_holder: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "USA"
  });

  const handleCardChange = (cardData: any) => {
    setFormData(prev => ({ ...prev, ...cardData }));
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/checkout?plan=${slug}&cycle=${billingCycle}`)}`);
      return;
    }

    async function fetchPlan() {
      const response = await api.get(`/api/subscription-plans/${slug}`);
      if (response.status === "success") {
        setPlan(response.data);
      } else {
        setError("Plan not found");
      }
      setLoading(false);
    }

    if (isAuthenticated) {
      fetchPlan();
    }
  }, [slug, isAuthenticated, authLoading, router, billingCycle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    const result = await api.post("/api/subscriptions", {
      plan_slug: slug,
      payment_method: {
        card_number: formData.card_number,
        expiry_month: formData.expiry_month,
        expiry_year: formData.expiry_year,
        cvv: formData.cvv,
        card_holder: formData.card_holder
      },
      billing_address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      }
    });

    if (result.status === "success") {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 3000);
    } else {
      setError(result.message || "Payment failed. Please check your card details.");
    }
    setProcessing(false);
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-10 h-10 text-insight-teal animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[3rem] border border-insight-teal/30 max-w-xl"
        >
          <CheckCircle2 className="w-20 h-20 text-insight-teal mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl font-black mb-4 text-[var(--text-primary)]">Subscription Active!</h1>
          <p className="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
            Welcome to the {plan?.name} tier. Your account is being upgraded and you're being redirected to your dashboard.
          </p>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 3 }}
              className="h-full bg-insight-teal"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const price = billingCycle === "monthly" ? plan?.monthly_price : plan?.yearly_price;

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-insight-teal transition-colors mb-12 uppercase tracking-widest">
            <ArrowLeft size={16} />
            Back to plans
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Payment Form */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-black tracking-tighter mb-8 text-[var(--text-primary)]">Checkout</h1>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center">
                    {error}
                  </div>
                )}

                {/* Card Info */}
                <div className="glass p-8 rounded-3xl border border-[var(--glass-border)]">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                    <CreditCard size={20} className="text-insight-teal" />
                    Payment Method
                  </h3>
                  
                  <CardInput onCardChange={handleCardChange} />
                </div>

                {/* Billing Address */}
                <div className="glass p-8 rounded-3xl border border-[var(--glass-border)] text-left">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                    <Lock size={20} className="text-insight-teal" />
                    Billing Address
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="group space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Street Address</label>
                      <input 
                        required
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Enter street address"
                        className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all text-[var(--text-primary)]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">City</label>
                        <input 
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all text-[var(--text-primary)]"
                        />
                      </div>
                      <div className="group space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">State / Province</label>
                        <input 
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                          className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all text-[var(--text-primary)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="group space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">ZIP / Postal Code</label>
                        <input 
                          required
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="Enter zip code"
                          className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all text-[var(--text-primary)]"
                        />
                      </div>
                      <div className="group space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Country</label>
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all appearance-none text-[var(--text-primary)]"
                        >
                          <option value="USA">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CAN">Canada</option>
                          <option value="AUS">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={processing}
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-flow-indigo text-white font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-flow-indigo/20 group disabled:opacity-50"
                >
                  {processing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Complete Subscription</span>
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 text-left">
              <div className="glass p-10 rounded-[3rem] border border-insight-teal/20">
                <h3 className="text-xl font-bold mb-8 text-[var(--text-primary)]">Order Summary</h3>
                
                <div className="space-y-6 pb-8 border-b border-white/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-insight-teal">{plan?.name} Plan</h4>
                      <p className="text-xs text-[var(--text-muted)] flex items-center gap-2 mt-1 uppercase tracking-widest font-bold">
                        <Calendar size={12} />
                        Billed {billingCycle}
                      </p>
                    </div>
                    <span className="font-black text-lg text-[var(--text-primary)]">${price}</span>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan?.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 size={14} className="text-insight-teal" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[var(--text-muted)]">Subtotal</span>
                    <span className="text-[var(--text-primary)]">${price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[var(--text-muted)]">Tax</span>
                    <span className="text-[var(--text-primary)]">$0.00</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4">
                    <span>Total</span>
                    <span className="text-insight-teal">${price}</span>
                  </div>
                </div>

                <div className="mt-10 p-4 rounded-2xl bg-insight-teal/5 border border-insight-teal/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-insight-teal shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed uppercase tracking-widest font-bold">
                    Your data is secure. We use bank-grade encryption to protect your sensitive information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-10 h-10 text-insight-teal animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
