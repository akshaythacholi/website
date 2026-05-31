"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, VP } from "../lib/animations";

const pains = [
  {
    num: "01",
    code: "Invisible Ceiling Syndrome",
    heading: "You've hit an invisible ceiling.",
    body: "Clinical excellence stopped translating into advancement. You can feel the walls closing in — but nobody talks about it.",
  },
  {
    num: "02",
    code: "Peer Displacement Anxiety",
    heading: "Your peers are in rooms you should be in.",
    body: "Colleagues are at pharma companies, consulting firms, corporate roles. You know you could do it. You just don't know how to start.",
  },
  {
    num: "03",
    code: "CV Translation Deficit",
    heading: "Your CV is speaking the wrong language.",
    body: "You know your background is valuable. The problem is translating it into words that corporate hiring managers respond to.",
  },
  {
    num: "04",
    code: "Transition Paralysis",
    heading: "You're afraid to start over — but more afraid to stay.",
    body: "Leaving feels like failure. Staying feels like slow erosion. You're stuck between the safety of what you know and the pull of what you want.",
  },
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "6%"]);

  return (
    <section id="pain" ref={sectionRef} data-theme="dark" className="py-16 md:py-24 text-white overflow-hidden relative" style={{ backgroundColor: "#111111" }}>
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: bgY }} aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-white" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="overflow-hidden mb-10 md:mb-14">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">Does This Sound Familiar?</p>
            <div className="divider mb-7 bg-white/30" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white max-w-3xl">
              You didn&apos;t spend years studying to feel{" "}
              <em className="text-muted italic">this stuck.</em>
            </h2>
          </motion.div>
        </div>

        {/* Medical assessment card */}
        <motion.div
          className="bg-white overflow-hidden"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 1, ease: EASE }}
          style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.55)" }}
        >
          {/* Card header */}
          <div className="px-6 md:px-10 py-4 border-b border-ink/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2" style={{ background: "#f8f8f6" }}>
            <div>
              <p className="font-sans text-[0.58rem] font-bold tracking-[0.3em] uppercase text-ink/40">Clinical Assessment Report</p>
              <p className="font-sans text-[0.58rem] tracking-[0.1em] uppercase text-ink/25 mt-0.5">Ref: CAR-2025-IN &nbsp;·&nbsp; Aiswarya Unni Consulting</p>
            </div>
            <div className="sm:text-right">
              <p className="font-sans text-[0.58rem] font-bold tracking-[0.2em] uppercase text-ink/35">Patient Profile</p>
              <p className="font-sans text-[0.58rem] text-ink/25 mt-0.5">Medical Professional, India</p>
            </div>
          </div>

          {/* Findings */}
          <div className="px-6 md:px-10 pt-6 md:pt-8 pb-4">
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.35em] uppercase text-ink/30 mb-5">Presenting Complaints</p>

            <div className="flex flex-col gap-5 md:gap-6">
              {pains.map((pain, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
                >
                  {/* Warning badge */}
                  <div
                    className="shrink-0 w-7 h-7 flex items-center justify-center mt-0.5"
                    style={{ background: "#FFF3F3", border: "1.5px solid #FFCDD2", borderRadius: 4 }}
                  >
                    <span style={{ color: "#C62828", fontSize: "0.7rem" }}>⚠</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="min-w-0">
                        <span className="font-sans text-[0.55rem] font-bold tracking-[0.25em] uppercase text-ink/30 mr-2">[{pain.num}]</span>
                        <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink/50">{pain.code}</span>
                      </div>
                      <span
                        className="shrink-0 font-sans text-[0.5rem] font-bold tracking-widest uppercase px-2 py-0.5 mt-0.5"
                        style={{ background: "#FFF3F3", color: "#C62828", borderRadius: 2 }}
                      >
                        Active
                      </span>
                    </div>
                    <h3 className="font-serif text-base md:text-lg font-bold text-ink leading-snug mb-1">{pain.heading}</h3>
                    <p className="font-sans text-xs text-ink/50 leading-relaxed">{pain.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Assessment footer */}
          <motion.div
            className="mx-6 md:mx-10 mt-5 mb-6 md:mb-8 pt-5 border-t border-ink/10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={VP} transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="font-sans text-[0.55rem] font-bold tracking-[0.35em] uppercase text-ink/30 mb-4">Clinical Assessment</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-sans text-[0.52rem] font-semibold tracking-widest uppercase text-ink/25 mb-1">Diagnosis</p>
                <p className="font-serif text-sm font-bold text-ink leading-snug">Career Stagnation Syndrome</p>
              </div>
              <div>
                <p className="font-sans text-[0.52rem] font-semibold tracking-widest uppercase text-ink/25 mb-1">Prognosis</p>
                <p className="font-serif text-sm font-bold leading-snug" style={{ color: "#15803d" }}>Excellent</p>
              </div>
              <div>
                <p className="font-sans text-[0.52rem] font-semibold tracking-widest uppercase text-ink/25 mb-1">Recommended Rx</p>
                <p className="font-serif text-sm font-bold text-ink leading-snug">Corporate Transition Programme</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom quote */}
        <motion.div className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="overflow-hidden mb-4">
            <motion.p
              className="font-serif text-xl md:text-3xl font-semibold italic text-white/40 max-w-3xl mx-auto"
              initial={{ y: "100%" }} whileInView={{ y: "0%" }}
              viewport={VP} transition={{ duration: 1, ease: EASE }}
            >
              &ldquo;I know exactly how each of those feels. I sat with every one of them for longer than I should have.&rdquo;
            </motion.p>
          </div>
          <motion.p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={VP} transition={{ delay: 0.3, duration: 0.8 }}
          >— Aiswarya Unni</motion.p>
        </motion.div>

      </div>
    </section>
  );
}
