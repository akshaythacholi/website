"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, VP } from "../lib/animations";

const steps = [
  { num: "01", title: "Apply", sub: "5 minutes. No commitment.", desc: "Fill in the short form — your situation, your goal. I read every submission personally.", detail: "Within 48 hours: a booking link or honest feedback on fit." },
  { num: "02", title: "Consult", sub: "30 minutes. No commitment.", desc: "One video call. One goal — clarity on what you want and what's held you back.", detail: "No pitch. No pressure. You'll know by the end if this is right for you." },
  { num: "03", title: "Land the Job", sub: "Tailored strategy. Real execution.", desc: "Every session targets your specific blockers. Week by week the strategy sharpens and doors open.", detail: "First interview typically within 3–6 weeks. Offers within 90 days." },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const lineWidth = useTransform(smooth, [0.15, 0.65], ["0%", "100%"]);
  const bgY = useTransform(smooth, [0, 1], ["0%", "8%"]);

  return (
    <section id="process" ref={ref} data-theme="dark" className="py-16 md:py-24 text-white overflow-hidden relative" style={{ backgroundColor: "#111111" }}>
      <motion.div className="absolute inset-0 opacity-[0.025]" style={{ y: bgY }} aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-white" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="mb-12 overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">How It Works</p>
            <div className="divider mb-7 bg-white/30" />
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] max-w-2xl">
                From stuck to signed offer{" "}
                <em className="text-muted italic">— here&apos;s the path.</em>
              </h2>
              <motion.p
                className="font-sans text-sm text-white/40 max-w-xs leading-relaxed"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={VP} transition={{ delay: 0.4, duration: 0.8 }}
              >
                A clear, structured process with a real outcome at the end.
              </motion.p>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-white/10 overflow-hidden">
            <motion.div className="h-full bg-white/60" style={{ width: lineWidth }} />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={VP}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.18 }}
              >
                <motion.span
                  className="font-serif text-6xl md:text-8xl font-extrabold leading-none text-white/8"
                  whileInView={{ opacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.6 }}
                >{s.num}</motion.span>
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                    viewport={VP} transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.18 }}
                  >
                    <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-white mb-1">{s.title}</h3>
                    <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted">{s.sub}</p>
                  </motion.div>
                </div>
                <motion.p
                  className="font-sans text-sm text-white/55 leading-[1.85]"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  viewport={VP} transition={{ delay: 0.3 + i * 0.18, duration: 0.7 }}
                >{s.desc}</motion.p>
                <motion.div
                  className="border-l border-white/15 pl-5"
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP} transition={{ delay: 0.45 + i * 0.18, duration: 0.7, ease: EASE }}
                >
                  <p className="font-sans text-sm text-white/30 leading-[1.85] italic">{s.detail}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-10 md:mt-14 p-6 md:p-10 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="overflow-hidden">
              <motion.p
                className="font-serif text-2xl md:text-3xl font-bold text-white"
                initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                viewport={VP} transition={{ duration: 0.8, ease: EASE }}
              >My commitment to you</motion.p>
            </div>
            <motion.p
              className="font-sans text-sm text-white/45 leading-relaxed"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={VP} transition={{ delay: 0.2, duration: 0.7 }}
            >
              If I can&apos;t genuinely help you, I&apos;ll say so on the call — and point you to something that will. No hard sell. Ever.
            </motion.p>
          </div>
          <motion.a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative shrink-0 inline-block overflow-hidden bg-white text-ink font-sans text-xs font-semibold tracking-widest uppercase px-10 py-4"
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={VP} transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Start With a Discovery Call</span>
            <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
