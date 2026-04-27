"use client";

import { motion } from "framer-motion";
import { FaGithub, FaGoogle } from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://api.dataflowra.com/api";

export default function SocialButtons() {
  const handleOAuth = (provider: string) => {
    window.location.href = `${BASE_URL}/auth/${provider}/redirect`;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.button
        onClick={() => handleOAuth("github")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl glass border-white/5 hover:border-white/20 transition-all text-sm font-bold text-[var(--text-primary)] group"
      >
        <FaGithub className="w-5 h-5 group-hover:text-white transition-colors" />
        <span>GitHub</span>
      </motion.button>
      
      <motion.button
        onClick={() => handleOAuth("google")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl glass border-white/5 hover:border-white/20 transition-all text-sm font-bold text-[var(--text-primary)] group"
      >
        <FaGoogle className="w-5 h-5 group-hover:text-[#4285F4] transition-colors" />
        <span>Google</span>
      </motion.button>
    </div>
  );
}
