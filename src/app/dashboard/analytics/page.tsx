"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, MousePointer2 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-[2rem] p-8 border border-white/10">
        <h1 className="text-3xl font-black tracking-tight mb-2">Intelligence Analytics</h1>
        <p className="text-[var(--text-muted)]">Deep insights into your data streams and user behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-subtle p-8 rounded-[2rem] border border-white/10 min-h-[300px] flex items-center justify-center text-center">
          <div>
            <BarChart3 size={48} className="text-insight-teal mx-auto mb-4 opacity-50" />
            <p className="text-[var(--text-muted)]">Advanced analytics charts will render here.</p>
          </div>
        </div>
        <div className="glass-subtle p-8 rounded-[2rem] border border-white/10 min-h-[300px] flex items-center justify-center text-center">
          <div>
            <PieChart size={48} className="text-aura-violet mx-auto mb-4 opacity-50" />
            <p className="text-[var(--text-muted)]">Distribution metrics will render here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
