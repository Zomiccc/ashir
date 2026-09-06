"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ButtonGhost,
  ButtonPrimary,
  Container,
  Counter,
  EASE,
  Reveal,
  Section,
} from "./Primitives";
import { profile, stats, meters } from "@/lib/data/profile";
import { education } from "@/lib/data/experience";

export function About() {
  return (
    <Section id="about" background="linear-gradient(180deg, var(--night), var(--deep) 50%, var(--night))">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-20">
          <IdCard />

          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[0.62rem]" style={{ color: "var(--hot)" }}>
                  01
                </span>
                <span className="eyebrow">About</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02]"
                style={{ color: "var(--fg)" }}
              >
                I build the layer
                <br />
                <span className="neon-text">everything depends on.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-7 space-y-5">
                <p
                  className="text-pretty text-[1.05rem] leading-relaxed"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {profile.summaryLong}
                </p>
                <p
                  className="text-pretty text-[1.02rem] leading-relaxed"
                  style={{ color: "var(--fg-mute)" }}
                >
                  Right now I&rsquo;m a Computer Science undergraduate at CUST and a full-stack
                  engineer at Proton Soft Tech, alongside platform work at WebDeed. Before
                  that: contract engineering for a US client, full-stack delivery at Grand
                  Productum, and an event-driven rewards backend at FMKC that had to pay
                  thousands of users without ever paying twice.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 space-y-4">
                {meters.map((m, i) => (
                  <Meter key={m.name} {...m} index={i} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl sm:grid-cols-4"
                style={{ background: "var(--line)" }}>
                {stats.map((s) => (
                  <div key={s.label} className="p-5" style={{ background: "var(--deep)" }}>
                    <p className="font-display neon-text text-[1.9rem] font-black leading-none">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p
                      className="font-mono mt-2 text-[0.55rem] tracking-[0.16em]"
                      style={{ color: "var(--fg)" }}
                    >
                      {s.label.toUpperCase()}
                    </p>
                    <p
                      className="mt-1 text-[0.78rem] leading-snug"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {s.note}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonPrimary href={profile.cv} download>
                  Download résumé
                </ButtonPrimary>
                <ButtonGhost href={profile.links.github} external>
                  GitHub
                </ButtonGhost>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   ID CARD
   ============================================================ */
function IdCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const facts: [string, string][] = [
    ["Role", profile.role],
    ["Focus", "Backend & AI-integrated systems"],
    ["Based", profile.location],
    ["Timezone", profile.timezone],
    ["Studying", `${education.degree}, CUST`],
    ["Status", "Available for work"],
  ];

  return (
    <motion.div
      className="mx-auto w-full max-w-[26rem] lg:sticky lg:top-28"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: EASE }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="glass edge-lit edge-always relative overflow-hidden rounded-2xl p-7 sm:p-8"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        {/* Gradient wash */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
          style={{ background: "var(--grad)", filter: "blur(60px)", opacity: 0.3 }}
          aria-hidden
        />

        <div className="relative" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-start justify-between gap-4">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--grad)" }}
            >
              <span
                className="font-display text-xl font-black"
                style={{ color: "#0a0616" }}
              >
                AQ
              </span>
            </span>
            <span
              className="font-mono rounded-full border px-3 py-1.5 text-[0.55rem] tracking-[0.14em]"
              style={{ borderColor: "var(--line-hot)", color: "var(--hot)" }}
            >
              ID · AQ-2027
            </span>
          </div>

          <h3
            className="font-display mt-6 text-2xl font-bold leading-tight"
            style={{ color: "var(--fg)" }}
          >
            {profile.name}
          </h3>
          <p className="font-mono mt-1 text-[0.65rem] tracking-[0.14em]" style={{ color: "var(--cool)" }}>
            @{profile.alias}
          </p>

          <dl className="mt-7 space-y-3.5">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-4">
                <dt
                  className="font-mono w-20 shrink-0 text-[0.55rem] tracking-[0.14em]"
                  style={{ color: "var(--fg-mute)" }}
                >
                  {k.toUpperCase()}
                </dt>
                <dd
                  className="flex-1 border-b pb-1 text-[0.88rem]"
                  style={{ color: "var(--fg)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-7 flex items-center gap-2.5 rounded-lg border px-4 py-3"
            style={{ borderColor: "var(--line)", background: "rgba(74,222,128,0.06)" }}
          >
            <span
              className="block h-2 w-2 shrink-0 rounded-full animate-pulse-soft"
              style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
            />
            <span className="font-mono text-[0.58rem] tracking-[0.12em]" style={{ color: "var(--fg-dim)" }}>
              OPEN TO BACKEND & FULL-STACK ROLES
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Meter({ name, value, index }: { name: string; value: number; index: number }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-mono text-[0.62rem] tracking-[0.14em]" style={{ color: "var(--fg)" }}>
          {name.toUpperCase()}
        </span>
        <span className="font-mono text-[0.6rem] tabular-nums" style={{ color: "var(--fg-mute)" }}>
          {value}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--grad)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 + index * 0.12, ease: EASE }}
        />
      </div>
    </div>
  );
}
