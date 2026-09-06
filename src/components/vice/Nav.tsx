"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { RadioTuner } from "./Grade";
import { EASE } from "./Primitives";
import { profile } from "@/lib/data/profile";

export const SECTIONS = [
  { id: "top", label: "Home", sub: "Start here" },
  { id: "about", label: "About", sub: "Who I am" },
  { id: "work", label: "Work", sub: "Selected projects" },
  { id: "skills", label: "Skills", sub: "The stack" },
  { id: "experience", label: "Experience", sub: "Where I've worked" },
  { id: "services", label: "Services", sub: "What I take on" },
  { id: "contact", label: "Contact", sub: "Get in touch" },
] as const;

const REVEAL = 2.5;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string>("top");
  const [atFoot, setAtFoot] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setCurrent(seen.target.id);
      },
      { threshold: [0.2, 0.5], rootMargin: "-20% 0px -40% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // The progress HUD gets out of the way once the footer arrives.
  useEffect(() => {
    const foot = document.querySelector("footer");
    if (!foot) return;
    const io = new IntersectionObserver(([e]) => setAtFoot(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(foot);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 240);
  };

  return (
    <>
      {/* ---------------- TOP BAR ---------------- */}
      <motion.header
        className="fixed inset-x-0 top-0 z-[86]"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(6,3,13,0.92), rgba(6,3,13,0.55) 72%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: REVEAL, ease: EASE }}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="group flex items-center gap-3"
          >
            <Mark />
            <span className="hidden sm:block">
              <span className="font-display block text-[0.9rem] font-bold leading-tight">
                Ashir Qureshi
              </span>
              <span
                className="font-mono block text-[0.55rem] tracking-[0.18em]"
                style={{ color: "var(--fg-mute)" }}
              >
                SOFTWARE ENGINEER
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {SECTIONS.slice(1).map((s) => {
              const on = current === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className="relative rounded-full px-3.5 py-2 transition-colors duration-300"
                >
                  {on && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--hot) 15%, transparent)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className="font-mono relative text-[0.63rem] tracking-[0.12em]"
                    style={{ color: on ? "var(--fg)" : "var(--fg-mute)" }}
                  >
                    {s.label.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <RadioTuner />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <motion.span
                className="block h-[1.5px] w-6 rounded-full"
                style={{ background: "var(--fg)" }}
                animate={{ rotate: open ? 45 : 0, y: open ? 3.25 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-6 rounded-full"
                style={{ background: "var(--fg)" }}
                animate={{ rotate: open ? -45 : 0, y: open ? -3.25 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>

        <div className="relative h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="absolute inset-y-0 left-0 w-full origin-left"
            style={{ scaleX: progress, background: "var(--grad)" }}
          />
        </div>
      </motion.header>

      {/* ---------------- PROGRESS HUD ---------------- */}
      <motion.div
        className="pointer-events-none fixed bottom-5 left-5 z-[80] hidden select-none md:block"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: atFoot ? 0 : 1, x: atFoot ? -24 : 0 }}
        transition={{ duration: atFoot ? 0.4 : 0.8, delay: atFoot ? 0 : REVEAL + 0.3, ease: EASE }}
      >
        <div className="mb-2 flex items-baseline gap-3">
          <span
            className="font-mono text-[0.55rem] tracking-[0.22em]"
            style={{ color: "var(--hot)" }}
          >
            {(SECTIONS.find((s) => s.id === current)?.label ?? "Home").toUpperCase()}
          </span>
        </div>
        <div
          className="relative h-[3px] w-40 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="h-full w-full origin-left"
            style={{ scaleX: progress, background: "var(--grad)" }}
          />
        </div>
      </motion.div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[84] flex flex-col justify-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 80% 10%, var(--deep), var(--void) 70%)",
                backdropFilter: "blur(16px)",
              }}
              initial={{ clipPath: "circle(0% at 92% 5%)" }}
              animate={{ clipPath: "circle(150% at 92% 5%)" }}
              exit={{ clipPath: "circle(0% at 92% 5%)" }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={() => setOpen(false)}
            />

            <div className="relative px-8">
              <ul className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: 0.22 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <button
                      onClick={() => go(s.id)}
                      className="group flex w-full items-baseline gap-4 py-2 text-left"
                    >
                      <span
                        className="font-mono w-7 shrink-0 text-[0.6rem]"
                        style={{ color: "var(--hot)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-[clamp(1.9rem,9vw,3rem)] leading-tight transition-transform duration-300 group-hover:translate-x-2 ${
                          current === s.id ? "neon-text" : ""
                        }`}
                        style={current === s.id ? undefined : { color: "var(--fg)" }}
                      >
                        {s.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { label: "GitHub", href: profile.links.github },
                  { label: "LinkedIn", href: profile.links.linkedin },
                  { label: "Email", href: profile.links.email },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[0.62rem] tracking-[0.18em]"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    {l.label.toUpperCase()} ↗
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Monogram — an A/Q lockup in the signature gradient. */
function Mark() {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
      style={{ background: "var(--grad)" }}
      aria-hidden
    >
      <span
        className="font-display text-[0.85rem] font-black leading-none"
        style={{ color: "#0a0616" }}
      >
        AQ
      </span>
    </span>
  );
}
