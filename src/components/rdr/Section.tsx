"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Inline background override for the section shell. */
  background?: string;
}

export function Section({ id, children, className = "", background }: SectionProps) {
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

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

interface HeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  /** Optional roman-numeral chapter marker. */
  chapter?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  chapter,
}: HeadingProps) {
  const centered = align === "center";
  return (
    <header className={`mb-14 sm:mb-20 ${centered ? "text-center" : ""}`}>
      <Reveal>
        <div
          className={`mb-5 flex items-center gap-4 ${centered ? "justify-center" : ""}`}
        >
          {chapter && (
            <span
              className="font-type text-[0.58rem] tracking-[0.4em]"
              style={{ color: "var(--blood-hi)" }}
            >
              {chapter}
            </span>
          )}
          <span className="eyebrow">{eyebrow}</span>
          <motion.span
            className="block h-px"
            style={{ background: "linear-gradient(90deg, var(--brass), transparent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: centered ? 0 : 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2
          className="font-display text-[clamp(2.1rem,6.5vw,4.75rem)] leading-[0.98] tracking-tight"
          style={{ color: "var(--parchment)" }}
        >
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.16}>
          <p
            className={`font-body mt-6 max-w-2xl text-pretty text-[1.05rem] leading-relaxed ${
              centered ? "mx-auto" : ""
            }`}
            style={{ color: "var(--muted)" }}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </header>
  );
}

/** Counts up to a value once it scrolls into view. */
export function Counter({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  return (
    <motion.span
      className="tabular-nums"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <CountUp to={to} duration={duration} />
      {suffix}
    </motion.span>
  );
}

function CountUp({ to, duration }: { to: number; duration: number }) {
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
          const p = Math.min(1, (t - start) / (duration * 1000));
          // easeOutExpo — fast then settles, like a tally landing
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
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}
