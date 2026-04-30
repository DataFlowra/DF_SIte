"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Key, Smartphone, Globe, Trash2, Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { api, sha256 } from "@/lib/api-client";

export default function SecuritySettingsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);

  const [passData, setPassData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production Node 1", key: "df_live_xxxxxxxxxxxx4f2e", created: "2026-04-12" },
    { id: 2, name: "Development SDK", key: "df_test_xxxxxxxxxxxx9a1b", created: "2026-04-25" },
  ]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passData.new !== passData.confirm) {
      setPassError("New passwords do not match.");
      return;
    }

    setIsChangingPass(true);
    setPassError(null);
    setPassSuccess(false);

    try {
      const currentHash = await sha256(passData.current);
      const newHash = await sha256(passData.new);

      const response = await api.post("/api/auth/password/change", {
        current_password_hash: currentHash,
        password_hash: newHash
      });

      if (response.status === "success") {
        setPassSuccess(true);
        setPassData({ current: "", new: "", confirm: "" });
      } else {
        setPassError(response.message || "Failed to update password.");
      }
    } catch (err) {
      setPassError("Protocol error during encryption.");
    } finally {
      setIsChangingPass(false);
    }
  };

  const generateKey = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newKey = {
        id: Date.now(),
        name: "New API Key",
        key: `df_live_${Math.random().toString(36).substring(2, 14)}`,
        created: new Date().toISOString().split('T')[0]
      };
      setApiKeys([newKey, ...apiKeys]);
      setIsGenerating(false);
    }, 1000);
  };

  const deleteKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link href="/dashboard/settings" className="text-data-slate hover:text-white transition-colors">
          Settings
        </Link>
        <span className="text-white/10">/</span>
        <h1 className="text-xl font-bold text-white uppercase tracking-widest">Security Protocols</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          
          {/* Password Change Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-flow-indigo/10 flex items-center justify-center text-flow-indigo border border-flow-indigo/20">
                <Lock size={18} />
              </div>
              <h3 className="text-xl font-bold text-white">Update Password</h3>
            </div>

            {passError && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <AlertCircle size={14} />
                {passError}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1">Current Password</label>
                  <input 
                    type="password" required
                    value={passData.current}
                    onChange={(e) => setPassData({...passData, current: e.target.value})}
                    className="w-full bg-[var(--surface-elevated)] border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1">New Password</label>
                    <input 
                      type="password" required
                      value={passData.new}
                      onChange={(e) => setPassData({...passData, new: e.target.value})}
                      className="w-full bg-[var(--surface-elevated)] border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-data-slate ml-1">Confirm New</label>
                    <input 
                      type="password" required
                      value={passData.confirm}
                      onChange={(e) => setPassData({...passData, confirm: e.target.value})}
                      className="w-full bg-[var(--surface-elevated)] border border-white/5 rounded-xl px-6 py-4 focus:outline-none focus:border-flow-indigo/50 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                   {passSuccess && (
                     <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Protocol Updated</span>
                     </div>
                   )}
                </div>
                <button 
                  disabled={isChangingPass}
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl disabled:opacity-50"
                >
                  {isChangingPass ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify & Save"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* API Keys Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-insight-teal/10 flex items-center justify-center text-insight-teal border border-insight-teal/20 shadow-glow-sm">
                  <Key size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Access Tokens</h3>
              </div>
              <button 
                onClick={generateKey}
                disabled={isGenerating}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {apiKeys.map((key) => (
                  <motion.div 
                    key={key.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-white mb-1 text-left">{key.name}</div>
                      <div className="flex items-center gap-3">
                        <code className="text-[10px] text-data-slate font-mono bg-black/20 px-2 py-0.5 rounded">{key.key}</code>
                        <span className="text-[8px] text-white/20 font-mono">Created: {key.created}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteKey(key.id)}
                      className="p-2 text-data-slate hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <p className="text-[8px] text-data-slate uppercase tracking-widest mt-6 text-center opacity-30">Frontend Prototype: Tokens are managed locally in current session.</p>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Active Sessions */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[2.5rem] p-10 border border-white/5"
          >
            <h4 className="text-[10px] font-black text-data-slate uppercase tracking-[0.2em] mb-8">Active Neural Uplinks</h4>
            <div className="space-y-6">
               {[
                 { device: "MacBook Pro", location: "Los Angeles, USA", status: "Current", icon: Globe },
                 { device: "iPhone 15", location: "London, UK", status: "2h ago", icon: Smartphone },
               ].map((session, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-data-slate">
                       <session.icon size={18} />
                    </div>
                    <div className="flex-1 text-left">
                       <div className="text-sm font-bold text-white">{session.device}</div>
                       <div className="text-[10px] text-data-slate uppercase font-black">{session.location}</div>
                    </div>
                    <div className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${i === 0 ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'text-data-slate'}`}>
                       {session.status}
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
               Terminate All Sessions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
