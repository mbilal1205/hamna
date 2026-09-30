"use client";
import { motion } from "framer-motion";
import { stepVariants, itemVariants, stagger } from "@/app/lib/motion";
import { CONFIG } from "@/app/lib/constants";
import { TeddyBear, Heart, Confetti } from "../ui";

export default function CelebrationStep() {
  return (
    <motion.section
      variants={stepVariants} initial="initial" animate="animate" exit="exit"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
    >
      <Confetti show={true} />

      <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/30 blur-[120px] animate-glow-pulse" />

      <motion.div variants={stagger} initial="initial" animate="animate"
        className="relative z-10 w-full max-w-md">
        <motion.div variants={itemVariants} className="mb-6 flex justify-center gap-3">
          <span className="animate-float-soft"><TeddyBear size={54} /></span>
          <span className="animate-heartbeat"><Heart size={46} /></span>
          <span className="animate-float-soft" style={{ animationDelay: ".4s" }}>
            <TeddyBear size={54} />
          </span>
        </motion.div>

        <motion.p variants={itemVariants} className="font-vibes text-4xl text-pink-300 mb-2">
          {CONFIG.celebration.script}
        </motion.p>

        <motion.h2 variants={itemVariants}
          className="font-playfair text-4xl sm:text-5xl font-extrabold text-shine mb-6">
          {CONFIG.celebration.title}
        </motion.h2>

        <motion.p variants={itemVariants}
          className="text-[15px] sm:text-base text-pink-100/80 leading-relaxed mb-7">
          {CONFIG.celebration.message}
        </motion.p>

        <motion.div variants={itemVariants}
          className="glass rounded-3xl p-5">
          <p className="font-vibes text-3xl text-pink-300">
            {CONFIG.celebration.footer}
          </p>
          <p className="mt-2 text-xs text-pink-100/50">
            {CONFIG.celebration.sub}
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}