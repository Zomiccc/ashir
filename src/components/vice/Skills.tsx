"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, EASE, Reveal, Section, SectionHeading } from "./Primitives";
import { skillSegments } from "@/lib/data/skills";

const SIZE = 440;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUT = 200;
const R_IN = 94;
const GAP = 2.4;

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Point on the wheel, 0° at twelve o'clock. */
function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [round(CX + r * Math.cos(rad)), round(CY + r * Math.sin(rad))] as const;
}

function segmentPath(start: number, end: number) {
  const s = start + GAP;
  const e = end - GAP;
  const [x1, y1] = polar(R_OUT, s);
  const [x2, y2] = polar(R_OUT, e);
  const [x3, y3] = polar(R_IN, e);
  const [x4, y4] = polar(R_IN, s);
  return `M ${x1} ${y1} A ${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
}

export function Skills() {
  const [active, setActive] = useState(0);
  const step = 360 / skillSegments.length;
  const seg = skillSegments[active];

  return (
    <Section id="skills" background="linear-gradient(180deg, var(--night), var(--deep) 55%, var(--night))">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="The Stack"
          title={
            <>
              Six areas.
              <br />
              <span className="neon-text">One toolkit.</span>
            </>
          }
          lede="Hover or tab a segment to open it. The lead tool in the centre is what I reach for first in that area."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20">
          {/* ---------------- WHEEL ---------------- */}
          <Reveal className="mx-auto w-full max-w-[440px]">
            <motion.div
              className="relative aspect-square w-full"
              initial={{ opacity: 0, scale: 0.88, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <div
                className="pointer-events-none absolute inset-8 rounded-full"
                style={{ background: "var(--grad)", filter: "blur(70px)", opacity: 0.18 }}
              />

              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
                <defs>
                  <linearGradient id="segOn" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--hot)" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="var(--warm)" stopOpacity="0.7" />
                  </linearGradient>
                  <filter id="segGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle
                  cx={CX}
                  cy={CY}
                  r={R_OUT + 13}
                  fill="none"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_OUT + 21}
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />

                <circle
                  cx={CX}
                  cy={CY}
                  r={R_IN - 8}
                  fill="var(--void)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />

                {skillSegments.map((s, i) => {
                  const start = i * step;
                  const mid = start + step / 2;
                  const on = i === active;
                  // Anchor both at the segment's mid-radius, then stack the icon
                  // above the label. Offsetting along the spoke instead would
                  // push the 3- and 9-o'clock labels into the hub.
                  const [ax, ay] = polar((R_IN + R_OUT) / 2, mid);
                  const ix = ax;
                  const iy = ay - 15;
                  const lx = ax;
                  const ly = ay + 14;

                  return (
                    <g
                      key={s.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${s.label} — ${s.skills.length} skills`}
                      aria-pressed={on}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                      style={{ cursor: "none", outline: "none" }}
                    >
                      <motion.path
                        d={segmentPath(start, start + step)}
                        fill={on ? "url(#segOn)" : "rgba(255,255,255,0.035)"}
                        stroke={on ? "var(--hot)" : "rgba(255,255,255,0.12)"}
                        strokeWidth={on ? 1.4 : 0.8}
                        animate={{ scale: on ? 1.04 : 1, opacity: on ? 1 : 0.85 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{
                          transformOrigin: `${CX}px ${CY}px`,
                          filter: on ? "url(#segGlow)" : undefined,
                        }}
                      />
                      <SegIcon id={s.id} x={ix} y={iy} on={on} />
                      <text
                        x={lx}
                        y={ly + 4}
                        textAnchor="middle"
                        className="font-mono"
                        style={{ fontSize: 10.5, letterSpacing: "0.1em" }}
                        fill={on ? "#0a0616" : "rgba(244,240,255,0.5)"}
                        fontWeight={on ? 700 : 400}
                      >
                        {s.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={seg.id}
                    className="px-6 text-center"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.06 }}
                    transition={{ duration: 0.26, ease: EASE }}
                  >
                    <p
                      className="font-mono text-[0.5rem] tracking-[0.24em]"
                      style={{ color: "var(--hot)" }}
                    >
                      {seg.role.toUpperCase()}
                    </p>
                    <p
                      className="font-display mt-1.5 text-lg font-bold leading-tight"
                      style={{ color: "var(--fg)" }}
                    >
                      {seg.lead}
                    </p>
                    <p
                      className="font-mono mt-1.5 text-[0.5rem] tracking-[0.16em]"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {seg.skills.length} TOOLS
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </Reveal>

          {/* ---------------- DETAIL ---------------- */}
          <div className="lg:min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={seg.id}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="mb-3 flex items-center gap-4">
                  <span className="eyebrow">{seg.role}</span>
                  <span
                    className="h-px flex-1"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                </div>

                <h3
                  className="font-display text-[clamp(1.8rem,4vw,2.7rem)] font-bold leading-none"
                  style={{ color: "var(--fg)" }}
                >
                  {seg.label}
                </h3>

                <p
                  className="mt-4 max-w-xl text-pretty text-[1.02rem] leading-relaxed"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {seg.blurb}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {seg.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }}
                    >
                      <span className="chip">{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function SegIcon({ id, x, y, on }: { id: string; x: number; y: number; on: boolean }) {
  const c = on ? "#0a0616" : "rgba(244,240,255,0.45)";
  const s = { stroke: c, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" as const };
  return (
    <g transform={`translate(${x - 11}, ${y - 11})`}>
      {id === "backend" && (
        <g {...s}>
          <rect x="3" y="3" width="16" height="5.5" rx="1.4" />
          <rect x="3" y="12.5" width="16" height="5.5" rx="1.4" />
          <circle cx="6.6" cy="5.75" r="0.9" fill={c} stroke="none" />
          <circle cx="6.6" cy="15.25" r="0.9" fill={c} stroke="none" />
        </g>
      )}
      {id === "integrations" && (
        <g {...s}>
          <path d="M8.5 13.5 5.8 16.2a3.8 3.8 0 1 1-5.4-5.4l2.7-2.7M13.5 8.5l2.7-2.7a3.8 3.8 0 1 1 5.4 5.4l-2.7 2.7" transform="translate(0.6,0.6) scale(0.92)" />
          <path d="M8.4 13.6 13.6 8.4" />
        </g>
      )}
      {id === "ai" && (
        <g {...s}>
          <circle cx="11" cy="11" r="6.4" />
          <circle cx="11" cy="11" r="2.2" fill={c} stroke="none" />
          <path d="M11 1.6v2.6M11 17.8v2.6M1.6 11h2.6M17.8 11h2.6" />
        </g>
      )}
      {id === "data" && (
        <g {...s}>
          <ellipse cx="11" cy="5.2" rx="7" ry="2.7" />
          <path d="M4 5.2v11c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7v-11" />
          <path d="M4 10.7c0 1.5 3.1 2.7 7 2.7s7-1.2 7-2.7" />
        </g>
      )}
      {id === "frontend" && (
        <g {...s}>
          <rect x="2.4" y="3.5" width="17.2" height="12" rx="1.6" />
          <path d="M2.4 7.4h17.2M7.5 18.5h7" />
        </g>
      )}
      {id === "platform" && (
        <g {...s}>
          <circle cx="11" cy="11" r="3" />
          <path d="M11 2.2v2.9M11 16.9v2.9M2.2 11h2.9M16.9 11h2.9M4.8 4.8l2 2M15.2 15.2l2 2M17.2 4.8l-2 2M6.8 15.2l-2 2" />
        </g>
      )}
    </g>
  );
}
