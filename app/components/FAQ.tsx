"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EASE, VP } from "../lib/animations";

const faqs = [
  { q: "Do I need corporate experience or connections to start?",   a: "No. AstraZeneca, Novartis, Abbott, and IQVIA India actively recruit clinicians with zero corporate experience. They want your clinical knowledge — reframed in language they understand. That's exactly what we do." },
  { q: "I don't know which corporate role suits me. Is that okay?", a: "That's the most common starting point. Role clarity is part of the work. We map your background against real options — MSL, Medical Affairs, Regulatory, Health-Tech, Consulting — and find your best fit together." },
  { q: "Won't I earn less in a corporate role than in practice?",    a: "Almost certainly not. MSL roles at Novartis start at ₹15–20 LPA. Medical Advisors at Abbott or GSK earn ₹18–25 LPA. Compare that to ₹8,000–20,000/month in clinical — with no on-calls and structured growth." },
  { q: "How quickly can I realistically make the switch?",           a: "Most clients get their first interview within 4–6 weeks. A confirmed offer typically comes within 60–90 days. The programme builds the targeted approach that makes this happen." },
  { q: "I'm working full-time in a hospital. Can I still do this?",  a: "Yes. All sessions are online — 60–90 minutes, once or twice a week, around your shifts and OPDs. You build the exit strategy while still employed. No resignation needed." },
  { q: "I'm not in Mumbai or Delhi. Does location matter?",          a: "Not at all. Everything is online. I've worked with doctors from Tier-2 cities, smaller towns, and abroad. If you have internet and ambition, location is never a barrier." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-accent-light overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">

        <div className="mb-10 text-center overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">FAQ</p>
            <div className="divider mx-auto mb-7" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-ink">
              Your questions,{" "}
              <em className="text-muted italic">answered honestly.</em>
            </h2>
          </motion.div>
        </div>

        {/* Chat window */}
        <motion.div
          className="bg-white border border-ink/8 overflow-hidden"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Chat header */}
          <div className="px-5 py-3.5 border-b border-ink/8 flex items-center gap-3" style={{ background: "#f8f8f6" }}>
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center shrink-0">
              <span className="font-sans text-[0.58rem] font-bold text-white" aria-hidden="true">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-xs font-semibold text-ink">Aiswarya Unni</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                <span className="font-sans text-[0.65rem] text-muted">Online · typically replies instantly</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="px-5 py-6 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              >
                {/* Question — user bubble (left) */}
                <div className="flex items-end gap-2.5 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mb-0.5"
                    style={{ background: "#E5E7EB" }}
                  >
                    <span className="font-sans text-[0.46rem] font-bold text-ink/50 leading-none" aria-hidden="true">You</span>
                  </div>
                  <button
                    className="text-left max-w-[85%] md:max-w-[75%]"
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <div
                      className="px-4 py-3 font-sans text-sm font-medium text-ink leading-relaxed transition-all duration-200"
                      style={{
                        background:   open === i ? "#E5E7EB" : "#F3F4F6",
                        borderRadius: "4px 16px 16px 16px",
                      }}
                    >
                      {faq.q}
                    </div>
                  </button>
                </div>

                {/* Answer — Aiswarya bubble (right) */}
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      className="flex items-end justify-end gap-2.5 mt-2"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.38, ease: EASE }}
                    >
                      <p
                        className="font-sans text-sm leading-[1.75] max-w-[85%] md:max-w-[75%] px-4 py-3"
                        style={{
                          background:   "#1D1D1F",
                          color:        "rgba(255,255,255,0.85)",
                          borderRadius: "16px 4px 16px 16px",
                        }}
                      >
                        {faq.a}
                      </p>
                      <div
                        className="w-6 h-6 bg-ink rounded-full flex items-center justify-center shrink-0 mb-0.5"
                      >
                        <span className="font-sans text-[0.46rem] font-bold text-white leading-none" aria-hidden="true">AU</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Typing indicator at bottom */}
          <div className="px-5 py-3 border-t border-ink/6 flex items-center gap-3" style={{ background: "#f8f8f6" }}>
            <div className="w-6 h-6 bg-ink rounded-full flex items-center justify-center shrink-0">
              <span className="font-sans text-[0.46rem] font-bold text-white leading-none">AU</span>
            </div>
            <p className="font-sans text-xs text-muted/60">Have more questions? Book a call and bring them.</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-10 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-sans text-sm text-muted mb-6">Still have a question? Bring it to the call.</p>
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative inline-block overflow-hidden bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4"
          >
            <span className="relative z-10">Book a Discovery Call</span>
            <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
