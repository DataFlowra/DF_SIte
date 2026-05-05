"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Loader2, ArrowUpRight, HardDrive } from "lucide-react";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ResourceAllocation() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated current usage for visual effect
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await api.get("/api/payments/last-plan");
        if (response.status === "success") {
          setPlan(response.data);
          
          // Simulate usage based on plan tier
          const planName = response.data.name.toLowerCase();
          if (planName.includes("starter")) setUsage(85);
          else if (planName.includes("pro")) setUsage(65);
          else setUsage(45);
        }
      } catch (error) {
        // Fallback to Free/Basic visual if no plan found
        setPlan({ name: "Basic Tier", features: ["10K records/month"] });
        setUsage(92);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPlan();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-10">
        <Loader2 className="w-8 h-8 text-flow-indigo animate-spin" />
      </div>
    );
  }

  const isNearLimit = usage > 80;

  return (
    <div className="flex flex-col h-full justify-between relative z-10 text-left">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-2xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
          <HardDrive className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Active License</div>
          <div className="text-2xl font-black text-[var(--text-primary)]">{plan?.name || "Free Tier"}</div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Resource Allocation</span>
          <span className={`text-[10px] font-mono font-bold ${isNearLimit ? 'text-red-400 animate-pulse' : 'text-insight-teal'}`}>
            {usage.toFixed(1)}% USED
          </span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${usage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full ${isNearLimit ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-flow-indigo shadow-[0_0_10px_#4F46E5]'}`}
          />
        </div>
        <div className="flex justify-between text-[8px] font-black text-[var(--text-muted)] uppercase tracking-tighter">
          <span>Capacity: {plan?.features?.[1] || "Standard"}</span>
          <span>Status: {isNearLimit ? "Near Limit" : "Nominal"}</span>
        </div>
      </div>

      {isNearLimit && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between group cursor-pointer"
        >
          <div className="text-left">
            <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">Upgrade Recommended</div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Scale Infrastructure</div>
          </div>
          <Link href="/dashboard/settings/billing">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      )}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.05),transparent_70%)] pointer-events-none" />
    </div>
  );
}
