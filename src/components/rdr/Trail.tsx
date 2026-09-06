"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Container, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { trail } from "@/lib/data/trail";

const EASE = [0.16, 1, 0.3, 1] as const;

// The map canvas. Percent coords from the data map onto this box 1:1 in aspect.
const VW = 160;
const VH = 70;
const round3 = (n: number) => Math.round(n * 1000) / 1000;
const toX = (pct: number) => round3((pct / 100) * VW);
const toY = (pct: number) => round3((pct / 100) * VH);

/** Catmull-Rom through the waypoints, converted to cubic Beziers. */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${round3(c1x)} ${round3(c1y)}, ${round3(c2x)} ${round3(c2y)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function Trail() {
  const [active, setActive] = useState(trail.length - 1);
  const stop = trail[active];

  const pts = trail.map((t) => ({ x: toX(t.x), y: toY(t.y) }));
  const route = smoothPath(pts);

  return (
    <Section
      id="trail"
      background="linear-gradient(180deg, #0C0A07 0%, #130E0A 45%, #0C0A07 100%)"
    >
      <Container>
        <SectionHeading
          chapter="V"
          eyebrow="The Trail"
          title="Where the road has taken me"
          lede="Three years, three companies, one degree in progress. Pick a waypoint on the map — the ledger below fills in what happened there."
        />

        {/* ---------------- MAP ---------------- */}
        <Reveal>
          <div
            className="paper relative w-full overflow-hidden"
            style={{ aspectRatio: `${VW} / ${VH}` }}
          >
            <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full">
              <Terrain />

              {/* Route — draws itself as you arrive */}
              <motion.path
                d={route}
                fill="none"
                stroke="#7A2118"
                strokeWidth="0.7"
                strokeDasharray="2 1.6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.85 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 2.6, delay: 0.35, ease: EASE }}
              />

              {/* Compass rose */}
              <Compass x={VW - 15} y={12} />
            </svg>

            {/* Waypoints as HTML so they can hold real type */}
            {trail.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-pressed={on}
                  aria-label={`${t.place} — ${t.role} at ${t.org}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                  <motion.span
                    className="relative flex items-center justify-center"
                    animate={{ scale: on ? 1.25 : 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {/* halo */}
                    {on && (
                      <motion.span
                        className="absolute h-8 w-8 rounded-full"
                        style={{ border: "1px solid #7A2118" }}
                        initial={{ scale: 0.5, opacity: 0.9 }}
                        animate={{ scale: [0.6, 1.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <span
                      className="relative block rounded-full transition-colors duration-300"
                      style={{
                        width: t.kind === "work" ? 13 : 10,
                        height: t.kind === "work" ? 13 : 10,
                        background: on ? "#7A2118" : "#3A2A16",
                        border: `2px solid ${on ? "#F0DFA8" : "#8A6A3A"}`,
                        boxShadow: on ? "0 0 14px rgba(122,33,24,0.7)" : "none",
                      }}
                    />
                  </motion.span>

                  <span
                    className="font-type absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[0.42rem] tracking-[0.14em] transition-opacity duration-300 sm:text-[0.5rem]"
                    style={{ color: on ? "#7A2118" : "#6B4A22", opacity: on ? 1 : 0.7 }}
                  >
                    {t.place.toUpperCase()}
                  </span>
                </button>
              );
            })}

            {/* Map chrome */}
            <span
              className="font-outlaw absolute left-4 top-3 text-[0.7rem] sm:text-sm"
              style={{ color: "#6B4A22", opacity: 0.75 }}
            >
              THE TRAIL WEST
            </span>
            <span
              className="font-type absolute bottom-3 left-4 text-[0.42rem] tracking-[0.26em] sm:text-[0.5rem]"
              style={{ color: "#7A5A2A" }}
            >
              2022 — PRESENT
            </span>
          </div>
        </Reveal>

        {/* ---------------- LEDGER ENTRY ---------------- */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          {/* Chapter list */}
          <ul className="space-y-1">
            {trail.map((t, i) => {
              const on = i === active;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => setActive(i)}
                    className="group relative flex w-full items-start gap-4 border-l-2 py-3.5 pl-5 text-left transition-all duration-300"
                    style={{
                      borderColor: on ? "var(--gold)" : "var(--line-soft)",
                      background: on ? "rgba(216,182,94,0.05)" : "transparent",
                    }}
                  >
                    <span
                      className="font-type w-16 shrink-0 pt-1 text-[0.5rem] tracking-[0.16em]"
                      style={{ color: on ? "var(--blood-hi)" : "var(--brass)" }}
                    >
                      {t.chapter.toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="font-display block text-[1.05rem] leading-tight transition-colors"
                        style={{ color: on ? "var(--gold-hi)" : "var(--parchment)" }}
                      >
                        {t.role}
                      </span>
                      <span
                        className="font-body block text-[0.86rem]"
                        style={{ color: "var(--muted)" }}
                      >
                        {t.org} · {t.period}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail */}
          <div className="min-h-[20rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={stop.id}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="leather corners p-7 sm:p-9"
              >
                <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span
                    className="font-type text-[0.52rem] tracking-[0.34em]"
                    style={{ color: "var(--blood-hi)" }}
                  >
                    {stop.place.toUpperCase()}
                  </span>
                  <span
                    className="font-type text-[0.52rem] tracking-[0.2em]"
                    style={{ color: "var(--brass)" }}
                  >
                    {stop.period}
                  </span>
                </div>

                <h3
                  className="font-display mt-2 text-[clamp(1.4rem,3.4vw,2.1rem)] leading-tight"
                  style={{ color: "var(--parchment)" }}
                >
                  {stop.role}
                </h3>
                <p className="font-body text-[1rem]" style={{ color: "var(--gold)" }}>
                  {stop.org}
                </p>
                {stop.context && (
                  <p
                    className="font-body mt-1 text-[0.88rem] italic"
                    style={{ color: "var(--muted)" }}
                  >
                    {stop.context}
                  </p>
                )}

                <ul className="mt-6 space-y-3.5">
                  {stop.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.45, ease: EASE }}
                    >
                      <span className="mt-1.5 shrink-0" style={{ color: "var(--brass)" }}>
                        ✦
                      </span>
                      <span
                        className="font-body text-pretty text-[0.96rem] leading-relaxed"
                        style={{ color: "rgba(230,215,184,0.75)" }}
                      >
                        {b}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-1.5">
                  {stop.tags.map((t) => (
                    <span
                      key={t}
                      className="font-type border px-2.5 py-1 text-[0.54rem] tracking-[0.1em]"
                      style={{ borderColor: "var(--line-soft)", color: "var(--muted)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   MAP DECORATION
   ============================================================ */
function Terrain() {
  return (
    <g opacity="0.5">
      {/* River */}
      <path
        d="M-2 22 C 18 26, 30 16, 46 20 C 62 24, 70 14, 92 18 C 112 22, 128 12, 164 16"
        fill="none"
        stroke="#5A7A8A"
        strokeWidth="0.9"
        opacity="0.5"
      />
      {/* Mountain range glyphs */}
      {[
        [24, 12],
        [30, 11],
        [36, 12.5],
        [104, 9],
        [110, 8],
        [116, 10],
        [60, 55],
        [66, 56],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M${x - 3} ${y + 3} L${x} ${y - 2.4} L${x + 3} ${y + 3} Z`}
          fill="none"
          stroke="#5A3A18"
          strokeWidth="0.45"
          opacity="0.7"
        />
      ))}
      {/* Trees */}
      {[
        [14, 34],
        [19, 36],
        [40, 52],
        [45, 55],
        [128, 50],
        [134, 52],
        [138, 48],
        [88, 60],
        [94, 62],
      ].map(([x, y], i) => (
        <g key={i} stroke="#4A5A34" strokeWidth="0.4" fill="none" opacity="0.65">
          <path d={`M${x} ${y} L${x} ${y - 2.6}`} />
          <path d={`M${x - 1.4} ${y - 1.6} L${x} ${y - 3.6} L${x + 1.4} ${y - 1.6} Z`} />
        </g>
      ))}
      {/* Grid ticks along the border */}
      {Array.from({ length: 17 }).map((_, i) => (
        <line
          key={i}
          x1={i * 10}
          y1={0}
          x2={i * 10}
          y2={1.4}
          stroke="#8A6A3A"
          strokeWidth="0.25"
          opacity="0.5"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={i * 10}
          x2={1.4}
          y2={i * 10}
          stroke="#8A6A3A"
          strokeWidth="0.25"
          opacity="0.5"
        />
      ))}
    </g>
  );
}

function Compass({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity="0.6">
      <circle r="7" fill="none" stroke="#7A5A2A" strokeWidth="0.4" />
      <circle r="5.2" fill="none" stroke="#7A5A2A" strokeWidth="0.25" />
      <path d="M0 -6.4 L1.7 0 L0 6.4 L-1.7 0 Z" fill="#7A2118" opacity="0.85" />
      <path d="M-6.4 0 L0 -1.4 L6.4 0 L0 1.4 Z" fill="#5A3A18" opacity="0.6" />
      <text
        x="0"
        y="-8.4"
        textAnchor="middle"
        fill="#5A3A18"
        style={{ fontSize: 3, letterSpacing: "0.1em" }}
      >
        N
      </text>
    </g>
  );
}
