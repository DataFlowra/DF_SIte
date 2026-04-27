"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialButtons from "@/components/auth/SocialButtons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sha256 } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!executeRecaptcha) {
      setError("reCAPTCHA service is not ready. If you are using an ad-blocker, please disable it or wait a few seconds and try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("login");
      const passwordHash = await sha256(password);
      
      const result = await login({
        email,
        password_hash: passwordHash,
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        router.push("/dashboard");
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Access your data command center"
    >
      <div className="space-y-8">
        {/* Social Login */}
        <SocialButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="bg-[#161B22] px-4 text-[var(--text-muted)]">Or continue with email</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="group space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-insight-teal hover:underline decoration-insight-teal/30">
                  Forgot?
                </Link>
              </div>
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
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-5 rounded-2xl gradient-flow text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-insight-teal/20 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-[var(--text-primary)] hover:text-insight-teal transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
