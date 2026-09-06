"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { DeadEyeToggle } from "./DeadEye";
import { profile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

export const SECTIONS = [
  { id: "camp", label: "Camp", sub: "The beginning" },
  { id: "wanted", label: "Wanted", sub: "Who I am" },
  { id: "arsenal", label: "Arsenal", sub: "What I carry" },
  { id: "bounties", label: "Bounties", sub: "The work" },
  { id: "trail", label: "The Trail", sub: "Where I have been" },
  { id: "ledger", label: "Ledger", sub: "Hire me for" },
  { id: "telegram", label: "Telegram", sub: "Send word" },
] as const;

export function Hud() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string>("camp");
  const [atFoot, setAtFoot] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is centred — drives the honor label and menu highlight.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-25% 0px -35% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // The honor meter steps aside once the footer arrives, so it never sits on top of it.
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
    // Wait for the overlay to release scroll lock before jumping.
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  };

  return (
    <>
      {/* ---------- Top bar ---------- */}
      <motion.header
        className="fixed inset-x-0 top-0 z-[86] transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(180deg, rgba(7,6,4,0.94), rgba(7,6,4,0.55) 70%, transparent)"
            : "linear-gradient(180deg, rgba(7,6,4,0.55), transparent)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 4.2, ease: EASE }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#camp"
            onClick={(e) => {
              e.preventDefault();
              go("camp");
            }}
            className="group flex items-center gap-3"
          >
            <Emblem />
            <span className="hidden sm:block">
              <span
                className="font-display block text-sm tracking-[0.28em]"
                style={{ color: "var(--parchment)" }}
              >
                ASHIR QURESHI
              </span>
              <span
                className="font-type block text-[0.55rem] tracking-[0.3em]"
                style={{ color: "var(--brass)" }}
              >
                {profile.role.toUpperCase()}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <DeadEyeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-3"
            >
              <span
                className="font-type hidden text-[0.6rem] tracking-[0.34em] transition-colors sm:block"
                style={{ color: open ? "var(--gold-hi)" : "var(--brass)" }}
              >
                {open ? "CLOSE" : "MENU"}
              </span>
              <span className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]">
                <motion.span
                  className="block h-px w-6"
                  style={{ background: "var(--gold)" }}
                  animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.span
                  className="block h-px w-6"
                  style={{ background: "var(--gold)" }}
                  animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Hairline that fills as you ride through the page */}
        <div className="relative h-px w-full" style={{ background: "rgba(168,135,60,0.14)" }}>
          <motion.div
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              scaleX: progress,
              width: "100%",
              background: "linear-gradient(90deg, var(--brass), var(--gold-hi))",
            }}
          />
        </div>
      </motion.header>

      {/* ---------- Honor meter ---------- */}
      <motion.div
        className="pointer-events-none fixed bottom-5 left-5 z-[80] hidden select-none md:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: atFoot ? 0 : 1, x: atFoot ? -30 : 0 }}
        transition={{ duration: atFoot ? 0.5 : 1, delay: atFoot ? 0 : 4.6, ease: EASE }}
      >
        <div className="mb-2 flex items-baseline gap-3">
          <span className="font-type text-[0.55rem] tracking-[0.36em]" style={{ color: "var(--brass)" }}>
            HONOR
          </span>
          <span className="font-type text-[0.55rem] tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            {SECTIONS.find((s) => s.id === current)?.label ?? "Camp"}
          </span>
        </div>
        <div
          className="relative h-[6px] w-44 overflow-hidden rounded-sm border"
          style={{ borderColor: "rgba(168,135,60,0.3)", background: "rgba(0,0,0,0.55)" }}
        >
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: progress,
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(142,27,18,0.9), var(--brass) 55%, var(--gold-hi))",
            }}
          />
          {/* Notches, like the in-game meter */}
          {[25, 50, 75].map((n) => (
            <span
              key={n}
              className="absolute top-0 h-full w-px"
              style={{ left: `${n}%`, background: "rgba(7,6,4,0.75)" }}
            />
          ))}
        </div>
      </motion.div>

      {/* ---------- Full-screen journal index ---------- */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            className="fixed inset-0 z-[84] flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 70% 40%, rgba(28,22,14,0.98), rgba(7,6,4,0.99))",
                backdropFilter: "blur(14px)",
              }}
              initial={{ clipPath: "circle(0% at 92% 6%)" }}
              animate={{ clipPath: "circle(150% at 92% 6%)" }}
              exit={{ clipPath: "circle(0% at 92% 6%)" }}
              transition={{ duration: 0.75, ease: EASE }}
              onClick={() => setOpen(false)}
            />

            <div className="relative mx-auto w-full max-w-[1400px] px-6 sm:px-12">
              <motion.p
                className="eyebrow mb-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Index
              </motion.p>

              <ul className="space-y-1">
                {SECTIONS.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.28 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <button
                      onClick={() => go(s.id)}
                      className="group flex w-full items-baseline gap-5 py-2 text-left"
                    >
                      <span
                        className="font-type w-8 shrink-0 text-[0.6rem]"
                        style={{ color: "var(--brass)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display text-[clamp(1.9rem,6vw,4rem)] leading-[1.1] transition-all duration-300 group-hover:translate-x-3"
                        style={{
                          color: current === s.id ? "var(--gold-hi)" : "var(--parchment)",
                          WebkitTextStroke: current === s.id ? "0" : undefined,
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="font-body hidden text-sm italic opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
                        style={{ color: "var(--muted)" }}
                      >
                        — {s.sub}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                {[
                  { label: "GitHub", href: profile.links.github },
                  { label: "LinkedIn", href: profile.links.linkedin },
                  { label: "Email", href: profile.links.email },
                  { label: "WhatsApp", href: profile.links.whatsapp },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-type text-[0.62rem] tracking-[0.3em] transition-colors hover:text-[var(--gold-hi)]"
                    style={{ color: "var(--brass)" }}
                  >
                    {l.label.toUpperCase()} ↗
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

/** Small engraved emblem — a rose over crossed rules. */
function Emblem() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
      <circle cx="20" cy="20" r="18" fill="none" stroke="var(--brass)" strokeWidth="0.8" opacity="0.7" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.4" />
      <path
        d="M20 9 L23.4 16.6 L31.5 17.5 L25.5 23 L27.2 31 L20 27 L12.8 31 L14.5 23 L8.5 17.5 L16.6 16.6 Z"
        fill="var(--gold)"
        opacity="0.85"
      />
      <circle cx="20" cy="21" r="2.6" fill="var(--black)" />
    </svg>
  );
}
