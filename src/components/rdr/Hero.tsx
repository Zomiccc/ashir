"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Dust } from "./Atmosphere";
import { profile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;
const REVEAL = 4.3; // seconds — hero waits for the boot sequence to clear

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Mouse parallax, gently sprung.
  const mx = useSpring(0, { stiffness: 60, damping: 22 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx]);

  // Scroll-driven depth: far layers barely move, near layers race away.
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "42%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "44%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "105%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "160%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const haze = useTransform(scrollYProgress, [0, 1], [0.4, 0.95]);

  // Horizontal pointer drift, strongest on the layers closest to the viewer.
  const sunX = useTransform(mx, (v) => v * -14);
  const farX = useTransform(mx, (v) => v * -8);
  const midX = useTransform(mx, (v) => v * -16);
  const nearX = useTransform(mx, (v) => v * -26);
  const frontX = useTransform(mx, (v) => v * -40);

  return (
    <section
      id="camp"
      ref={ref}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1020 0%, #241A22 38%, #6B3320 66%, #B4581F 84%, #E08B3C 100%)" }}
    >
      {/* ---------- SKY ---------- */}
      <motion.div className="absolute inset-0" style={{ y: skyY }}>
        <Stars />
      </motion.div>

      {/* ---------- SUN ---------- */}
      <motion.div
        className="absolute left-1/2 top-[58%] -translate-x-1/2"
        style={{ y: sunY, x: sunX }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.6, delay: REVEAL - 0.6, ease: EASE }}
        >
          <div
            className="h-[42vmin] w-[42vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #FFE2A8 0%, #FFB25C 34%, #E8722A 58%, rgba(200,80,20,0) 72%)",
              filter: "blur(1px)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 scale-[2.2] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,170,80,0.28), transparent 62%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ---------- BIRDS ---------- */}
      <Birds />

      {/* ---------- FAR RANGE ---------- */}
      <ParallaxLayer y={farY} x={farX} className="bottom-[26%]" delay={REVEAL - 0.4}>
        <Ridge
          d="M0,160 L0,96 L70,60 L118,84 L165,40 L210,72 L268,28 L318,68 L372,44 L430,80 L492,52 L548,86 L610,58 L668,92 L730,64 L800,100 L860,74 L920,102 L980,80 L1040,108 L1100,86 L1160,112 L1220,94 L1280,120 L1440,96 L1440,160 Z"
          fill="#3A2B33"
          opacity={0.75}
        />
      </ParallaxLayer>

      {/* ---------- MESAS ---------- */}
      <ParallaxLayer y={midY} x={midX} className="bottom-[16%]" delay={REVEAL - 0.25}>
        <Ridge
          d="M0,160 L0,120 L90,118 L104,74 L188,70 L200,116 L300,122 L340,96 L392,94 L410,124 L520,128 L556,86 L640,84 L654,126 L790,130 L830,102 L900,100 L916,132 L1030,134 L1070,92 L1150,90 L1166,136 L1300,138 L1340,110 L1420,108 L1440,140 L1440,160 Z"
          fill="#2A1D22"
          opacity={0.92}
        />
      </ParallaxLayer>

      {/* ---------- NEAR RIDGE + RIDER ---------- */}
      <ParallaxLayer y={nearY} x={nearX} className="bottom-0" delay={REVEAL - 0.1}>
        <div className="relative w-full">
          <Ridge
            d="M0,160 L0,116 C120,104 210,124 320,112 C430,100 500,120 610,110 C700,102 760,118 850,108 C960,96 1030,116 1140,106 C1250,96 1340,114 1440,104 L1440,160 Z"
            fill="#150E10"
            opacity={1}
          />
          <Rider />
          <Cactus className="absolute bottom-[31%] left-[9%] h-[11%]" />
          <Cactus className="absolute bottom-[32%] left-[82%] h-[8%]" flip />
          <Cactus className="absolute bottom-[30%] left-[64%] h-[6.5%]" />
        </div>
      </ParallaxLayer>

      {/* ---------- FOREGROUND SCRUB ---------- */}
      <ParallaxLayer y={frontY} x={frontX} className="-bottom-2" delay={REVEAL}>
        <Ridge
          d="M0,160 L0,140 C90,132 160,146 250,140 C340,134 400,148 500,142 C600,136 660,150 760,144 C860,138 930,152 1030,146 C1130,140 1200,152 1300,146 C1370,142 1410,150 1440,146 L1440,160 Z"
          fill="#0A0708"
          opacity={1}
        />
      </ParallaxLayer>

      {/* ---------- ATMOSPHERE ---------- */}
      <Dust density={80} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(102deg, rgba(7,6,4,0.92) 0%, rgba(7,6,4,0.72) 30%, rgba(7,6,4,0.28) 56%, transparent 76%)",
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: haze,
          background:
            "linear-gradient(180deg, rgba(12,10,7,0.55) 0%, transparent 26%, transparent 62%, rgba(12,10,7,0.85) 100%)",
        }}
      />

      {/* ---------- COPY ---------- */}
      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 sm:px-12"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <motion.p
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: REVEAL, ease: EASE }}
        >
          {profile.location} · {profile.timezone}
        </motion.p>

        <motion.h1
          className="font-outlaw max-w-5xl text-[clamp(2.6rem,10vw,8rem)] leading-[0.92] tracking-tight"
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: REVEAL + 0.12, ease: EASE }}
          style={{
            color: "var(--bone)",
            textShadow: "0 8px 40px rgba(0,0,0,0.75), 0 2px 0 rgba(0,0,0,0.6)",
          }}
        >
          ASHIR
          <br />
          <span
            className="gold-text"
            style={{ filter: "drop-shadow(0 6px 24px rgba(0,0,0,0.95))" }}
          >
            QURESHI
          </span>
        </motion.h1>

        <motion.div
          className="mt-7 flex max-w-2xl flex-col gap-5"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: REVEAL + 0.45, ease: EASE }}
        >
          <div className="rule-ornate">
            <RoleTicker />
          </div>

          <p
            className="font-body text-pretty text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed"
            style={{ color: "rgba(230,215,184,0.82)" }}
          >
            I build full-stack products, backend services that hold under load, and
            computer-vision pipelines that run in real time. Three years shipping for
            startups — and still riding.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <CtaPrimary href="#bounties">See the Bounties</CtaPrimary>
            <CtaGhost href="#telegram">Send a Telegram</CtaGhost>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- SCROLL CUE ---------- */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: REVEAL + 1.1 }}
        style={{ opacity: copyOpacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-type text-[0.5rem] tracking-[0.4em]" style={{ color: "var(--brass)" }}>
            RIDE ON
          </span>
          <motion.div
            className="h-10 w-px"
            style={{ background: "linear-gradient(180deg, var(--brass), transparent)" }}
            animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ================= helpers ================= */

function ParallaxLayer({
  children,
  y,
  x,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  y: MotionValue<string>;
  x: MotionValue<number>;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute inset-x-[-6%] ${className}`}
      style={{ y, x }}
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Ridge({ d, fill, opacity }: { d: string; fill: string; opacity: number }) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="block h-[34vh] w-full min-h-[180px]"
      aria-hidden
    >
      <path d={d} fill={fill} opacity={opacity} />
    </svg>
  );
}

/** A lone rider on the ridge line — the silhouette that says RDR2 without a word. */
function Rider() {
  return (
    <motion.svg
      viewBox="0 0 120 80"
      className="absolute bottom-[29%] left-[33%] h-[15%] w-auto"
      aria-hidden
      initial={{ opacity: 0, x: -70 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 3.4, delay: REVEAL + 0.3, ease: EASE }}
    >
      <motion.g
        fill="#080506"
        animate={{ y: [0, -1.1, 0] }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* horse body */}
        <path d="M22 52 C26 42 40 38 54 39 C66 40 74 42 82 40 L88 34 L92 36 L90 43 C88 48 84 52 78 54 L74 68 L69 68 L71 55 L58 56 L54 70 L49 70 L52 55 L40 54 L36 69 L31 69 L34 53 L26 68 L21 68 Z" />
        {/* tail */}
        <path d="M22 44 C16 45 12 50 11 57 C15 53 19 50 23 49 Z" />
        {/* rider */}
        <path d="M52 38 C52 33 55 30 58 30 C61 30 63 32 63 35 L63 39 L67 42 L64 44 L60 42 L55 43 Z" />
        <circle cx="58" cy="26" r="3.4" />
        {/* hat */}
        <path d="M51 24 L65 24 L63 22 L60 21 L56 21 L53 22 Z" />
      </motion.g>
    </motion.svg>
  );
}

function Cactus({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 40 80"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <g fill="#080506">
        <rect x="17" y="18" width="7" height="62" rx="3.5" />
        <path d="M17 40 L9 40 A4 4 0 0 0 5 44 L5 56 A3 3 0 0 0 11 56 L11 46 L17 46 Z" />
        <path d="M24 32 L31 32 A4 4 0 0 1 35 36 L35 50 A3 3 0 0 1 29 50 L29 38 L24 38 Z" />
      </g>
    </svg>
  );
}

function Stars() {
  const pts = Array.from({ length: 46 }, (_, i) => ({
    x: (i * 137.5) % 100,
    y: ((i * 53) % 42) + 1,
    r: ((i * 7) % 10) / 10 + 0.4,
    d: (i * 0.37) % 4,
  }));
  return (
    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden>
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.r * 0.16}
          fill="#F4EBD8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: p.d, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

function Birds() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {[
        { top: "22%", delay: 0, dur: 34, scale: 1 },
        { top: "28%", delay: 6, dur: 42, scale: 0.75 },
        { top: "18%", delay: 14, dur: 38, scale: 0.6 },
      ].map((b, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 40 12"
          className="absolute h-3 w-10"
          style={{ top: b.top, scale: b.scale }}
          initial={{ x: "-12vw" }}
          animate={{ x: "112vw" }}
          transition={{ duration: b.dur, delay: REVEAL + b.delay, repeat: Infinity, ease: "linear" }}
        >
          <motion.g
            stroke="#1A1216"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            animate={{ scaleY: [1, 0.42, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          >
            <path d="M4 8 Q9 2 14 8" />
            <path d="M22 9 Q27 4 32 9" />
          </motion.g>
        </motion.svg>
      ))}
    </div>
  );
}

/** Cycles through the roles like a saloon sign flickering between trades. */
function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-type relative block h-5 min-w-[15rem] overflow-hidden text-[0.68rem] tracking-[0.3em]">
      {profile.roles.map((r, idx) => (
        <motion.span
          key={r}
          className="absolute inset-x-0 whitespace-nowrap text-center"
          style={{ color: "var(--gold)" }}
          initial={false}
          animate={{
            y: idx === i ? 0 : idx < i ? -20 : 20,
            opacity: idx === i ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {r.toUpperCase()}
        </motion.span>
      ))}
    </span>
  );
}

export function CtaPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5"
      style={{
        border: "1px solid var(--gold)",
        background: "linear-gradient(180deg, rgba(216,182,94,0.16), rgba(168,135,60,0.06))",
      }}
    >
      <span
        className="font-type relative z-10 text-[0.66rem] tracking-[0.28em] transition-colors duration-300 group-hover:text-[var(--black)]"
        style={{ color: "var(--gold-hi)" }}
      >
        {String(children).toUpperCase()}
      </span>
      <span
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: "var(--gold-hi)" }}
      >
        →
      </span>
      <span
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ background: "linear-gradient(90deg, var(--gold-hi), var(--gold))" }}
      />
    </a>
  );
}

export function CtaGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 py-3.5">
      <span
        className="font-type text-[0.66rem] tracking-[0.28em]"
        style={{ color: "var(--parchment)" }}
      >
        {String(children).toUpperCase()}
      </span>
      <span
        className="block h-px w-6 origin-left transition-all duration-300 group-hover:w-12"
        style={{ background: "var(--brass)" }}
      />
    </a>
  );
}
