"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { VP } from "../lib/animations";

const stats = [
  { value: 50,  suffix: "+", label: "Professionals Helped",       sub: "across dentistry, medicine & pharmacy" },
  { value: 94,  suffix: "%", label: "Land a Role Within 90 Days", sub: "of completing the programme" },
  { value: 12,  suffix: "+", label: "Industries Entered",          sub: "pharma, consulting, MedTech, finance & more" },
  { value: 3,   suffix: "×", label: "Average Salary Growth",       sub: "compared to clinical salary on exit" },
];

const salaryData = [
  { label: "Clinical Practice",     sub: "Before transition",       range: "₹8–12L",  pct: 37, muted: true  },
  { label: "MSL / Medical Affairs", sub: "After — entry role",      range: "₹15–22L", pct: 69, muted: false },
  { label: "Medical Advisor",       sub: "After — mid-level",       range: "₹18–28L", pct: 88, muted: false },
  { label: "HEOR / Strategy",       sub: "After — consulting track", range: "₹16–24L", pct: 75, muted: false },
];

function SalaryBar({ data, delay }: { data: typeof salaryData[0]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <div className="shrink-0 sm:w-52">
        <p className={`font-sans text-xs font-semibold ${data.muted ? "text-muted" : "text-ink"}`}>{data.label}</p>
        <p className="font-sans text-[0.65rem] text-muted/60 mt-0.5">{data.sub}</p>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-ink/8 overflow-hidden" style={{ borderRadius: 99 }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: data.muted ? "#D1D5DB" : "#1D1D1F", borderRadius: 99 }}
            initial={{ width: "0%" }}
            animate={inView ? { width: `${data.pct}%` } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: delay + 0.15 }}
          />
        </div>
        <span className={`font-sans text-xs font-bold shrink-0 w-20 ${data.muted ? "text-muted" : "text-ink"}`}>
          {data.range}
        </span>
      </div>
    </motion.div>
  );
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-serif text-4xl md:text-7xl font-extrabold text-ink tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-12 md:py-16 bg-accent-light overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
          className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted text-center mb-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          By The Numbers
        </motion.p>

        {/* Salary comparison */}
        <motion.div
          className="bg-white border border-ink/8 p-6 md:p-8 mb-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
            <div>
              <p className="font-sans text-[0.65rem] font-bold tracking-[0.3em] uppercase text-muted mb-1">Salary Comparison</p>
              <p className="font-serif text-lg md:text-xl font-extrabold text-ink">Clinical vs Corporate</p>
            </div>
            <p className="font-sans text-[0.65rem] text-muted/60">Scale: ₹0 — ₹32L per annum</p>
          </div>

          <div className="flex flex-col gap-4">
            <SalaryBar data={salaryData[0]} delay={0} />

            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-ink/10" />
              <span className="font-sans text-[0.65rem] font-bold tracking-widest uppercase text-ink/30 shrink-0">After Transition</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>

            {salaryData.slice(1).map((d, i) => (
              <SalaryBar key={i} data={d} delay={(i + 1) * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Stat boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8">
          {stats.map((s, i) => (
            <motion.div key={i} className="bg-accent-light p-4 md:p-10 flex flex-col gap-2 md:gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <CountUp target={s.value} suffix={s.suffix} />
              <p className="font-serif text-base font-bold text-ink leading-snug mt-1">{s.label}</p>
              <p className="font-sans text-xs text-muted leading-relaxed">{s.sub}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
