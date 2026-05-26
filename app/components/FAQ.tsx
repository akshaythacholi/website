"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { EASE, VP } from "../lib/animations";

const faqs = [
  { q: "Do I need corporate experience or connections to start?", a: "No — and this is the biggest myth holding Indian doctors and dentists back. Companies like AstraZeneca, Novartis, Abbott, and IQVIA India actively recruit clinicians with zero corporate experience. What they want is your clinical reasoning, patient exposure, and domain knowledge — reframed in the language they understand. That reframing is exactly what we do together." },
  { q: "I don't know which corporate role suits me. Is that okay?", a: "That's the most common starting point. Role clarity is part of the work, not a requirement before we begin. In our first sessions, we map your degree, skills, and interests against real roles — Medical Affairs, MSL, Regulatory, Clinical Research, Health-Tech, Consulting. By the end you'll have a clear target and know exactly why it fits you." },
  { q: "Won't I earn less in a corporate role than in practice?", a: "Almost certainly not. An MSL at Novartis India starts at ₹15–20 LPA. A Medical Advisor at Abbott or GSK earns ₹18–25 LPA. A consultant at IQVIA earns ₹12–18 LPA even at junior levels. Compare that to ₹8,000–20,000 a month in most clinical roles and the numbers speak for themselves — often with better hours, no on-calls, and structured career growth." },
  { q: "How quickly can I realistically make the switch?", a: "Most clients get their first corporate interview invitation within 4–6 weeks. A confirmed offer typically comes within 60–90 days of starting the programme. The speed depends on how targeted your approach is — which is exactly what the programme builds." },
  { q: "I'm working full-time in a hospital. Can I still do this?", a: "Yes — all sessions are online, 60–90 minutes, once or twice a week, scheduled around your shifts and OPDs. Most of my clients are working doctors and dentists. You don't need to resign or take leave. You build the exit strategy while you're still employed." },
  { q: "I'm not in Mumbai or Delhi. Does location matter?", a: "Not at all. Everything is done over video call. I've worked with doctors in Tier-2 cities, smaller towns, and even those who are currently abroad and want to return to India in a corporate role. If you have internet and ambition, location is not a barrier." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const bgY = useTransform(smooth, [0, 1], ["-4%", "4%"]);

  return (
    <section id="faq" ref={ref} className="py-28 md:py-40 bg-accent-light overflow-hidden relative">
      <motion.div className="absolute inset-0 opacity-[0.4]" style={{ y: bgY }} aria-hidden>
        <div className="absolute top-1/3 left-0 right-0 h-px bg-ink/5" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-ink/5" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <div className="mb-16 text-center overflow-hidden">
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

        <div className="flex flex-col divide-y divide-ink/10 bg-white border border-ink/8">
          {faqs.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <button
                className="w-full flex items-start justify-between gap-4 px-5 md:px-8 py-6 md:py-7 text-left group"
                onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
              >
                <span className={`font-serif text-xl md:text-2xl font-bold leading-snug transition-colors duration-300 ${open === i ? "text-ink" : "text-ink group-hover:text-muted"}`}>
                  {f.q}
                </span>
                <motion.span
                  className="shrink-0 w-10 h-10 flex items-center justify-center border border-ink/15 text-ink font-bold text-xl group-hover:bg-ink group-hover:text-white transition-all duration-300 mt-0.5"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >+</motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <motion.p
                      className="font-sans text-base text-muted leading-[1.85] px-5 md:px-8 pb-6 md:pb-8 max-w-2xl"
                      initial={{ y: 10 }} animate={{ y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >{f.a}</motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-sans text-sm text-muted mb-6">Still have a question? Bring it to the call.</p>
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative inline-block overflow-hidden bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4"
          >
            <span className="relative z-10">Book Your Free Discovery Call</span>
            <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
