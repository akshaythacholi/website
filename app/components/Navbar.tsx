"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { EASE } from "../lib/animations";

type DropdownContent = { items: { label: string; sub: string }[]; cols?: number };

const dropdowns: Record<string, DropdownContent> = {
  "#story": {
    cols: 3,
    items: [
      { label: "5–6 Years Just to Qualify", sub: "More training than any other profession — while peers were already being promoted." },
      { label: "£32–38k Starting Salary", sub: "After five years of sacrifice. A mid-level marketer earns the same at 24." },
      { label: "68% Experience Burnout", sub: "Within a decade. The ceiling isn't coming — it's already here." },
    ],
  },
  "#services": {
    cols: 2,
    items: [
      { label: "Resume & CV Coaching", sub: "Make hiring managers stop scrolling." },
      { label: "Interview Preparation", sub: "Turn nerves into presence." },
      { label: "Corporate Career Strategy", sub: "A plan you can actually execute." },
      { label: "LinkedIn Optimisation", sub: "From invisible to unmissable." },
    ],
  },
  "#process": {
    cols: 3,
    items: [
      { label: "01 — Apply", sub: "5 minutes. No commitment." },
      { label: "02 — Consult", sub: "30 minutes. Completely free." },
      { label: "03 — Land the Job", sub: "Tailored strategy. Real execution." },
    ],
  },
  "#testimonials": {
    cols: 3,
    items: [
      { label: "50+", sub: "Clients Transformed" },
      { label: "94%", sub: "Secured a role within 90 days" },
      { label: "3×", sub: "Average salary growth" },
    ],
  },
  "#faq": {
    cols: 1,
    items: [
      { label: "Do I need corporate experience?", sub: "No. Companies like Novartis & AstraZeneca actively recruit clinicians." },
      { label: "Won't I earn less in corporate?", sub: "MSL roles start at ₹15–20 LPA. Clinical pays ₹8–20k/month." },
      { label: "I'm working full-time. Can I still do this?", sub: "Yes — all sessions online, around your shifts and OPDs." },
    ],
  },
};

const links = [
  { label: "Reality",  href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "Results",  href: "#testimonials" },
  { label: "FAQ",      href: "#faq" },
];

