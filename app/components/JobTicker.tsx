"use client";

import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE, VP } from "../lib/animations";

const jobs = [
  { title: "Medical Science Liaison",              company: "Novartis India",    location: "New Delhi",          type: "Full-time",   tag: "MSL" },
  { title: "Regional Medical Advisor – Oncology",  company: "AstraZeneca India", location: "Bengaluru",          type: "Field-based", tag: "Medical Affairs" },
  { title: "Medical Advisor",                      company: "Abbott India",      location: "Mumbai",             type: "Hybrid",      tag: "Medical Affairs" },
  { title: "Associate Consultant – HEOR",          company: "IQVIA India",       location: "Bengaluru",          type: "Hybrid",      tag: "Consulting" },
  { title: "Regulatory Affairs Specialist",        company: "Biocon Biologics",  location: "Bengaluru",          type: "Full-time",   tag: "Regulatory" },
  { title: "Lead Local Trial Manager",             company: "J&J India",         location: "Mumbai / Hyderabad", type: "Hybrid",      tag: "Clinical Research" },
  { title: "Associate Clinical Specialist",        company: "Medtronic India",   location: "Mumbai",             type: "Field-based", tag: "MedTech" },
  { title: "Regional Medical Advisor – CVRM",      company: "AstraZeneca India", location: "Kolkata",            type: "Field-based", tag: "Medical Affairs" },
  { title: "Medical Scientific Liaison",           company: "Novartis India",    location: "Mumbai",             type: "Full-time",   tag: "MSL" },
  { title: "Key Account Manager – Pharma",         company: "Lupin Ltd",         location: "Pan-India",          type: "Field-based", tag: "Commercial" },
  { title: "Regulatory Affairs – Medical Devices", company: "Abbott India",      location: "New Delhi",          type: "Full-time",   tag: "Regulatory" },
  { title: "Analyst – Life Sciences Strategy",     company: "IQVIA India",       location: "Gurugram",           type: "Hybrid",      tag: "Strategy" },
  { title: "Medical Affairs / BD Manager",         company: "Apollo Hospitals",  location: "Bengaluru",          type: "Hybrid",      tag: "Health-Tech" },
  { title: "Regulatory Affairs – Entry Level",     company: "Novartis India",    location: "Hyderabad",          type: "Full-time",   tag: "Regulatory" },
  { title: "Medical Affairs Manager",              company: "GSK India",         location: "Mumbai",             type: "Hybrid",      tag: "Medical Affairs" },
];

const SPEED   = 0.45; // cards per second
const VISIBLE = 2;
const TOTAL   = jobs.length;

