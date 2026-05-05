"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SocialButtons from "@/components/auth/SocialButtons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, ShieldCheck, Loader2, AtSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sha256 } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();
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
      const recaptchaToken = await executeRecaptcha("register");
      const passwordHash = await sha256(formData.password);
      
      const result = await register({
        username: formData.username,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password_hash: passwordHash,
        password_hash_confirmation: passwordHash,
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        router.push("/dashboard");
      } else {
        setError(result.message || "Registration failed. Please check your details.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join thousands of teams building with FlowR AI"
    >
      <div className="space-y-8">
        {/* Social Login */}
        <SocialButtons />

        <div className="relative flex items-center gap-4">
          <div className="flex-1 border-t border-[var(--text-primary)]/5" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate whitespace-nowrap">Or register with email</span>
          <div className="flex-1 border-t border-[var(--text-primary)]/5" />
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
          <div className="space-y-4 text-left">
            <div className="group space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1 group-focus-within:text-flow-indigo transition-colors block">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-data-slate group-focus-within:text-flow-indigo transition-colors" />
                <input 
                  type="text" 
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your username"
                  className="w-full bg-[var(--surface)] border border-white/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1 group-focus-within:text-flow-indigo transition-colors block">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-data-slate group-focus-within:text-flow-indigo transition-colors" />
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full bg-[var(--surface)] border border-white/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate/40"
                  />
                </div>
              </div>
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1 group-focus-within:text-flow-indigo transition-colors block">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-data-slate group-focus-within:text-flow-indigo transition-colors" />
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full bg-[var(--surface)] border border-white/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate/40"
                  />
                </div>
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1 group-focus-within:text-flow-indigo transition-colors block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-data-slate group-focus-within:text-flow-indigo transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-[var(--surface)] border border-white/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate/40"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1 group-focus-within:text-flow-indigo transition-colors block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-data-slate group-focus-within:text-flow-indigo transition-colors" />
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-[var(--surface)] border border-white/5 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate/40"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 px-1">
            <div className="mt-1">
              <ShieldCheck className="w-4 h-4 text-flow-indigo" />
            </div>
            <p className="text-[10px] text-data-slate leading-relaxed uppercase tracking-wider">
              By creating an account, you agree to our <Link href="#" className="text-flow-indigo hover:underline decoration-flow-indigo/30">Terms of Service</Link> and <Link href="#" className="text-flow-indigo hover:underline decoration-flow-indigo/30">Privacy Policy</Link>.
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-5 rounded-2xl bg-flow-indigo text-white font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-flow-indigo/20 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-data-slate">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[var(--text-primary)] hover:text-flow-indigo transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
