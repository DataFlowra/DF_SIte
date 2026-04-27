"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api-client";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!executeRecaptcha) {
      setError("reCAPTCHA service is not ready. Please wait a few seconds and try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("password_reset");
      
      const result = await api.post("/api/auth/password/forgot", {
        email,
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        setSuccess(true);
      } else {
        setError(result.message || "Failed to send reset link. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a recovery link"
    >
      <div className="space-y-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-insight-teal transition-colors">
          <ArrowLeft size={14} />
          Back to login
        </Link>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 glass rounded-3xl border border-insight-teal/20 text-center space-y-6"
          >
            <CheckCircle2 className="w-12 h-12 text-insight-teal mx-auto" />
            <h3 className="text-xl font-bold">Transmission Sent</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              If an account exists for {email}, you will receive a secure password reset link shortly.
            </p>
            <Link href="/login" className="block text-xs font-bold uppercase tracking-widest text-insight-teal hover:underline pt-4">
              Return to login
            </Link>
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
                  <span>Send Recovery Link</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
