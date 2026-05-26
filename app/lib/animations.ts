import { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.4, 0, 1, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: (delay = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)", opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: (delay = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const VP = { once: true, margin: "-80px" } as const;
