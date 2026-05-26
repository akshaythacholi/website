"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, VP } from "../lib/animations";

const arc = [
  {
    num: "01",
    stat: "5–6 Years",
    label: "Just to qualify",
    body: "MBBS, BDS, or Pharma. More time in classrooms than almost any other graduate — while your peers in finance and tech were already earning and growing.",
  },
  {
    num: "02",
    stat: "₹8,000–20,000",
    label: "Average starting salary (per month)",
    body: "After years of sacrifice, entrance exams, internships, and rotations. A mid-level IT professional at 24 earns more — with far less training.",
  },
  {
    num: "03",
    stat: "Stagnant",
    label: "Salary growth in clinical practice",
    body: "Government hospital pay scales barely move. Private practice earnings plateau quickly. Inflation outpaces increments year after year.",
  },
  {
    num: "04",
    stat: "3× gap",
    label: "Clinical vs corporate pay in pharma",
    body: "A Medical Science Liaison at Novartis India earns ₹18–25 LPA. A doctor in most clinical settings earns a fraction of that — with twice the hours.",
  },
  {
    num: "05",
    stat: "High",
    label: "Burnout among Indian clinicians",
    body: "Understaffed hospitals, relentless patient loads, zero work-life balance. Most doctors see the wall long before they're willing to admit it's there.",
  },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "5%"]);

  return (
    <section id="story" ref={ref} className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="overflow-hidden mb-20">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">The Reality</p>
            <div className="divider mb-7" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] max-w-4xl text-ink">
              Five years of training.{" "}
              <em className="text-muted italic">Here&apos;s what nobody tells you about what comes after.</em>
            </h2>
          </motion.div>
        </div>

        {/* Arc grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-px bg-ink/8 border border-ink/8 mb-20">
          {arc.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 md:p-10 flex flex-col gap-4 group hover:bg-accent-light transition-colors duration-500 relative overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            >
              {/* Watermark number */}
              <span
                aria-hidden
                className="absolute top-2 right-3 font-serif font-extrabold text-ink/[0.04] leading-none select-none pointer-events-none"
                style={{ fontSize: "5rem" }}
              >{item.num}</span>

              {/* Big stat */}
              <div className="overflow-hidden">
                <motion.p
                  className="font-serif text-2xl md:text-3xl font-extrabold text-ink leading-tight"
                  initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                  viewport={VP} transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
                >{item.stat}</motion.p>
              </div>

              <p className="font-sans text-[0.6rem] font-semibold tracking-widest uppercase text-muted">{item.label}</p>
              <div className="w-6 h-px bg-ink/20" />
              <p className="font-sans text-xs text-muted leading-[1.85]">{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Contrast statement */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={VP} transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="overflow-hidden mb-6">
              <motion.h3
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[0.95]"
                initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                viewport={VP} transition={{ duration: 0.9, ease: EASE }}
              >
                Your batchmate who joined a pharma company is now at ₹25 LPA.{" "}
                <em className="text-muted italic">You&apos;re still at ₹6.</em>
              </motion.h3>
            </div>
            <motion.p
              className="font-sans text-base text-muted leading-[1.85]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
            >
              A pharmacist who joined AstraZeneca India at 26 is now a Medical Science Liaison earning ₹22 LPA. A dentist who moved into a MedTech company three years ago just crossed ₹30 LPA in a commercial role. The path exists. Most clinicians just don&apos;t know how to find it — because nobody in their training ever showed them it was there.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={VP} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            {/* Aiswarya's voice */}
            <div className="bg-ink text-white p-8 md:p-10 relative overflow-hidden">
              <span className="absolute top-3 right-5 font-serif text-[6rem] leading-none text-white/5 select-none pointer-events-none" aria-hidden>&ldquo;</span>
              <motion.blockquote
                className="font-serif text-lg md:text-xl font-semibold italic leading-[1.6] text-white relative z-10"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={VP} transition={{ delay: 0.3, duration: 0.8 }}
              >
                &ldquo;I spent six years in dentistry before I realised the ceiling wasn&apos;t a personal failure — it was structural. Your skills are worth far more than the system is paying you for them.&rdquo;
              </motion.blockquote>
              <motion.div
                className="mt-6 pt-5 border-t border-white/10"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={VP} transition={{ delay: 0.45, duration: 0.7 }}
              >
                <p className="font-sans text-sm font-semibold text-white">Aiswarya Unni</p>
                <p className="font-sans text-xs text-white/40 mt-0.5">Dentist → Corporate Consultant</p>
              </motion.div>
            </div>

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-ink font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4 w-full"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={VP} transition={{ delay: 0.5, duration: 0.7 }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Find Out What You&apos;re Worth</span>
              <motion.span
                className="relative z-10 group-hover:text-white transition-colors duration-500"
                animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              >→</motion.span>
              <span className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
