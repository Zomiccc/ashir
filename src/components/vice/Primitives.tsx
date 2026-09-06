"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ============================================================
   LAYOUT
   ============================================================ */
export function Section({
  id,
  children,
  className = "",
  background,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  background?: string;
}) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden py-24 sm:py-32 lg:py-40 ${className}`}
      style={background ? { background } : undefined}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

/* ============================================================
   MOTION
   ============================================================ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/* ============================================================
   HEADINGS
   ============================================================ */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  accent,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  /** Renders the title in the signature gradient. */
  accent?: boolean;
}) {
  return (
    <header className="mb-14 sm:mb-20">
      <Reveal>
        <div className="mb-6 flex items-center gap-4">
          <span
            className="font-mono text-[0.62rem] tabular-nums"
            style={{ color: "var(--hot)" }}
          >
            {index}
          </span>
          <span className="eyebrow">{eyebrow}</span>
          <motion.span
            className="block h-px flex-1 origin-left"
            style={{ background: "var(--grad)" }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.45 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className={`font-display max-w-4xl text-[clamp(2.1rem,6vw,4.4rem)] leading-[0.98] ${
            accent ? "neon-text" : ""
          }`}
          style={accent ? undefined : { color: "var(--fg)" }}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.14}>
          <p
            className="mt-6 max-w-2xl text-pretty text-[1.03rem] leading-relaxed"
            style={{ color: "var(--fg-dim)" }}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </header>
  );
}

/* ============================================================
   BUTTONS
   ============================================================ */
export function ButtonPrimary({
  href,
  children,
  download,
  external,
}: {
  href: string;
  children: string;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
      style={{ background: "var(--grad)" }}
    >
      <span
        className="font-mono relative z-10 text-[0.68rem] font-semibold tracking-[0.14em]"
        style={{ color: "#0a0616" }}
      >
        {children.toUpperCase()}
      </span>
      <span
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: "#0a0616" }}
      >
        →
      </span>
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "rgba(255,255,255,0.16)" }}
        aria-hidden
      />
    </a>
  );
}

export function ButtonGhost({
  href,
  children,
  download,
  external,
}: {
  href: string;
  children: string;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-3 rounded-full border px-7 py-3.5 transition-colors duration-300"
      style={{ borderColor: "var(--line)" }}
    >
      <span
        className="font-mono text-[0.68rem] font-semibold tracking-[0.14em] transition-colors duration-300"
        style={{ color: "var(--fg)" }}
      >
        {children.toUpperCase()}
      </span>
      <span
        className="block h-px w-5 transition-all duration-300 group-hover:w-9"
        style={{ background: "var(--hot)" }}
      />
    </a>
  );
}

/* ============================================================
   COUNTER
   ============================================================ */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1400);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setN(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* ============================================================
   STATUS
   ============================================================ */
export function StatusDot({ status }: { status: string }) {
  const live = status === "Live";
  const wip = status === "In Development";
  const color = live ? "#4ade80" : wip ? "var(--warm)" : "var(--fg-mute)";
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span
        className={`block h-1.5 w-1.5 rounded-full ${live || wip ? "animate-pulse-soft" : ""}`}
        style={{ background: color, boxShadow: live ? `0 0 8px ${color}` : "none" }}
      />
      <span
        className="font-mono text-[0.55rem] tracking-[0.12em]"
        style={{ color: live || wip ? color : "var(--fg-mute)" }}
      >
        {status.toUpperCase()}
      </span>
    </span>
  );
}
