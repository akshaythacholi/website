"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { EASE, VP } from "../lib/animations";

const pains = [
  { num: "01", heading: "You've hit an invisible ceiling.", body: "You're good at what you do. Excellent, even. But clinical excellence doesn't translate into advancement anymore — and you can feel the walls closing in." },
  { num: "02", heading: "You're watching others step into rooms you should be in.", body: "You see colleagues move into pharmaceutical companies, consulting firms, corporate strategy roles. You think: I could do that. But you don't know where to start." },
  { num: "03", heading: "Your CV doesn't tell your real story.", body: "Late nights rewriting it. Trying to make clinical experience sound corporate. You know your background is valuable — but not how to speak the language hiring managers respond to." },
  { num: "04", heading: "You're afraid to start over — but more afraid to stay.", body: "Leaving everything you trained for feels like failure. But staying feels like slow erosion. You're caught between the safety of what you know and the pull of what you want." },
];

const SLIDE_DURATION = 4000; // ms each card is shown

const variants = {
  enter: { x: "100%", opacity: 0 },
  center: { x: "0%", opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

export default function PainPoints() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const bgY = useTransform(smooth, [0, 1], ["0%", "6%"]);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % pains.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, advance]);

  const pause  = () => {
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };
  const resume = () => setPaused(false);

  const goTo = (i: number) => {
    setCurrent(i);
    setPaused(false);
  };

  return (
    <section id="pain" ref={sectionRef} data-theme="dark" className="py-28 md:py-40 text-white overflow-hidden relative" style={{ backgroundColor: "#111111" }}>
      <motion.div className="absolute inset-0 opacity-[0.03]" style={{ y: bgY }} aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-white" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <div className="overflow-hidden mb-16 md:mb-20">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-5">Does This Sound Familiar?</p>
            <div className="divider mb-7 bg-white/30" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] text-white max-w-3xl">
              You didn&apos;t spend years studying to feel{" "}
              <em className="text-muted italic">this stuck.</em>
            </h2>
          </motion.div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden border border-white/10 cursor-default"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Watermark number */}
          <AnimatePresence mode="wait">
            <motion.span
              key={`num-${current}`}
              aria-hidden
              className="absolute inset-0 flex items-center justify-center font-serif font-extrabold text-white select-none pointer-events-none"
              style={{ fontSize: "clamp(8rem, 28vw, 22rem)", opacity: 0.03, lineHeight: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {pains[current].num}
            </motion.span>
          </AnimatePresence>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.65, ease: EASE }}
              className="relative z-10 p-10 md:p-16 lg:p-20 min-h-[320px] md:min-h-[360px] flex flex-col justify-center"
            >
              <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-white/25 mb-6">
                {pains[current].num} / 0{pains.length}
              </p>
              <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
                {pains[current].heading}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/50 leading-[1.9] max-w-2xl">
                {pains[current].body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
            <AnimatePresence mode="wait">
              {!paused && (
                <motion.div
                  key={current}
                  className="h-full bg-white/60 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 1, opacity: 0 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Pause hint */}
          {paused && (
            <motion.div
              className="absolute top-4 right-5 flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <span className="w-1 h-3.5 bg-white/30 rounded-sm" />
              <span className="w-1 h-3.5 bg-white/30 rounded-sm" />
            </motion.div>
          )}
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {pains.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-8 flex items-center"
            >
              <motion.span
                className="block rounded-full bg-white transition-all duration-300"
                animate={{
                  width:   current === i ? "2rem" : "0.375rem",
                  height:  "0.375rem",
                  opacity: current === i ? 1 : 0.25,
                }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div className="mt-20 md:mt-24 text-center"
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
