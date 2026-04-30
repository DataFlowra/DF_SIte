"use client";

import { useState, useEffect } from "react";
import { CreditCard, Calendar, Lock } from "lucide-react";

interface CardInputProps {
  onCardChange: (cardData: any) => void;
}

export default function CardInput({ onCardChange }: CardInputProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.length <= 7) {
      setExpiry(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9]/gi, "");
    if (v.length <= 4) {
      setCvv(v);
    }
  };

  useEffect(() => {
    const [month, year] = expiry.split(" / ");
    onCardChange({
      card_number: cardNumber.replace(/\s/g, ""),
      expiry_month: month || "",
      expiry_year: year || "",
      cvv,
      card_holder: cardHolder
    });
  }, [cardNumber, expiry, cvv, cardHolder, onCardChange]);

  return (
    <div className="space-y-6">
      <div className="group space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Cardholder Name</label>
        <input 
          required
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          placeholder="John Doe"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-insight-teal/50 outline-none transition-all"
        />
      </div>
      
      <div className="group space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Card Number</label>
        <div className="relative">
          <input 
            required
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="4242 4242 4242 4242"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-insight-teal/50 outline-none transition-all font-mono"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
             {cardNumber.startsWith("4") ? (
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-[8px] font-black tracking-widest border border-blue-500/20">VISA</div>
             ) : cardNumber.startsWith("5") ? (
                <div className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-[8px] font-black tracking-widest border border-orange-500/20">MC</div>
             ) : (
                <CreditCard size={16} className="text-white/20" />
             )}
          </div>
        </div>
        {cardNumber.replace(/\s/g, "") === "4242424242424242" && (
          <p className="text-[10px] text-insight-teal font-bold uppercase tracking-widest animate-pulse">Test Card Detected</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="group space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Expiration</label>
          <div className="relative">
            <input 
              required
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM / YY"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-insight-teal/50 outline-none transition-all font-mono"
            />
            <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
          </div>
        </div>
        <div className="group space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">CVV</label>
          <div className="relative">
            <input 
              required
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="•••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 focus:border-insight-teal/50 outline-none transition-all font-mono"
            />
            <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
