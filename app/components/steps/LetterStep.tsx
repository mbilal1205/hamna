"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { stepVariants } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { Typewriter, Heart } from "../ui";

export default function LetterStep({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="animate-heartbeat"><Heart size={22} /></span>
          <h2 className="font-playfair text-lg font-semibold text-pink-200">
            Ek Chhoti Si Baat
          </h2>
          <span className="animate-heartbeat" style={{ animationDelay: ".3s" }}>
            <Heart size={22} />
          </span>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-7">
          <div className="text-[15px] sm:text-base">
            <Typewriter lines={CONFIG.loveLetter} onDone={() => setDone(true)} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <button onClick={onNext} disabled={!done}
            className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-9 py-3.5 text-base font-bold text-white shadow-[0_0_35px_rgba(255,77,141,0.55)] disabled:opacity-0 transition active:scale-95">
            Aage badho 💗
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}