"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { EASE } from "../lib/animations";

const serviceItems = [
  { label: "Resume & CV Coaching",      sub: "Make hiring managers stop scrolling." },
  { label: "Interview Preparation",     sub: "Turn nerves into presence." },
  { label: "Corporate Career Strategy", sub: "A plan you can actually execute." },
  { label: "LinkedIn Optimisation",     sub: "From invisible to unmissable." },
];

const links = [
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process" },
  { label: "Results",  href: "#testimonials" },
  { label: "FAQ",      href: "#faq" },
];

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState("");
  const [isDark, setIsDark]     = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [navHovered, setNavHovered]     = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll();
  const NAV_H = 70;

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
    setShowServices(false);
    document.body.style.overflow = "";
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const open  = () => { if (hideTimer.current) clearTimeout(hideTimer.current); setShowServices(true); };
  const close = () => { hideTimer.current = setTimeout(() => setShowServices(false), 130); };
  const keep  = () => { if (hideTimer.current) clearTimeout(hideTimer.current); };

  const transition  = { duration: 0.45, ease: [0.22, 1, 0.36, 1] } as const;
  const bgColor     = isDark ? C.ink        : scrolled ? C.white95    : C.whiteTrans;
  const borderColor = navHovered ? (isDark ? C.whiteBorder : C.inkBorder) : "rgba(0,0,0,0)";
  const logoColor   = isDark ? C.white : C.ink;
  const barColor    = isDark ? C.white : C.ink;
  const linkActive  = isDark ? C.white : C.ink;
  const linkIdle    = isDark ? C.whiteAlpha50 : C.muted;
  const btnBg       = isDark ? C.white : C.ink;
  const btnText     = isDark ? C.ink   : C.white;
  const hamColor    = isDark ? C.white : C.ink;

  return (
    <>
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
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
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
            {links.map((l) => {
              const isServices = l.href === "#services";
              return (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={isServices ? open : undefined}
                  onMouseLeave={isServices ? close : undefined}
                >
                  <motion.button
                    onClick={() => scroll(l.href)}
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

                  {/* Compact dropdown — Services only */}
                  {isServices && (
                    <AnimatePresence>
                      {showServices && (
                        <motion.div
                          className="absolute top-[calc(100%+16px)] left-0 z-50"
                          style={{ width: 252 }}
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          onMouseEnter={keep}
                          onMouseLeave={close}
                        >
                          {/* Caret */}
                          <div
                            className="absolute -top-[5px] left-5 w-[10px] h-[10px] rotate-45"
                            style={{
                              backgroundColor: "rgba(10,10,10,0.98)",
                              borderLeft:      "1px solid rgba(255,255,255,0.1)",
                              borderTop:       "1px solid rgba(255,255,255,0.1)",
                            }}
                          />
                          {/* Glass panel */}
                          <div
                            className="overflow-hidden"
                            style={{
                              backgroundColor:      "rgba(10,10,10,0.98)",
                              backdropFilter:       "blur(28px)",
                              WebkitBackdropFilter: "blur(28px)",
                              border:               "1px solid rgba(255,255,255,0.1)",
                              boxShadow:            "0 20px 60px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.04)",
                            }}
                          >
                            {serviceItems.map((item, i) => (
                              <motion.button
                                key={i}
                                onClick={() => scroll("#services")}
                                className="w-full text-left px-4 py-3 group"
                                style={{
                                  borderBottom: i < serviceItems.length - 1
                                    ? "1px solid rgba(255,255,255,0.06)"
                                    : "none",
                                }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.2 }}
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                              >
                                <p className="font-sans text-[0.65rem] font-semibold tracking-wide text-white/75 group-hover:text-white transition-colors duration-150 mb-0.5">
                                  {item.label}
                                </p>
                                <p className="font-sans text-[0.65rem] text-white/30 leading-relaxed">
                                  {item.sub}
                                </p>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}

            <motion.button
              onClick={() => scroll("#contact")}
              onMouseEnter={() => setShowServices(false)}
              animate={{ backgroundColor: btnBg, color: btnText }}
              transition={transition}
              className="relative overflow-hidden font-sans text-xs font-semibold tracking-widest uppercase px-6 py-2.5"
            >
              Book a Call
            </motion.button>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-2 z-[51]" onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {([
              menuOpen ? { rotate: 45, y: 6 }  : { rotate: 0, y: 0 },
              menuOpen ? { opacity: 0 }          : { opacity: 1 },
              menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 },
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
              >Book a Call</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
