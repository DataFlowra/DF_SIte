"use client";

import { useState, Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { api, sha256 } from "@/lib/api-client";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const passwordHash = await sha256(password);
      
      const result = await api.post("/api/auth/password/reset", {
        token,
        email,
        password_hash: passwordHash
      });

      if (result.status === "success") {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(result.message || "Failed to reset password. Link may be expired.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="text-center p-8 glass rounded-3xl border border-red-500/20">
        <h3 className="text-xl font-bold text-red-400 mb-4">Invalid Reset Link</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">This password reset link is malformed or missing required parameters.</p>
        <button onClick={() => router.push("/login")} className="text-xs font-bold uppercase tracking-widest text-insight-teal hover:underline">
          Go back to login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 glass rounded-3xl border border-insight-teal/20 text-center space-y-6"
        >
          <CheckCircle2 className="w-12 h-12 text-insight-teal mx-auto" />
          <h3 className="text-xl font-bold">Password Reset Successful</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Your credentials have been updated securely. Redirecting to login...
          </p>
        </motion.div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <div className="group space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="group space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-5 rounded-2xl gradient-flow text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-insight-teal/20 group disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Update Password</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      title="Secure New Password" 
      subtitle="Complete your account recovery"
    >
      <Suspense fallback={<Loader2 className="w-10 h-10 animate-spin text-insight-teal mx-auto" />}>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}
