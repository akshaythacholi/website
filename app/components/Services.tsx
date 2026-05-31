"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { EASE, VP } from "../lib/animations";

const services = [
  {
    num: "01", title: "Resume & CV Coaching", tagline: "Make hiring managers stop scrolling.",
    desc: "Your clinical CV speaks the wrong language. We audit every line and reframe your experience into the wins corporate hiring managers actually look for.",
    includes: ["Full CV & cover letter rewrite", "ATS keyword optimisation", "Role-specific tailoring", "LinkedIn alignment", "Unlimited revisions"],
    outcome: "A CV that gets shortlisted at Novartis, Abbott, and AstraZeneca — not rejected in 10 seconds.",
  },
  {
    num: "02", title: "Interview Preparation", tagline: "Turn nerves into presence.",
    desc: "Competency frameworks, commercial awareness, stakeholder scenarios — all learnable. Live mock interviews, recorded and broken down so you know exactly what's costing you offers.",
    includes: ["Live mock interviews (video recorded)", "Competency & STAR method coaching", "Commercial awareness preparation", "Managing the 'why are you leaving?' question", "Sector-specific panel prep"],
    outcome: "Walk into pharma and MedTech interviews feeling like you've already done them. Get the offer.",
  },
  {
    num: "03", title: "Corporate Career Strategy", tagline: "A plan you can actually execute.",
    desc: "We map your skills to real corporate roles, identify the right companies, and build a 90-day plan so every week has a clear purpose.",
    includes: ["Skills audit & corporate role mapping", "Target company research", "Network-building strategy", "90-day action plan", "Weekly accountability check-ins"],
    outcome: "A 90-day roadmap to your first ₹15–25 LPA corporate offer — with every step mapped out.",
  },
  {
    num: "04", title: "LinkedIn Optimisation", tagline: "From invisible to unmissable.",
    desc: "Recruiters spend under 10 seconds on a profile. We rebuild yours from headline to experience so pharma and MedTech recruiters find you — not the other way around.",
    includes: ["Full profile audit & rewrite", "Headline & About copywriting", "Experience section transformation", "Keyword strategy for recruiter visibility", "Connection growth tactics"],
    outcome: "Pharma and MedTech recruiters find you on LinkedIn — you stop chasing and start choosing.",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div className="mb-10 overflow-hidden"
          initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 1, ease: EASE }}
        >
          <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">What I Offer</p>
          <div className="divider mb-7" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] max-w-2xl text-ink">
              Every service is a bridge.{" "}
              <em className="text-muted italic">Pick where you need to cross.</em>
            </h2>
            <p className="font-sans text-sm text-muted max-w-xs leading-relaxed">
              Click a row to see exactly what&apos;s included.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col divide-y divide-ink/10 border-t border-b border-ink/10">
          {services.map((s, i) => (
            <motion.div key={i}
              className="cursor-pointer group"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center justify-between gap-6 py-8 md:py-10">
                <div className="flex items-center gap-6 md:gap-10 flex-1">
                  <motion.span
                    className="font-sans text-xs font-semibold tracking-widest text-muted shrink-0 tabular-nums"
                    animate={{ color: expanded === i ? "#1D1D1F" : "#6E6E73" }}
                    transition={{ duration: 0.3 }}
                  >{s.num}</motion.span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-4xl font-extrabold text-ink leading-tight group-hover:text-muted transition-colors duration-500">{s.title}</h3>
                    <p className="font-sans text-sm text-muted mt-1">{s.tagline}</p>
                  </div>
                </div>
                <motion.div
                  className="w-11 h-11 border border-ink/15 flex items-center justify-center text-ink/40 group-hover:border-ink group-hover:text-ink shrink-0 transition-all duration-300"
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <span className="text-xl font-light">+</span>
                </motion.div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <div className="pb-10 pl-0 md:pl-14 flex flex-col md:flex-row gap-8 md:gap-10">
                  <div className="flex-1">
                    <p className="font-sans text-base text-muted leading-[1.9] mb-6">{s.desc}</p>
                    <ul className="flex flex-col gap-3">
                      {s.includes.map((item, j) => (
                        <motion.li key={j}
                          className="flex items-center gap-3 font-sans text-sm text-ink"
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: expanded === i ? 1 : 0, x: expanded === i ? 0 : -16 }}
                          transition={{ delay: j * 0.07, duration: 0.5, ease: EASE }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <motion.div className="md:w-64 bg-accent-light p-6 self-start"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: expanded === i ? 1 : 0, scale: expanded === i ? 1 : 0.95 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                  >
                    <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted mb-2">Outcome</p>
                    <p className="font-serif text-base font-bold text-ink leading-snug">{s.outcome}</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-sans text-sm text-muted">Not sure which is right? The discovery call will tell us.</p>
          <a href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative inline-block overflow-hidden bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase px-9 py-4 shrink-0"
          >
            <span className="relative z-10">Book a Discovery Call</span>
            <span className="absolute inset-0 bg-muted translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
