"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE } from "../lib/animations";

const words1 = ["I", "made", "the", "leap."];
const words2 = ["Now", "I'll", "help", "you", "make", "yours."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const textY    = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const textScale = useTransform(smoothProgress, [0, 0.5], [1, 0.94]);
  const photoY   = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const photoScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);
  const opacity  = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen grid md:grid-cols-2 overflow-hidden bg-white">

      {/* Text */}
      <motion.div
        style={{ y: textY, scale: textScale, opacity }}
        className="relative z-10 flex flex-col justify-center px-6 md:pl-16 lg:pl-24 pt-36 pb-20 md:pt-28 md:pb-16 order-2 md:order-1 origin-top"
      >

        {/* Word-by-word clip reveal */}
        <h1 className="font-serif leading-[0.95] mb-6">
          <div className="flex flex-wrap gap-x-3 md:gap-x-4 overflow-hidden">
            {words1.map((w, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className="block text-5xl md:text-7xl lg:text-8xl font-extrabold text-ink"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.9, ease: EASE }}
                >{w}</motion.span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 md:gap-x-4 mt-1 overflow-hidden">
            {words2.map((w, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  className={`block text-5xl md:text-7xl lg:text-8xl font-extrabold ${i >= 1 ? "text-muted italic" : "text-ink"}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.9, ease: EASE }}
                >{w}</motion.span>
              </div>
            ))}
          </div>
        </h1>

        {/* [REPLACE] tagline */}
        <motion.p
          className="font-sans text-muted text-base md:text-lg leading-[1.8] max-w-[38ch] mb-10 mt-5"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        >
          Your medical degree took 5 years. Your salary is ₹12,000 a month. There is a better path — and I will show you exactly how to take it.
        </motion.p>

        <motion.div className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
        >
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative inline-block overflow-hidden bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4"
          >
            <span className="relative z-10">Book Your Free Discovery Call</span>
            <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
          <a href="#story"
            onClick={(e) => { e.preventDefault(); document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-block border border-ink/20 font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4 hover:border-ink hover:bg-ink hover:text-white transition-all duration-500"
          >
            See Real Results
          </a>
        </motion.div>

        <motion.div
          className="flex items-center gap-2.5 mt-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ink" />
          </span>
          <span className="font-sans text-[0.65rem] font-semibold tracking-widest uppercase text-muted">
            Career Transition Consultant · Only 3 spots left this month
          </span>
        </motion.div>

        <motion.div className="flex gap-8 mt-10 pt-10 border-t border-ink/10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          {[
            { n: "50+", label: "Doctors & Dentists Placed" },
            { n: "90",  label: "Days to First Offer" },
            { n: "4×",  label: "Average Salary Jump" },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.1, duration: 0.7, ease: EASE }}
            >
              <p className="font-serif text-3xl font-extrabold text-ink">{s.n}</p>
              <p className="font-sans text-[0.6rem] tracking-widest uppercase text-muted mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Photo with parallax zoom */}
      <div className="relative bg-accent-light order-1 md:order-2 h-64 md:h-auto overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: photoY, scale: photoScale }}>
          {/* SWAP: /public/images/hero.jpg */}
          <Image
            src="/images/hero.JPG"
            alt="Aiswarya Unni — Career Transition Consultant"
            fill className="object-cover object-top" priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/5 to-transparent hidden md:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent md:hidden pointer-events-none" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-16 lg:left-24 md:translate-x-0 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-[0.6rem] font-sans font-semibold tracking-[0.2em] uppercase text-muted">Scroll</span>
        <motion.div className="w-px h-10 bg-ink origin-top"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
