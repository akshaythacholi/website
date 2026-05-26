"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50,  suffix: "+", label: "Professionals Helped",       sub: "across dentistry, medicine & pharmacy" },
  { value: 94,  suffix: "%", label: "Land a Role Within 90 Days", sub: "of completing the programme" },
  { value: 12,  suffix: "+", label: "Industries Entered",          sub: "pharma, consulting, MedTech, finance & more" },
  { value: 3,   suffix: "×", label: "Average Salary Growth",       sub: "compared to clinical salary on exit" },
];

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
    <span ref={ref} className="font-serif text-5xl md:text-7xl font-extrabold text-ink tabular-nums leading-none">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 md:py-28 bg-accent-light">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted text-center mb-14"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          By The Numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/8">
          {stats.map((s, i) => (
            <motion.div key={i} className="bg-accent-light p-6 md:p-10 flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
