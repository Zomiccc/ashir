"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Motes } from "./Atmosphere";
import { ButtonGhost, ButtonPrimary, EASE } from "./Primitives";
import { profile, marquee } from "@/lib/data/profile";

const REVEAL = 2.5;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const mx = useSpring(0, { stiffness: 55, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e: PointerEvent) => mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx]);

  // Depth: the sun barely moves, the foreground palms race away.
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const skylineY = useTransform(scrollYProgress, [0, 1], ["0%", "44%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const palmY = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "130%"]);
  const copyFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const sunX = useTransform(mx, (v) => v * -10);
  const skylineX = useTransform(mx, (v) => v * -20);
  const palmX = useTransform(mx, (v) => v * -42);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(178deg, #0a0616 0%, #1b0b34 26%, #47135a 48%, #a51c66 68%, #f0446a 84%, #ff8a3d 100%)",
      }}
    >
      {/* ---------- SUN ---------- */}
      <motion.div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 sm:top-[42%]"
        style={{ y: sunY, x: sunX }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.72, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, delay: REVEAL - 0.4, ease: EASE }}
        >
          <div
            className="relative h-[44vmin] w-[44vmin] overflow-hidden rounded-full"
            style={{
              background:
                "linear-gradient(180deg, #fff2b8 0%, #ffd166 22%, #ff9b3d 48%, #ff4d7d 76%, #d6248a 100%)",
            }}
          >
            <div className="sun-bands absolute inset-0" style={{ top: "42%" }} />
          </div>
          <div
            className="absolute inset-0 -z-10 scale-[1.9] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,120,90,0.34), transparent 62%)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* ---------- SKYLINE ---------- */}
      <motion.div
        className="absolute inset-x-[-4%] bottom-[16%] sm:bottom-[27%]"
        style={{ y: skylineY, x: skylineX }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: REVEAL - 0.2, ease: EASE }}
      >
        <Skyline />
      </motion.div>

      {/* ---------- HORIZON GLOW ---------- */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[15.5%] h-px sm:bottom-[26.5%]"
        style={{ background: "rgba(255,220,180,0.85)", boxShadow: "0 0 30px 6px rgba(255,150,110,0.5)" }}
        aria-hidden
      />

      {/* ---------- GRID FLOOR ---------- */}
      <motion.div
        className="absolute inset-x-[-40%] bottom-0 h-[18%] sm:h-[30%]"
        style={{ y: gridY, perspective: "260px", perspectiveOrigin: "50% 0%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: REVEAL, ease: EASE }}
      >
        <div
          className="grid-floor h-full w-full"
          style={{ transform: "rotateX(72deg)", transformOrigin: "50% 0%" }}
        />
      </motion.div>

      {/* ---------- PALMS ---------- */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: palmY, x: palmX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: REVEAL - 0.1, ease: EASE }}
      >
        <Palm className="absolute bottom-[16%] left-[2%] h-[54%] w-auto" />
        <Palm className="absolute bottom-[20%] left-[13%] h-[36%] w-auto opacity-80" flip />
        <Palm className="absolute bottom-[15%] right-[3%] h-[58%] w-auto" flip />
        <Palm className="absolute bottom-[21%] right-[14%] h-[33%] w-auto opacity-75" />
      </motion.div>

      <Motes count={40} />

      {/* ---------- READABILITY SCRIM ---------- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(6,3,13,0.95) 0%, rgba(6,3,13,0.88) 34%, rgba(6,3,13,0.55) 62%, rgba(6,3,13,0.12) 82%, transparent 92%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,3,13,0.9) 0%, rgba(6,3,13,0.82) 46%, rgba(6,3,13,0.5) 70%, rgba(6,3,13,0.2) 86%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, transparent, var(--night))" }}
        aria-hidden
      />

      {/* ---------- COPY ---------- */}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-center px-6 pb-28 pt-28 sm:px-10 lg:px-14"
        style={{ y: copyY, opacity: copyFade }}
      >
        <motion.div
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: REVEAL, ease: EASE }}
        >
          <span
            className="flex h-2 w-2 rounded-full animate-pulse-soft"
            style={{ background: "#4ade80", boxShadow: "0 0 10px #4ade80" }}
          />
          <span
            className="font-mono text-[0.62rem] tracking-[0.24em]"
            style={{ color: "var(--fg-dim)" }}
          >
            OPEN TO {profile.openTo.toUpperCase()}
          </span>
        </motion.div>

        <motion.h1
          className="font-display max-w-5xl text-[clamp(2.9rem,10.5vw,8rem)] font-black leading-[0.88] tracking-[-0.035em]"
          initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: REVEAL + 0.1, ease: EASE }}
          style={{ color: "var(--fg)" }}
        >
          ASHIR
          <br />
          <span className="neon-text glow-hot">QURESHI</span>
        </motion.h1>

        <motion.div
          className="mt-8 max-w-2xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: REVEAL + 0.4, ease: EASE }}
        >
          <div className="mb-5 flex items-center gap-4">
            <span
              className="block h-px w-10 shrink-0"
              style={{ background: "var(--hot)" }}
            />
            <RoleTicker />
          </div>

          <p
            className="text-pretty text-[clamp(1rem,1.45vw,1.18rem)] leading-relaxed"
            style={{ color: "rgba(244,240,255,0.82)" }}
          >
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonPrimary href="#work">View selected work</ButtonPrimary>
            <ButtonGhost href={profile.cv} download>
              Download résumé
            </ButtonGhost>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- TECH MARQUEE ---------- */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 border-t py-3.5"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(6,3,13,0.72)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: REVEAL + 0.7, ease: EASE }}
      >
        <div className="relative flex overflow-hidden">
          <div
            className="flex shrink-0 items-center gap-8 pr-8"
            style={{ animation: "marquee-run 38s linear infinite" }}
          >
            {[...marquee, ...marquee].map((t, i) => (
              <span key={`${t}-${i}`} className="flex shrink-0 items-center gap-8">
                <span
                  className="font-mono whitespace-nowrap text-[0.66rem] tracking-[0.16em]"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {t}
                </span>
                <span
                  className="block h-1 w-1 shrink-0 rounded-full"
                  style={{ background: "var(--hot)" }}
                />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= pieces ================= */

function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2800
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative block h-5 flex-1 overflow-hidden">
      {profile.roles.map((r, idx) => (
        <motion.span
          key={r}
          className="font-mono absolute inset-x-0 whitespace-nowrap text-[0.7rem] tracking-[0.2em]"
          style={{ color: "var(--cool)" }}
          initial={false}
          animate={{ y: idx === i ? 0 : idx < i ? -22 : 22, opacity: idx === i ? 1 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {r.toUpperCase()}
        </motion.span>
      ))}
    </span>
  );
}

/** Miami-ish skyline: towers with lit windows and a couple of antennae. */
function Skyline() {
  const towers = [
    { x: 0, w: 46, h: 74 },
    { x: 50, w: 30, h: 46 },
    { x: 84, w: 38, h: 96 },
    { x: 126, w: 26, h: 58 },
    { x: 156, w: 52, h: 118 },
    { x: 212, w: 32, h: 70 },
    { x: 248, w: 44, h: 90 },
    { x: 296, w: 28, h: 52 },
    { x: 328, w: 50, h: 108 },
    { x: 382, w: 34, h: 64 },
    { x: 420, w: 42, h: 84 },
    { x: 466, w: 30, h: 50 },
    { x: 500, w: 48, h: 100 },
    { x: 552, w: 26, h: 60 },
    { x: 582, w: 40, h: 78 },
    { x: 626, w: 34, h: 54 },
    { x: 664, w: 46, h: 92 },
    { x: 714, w: 28, h: 46 },
  ];

  return (
    <svg
      viewBox="0 0 742 130"
      preserveAspectRatio="none"
      className="block h-[26vh] min-h-[130px] w-full"
      aria-hidden
    >
      <g fill="#120524">
        {towers.map((t, i) => (
          <rect key={i} x={t.x} y={130 - t.h} width={t.w} height={t.h} />
        ))}
      </g>
      {/* antennae */}
      <g stroke="#120524" strokeWidth="2">
        <path d="M182 12v-9M353 22v-8M524 30v-7" />
      </g>
      {/* lit windows */}
      <g fill="#ff9b3d" opacity="0.5">
        {towers.flatMap((t, ti) => {
          const cells: React.ReactElement[] = [];
          for (let r = 0; r < Math.floor(t.h / 13); r++) {
            for (let c = 0; c < Math.floor(t.w / 13); c++) {
              if ((ti * 7 + r * 3 + c * 5) % 4 !== 0) continue;
              cells.push(
                <rect
                  key={`${ti}-${r}-${c}`}
                  x={t.x + 5 + c * 13}
                  y={130 - t.h + 7 + r * 13}
                  width={4}
                  height={5}
                />
              );
            }
          }
          return cells;
        })}
      </g>
    </svg>
  );
}

function Palm({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 240"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <g fill="#0d0418">
        {/* trunk, leaning slightly */}
        <path d="M56 240 C 54 190, 52 140, 58 96 L 68 96 C 63 140, 64 190, 66 240 Z" />
        {/* fronds */}
        <path d="M62 92 C 40 78, 18 74, 2 84 C 20 78, 40 82, 58 96 Z" />
        <path d="M62 92 C 44 66, 22 54, 4 56 C 24 60, 44 74, 60 94 Z" />
        <path d="M62 92 C 56 62, 44 38, 26 28 C 44 44, 54 66, 60 92 Z" />
        <path d="M64 92 C 70 62, 84 40, 104 32 C 84 48, 72 68, 66 92 Z" />
        <path d="M64 92 C 82 70, 104 60, 118 64 C 100 66, 80 78, 66 94 Z" />
        <path d="M64 94 C 84 88, 104 92, 116 102 C 100 96, 80 96, 66 100 Z" />
        {/* coconuts */}
        <circle cx="60" cy="97" r="4" />
        <circle cx="68" cy="99" r="3.4" />
      </g>
    </svg>
  );
}