function CoverCard({ job, index, position }: {
  job: typeof jobs[0];
  index: number;
  position: ReturnType<typeof useMotionValue<number>>;
}) {
  const divRef = useRef<HTMLDivElement>(null);

  // Update zIndex directly on the DOM element — bypasses React state lag
  // so the front card is always correctly on top, even mid-transition
  useEffect(() => {
    return position.on("change", (p) => {
      if (!divRef.current) return;
      const pMod = ((p % TOTAL) + TOTAL) % TOTAL;
      let o = index - pMod;
      o = ((o % TOTAL) + TOTAL) % TOTAL;
      if (o > TOTAL / 2) o -= TOTAL;
      const z = VISIBLE + 1 - Math.min(Math.round(Math.abs(o)), VISIBLE + 1);
      divRef.current.style.zIndex = String(z);
    });
  }, [position]);

  // Continuous signed offset: how far this card is from the current center
  const offset = useTransform(position, (p) => {
    const pMod = ((p % TOTAL) + TOTAL) % TOTAL;
    let o = index - pMod;
    o = ((o % TOTAL) + TOTAL) % TOTAL;
    if (o > TOTAL / 2) o -= TOTAL;
    return o;
  });

  const rotateY    = useTransform(offset, o => o * -44);
  const x          = useTransform(offset, o => o * 270);
  const z          = useTransform(offset, o => -Math.abs(o) * 110);
  const scale      = useTransform(offset, o => Math.max(0, 1 - Math.abs(o) * 0.12));
  const opacity    = useTransform(offset, o => {
    const a = Math.abs(o);
    if (a >= 2.5) return 0;
    if (a >= 2)   return (2.5 - a) * 0.36;
    if (a >= 1)   return 0.18 + (2 - a) * 0.32;
    return 0.5 + (1 - a) * 0.5;
  });

  const f = (base: number, range: number) =>
    useTransform(offset, o => `rgba(255,255,255,${(base + Math.max(0, range * (1 - Math.abs(o)))).toFixed(3)})`);

  const bgColor     = f(0.04, 0.08);
  const borderColor = f(0.07, 0.16);
  const textColor   = f(0.20, 0.80);
  const mutedColor  = f(0.15, 0.55);
  const tagBg       = f(0.05, 0.10);
  const tagColor    = f(0.25, 0.65);
  const divColor    = f(0.06, 0.10);

  return (
    <motion.div
      ref={divRef}
      style={{
        position:             "absolute",
        width:                "clamp(240px, 30vw, 340px)",
        transformStyle:       "preserve-3d",
        rotateY, x, z, scale, opacity,
        backgroundColor:      bgColor,
        borderColor,
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderWidth:          1,
        borderStyle:          "solid",
        boxShadow:            "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
      className="p-6 md:p-8 flex flex-col gap-4 select-none cursor-default"
    >
      <div className="flex items-center justify-between gap-2">
        <motion.span style={{ backgroundColor: tagBg, color: tagColor }}
          className="font-sans text-[0.55rem] font-semibold tracking-widest uppercase px-2.5 py-1">
          {job.tag}
        </motion.span>
        <motion.span style={{ color: mutedColor }}
          className="font-sans text-[0.55rem] font-semibold tracking-widest uppercase">
          {job.type}
        </motion.span>
      </div>

      <motion.p style={{ color: textColor }}
        className="font-serif text-lg md:text-xl font-bold leading-snug">
        {job.title}
      </motion.p>

      <motion.div style={{ borderColor: divColor }}
        className="flex items-center justify-between mt-auto pt-4 border-t">
        <motion.p style={{ color: mutedColor }} className="font-sans text-xs font-semibold">
          {job.company}
        </motion.p>
        <motion.p style={{ color: mutedColor }} className="font-sans text-xs opacity-80">
          {job.location}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function JobTicker() {
  // Monotonically increasing — never resets to 0, so there's no discontinuity at the wrap point
  const position = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    position.set(position.get() + (SPEED * delta) / 1000);
  });

  return (
    <section
      data-theme="dark"
      className="py-20 md:py-28 overflow-hidden relative"
      style={{ backgroundColor: "#111111" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={VP} transition={{ duration: 1, ease: EASE }}
        >
          <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Live Opportunities
          </p>
          <div className="mb-7 w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] max-w-2xl text-white">
              This is what&apos;s waiting{" "}
              <em style={{ color: "rgba(255,255,255,0.4)" }} className="italic">on the other side.</em>
            </h2>
            <p className="font-sans text-xs max-w-xs leading-relaxed shrink-0"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Real roles. Real companies hiring in India right now.
            </p>
          </div>
        </motion.div>
      </div>

      {/* 3D coverflow — continuous motion */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1100px", height: "clamp(270px, 38vw, 370px)" }}
      >
        {jobs.map((job, i) => (
          <CoverCard key={i} job={job} index={i} position={position} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="max-w-6xl mx-auto px-6 mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={VP} transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="font-sans text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Roles sourced from LinkedIn India
        </p>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="group relative inline-block overflow-hidden font-sans text-xs font-semibold tracking-widest uppercase px-8 py-3.5 shrink-0 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            borderColor:     "rgba(255,255,255,0.18)",
            color:           "#FFFFFF",
            backdropFilter:  "blur(12px)",
          }}
        >
          <span className="relative z-10">Get Into One of These Roles</span>
          <span
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
          />
        </a>
      </motion.div>
    </section>
  );
}
