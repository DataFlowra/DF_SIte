"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  X, 
  Send, 
  Loader2, 
  Terminal, 
  Sparkles,
  User,
  ShieldCheck,
  Zap,
  Minimize2,
  Maximize2
} from "lucide-react";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Uplink established. I am FlowR AI, your autonomous data intelligence partner. How can I assist with your infrastructure today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user && messages.length === 1 && messages[0].role === "assistant" && !messages[0].content.includes(user.first_name)) {
      setMessages([{
        role: "assistant",
        content: `Uplink established. Welcome back, ${user.first_name}. I am FlowR AI, your autonomous data intelligence partner. How can I assist with your infrastructure today?`,
        timestamp: new Date()
      }]);
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/ai/generate", {
        messages: [
          { role: "system", content: "You are FlowR AI, a helpful, technical AI assistant for Dataflowra. You are professional, knowledgeable about data infrastructure, and use technical but accessible language. Keep responses concise and focused on data, analytics, and business performance." },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: input }
        ],
        model: "llama-3.1-8b-instant"
      });

      if (response.status === "success") {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.data.choices[0].message.content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I've encountered a packet loss in our neural uplink. Please check your connection and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            className="w-[380px] md:w-[450px] h-[600px] bg-[var(--surface)] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto relative mb-4"
          >
            {/* Header */}
            <div className="p-6 bg-[var(--surface-elevated)] border-b border-white/5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-flow-indigo/10 via-insight-teal/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-flow-indigo/20 flex items-center justify-center border border-flow-indigo/30 overflow-hidden">
                    <Image 
                      src="/images/AI Chatbot (Site-wide)Bot Identity.webp" 
                      alt="FlowR AI" 
                      width={40} 
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--background)] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">FlowR AI</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono text-data-slate uppercase tracking-tighter">Secure Uplink Established</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-white/5 rounded-lg text-data-slate transition-colors"
                >
                  <Minimize2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-red-500/10 rounded-lg text-data-slate hover:text-red-400 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth no-scrollbar bg-[var(--surface)]"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-lg bg-flow-indigo/10 flex items-center justify-center border border-flow-indigo/20 shrink-0 overflow-hidden">
                      <Image 
                        src="/images/AI Chatbot (Site-wide)Bot Identity.webp" 
                        alt="Bot" 
                        width={32} 
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    m.role === "user" 
                    ? "bg-flow-indigo text-white rounded-br-none shadow-lg shadow-flow-indigo/20" 
                    : "bg-[var(--surface-elevated)] border border-white/10 rounded-bl-none text-[var(--text-primary)] shadow-sm"
                  }`}>
                    {m.content}
                    <div className={`text-[8px] font-mono mt-2 opacity-40 ${m.role === "user" ? "text-right" : "text-left"}`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-insight-teal/10 flex items-center justify-center border border-insight-teal/20 shrink-0">
                      <User className="w-4 h-4 text-insight-teal" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-flow-indigo/10 flex items-center justify-center border border-flow-indigo/20 shrink-0">
                    <Loader2 className="w-4 h-4 text-flow-indigo animate-spin" />
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(d => (
                      <motion.div
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="w-1.5 h-1.5 bg-flow-indigo rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-[var(--surface-elevated)] border-t border-white/5">
              <form onSubmit={handleSend} className="relative group">
                <div className="absolute inset-0 bg-flow-indigo/5 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask FlowR AI anything..."
                  className="w-full pl-6 pr-14 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:outline-none focus:border-flow-indigo/50 focus:bg-white/[0.06] transition-all text-sm text-[var(--text-primary)] placeholder:text-data-slate relative z-10"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-flow-indigo text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 z-20"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-4 flex items-center justify-between text-[8px] font-mono text-data-slate uppercase tracking-widest px-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  <span>Interactive Console</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-2.5 h-2.5 text-flow-indigo animate-pulse" />
                  <span>Gorq AI Engine Active</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        initial={false}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full gradient-flow text-white flex items-center justify-center shadow-2xl shadow-flow-indigo/30 pointer-events-auto relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <div className="relative z-10 w-full h-full p-3">
          <Image 
            src="/images/AI Chatbot (Site-wide)Bot Identity.webp" 
            alt="FlowR AI" 
            fill
            className="object-contain p-3"
          />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-insight-teal rounded-full flex items-center justify-center border-4 border-[var(--background)] z-20">
          <Sparkles size={10} />
        </div>
      </motion.button>

      {/* Minimized Bar */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsMinimized(false)}
            className="h-14 px-6 bg-[var(--surface)] border border-flow-indigo/30 rounded-2xl flex items-center gap-4 text-white pointer-events-auto shadow-xl group hover:border-flow-indigo transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest">FlowR AI Active</span>
            <Maximize2 size={14} className="text-data-slate group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
