"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { EASE, VP } from "../lib/animations";

const jobs = [
  { title: "Medical Science Liaison",              company: "Novartis India",    location: "New Delhi",          type: "Full-time",   tag: "MSL",               color: "#004FA3" },
  { title: "Regional Medical Advisor – Oncology",  company: "AstraZeneca India", location: "Bengaluru",          type: "Field-based", tag: "Medical Affairs",   color: "#830051" },
  { title: "Medical Advisor",                      company: "Abbott India",      location: "Mumbai",             type: "Hybrid",      tag: "Medical Affairs",   color: "#003087" },
  { title: "Associate Consultant – HEOR",          company: "IQVIA India",       location: "Bengaluru",          type: "Hybrid",      tag: "Consulting",        color: "#CC0000" },
  { title: "Regulatory Affairs Specialist",        company: "Biocon Biologics",  location: "Bengaluru",          type: "Full-time",   tag: "Regulatory",        color: "#006633" },
  { title: "Lead Local Trial Manager",             company: "J&J India",         location: "Mumbai / Hyderabad", type: "Hybrid",      tag: "Clinical Research", color: "#CC0000" },
  { title: "Associate Clinical Specialist",        company: "Medtronic India",   location: "Mumbai",             type: "Field-based", tag: "MedTech",           color: "#00578A" },
  { title: "Regional Medical Advisor – CVRM",      company: "AstraZeneca India", location: "Kolkata",            type: "Field-based", tag: "Medical Affairs",   color: "#830051" },
  { title: "Medical Scientific Liaison",           company: "Novartis India",    location: "Mumbai",             type: "Full-time",   tag: "MSL",               color: "#004FA3" },
  { title: "Key Account Manager – Pharma",         company: "Lupin Ltd",         location: "Pan-India",          type: "Field-based", tag: "Commercial",        color: "#002060" },
  { title: "Regulatory Affairs – Medical Devices", company: "Abbott India",      location: "New Delhi",          type: "Full-time",   tag: "Regulatory",        color: "#003087" },
  { title: "Analyst – Life Sciences Strategy",     company: "IQVIA India",       location: "Gurugram",           type: "Hybrid",      tag: "Strategy",          color: "#CC0000" },
  { title: "Medical Affairs / BD Manager",         company: "Apollo Hospitals",  location: "Bengaluru",          type: "Hybrid",      tag: "Health-Tech",       color: "#003087" },
  { title: "Regulatory Affairs – Entry Level",     company: "Novartis India",    location: "Hyderabad",          type: "Full-time",   tag: "Regulatory",        color: "#004FA3" },
  { title: "Medical Affairs Manager",              company: "GSK India",         location: "Mumbai",             type: "Hybrid",      tag: "Medical Affairs",   color: "#E05206" },
];

const allJobs = [...jobs, ...jobs];

function getInitials(company: string) {
  return company.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function JobCard({ job }: { job: typeof jobs[0] }) {
  return (
    <div className="flex gap-3 px-4 py-3.5 bg-white border-b border-[#e9e5df]">
      <div
        className="w-11 h-11 flex items-center justify-center text-white font-sans text-[0.65rem] font-bold shrink-0"
        style={{ backgroundColor: job.color, borderRadius: 4 }}
      >
        {getInitials(job.company)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-sans text-[0.78rem] font-semibold leading-tight text-[#0a66c2] truncate">{job.title}</h3>
        <p className="font-sans text-[0.68rem] text-[#191919] mt-0.5 truncate">{job.company}</p>
        <p className="font-sans text-[0.65rem] text-[#666666] mt-0.5">{job.location} · {job.type}</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          <span className="font-sans text-xs font-semibold text-green-700">Actively hiring</span>
          <span
            className="font-sans text-[0.65rem] font-semibold ml-auto px-2 py-0.5"
            style={{ background: "#eef3fb", color: "#0a66c2", borderRadius: 3 }}
          >
            {job.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScrollingList() {
  const y       = useMotionValue(0);
  const posRef  = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    if (!listRef.current) return;
    const half = listRef.current.scrollHeight / 2;
    posRef.current -= delta * 0.045;
    if (posRef.current <= -half) posRef.current = 0;
    y.set(posRef.current);
  });

  return (
    <div
      style={{
        height: 380,
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)",
        maskImage:       "linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)",
      }}
    >
      <motion.div ref={listRef} style={{ y }}>
        {allJobs.map((job, i) => <JobCard key={i} job={job} />)}
      </motion.div>
    </div>
  );
}

export default function JobTicker() {
  return (
    <section
      data-theme="dark"
      className="py-16 md:py-24"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: header + CTA */}
          <motion.div
            initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Live Opportunities
            </p>
            <div className="mb-7 w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] text-white mb-6">
              This is what&apos;s waiting{" "}
              <em style={{ color: "rgba(255,255,255,0.4)" }} className="italic">on the other side.</em>
            </h2>
            <p className="font-sans text-xs max-w-xs leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Real roles. Real companies hiring medical professionals in India right now.
            </p>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group relative inline-block overflow-hidden font-sans text-xs font-semibold tracking-widest uppercase px-6 md:px-8 py-4 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor:     "rgba(255,255,255,0.18)",
                color:           "#FFFFFF",
              }}
            >
              <span className="relative z-10">Get Into One of These Roles</span>
              <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              />
            </a>
            <p className="font-sans text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
              Roles sourced from LinkedIn India
            </p>
          </motion.div>

          {/* Right: LinkedIn-style panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={VP} transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                background: "#ffffff",
              }}
            >
              {/* Search bar header */}
              <div style={{ background: "#ffffff", padding: "16px 16px 12px", borderBottom: "1px solid #e9e5df" }}>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "#eef3fb", borderRadius: 4, padding: "8px 12px",
                    marginBottom: 10,
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0a66c2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span className="font-sans text-xs text-[#555]">Medical careers · India</span>
                </div>
                <p className="font-sans text-xs text-[#666]">
                  <span className="font-semibold text-[#191919]">1,247</span> results
                </p>
              </div>

              <ScrollingList />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