// Color tokens
const C = {
  ink:          "#1D1D1F",
  white:        "#FFFFFF",
  whiteTrans:   "rgba(255,255,255,0)",
  white95:      "rgba(255,255,255,0.95)",
  inkBorder:    "rgba(29,29,31,0.08)",
  whiteBorder:  "rgba(255,255,255,0.10)",
  muted:        "#6E6E73",
  whiteAlpha50: "rgba(255,255,255,0.50)",
};

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("");
  const [isDark, setIsDark]       = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress }       = useScroll();
  const NAV_H = 70; // approx navbar height in px

  // Pixel-accurate dark section detection — works at any screen size
  useEffect(() => {
    const check = () => {
      const darkEls = document.querySelectorAll<HTMLElement>('[data-theme="dark"]');
      let over = false;
      darkEls.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= NAV_H && bottom > NAV_H) over = true;
      });
      setIsDark(over);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  // Active section for underline indicator
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scroll = useCallback((href: string) => {
    setMenuOpen(false);
    setHovered(null);
    document.body.style.overflow = "";
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const openDropdown = (href: string) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(href);
  };

  const closeDropdown = () => {
    hideTimer.current = setTimeout(() => setHovered(null), 120);
  };

  const cancelClose = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const dropdown = hovered ? dropdowns[hovered] : null;

  // Derived color values for smooth Framer Motion animation
  const bgColor    = isDark ? C.ink   : scrolled ? C.white95    : C.whiteTrans;
  const borderColor = isDark ? C.whiteBorder : scrolled ? C.inkBorder : "rgba(0,0,0,0)";
  const logoColor  = isDark ? C.white : C.ink;
  const barColor   = isDark ? C.white : C.ink;
  const linkActive = isDark ? C.white : C.ink;
  const linkIdle   = isDark ? C.whiteAlpha50 : C.muted;
  const btnBg      = isDark ? C.white : C.ink;
  const btnText    = isDark ? C.ink   : C.white;
  const hamColor   = isDark ? C.white : C.ink;

  const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
        animate={{ backgroundColor: barColor }}
        transition={transition}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ paddingTop: scrolled || isDark ? "0.75rem" : "1.25rem", paddingBottom: scrolled || isDark ? "0.75rem" : "1.25rem" }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1, backgroundColor: bgColor, borderColor }}
        transition={{ duration: 0.7, ease: EASE }}
        onMouseLeave={closeDropdown}
      >
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

            <motion.button
              onClick={() => scroll("#hero")}
              animate={{ color: logoColor }}
              transition={transition}
              className="font-serif text-xl font-extrabold tracking-tight"
            >
              Aiswarya Unni
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <motion.button
                  key={l.href}
                  onClick={() => scroll(l.href)}
                  onMouseEnter={() => openDropdown(l.href)}
                  animate={{ color: active === l.href ? linkActive : linkIdle }}
                  whileHover={{ color: linkActive }}
                  transition={transition}
                  className="relative text-xs font-sans font-semibold tracking-widest uppercase py-1"
                >
                  {l.label}
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      animate={{ backgroundColor: linkActive }}
                      transition={transition}
                    />
                  )}
                </motion.button>
              ))}

              <motion.button
                onClick={() => scroll("#contact")}
                onMouseEnter={() => setHovered(null)}
                animate={{ backgroundColor: btnBg, color: btnText }}
                transition={transition}
                className="relative overflow-hidden font-sans text-xs font-semibold tracking-widest uppercase px-6 py-2.5"
              >
                Book a Call
              </motion.button>
            </nav>

            {/* Mobile hamburger */}
            <button className="md:hidden flex flex-col gap-[5px] p-1 z-[51]" onClick={toggleMenu} aria-label="Toggle menu">
              {([
                menuOpen ? { rotate: 45, y: 6 }   : { rotate: 0, y: 0 },
                menuOpen ? { opacity: 0 }           : { opacity: 1 },
                menuOpen ? { rotate: -45, y: -6 }  : { rotate: 0, y: 0 },
              ] as const).map((anim, idx) => (
                <motion.span
                  key={idx}
                  className="block w-6 h-px"
                  animate={{ ...anim, backgroundColor: hamColor }}
                  transition={{ duration: idx === 1 ? 0.2 : 0.3 }}
                />
              ))}
            </button>
          </div>

        {/* Dropdown panel */}
        <AnimatePresence>
          {hovered && dropdown && (
            <motion.div
              key={hovered}
              className="absolute left-0 right-0 bg-white/98 backdrop-blur-md border-b border-ink/8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              onMouseEnter={cancelClose}
              onMouseLeave={closeDropdown}
            >
              <div className="max-w-6xl mx-auto px-6 py-8">
                <div className={`grid gap-px bg-ink/8 border border-ink/8 ${
                  dropdown.cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
                }`}>
                  {dropdown.items.map((item, i) => (
                    <motion.button
                      key={i}
                      onClick={() => scroll(hovered)}
                      className="bg-white text-left px-6 py-5 hover:bg-accent-light transition-colors duration-200 group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
                    >
                      <p className="font-serif text-base font-bold text-ink leading-snug group-hover:text-muted transition-colors duration-200">{item.label}</p>
                      <p className="font-sans text-xs text-muted mt-1.5 leading-relaxed">{item.sub}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            >
              {links.map((l, i) => (
                <motion.button key={l.href} onClick={() => scroll(l.href)}
                  className="font-serif text-4xl font-extrabold text-ink hover:text-muted transition-colors"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                >{l.label}</motion.button>
              ))}
              <motion.button onClick={() => scroll("#contact")}
                className="mt-4 bg-ink text-white font-sans text-xs font-semibold tracking-widest uppercase px-10 py-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: links.length * 0.07 }}
              >Book Your Free Call</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
