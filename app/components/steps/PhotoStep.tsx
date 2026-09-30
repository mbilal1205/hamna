"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { stepVariants, itemVariants, popIn } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { TeddyBear, Heart } from "../ui";

export default function PhotoStep({ onNext }: { onNext: () => void }) {
  const [imgOk, setImgOk] = useState(true);
  const [showText, setShowText] = useState(false);

  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-8"
      onAnimationComplete={() => setTimeout(() => setShowText(true), 900)}
    >
      {/* Header */}
      <motion.div variants={itemVariants} initial="initial" animate="animate"
        className="mb-6 text-center shrink-0">
        <p className="font-vibes text-3xl text-pink-300/90">{CONFIG.photoStep.script}</p>
        <h2 className="mt-1 font-playfair text-xl text-white">{CONFIG.photoStep.title}</h2>
      </motion.div>

      {/* Photo */}
      <motion.div variants={popIn} initial="initial" animate="animate"
        className="relative shrink-0 animate-float-soft">
        <div className="absolute -top-6 -left-7 animate-wiggle"><TeddyBear size={46} /></div>
        <div className="absolute -top-5 -right-7 animate-wiggle" style={{ animationDelay: ".6s" }}>
          <TeddyBear size={42} />
        </div>
        <div className="absolute -bottom-5 -left-6 animate-heartbeat"><Heart size={30} /></div>
        <div className="absolute -bottom-4 -right-6 animate-heartbeat" style={{ animationDelay: ".4s" }}>
          <Heart size={26} color="#FF85B3" />
        </div>

        <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-br from-pink-500/70 via-fuchsia-500/40 to-pink-400/70 blur-2xl opacity-70 animate-glow-pulse" />

        <div className="relative rounded-[2rem] border-[3px] border-pink-400/70 bg-black p-2.5 shadow-[0_20px_60px_rgba(255,77,141,0.35)]">
          <div className="relative h-[300px] w-[220px] overflow-hidden rounded-[1.6rem] sm:h-[380px] sm:w-[290px]">
            {imgOk ? (
              <Image src={CONFIG.photo} alt="Meri Jaan" fill priority
                sizes="(max-width: 640px) 220px, 290px"
                className="object-cover" onError={() => setImgOk(false)} />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-pink-900/60 to-black">
                <TeddyBear size={100} />
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Text lines + button */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 w-full max-w-sm text-center shrink-0"
          >
            {CONFIG.photoStep.lines.map((l, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.25, duration: 0.5 }}
                className="text-sm sm:text-base text-pink-100/75 leading-relaxed">
                {l}
              </motion.p>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              whileTap={{ scale: 0.94 }} onClick={onNext}
              className="mt-7 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-9 py-3.5 text-base font-bold text-white shadow-[0_0_35px_rgba(255,77,141,0.55)]">
              {CONFIG.photoStep.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}