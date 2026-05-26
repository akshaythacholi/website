"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { EASE, VP } from "../lib/animations";

const valueProps = [
  { title: "You'll leave with a plan", body: "Which roles fit your degree. What salary to target. What your CV needs to say. Specific — not generic advice you could Google." },
  { title: "Fully online", body: "All sessions on video call. Whether you're in Mumbai, Bengaluru, Tier-2 city, or abroad — it works." },
  { title: "Only if I can genuinely help", body: "If I don't think I can get you a result, I'll tell you on the call. I've turned clients away. I'll always be honest." },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 18 });
  const formY = useTransform(smooth, [0, 1], ["4%", "-4%"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  };

  const input = "w-full bg-transparent border-0 border-b border-ink/15 px-0 py-3 font-sans text-sm font-light text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-all duration-300 rounded-none";

  return (
    <section id="contact" ref={ref} className="py-28 md:py-40 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div className="mb-16 flex items-center justify-between border-y border-ink/8 py-4 gap-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={VP} transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-sans text-sm text-ink">
            I work with a small group each month so every client gets my full attention — not a template.
          </p>
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted shrink-0">3 spots left · June 2026</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-28 items-start">

          {/* Left */}
          <div className="flex flex-col gap-10">
            <div>
              <motion.p
                className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-muted mb-4"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={VP} transition={{ duration: 0.6 }}
              >Book a Call</motion.p>
              <div className="divider mb-7" />
              <div className="overflow-hidden">
                <motion.h2
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] text-ink"
                  initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                  viewport={VP} transition={{ duration: 1, ease: EASE }}
                >
                  30 minutes. Free. It could be the most useful call{" "}
                  <em className="text-muted italic">you have this year.</em>
                </motion.h2>
              </div>
            </div>

            <motion.p
              className="font-sans text-base text-muted leading-[1.85]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={VP} transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            >
              In 30 minutes I will tell you exactly which corporate roles fit your background, what your CV needs to say, and what your realistic salary target should be. No charge. No pitch. Just clarity — something most doctors spend years trying to find on their own.
            </motion.p>

            <div className="flex flex-col gap-6">
              {valueProps.map((item, i) => (
                <motion.div key={i} className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP} transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: EASE }}
                >
                  <div className="w-px shrink-0 bg-ink/20 mt-1" />
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink mb-1">{item.title}</p>
                    <p className="font-sans text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-6 border-t border-ink/8"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={VP} transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-xs font-sans font-semibold tracking-widest uppercase text-muted mb-3">Or reach me directly</p>
              <a href="mailto:aishuunni@gmail.com" className="font-sans text-base text-ink hover:text-muted transition-colors duration-300">
                aishuunni@gmail.com
              </a>
              <p className="font-sans text-xs text-muted mt-2">I reply personally within 48 hours.</p>
            </motion.div>
          </div>

          {/* Form with subtle parallax */}
          <motion.form onSubmit={handleSubmit}
            className="flex flex-col gap-7 bg-accent-light p-6 md:p-10"
            style={{ y: formY }}
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            noValidate
          >
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }} whileInView={{ y: "0%" }}
                viewport={VP} transition={{ duration: 0.8, ease: EASE }}
              >
                <h3 className="font-serif text-2xl font-extrabold text-ink">Let&apos;s figure out your next move</h3>
                <p className="font-sans text-sm text-muted mt-1">Takes 2 minutes. I read every submission personally.</p>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-sans text-[0.62rem] font-semibold tracking-widest uppercase text-muted">Name *</label>
                <input id="name" name="name" type="text" required placeholder="Jane Smith" className={input} autoComplete="name" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-sans text-[0.62rem] font-semibold tracking-widest uppercase text-muted">Email *</label>
                <input id="email" name="email" type="email" required placeholder="jane@example.com" className={input} autoComplete="email" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="font-sans text-[0.62rem] font-semibold tracking-widest uppercase text-muted">Current / Most Recent Role</label>
              <input id="role" name="role" type="text" placeholder="e.g. General Dentist, Hospital Pharmacist" className={input} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="service" className="font-sans text-[0.62rem] font-semibold tracking-widest uppercase text-muted">What brings you here?</label>
              <select id="service" name="service" className={input + " cursor-pointer"} defaultValue="">
                <option value="" disabled>Select what resonates most</option>
                <option value="resume">My CV isn&apos;t getting traction</option>
                <option value="interview">I&apos;m getting interviews but not offers</option>
                <option value="strategy">I don&apos;t know what role I&apos;m aiming for</option>
                <option value="linkedin">I want recruiters to come to me</option>
                <option value="full">I need help with all of it</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-sans text-[0.62rem] font-semibold tracking-widest uppercase text-muted">Where are you right now, and what do you want?</label>
              <textarea id="message" name="message" rows={4}
                placeholder="I've been in clinical practice for X years and I'm ready to..."
                className={input + " resize-none"}
              />
            </div>

            <motion.button type="submit" disabled={status !== "idle"}
              className="w-full bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase py-4 hover:bg-muted disabled:opacity-60 transition-colors duration-500 relative overflow-hidden group"
              whileHover={status === "idle" ? { scale: 1.01 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10">
                {status === "idle"    && "Book Your Free Discovery Call →"}
                {status === "sending" && "Sending…"}
                {status === "sent"    && "✓ Message received — I'll be in touch within 48 hours"}
              </span>
            </motion.button>

            <p className="font-sans text-xs text-muted text-center">No spam. Unsubscribe any time.</p>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
