"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { stepVariants } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { ReasonIcon, TeddyBear } from "../ui";

export default function ReasonsStep({ onNext }: { onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const total = CONFIG.reasons.length;
  const reason = CONFIG.reasons[idx];
  const isLast = idx === total - 1;

  const advance = () => { if (isLast) onNext(); else setIdx(i => i + 1); };

  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-sm text-center">
        <p className="font-vibes text-3xl text-pink-300/90">Reasons</p>
        <h2 className="mt-1 font-playfair text-lg text-white mb-6">
          Kyun tum meri jaan ho
        </h2>

        {/* Dots */}
        <div className="mb-8 flex justify-center gap-2">
          {CONFIG.reasons.map((_, i) => (
            <span key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-pink-400" : "w-1.5 bg-pink-400/30"
              }`} />
          ))}
        </div>

        {/* Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-7"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-500/25 to-pink-700/15 border border-pink-400/30">
                <ReasonIcon name={reason.icon} size={30} />
              </div>
              <h3 className="font-playfair text-xl text-pink-100 mb-2">{reason.title}</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">{reason.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={advance}
          className="mt-9 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-9 py-3.5 text-base font-bold text-white shadow-[0_0_35px_rgba(255,77,141,0.55)] active:scale-95 transition">
          {isLast ? "Ab ek sawaal 💗" : "Next"}
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 opacity-25">
        <TeddyBear size={50} sparkle={false} />
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 opacity-25">
        <TeddyBear size={44} sparkle={false} />
      </div>
    </motion.section>
  );
}