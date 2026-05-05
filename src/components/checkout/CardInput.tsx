"use client";

import { useState, useEffect } from "react";
import { CreditCard, Calendar, Lock, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CardInputProps {
  onCardChange: (cardData: any) => void;
}

export default function CardInput({ onCardChange }: CardInputProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isTestCard, setIsTestCard] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
      setIsTestCard(formatted.startsWith("4242"));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  useEffect(() => {
    const [month, year] = expiry.split("/");
    onCardChange({
      card_number: cardNumber.replace(/\s/g, ""),
      expiry_month: month || "",
      expiry_year: year ? `20${year}` : "",
      cvv,
      card_holder: cardHolder
    });
  }, [cardNumber, expiry, cvv, cardHolder, onCardChange]);

  return (
    <div className="space-y-6 text-left">
      <div className="group space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Card Holder Name</label>
        <div className="relative">
          <input 
            type="text" 
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            placeholder="Full name on card"
            className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all text-sm text-[var(--text-primary)]"
          />
        </div>
      </div>

      <div className="group space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Card Number</label>
          <AnimatePresence>
            {isTestCard && (
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[9px] font-black text-insight-teal uppercase tracking-widest"
              >
                <Sparkles size={10} className="animate-pulse" />
                Test Card Detected
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="relative">
          <input 
            type="text" 
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            className={`w-full bg-[var(--surface-elevated)] border rounded-xl px-5 py-3.5 outline-none transition-all font-mono text-sm text-[var(--text-primary)] ${
              isTestCard ? 'border-insight-teal/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-[var(--glass-border)] focus:border-flow-indigo/50'
            }`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             {cardNumber.startsWith("4") ? (
               <span className="text-[10px] font-black text-flow-indigo italic">VISA</span>
             ) : cardNumber.startsWith("5") ? (
               <span className="text-[10px] font-black text-flow-indigo italic">MASTERCARD</span>
             ) : (
               <CreditCard size={18} className="text-[var(--text-muted)] opacity-20" />
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="group space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">Expiry Date</label>
          <div className="relative">
            <input 
              type="text" 
              required
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all font-mono text-sm text-[var(--text-primary)]"
            />
            <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] opacity-20" />
          </div>
        </div>
        <div className="group space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] ml-1">CVV</label>
          <div className="relative">
            <input 
              type="text" 
              required
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              placeholder="123"
              className="w-full bg-[var(--surface-elevated)] border border-[var(--glass-border)] rounded-xl px-5 py-3.5 focus:border-flow-indigo/50 outline-none transition-all font-mono text-sm text-[var(--text-primary)]"
            />
            <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
