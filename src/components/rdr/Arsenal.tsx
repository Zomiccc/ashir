"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Container, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { arsenal } from "@/lib/data/arsenal";

const EASE = [0.16, 1, 0.3, 1] as const;

const SIZE = 460;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUT = 208;
const R_IN = 96;
const GAP = 2.2; // degrees of breathing room between wedges

/** Point on a circle, with 0° at twelve o'clock. */
function polar(r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  // Rounded so the server and client render byte-identical path data.
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return [round(CX + r * Math.cos(rad)), round(CY + r * Math.sin(rad))] as const;
}

/** Annulus segment path — the shape of one wheel wedge. */
function wedgePath(start: number, end: number, rIn: number, rOut: number) {
  const s = start + GAP;
  const e = end - GAP;
  const large = e - s > 180 ? 1 : 0;
  const [x1, y1] = polar(rOut, s);
  const [x2, y2] = polar(rOut, e);
  const [x3, y3] = polar(rIn, e);
  const [x4, y4] = polar(rIn, s);
  return [
    `M ${x1} ${y1}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${x4} ${y4}`,
    "Z",
  ].join(" ");
}

export function Arsenal() {
  const [active, setActive] = useState(0);
  const step = 360 / arsenal.length;
  const wedge = arsenal[active];

  return (
    <Section
      id="arsenal"
      background="linear-gradient(180deg, #0C0A07 0%, #0A0806 55%, #100C08 100%)"
    >
      <Container>
        <SectionHeading
          chapter="III"
          eyebrow="The Arsenal"
          title="Everything I carry"
          lede="Six slots on the wheel. Spin it — each one opens up what is actually in the satchel, and what I reach for first."
        />

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-20">
          {/* ---------- THE WHEEL ---------- */}
          <Reveal className="mx-auto w-full max-w-[460px]">
            <motion.div
              className="relative aspect-square w-full"
              initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.3, ease: EASE }}
            >
              {/* Ambient glow behind the wheel */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(216,182,94,0.1), transparent 62%)",
                }}
              />

              <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
                <defs>
                  <radialGradient id="wedgeIdle" cx="50%" cy="50%" r="50%">
                    <stop offset="55%" stopColor="#1B1610" />
                    <stop offset="100%" stopColor="#0D0A07" />
                  </radialGradient>
                  <radialGradient id="wedgeHot" cx="50%" cy="50%" r="50%">
                    <stop offset="45%" stopColor="#4A3A18" />
                    <stop offset="100%" stopColor="#7A5F24" />
                  </radialGradient>
                  <filter id="wheelGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_OUT + 12}
                  fill="none"
                  stroke="rgba(168,135,60,0.24)"
                  strokeWidth="1"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_OUT + 20}
                  fill="none"
                  stroke="rgba(168,135,60,0.1)"
                  strokeWidth="1"
                  strokeDasharray="3 7"
                />

                {arsenal.map((w, i) => {
                  const start = i * step;
                  const end = start + step;
                  const mid = start + step / 2;
                  const isOn = i === active;
                  const midR = (R_IN + R_OUT) / 2;
                  const [lx, ly] = polar(midR - 28, mid);
                  const [ix, iy] = polar(midR + 20, mid);

                  return (
                    <g
                      key={w.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${w.label} — ${w.skills.length} skills`}
                      aria-pressed={isOn}
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
                        d={wedgePath(start, end, R_IN, R_OUT)}
                        fill={isOn ? "url(#wedgeHot)" : "url(#wedgeIdle)"}
                        stroke={isOn ? "var(--gold-hi)" : "rgba(168,135,60,0.3)"}
                        strokeWidth={isOn ? 1.6 : 0.9}
                        animate={{
                          scale: isOn ? 1.045 : 1,
                          opacity: isOn ? 1 : 0.82,
                        }}
                        transition={{ duration: 0.45, ease: EASE }}
                        style={{
                          transformOrigin: `${CX}px ${CY}px`,
                          filter: isOn ? "url(#wheelGlow)" : undefined,
                        }}
                      />
                      <SlotIcon id={w.id} x={ix} y={iy} on={isOn} />
                      <text
                        x={lx}
                        y={ly + 4}
                        textAnchor="middle"
                        className="font-type"
                        style={{ fontSize: 11, letterSpacing: "0.14em" }}
                        fill={isOn ? "#F0DFA8" : "#8B7550"}
                      >
                        {w.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}

                {/* Hub */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_IN - 8}
                  fill="#0A0806"
                  stroke="rgba(216,182,94,0.35)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={R_IN - 18}
                  fill="none"
                  stroke="rgba(216,182,94,0.14)"
                  strokeWidth="0.8"
                />
              </svg>

              {/* Hub label — HTML so the fonts match the rest of the page */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wedge.id}
                    className="px-6 text-center"
                    initial={{ opacity: 0, scale: 0.9, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p
                      className="font-type text-[0.5rem] tracking-[0.3em]"
                      style={{ color: "var(--brass)" }}
                    >
                      {wedge.slot.toUpperCase()}
                    </p>
                    <p
                      className="font-display mt-1.5 text-lg leading-tight"
                      style={{ color: "var(--gold-hi)" }}
                    >
                      {wedge.sidearm}
                    </p>
                    <p
                      className="font-type mt-1.5 text-[0.5rem] tracking-[0.2em]"
                      style={{ color: "var(--muted)" }}
                    >
                      {wedge.skills.length} ITEMS
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </Reveal>

          {/* ---------- THE SATCHEL ---------- */}
          <div className="lg:min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={wedge.id}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="mb-3 flex items-baseline gap-4">
                  <span
                    className="font-type text-[0.55rem] tracking-[0.34em]"
                    style={{ color: "var(--blood-hi)" }}
                  >
                    {wedge.slot.toUpperCase()}
                  </span>
                  <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                </div>

                <h3
                  className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none"
                  style={{ color: "var(--parchment)" }}
                >
                  {wedge.label}
                </h3>

                <p
                  className="font-body mt-4 max-w-xl text-pretty text-[1.02rem] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {wedge.blurb}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {wedge.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
                    >
                      <span
                        className="font-type inline-block border px-3.5 py-2 text-[0.62rem] tracking-[0.14em] transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--gold-hi)]"
                        style={{
                          borderColor: "var(--line)",
                          color: "var(--parchment)",
                          background: "rgba(28,22,14,0.5)",
                        }}
                      >
                        {s}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <Reveal delay={0.2}>
              <p
                className="font-type mt-10 text-[0.55rem] tracking-[0.24em]"
                style={{ color: "var(--brass)" }}
              >
                HOVER OR TAB THROUGH THE WHEEL TO SWITCH SLOTS
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Tiny engraved glyph per wheel slot. */
function SlotIcon({ id, x, y, on }: { id: string; x: number; y: number; on: boolean }) {
  const c = on ? "#F0DFA8" : "#8B7550";
  const common = { stroke: c, strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const };
  return (
    <g transform={`translate(${x - 12}, ${y - 12})`} opacity={on ? 1 : 0.75}>
      {id === "backend" && (
        <g {...common}>
          <rect x="3" y="3" width="18" height="6" rx="1.5" />
          <rect x="3" y="11" width="18" height="6" rx="1.5" />
          <circle cx="7" cy="6" r="1" fill={c} stroke="none" />
          <circle cx="7" cy="14" r="1" fill={c} stroke="none" />
        </g>
      )}
      {id === "frontend" && (
        <g {...common}>
          <rect x="2.5" y="4" width="19" height="13" rx="1.5" />
          <path d="M2.5 8h19M6 20h12" />
        </g>
      )}
      {id === "ml" && (
        <g {...common}>
          <circle cx="12" cy="11" r="7" />
          <circle cx="12" cy="11" r="2.4" fill={c} stroke="none" />
          <path d="M12 1.5v3M12 17.5v3M2.5 11h3M18.5 11h3" />
        </g>
      )}
      {id === "data" && (
        <g {...common}>
          <ellipse cx="12" cy="5.5" rx="8" ry="3" />
          <path d="M4 5.5v10c0 1.7 3.6 3 8 3s8-1.3 8-3v-10" />
          <path d="M4 10.5c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </g>
      )}
      {id === "languages" && (
        <g {...common}>
          <path d="M8 6 3.5 11 8 16M16 6l4.5 5-4.5 5M13.5 4l-3 14" />
        </g>
      )}
      {id === "ops" && (
        <g {...common}>
          <circle cx="12" cy="11" r="3.2" />
          <path d="M12 2v3.2M12 16.8V20M2.6 11h3.2M18.2 11h3.2M5.3 4.3l2.3 2.3M16.4 15.4l2.3 2.3M18.7 4.3l-2.3 2.3M7.6 15.4l-2.3 2.3" />
        </g>
      )}
    </g>
  );
}
