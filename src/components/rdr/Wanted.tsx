"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section, Container, Counter } from "./Section";
import { Reveal } from "./Reveal";
import { profile, stats, cores } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Wanted() {
  return (
    <Section
      id="wanted"
      background="linear-gradient(180deg, #0C0A07 0%, #140F0B 42%, #0C0A07 100%)"
    >
      {/* Faint plank texture behind the poster wall */}
      <Planks />

      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          <Poster />
          <Dossier />
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   THE POSTER
   ============================================================ */
function Poster() {
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt that follows the pointer across the poster.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), {
    stiffness: 140,
    damping: 18,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
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

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[30rem]"
      style={{ perspective: 1400 }}
      initial={{ opacity: 0, y: 60, rotate: -6 }}
      whileInView={{ opacity: 1, y: 0, rotate: -1.4 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        className="paper torn relative px-7 py-9 sm:px-10 sm:py-12"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      >
        {/* nails */}
        <Nail className="left-4 top-4" />
        <Nail className="right-4 top-4" />
        <Nail className="bottom-4 left-4" />
        <Nail className="bottom-4 right-4" />

        <div className="relative z-10 text-center" style={{ transform: "translateZ(28px)" }}>
          <p
            className="font-type text-[0.55rem] tracking-[0.5em]"
            style={{ color: "#6B4A22" }}
          >
            BY ORDER OF THE HIRING MANAGER
          </p>

          <h3
            className="font-outlaw mt-3 text-[clamp(2.6rem,11vw,4.4rem)] leading-none"
            style={{ color: "#2A1A0C" }}
          >
            WANTED
          </h3>

          <div className="my-3 flex items-center justify-center gap-3">
            <span className="h-px flex-1" style={{ background: "#8A6A3A" }} />
            <span
              className="font-display text-[0.8rem] tracking-[0.34em]"
              style={{ color: "#7A2118" }}
            >
              DEAD OR HIRED
            </span>
            <span className="h-px flex-1" style={{ background: "#8A6A3A" }} />
          </div>

          {/* Portrait plate */}
          <Portrait />

          <h4
            className="font-display mt-5 text-[clamp(1.4rem,5vw,2rem)] leading-none tracking-wide"
            style={{ color: "#241606" }}
          >
            ASHIR QURESHI
          </h4>
          <p
            className="font-type mt-1.5 text-[0.6rem] tracking-[0.3em]"
            style={{ color: "#6B4A22" }}
          >
            ALIAS &ldquo;{profile.alias.toUpperCase()}&rdquo;
          </p>

          <div className="my-5 flex items-center justify-center gap-3">
            <span className="h-px flex-1" style={{ background: "#8A6A3A" }} />
            <Star />
            <span className="h-px flex-1" style={{ background: "#8A6A3A" }} />
          </div>

          <p
            className="font-type text-[0.58rem] tracking-[0.4em]"
            style={{ color: "#6B4A22" }}
          >
            REWARD
          </p>
          <p
            className="font-outlaw mt-1 text-[clamp(2rem,8vw,3rem)] leading-none"
            style={{ color: "#7A2118" }}
          >
            $5,000
          </p>

          <p
            className="font-body mx-auto mt-5 max-w-[24rem] text-[0.92rem] leading-snug"
            style={{ color: "#3A2A16" }}
          >
            Wanted in connection with the shipping of production software. Known to
            operate across <em>full-stack builds</em>, <em>backend services</em>, and{" "}
            <em>computer-vision pipelines</em>. Approaches problems from the schema up.
            Considered highly available.
          </p>

          <dl className="mt-6 space-y-1.5 text-left">
            {[
              ["LAST SEEN", profile.location],
              ["OCCUPATION", "Software Engineer"],
              ["AFFILIATION", "Web Deed · CUST"],
              ["STATUS", "Open to work"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-3">
                <dt
                  className="font-type w-28 shrink-0 text-[0.52rem] tracking-[0.22em]"
                  style={{ color: "#7A5A2A" }}
                >
                  {k}
                </dt>
                <dd
                  className="font-body flex-1 border-b border-dashed pb-0.5 text-[0.88rem]"
                  style={{ color: "#2A1A0C", borderColor: "rgba(122,90,42,0.4)" }}
                >
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Wax seal */}
        <motion.div
          className="absolute -bottom-6 -right-5 z-20"
          style={{ transform: "translateZ(44px)" }}
          initial={{ scale: 0, rotate: -40 }}
          whileInView={{ scale: 1, rotate: -11 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        >
          <Seal />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Portrait() {
  return (
    <div
      className="relative mx-auto mt-5 h-40 w-36 overflow-hidden border-2"
      style={{
        borderColor: "#6B4A22",
        background:
          "radial-gradient(70% 60% at 50% 34%, #D9C7A3, #A98A5C 78%, #7A5A2A 100%)",
      }}
    >
      {/* Engraved bust silhouette in a hat */}
      <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="#3A2A16" opacity="0.9">
          {/* hat */}
          <path d="M18 44 C22 30 34 24 50 24 C66 24 78 30 82 44 C74 40 64 38 50 38 C36 38 26 40 18 44 Z" />
          <path d="M34 30 C36 20 42 15 50 15 C58 15 64 20 66 30 C60 27 55 26 50 26 C45 26 40 27 34 30 Z" />
          {/* head */}
          <path d="M36 44 C36 58 41 68 50 68 C59 68 64 58 64 44 C58 46 42 46 36 44 Z" />
          {/* shoulders */}
          <path d="M20 120 C20 96 32 82 50 82 C68 82 80 96 80 120 Z" />
          {/* bandana */}
          <path d="M36 70 C40 76 60 76 64 70 L68 84 C60 88 40 88 32 84 Z" opacity="0.75" />
        </g>
      </svg>
      {/* Hatched engraving lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        <defs>
          <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="4" y2="0" stroke="#3A2A16" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" />
      </svg>
      <span
        className="font-type absolute inset-x-0 bottom-1 text-center text-[0.44rem] tracking-[0.18em]"
        style={{ color: "#F0E4C8" }}
      >
        NO PHOTOGRAPH ON RECORD
      </span>
    </div>
  );
}

function Nail({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute z-20 block h-3 w-3 rounded-full ${className}`}
      style={{
        background: "radial-gradient(circle at 32% 28%, #C8B285, #5A4526 62%, #2A1E10)",
        boxShadow: "0 2px 5px rgba(40,26,10,0.65), inset 0 -1px 1px rgba(0,0,0,0.5)",
      }}
      aria-hidden
    />
  );
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        d="M12 2 L14.5 9 L22 9.5 L16.2 14 L18 21.5 L12 17.4 L6 21.5 L7.8 14 L2 9.5 L9.5 9 Z"
        fill="#7A2118"
      />
    </svg>
  );
}

function Seal() {
  return (
    <div className="relative h-20 w-20">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, #C0392B, #7A1610 62%, #4A0C08)",
          boxShadow: "0 8px 22px rgba(0,0,0,0.6), inset 0 -3px 8px rgba(0,0,0,0.5)",
          clipPath:
            "polygon(50% 0%, 63% 8%, 78% 5%, 84% 19%, 97% 27%, 94% 42%, 100% 55%, 90% 66%, 92% 81%, 78% 86%, 68% 97%, 54% 92%, 41% 100%, 30% 90%, 15% 91%, 10% 77%, 0% 66%, 7% 53%, 2% 39%, 14% 30%, 14% 15%, 29% 12%, 38% 1%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-outlaw text-lg leading-none"
          style={{ color: "#F0DFA8", textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
        >
          AQ
        </span>
        <span
          className="font-type mt-0.5 text-[0.36rem] tracking-[0.2em]"
          style={{ color: "rgba(240,223,168,0.75)" }}
        >
          EST. 2022
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   THE DOSSIER — copy, cores, stats
   ============================================================ */
function Dossier() {
  return (
    <div>
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <span
            className="font-type text-[0.58rem] tracking-[0.4em]"
            style={{ color: "var(--blood-hi)" }}
          >
            II
          </span>
          <span className="eyebrow">The Dossier</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          className="font-display text-[clamp(2rem,5.5vw,3.6rem)] leading-[1.02] tracking-tight"
          style={{ color: "var(--parchment)" }}
        >
          There is no honour
          <br />
          in unshipped code.
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-7 space-y-5">
          <p
            className="font-body text-pretty text-[1.05rem] leading-relaxed"
            style={{ color: "rgba(230,215,184,0.78)" }}
          >
            {profile.summary}
          </p>
          <p
            className="font-body text-pretty text-[1.05rem] leading-relaxed"
            style={{ color: "rgba(230,215,184,0.62)" }}
          >
            I&rsquo;m a Computer Science undergraduate at CUST, currently building the core
            of an e-commerce platform at Web Deed. Before that: a Telegram rewards
            platform serving thousands of users at FMKC, and full-stack delivery work at
            Grand Productum. The through-line is the same everywhere — own the component
            end to end, make it correct under load, then make it fast.
          </p>
        </div>
      </Reveal>

      {/* Cores — the RDR2 health / stamina / dead eye rings */}
      <Reveal delay={0.2}>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {cores.map((c, i) => (
            <Core key={c.name} {...c} index={i} />
          ))}
        </div>
      </Reveal>

      {/* Tally */}
      <Reveal delay={0.26}>
        <div className="mt-10 grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "var(--line-soft)" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              className="group p-5 transition-colors duration-300"
              style={{ background: "var(--night)" }}
            >
              <p
                className="font-display text-[2rem] leading-none"
                style={{ color: "var(--gold)" }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p
                className="font-type mt-2 text-[0.55rem] tracking-[0.24em]"
                style={{ color: "var(--brass)" }}
              >
                {s.label.toUpperCase()}
              </p>
              <p
                className="font-body mt-1 text-[0.78rem] leading-snug"
                style={{ color: "var(--muted)" }}
              >
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.32}>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href={profile.cv}
            download
            className="group inline-flex items-center gap-3 border px-6 py-3 transition-colors duration-300"
            style={{ borderColor: "var(--line)", background: "rgba(216,182,94,0.04)" }}
          >
            <span
              className="font-type text-[0.62rem] tracking-[0.26em]"
              style={{ color: "var(--gold-hi)" }}
            >
              DOWNLOAD THE CV
            </span>
            <span style={{ color: "var(--brass)" }}>↓</span>
          </a>
          <a
            href={profile.cvDocx}
            download
            className="font-type inline-flex items-center py-3 text-[0.55rem] tracking-[0.22em] transition-colors hover:text-[var(--gold-hi)]"
            style={{ color: "var(--muted)" }}
          >
            .DOCX
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 py-3"
          >
            <span
              className="font-type text-[0.62rem] tracking-[0.26em]"
              style={{ color: "var(--parchment)" }}
            >
              GITHUB / @{profile.alias.toUpperCase()}
            </span>
            <span
              className="block h-px w-6 transition-all duration-300 group-hover:w-12"
              style={{ background: "var(--brass)" }}
            />
          </a>
        </div>
      </Reveal>
    </div>
  );
}

function Core({
  name,
  value,
  icon,
  index,
}: {
  name: string;
  value: number;
  icon: string;
  index: number;
}) {
  const C = 2 * Math.PI * 26;
  const tint =
    icon === "health" ? "#C0392B" : icon === "stamina" ? "#D8B65E" : "#8A7FC0";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[72px] w-[72px]">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="5" />
          <motion.circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke={tint}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C - (value / 100) * C }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 + index * 0.15, ease: EASE }}
            style={{ filter: `drop-shadow(0 0 6px ${tint}66)` }}
          />
        </svg>
        <span
          className="font-display absolute inset-0 flex items-center justify-center text-sm"
          style={{ color: "var(--parchment)" }}
        >
          {value}
        </span>
      </div>
      <span
        className="font-type text-center text-[0.52rem] leading-tight tracking-[0.18em]"
        style={{ color: "var(--brass)" }}
      >
        {name.toUpperCase()}
      </span>
    </div>
  );
}

/** Vertical plank texture for the poster wall. */
function Planks() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.55]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 148px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 30% 20%, rgba(216,182,94,0.05), transparent 65%)",
        }}
      />
    </div>
  );
}
