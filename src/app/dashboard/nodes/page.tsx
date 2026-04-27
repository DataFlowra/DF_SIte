"use client";

import { motion } from "framer-motion";
import { Network, Globe, Server, Activity } from "lucide-react";

export default function NodesPage() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-[2rem] p-8 border border-white/10">
        <h1 className="text-3xl font-black tracking-tight mb-2">Edge Nodes</h1>
        <p className="text-[var(--text-muted)]">Manage and monitor your global distribution points.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "US-East-1", status: "Active", load: "42%", icon: Globe },
          { name: "EU-West-2", status: "Active", load: "28%", icon: Server },
          { name: "AP-South-1", status: "Degraded", load: "89%", icon: Activity },
        ].map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-subtle p-6 rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center text-insight-teal">
                <node.icon size={20} />
              </div>
              <h3 className="font-bold">{node.name}</h3>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-muted)]">Status</span>
              <span className={node.status === "Active" ? "text-green-500" : "text-yellow-500"}>{node.status}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[var(--text-muted)]">Current Load</span>
              <span className="font-bold">{node.load}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
