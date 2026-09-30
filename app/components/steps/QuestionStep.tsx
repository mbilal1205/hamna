"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { stepVariants, itemVariants, stagger } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { TeddyBear, Heart } from "../ui";

export default function QuestionStep({ onYes }: { onYes: () => void }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNo = useCallback(() => {
    setNoPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120,
    });
    setNoCount(c => c + 1);
  }, []);

  const yesScale = Math.min(1 + noCount * 0.09, 1.55);
  const noScale  = Math.max(1 - noCount * 0.08, 0.5);
  const yesText  = CONFIG.yesTexts[Math.min(noCount, CONFIG.yesTexts.length - 1)];
  const noText   = CONFIG.noTexts[Math.min(noCount, CONFIG.noTexts.length - 1)];

  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <motion.div variants={stagger} initial="initial" animate="animate"
        className="w-full max-w-md text-center">
        <motion.div variants={itemVariants} className="mb-6 flex justify-center gap-3">
          <span className="animate-float-soft"><TeddyBear size={44} /></span>
          <span className="animate-heartbeat"><Heart size={36} /></span>
          <span className="animate-float-soft" style={{ animationDelay: ".5s" }}>
            <TeddyBear size={44} />
          </span>
        </motion.div>

        <motion.h2 variants={itemVariants}
          className="font-playfair text-2xl sm:text-3xl font-bold text-white text-glow mb-2">
          {CONFIG.question}
        </motion.h2>

        <motion.p variants={itemVariants} className="text-sm text-pink-100/60 mb-10">
          {CONFIG.questionSub}
        </motion.p>

        <motion.div variants={itemVariants}
          className="relative flex min-h-[130px] flex-wrap items-center justify-center gap-5">
          <button onClick={onYes}
            style={{ transform: `scale(${yesScale})` }}
            className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-9 py-3.5 text-base font-extrabold text-white shadow-[0_0_45px_rgba(255,77,141,0.7)] transition-transform duration-300 hover:brightness-110 active:scale-95">
            {yesText}
          </button>

          <AnimatePresence>
            {noCount < CONFIG.noTexts.length && (
              <motion.button
                key="no"
                onClick={moveNo}
                onMouseEnter={moveNo}
                onTouchStart={(e) => { e.preventDefault(); moveNo(); }}
                animate={{ x: noPos.x, y: noPos.y, scale: noScale }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="rounded-full border border-pink-400/40 bg-black/60 px-6 py-2.5 text-sm font-semibold text-pink-200/80">
                {noText}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-7 text-[11px] text-pink-100/35">
          (Jaan, no button bhaag raha hai... samajh jao 😌)
        </motion.p>
      </motion.div>
    </motion.section>
  );
}