"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, AtSign, Save, Loader2, Camera, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api-client";
import Link from "next/link";

export default function ProfileSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    
    try {
      const response = await api.put("/api/user", formData);
      if (response.status === "success") {
        setSuccess(true);
        await refreshUser(); // Update global auth state with new details
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(response.message || "Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 text-sm font-bold uppercase tracking-widest">
        <Link href="/dashboard/settings" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          Settings
        </Link>
        <span className="text-[var(--text-primary)] opacity-10">/</span>
        <h1 className="text-[var(--text-primary)]">Profile Information</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Main Form */}
        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)]"
          >
            {error && (
              <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input 
                      type="text" 
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input 
                      type="text" 
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input 
                    type="email" 
                    readOnly
                    value={user?.email || ""}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl pl-12 pr-6 py-4 text-[var(--text-muted)]/50 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="text-[8px] text-[var(--text-muted)] uppercase tracking-widest mt-2 ml-1">Contact support to change primary email.</p>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <input 
                    type="text" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--glass-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-500"
                    >
                      <ShieldCheck size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Profile Synchronized</span>
                    </motion.div>
                  )}
                </div>
                <button 
                  disabled={isLoading}
                  type="submit"
                  className="px-10 py-4 rounded-xl bg-flow-indigo text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-flow-indigo/20 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Right: Avatar & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[2.5rem] p-10 border border-[var(--glass-border)] text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-8 group cursor-pointer">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-flow-indigo to-insight-teal p-px group-hover:rotate-6 transition-transform duration-500">
                <div className="w-full h-full bg-[var(--surface-elevated)] rounded-[1.4rem] flex items-center justify-center text-flow-indigo">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-[1.4rem]" />
                  ) : (
                    <User size={48} />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[var(--text-primary)] border-4 border-[var(--surface)] flex items-center justify-center text-[var(--background)] shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={16} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">{user?.first_name} {user?.last_name}</h3>
            <p className="text-xs text-[var(--text-muted)] font-medium mb-6">{user?.current_plan || "Free"} Node Access</p>
            
            <div className="pt-8 border-t border-[var(--glass-border)] grid grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-2xl">
                 <div className="text-[8px] font-black text-[var(--text-muted)] uppercase mb-1">Status</div>
                 <div className="text-[10px] font-bold text-green-500 uppercase">Verified</div>
              </div>
              <div className="p-4 bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-2xl">
                 <div className="text-[8px] font-black text-[var(--text-muted)] uppercase mb-1">Role</div>
                 <div className="text-[10px] font-bold text-flow-indigo uppercase">Architect</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
