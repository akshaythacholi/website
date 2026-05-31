"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { EASE, VP } from "../lib/animations";

const questions = [
  {
    q: "Do you have a CV tailored for corporate roles?",
    hint: "Not just a clinical CV — one that speaks to business impact, not patient outcomes.",
  },
  {
    q: "Do you know exactly which corporate role fits your background?",
    hint: "A specific target — MSL, Medical Affairs, HEOR, Regulatory — not just 'something in pharma'.",
  },
  {
    q: "Have you spoken to a pharma or MedTech recruiter in the last 6 months?",
    hint: "A real conversation about your transition — not just a LinkedIn connection request.",
  },
  {
    q: "Can you confidently answer 'Why are you leaving clinical practice?'",
    hint: "A rehearsed, compelling answer — not one you're figuring out in the room.",
  },
];

const results = [
  {
    score: 1,
    label: "Just Starting Out",
    color: "#EF4444",
    pct: 10,
    message: "You're at the very beginning — the most common place to start. But without foundations, applications disappear into a void. Every month you wait is another month at your current salary.",
    action: "CV rewrite, role clarity, recruiter access, and interview prep — all need to be built from scratch.",
  },
  {
    score: 3,
    label: "Some Groundwork Done",
    color: "#F97316",
    pct: 30,
    message: "You've thought about it, but the gaps are creating silent blockers. Most rejections happen before you ever reach interview stage — and they're entirely preventable.",
    action: "The missing pieces are costing you applications you don't even know you're losing.",
  },
  {
    score: 5,
    label: "Halfway There",
    color: "#EAB308",
    pct: 50,
    message: "You have a foundation but the pieces aren't connected into a strategy. Recruiters sense this. A targeted approach would close the gap much faster than you expect.",
    action: "You're losing offers to candidates with the same background but sharper positioning.",
  },
  {
    score: 7,
    label: "Almost Ready",
    color: "#84CC16",
    pct: 70,
    message: "You're closer than most people who come to me. One or two targeted fixes could get you in front of hiring managers within weeks.",
    action: "Small gaps at this stage are the only thing between shortlisted and an offer letter.",
  },
  {
    score: 9,
    label: "Ready to Move",
    color: "#22C55E",
    pct: 90,
    message: "You have everything in place. What you need now is the right strategy and someone to open the right doors at the right companies.",
    action: "Direction and access are all that separate you from your first offer.",
  },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

export default function ReadinessQuiz() {
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState<boolean[]>([]);
  const [done,     setDone]     = useState(false);
  const [direction, setDir]     = useState(1);

  const yesCount = answers.filter(Boolean).length;
  const result   = results[yesCount];

  const answer = (yes: boolean) => {
    const next = [...answers, yes];
    setAnswers(next);
    setDir(1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const retake = () => {
    setCurrent(0);
    setAnswers([]);
    setDone(false);
    setDir(-1);
  };

  return (
    <section
      data-theme="dark"
      className="py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={VP} transition={{ duration: 1, ease: EASE }}
        >
          <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Transition Readiness
          </p>
          <div className="mb-7 w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white max-w-2xl">
              Find out where{" "}
              <em style={{ color: "rgba(255,255,255,0.4)" }} className="italic">you actually stand.</em>
            </h2>
            <p className="font-sans text-xs max-w-xs leading-relaxed shrink-0"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              4 questions. 60 seconds. Honest answer.
            </p>
          </div>
        </motion.div>

        {/* Quiz card */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          <div className="bg-white overflow-hidden" style={{ borderRadius: 4, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>

            {/* Progress bar */}
            {!done && (
              <div className="h-1 w-full bg-ink/8">
                <motion.div
                  className="h-full bg-ink"
                  animate={{ width: `${((current) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {!done ? (
                /* Question */
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: EASE }}
                  className="px-7 md:px-10 pt-8 pb-10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase text-ink/30">
                      Question {current + 1} of {questions.length}
                    </span>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <span
                          key={i}
                          className="w-5 h-1 transition-colors duration-300"
                          style={{
                            background: i < current ? "#1D1D1F" : i === current ? "#1D1D1F" : "#e5e7eb",
                            opacity: i === current ? 1 : i < current ? 0.4 : 1,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl font-bold text-ink leading-snug mb-3">
                    {questions[current].q}
                  </h3>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-10">
                    {questions[current].hint}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => answer(false)}
                      className="group relative overflow-hidden border border-ink/15 py-4 font-sans text-xs font-bold tracking-widest uppercase text-ink/50 hover:text-ink hover:border-ink transition-all duration-300"
                    >
                      No
                    </button>
                    <button
                      onClick={() => answer(true)}
                      className="group relative overflow-hidden bg-ink py-4 font-sans text-xs font-bold tracking-widest uppercase text-white transition-all duration-300 hover:bg-muted"
                    >
                      Yes
                    </button>
                  </div>
                </motion.div>

              ) : (
                /* Result */
                <motion.div
                  key="result"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: EASE }}
                  className="px-7 md:px-10 pt-8 pb-10"
                >
                  <p className="font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase text-ink/30 mb-6">
                    Your Readiness Score
                  </p>

                  {/* Score */}
                  <div className="flex items-end flex-wrap gap-3 mb-4">
                    <motion.span
                      className="font-serif font-extrabold leading-none"
                      style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)", color: result.color }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                    >
                      {result.score}
                    </motion.span>
                    <span className="font-serif text-2xl font-extrabold text-ink/20 mb-2">/ 10</span>
                    <span
                      className="font-sans text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 mb-2"
                      style={{ background: result.color + "18", color: result.color, borderRadius: 2 }}
                    >
                      {result.label}
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="h-1.5 w-full bg-ink/8 mb-8" style={{ borderRadius: 99 }}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: result.color, borderRadius: 99 }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${result.pct}%` }}
                      transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <motion.p
                    className="font-sans text-sm text-muted leading-[1.85] mb-4"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    {result.message}
                  </motion.p>

                  <motion.p
                    className="font-serif text-base font-bold text-ink leading-snug mb-8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                  >
                    {result.action}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                  >
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                      className="group relative flex-1 overflow-hidden bg-ink text-white font-sans text-xs font-bold tracking-widest uppercase py-4 text-center"
                    >
                      <span className="relative z-10">Book a Discovery Call</span>
                      <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </a>
                    <button
                      onClick={retake}
                      className="flex-1 border border-ink/15 font-sans text-xs font-bold tracking-widest uppercase py-4 text-ink/40 hover:text-ink hover:border-ink transition-all duration-300"
                    >
                      Retake Quiz
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
