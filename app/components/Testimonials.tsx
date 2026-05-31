"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, VP } from "../lib/animations";

// [REPLACE] Replace with real client quotes
const featured = {
  quote: "I'd been a GP for eight years. I had skills that any commercial organisation would kill for — I just had no idea how to articulate them. In six weeks with Aiswarya, I went from sending applications into a void to having three final-round interviews. I took a role at a leading healthcare consultancy at a salary I wouldn't have believed possible.",
  name: "[Client Name]", from: "General Practitioner", to: "Healthcare Strategy Consultant", company: "[Consulting Firm]",
};

const testimonials = [
  { quote: "The LinkedIn rewrite alone changed everything. I went from zero recruiter approaches in six months to three inbound messages in two weeks. I didn't apply for my current role — a recruiter came to me.", name: "[Client Name]", from: "Dentist", to: "Medical Affairs Manager", company: "[Pharma Company]" },
  { quote: "I was convinced I'd have to take a massive pay cut. My corporate salary is 40% higher than what I was earning in practice. I genuinely wish I'd done this three years earlier.", name: "[Client Name]", from: "Hospital Pharmacist", to: "Operations Director", company: "[Healthcare Group]" },
  { quote: "We did five mock interviews, recorded them all. By the real interview, I felt like I'd already done it before. Got the offer the same day.", name: "[Client Name]", from: "Dental Associate", to: "MedTech Commercial Analyst", company: "[MedTech Company]" },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });

  // Parallax for the featured quote
  const featY = useTransform(smooth, [0, 1], ["-5%", "5%"]);

  return (
    <section id="testimonials" ref={ref} className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <div className="overflow-hidden mb-10">
          <motion.div
            initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            viewport={VP} transition={{ duration: 1, ease: EASE }}
          >
            <p className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4">Results</p>
            <div className="divider mb-7" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] max-w-2xl text-ink">
              They made the leap.{" "}
              <em className="text-muted italic">Here&apos;s what happened.</em>
            </h2>
          </motion.div>
        </div>

        {/* Featured */}
        <motion.div style={{ y: featY }} className="mb-4">
        <motion.div
          className="bg-ink text-white p-6 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.97, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={VP}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <span className="absolute top-4 right-8 font-serif text-[9rem] leading-none text-white/4 select-none pointer-events-none" aria-hidden>&ldquo;</span>
          <div className="relative z-10">
            <div className="overflow-hidden mb-6">
              <motion.blockquote
                className="font-serif text-base md:text-lg lg:text-xl font-semibold italic leading-[1.6] text-white max-w-3xl"
                initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                viewport={VP} transition={{ duration: 1, ease: EASE, delay: 0.1 }}
              >
                &ldquo;{featured.quote}&rdquo;
              </motion.blockquote>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-white/10">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={VP} transition={{ delay: 0.4, duration: 0.8 }}>
                <p className="font-sans text-sm font-semibold text-white">{featured.name}</p>
                <p className="font-sans text-xs text-white/40 mt-1">{featured.company}</p>
              </motion.div>
              <motion.div className="flex items-center gap-3 flex-wrap"
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={VP} transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              >
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-white/40 bg-white/8 px-3 py-1.5">{featured.from}</span>
                <span className="text-white/50 font-bold text-lg">→</span>
                <span className="font-sans text-xs font-semibold tracking-widest uppercase text-white bg-white/15 px-3 py-1.5">{featured.to}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        </motion.div>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-px bg-ink/8 border border-ink/8">
          {testimonials.map((t, i) => (
            <motion.article key={i}
              className="bg-white p-6 md:p-8 flex flex-col gap-4 hover:bg-accent-light transition-colors duration-500 group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <motion.span className="font-serif text-4xl leading-none text-ink/12" aria-hidden
                whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}
              >&ldquo;</motion.span>
              <blockquote className="font-serif text-base font-semibold italic leading-[1.75] text-ink flex-1">{t.quote}</blockquote>
              <footer className="pt-5 border-t border-ink/8">
                <p className="font-sans text-sm font-semibold text-ink">{t.name}</p>
                <p className="font-sans text-xs text-muted mt-0.5">{t.company}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-muted bg-ink/5 px-2 py-1">{t.from}</span>
                  <motion.span className="text-ink/40 font-bold"
                    animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  >→</motion.span>
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase text-ink bg-ink/10 px-2 py-1">{t.to}</span>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
