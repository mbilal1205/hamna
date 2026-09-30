import type { Variants } from "framer-motion";

export const stepVariants: Variants = {
  initial: { opacity: 0, x: 60, scale: 0.97 },
  animate: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, x: -60, scale: 0.97,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const popIn: Variants = {
  initial: { opacity: 0, scale: 0.6 },
  animate: {
    opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};