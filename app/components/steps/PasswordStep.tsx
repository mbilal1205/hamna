"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { stepVariants, itemVariants, stagger } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { TeddyBear } from "../ui";

export default function PasswordStep({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChange = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setPin(digits);
    setError(false);
    if (digits.length === 4) {
      setTimeout(() => {
        if (digits === CONFIG.password) onSuccess();
        else {
          setError(true);
          setAttempts(a => a + 1);
          setTimeout(() => setPin(""), 650);
        }
      }, 200);
    }
  };

  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <motion.div variants={stagger} initial="initial" animate="animate" className="w-full max-w-sm text-center">
        {/* Teddy */}
        <motion.div variants={itemVariants} className="mx-auto mb-6 animate-float-soft">
          <TeddyBear size={96} />
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-playfair text-3xl font-bold text-white mb-2">
          Sirf <span className="text-pink-400">Hamna</span> ke liye
        </motion.h1>

        <motion.p variants={itemVariants} className="mb-9 text-sm text-pink-100/50">
          Ye page sirf tumhare liye banaya hai, Sahzadi 🧸
        </motion.p>

        {/* PIN boxes */}
        <motion.div variants={itemVariants} className="relative mb-5">
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map(i => (
              <div key={i}
                className={[
                  "flex h-14 w-12 items-center justify-center rounded-2xl border-2 text-2xl font-bold transition-all duration-300",
                  error ? "border-red-400/70 bg-red-500/10" : "",
                  !error && pin.length === i ? "border-pink-400 bg-pink-500/10 shadow-[0_0_22px_rgba(255,77,141,0.4)]" : "",
                  !error && pin.length > i ? "border-pink-500/70 bg-pink-500/5" : "",
                  !error && pin.length <= i ? "border-white/10" : "",
                  error ? "animate-[shake_0.5s_ease-in-out]" : "",
                ].join(" ")}>
                {pin[i] ? <span className="text-pink-400 text-3xl leading-none">•</span> : ""}
              </div>
            ))}
          </div>
          <input
            type="tel" inputMode="numeric" pattern="[0-9]*" maxLength={4}
            value={pin} onChange={e => handleChange(e.target.value)} autoFocus
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </motion.div>

        <div className="min-h-[36px]">
          {error && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400">
              {attempts < 3 ? "Arre Sahzadi, phir se try karo 🙈" : CONFIG.passwordHint}
            </motion.p>
          )}
        </div>

        <motion.p variants={itemVariants} className="mt-6 text-xs text-pink-100/35">
          Hint: 4 digits • purani yaad 🎀
        </motion.p>
      </motion.div>
    </motion.section>
  );
}