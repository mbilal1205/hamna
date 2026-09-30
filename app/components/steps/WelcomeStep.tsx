"use client";
import { motion } from "framer-motion";
import { stepVariants, itemVariants, stagger } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { TeddyBear, Heart } from "../ui";

export default function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-600/20 blur-[120px] animate-glow-pulse" />

      <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10 w-full max-w-sm">
        <motion.div variants={itemVariants} className="mb-8 flex items-center justify-center gap-3">
          <span className="animate-wiggle"><TeddyBear size={48} /></span>
          <span className="animate-heartbeat"><Heart size={40} /></span>
          <span className="animate-wiggle" style={{ animationDelay: "0.5s" }}><TeddyBear size={48} /></span>
        </motion.div>

        <motion.p variants={itemVariants} className="font-vibes text-5xl text-pink-300 mb-2">
          {CONFIG.welcome.script}
        </motion.p>

        <motion.h1 variants={itemVariants} className="font-playfair text-2xl text-white mb-3">
          {CONFIG.welcome.title}
        </motion.h1>

        <motion.p variants={itemVariants} className="mb-10 text-sm text-pink-100/55">
          {CONFIG.welcome.subtitle}
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.94 }}
          onClick={onNext}
          className="group relative rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-12 py-4 text-lg font-bold text-white shadow-[0_0_45px_rgba(255,77,141,0.55)]"
        >
          {CONFIG.welcome.cta}
          <span className="absolute inset-0 rounded-full animate-pulse-ring" />
        </motion.button>

        <motion.p variants={itemVariants} className="mt-6 text-xs text-pink-100/40">
          {CONFIG.welcome.note}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}