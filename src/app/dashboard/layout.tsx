"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Loader2 className="w-10 h-10 text-insight-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)] overflow-hidden">
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-insight-teal/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-aura-violet/5 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden p-4 md:p-6 gap-6">
        {/* Navigation Sidebar */}
        <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 gap-6">
          <Topbar onMenuClick={() => setMobileMenuOpen(true)} />
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
      </div>
  );
}
