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
      setError("reCAPTCHA service is not ready. If you are using an ad-blocker, please disable it or wait a few seconds and try again.");
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
      subtitle="Join the future of data infrastructure"
    >
      <div className="space-y-8">
        {/* Social Login */}
        <SocialButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="bg-[#161B22] px-4 text-[var(--text-muted)]">Or register with email</span>
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
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                <input 
                  type="text" 
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="group space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1 group-focus-within:text-insight-teal transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-insight-teal/50 focus:bg-white/10 transition-all text-sm text-[var(--text-primary)] placeholder:text-white/20"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 px-1">
            <div className="mt-1">
              <ShieldCheck className="w-4 h-4 text-insight-teal" />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed uppercase tracking-wider">
              By creating an account, you agree to our <Link href="#" className="text-insight-teal hover:underline decoration-insight-teal/30">Terms of Service</Link> and <Link href="#" className="text-insight-teal hover:underline decoration-insight-teal/30">Privacy Policy</Link>.
            </p>
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
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-[var(--text-primary)] hover:text-insight-teal transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
