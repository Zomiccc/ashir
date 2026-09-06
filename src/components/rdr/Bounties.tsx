"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Container, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { bounties, tierMeta, type Bounty, type Tier } from "@/lib/data/bounties";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS: { id: Tier | "all"; label: string }[] = [
  { id: "all", label: "All Bounties" },
  { id: "legendary", label: "Legendary" },
  { id: "wanted", label: "Wanted" },
  { id: "oddjob", label: "Odd Jobs" },
];

export function Bounties() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [open, setOpen] = useState<Bounty | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? bounties : bounties.filter((b) => b.tier === filter)),
    [filter]
  );

  const total = useMemo(
    () => bounties.reduce((sum, b) => sum + b.reward, 0),
    []
  );

  return (
    <Section
      id="bounties"
      background="linear-gradient(180deg, #100C08 0%, #0A0806 30%, #0C0A07 100%)"
    >
      <Container>
        <SectionHeading
          chapter="IV"
          eyebrow="The Bounty Board"
          title="Work worth posting"
          lede={`${bounties.length} jobs on the board — platforms, vision pipelines, services, and storefronts. Pick one up and read the notice.`}
        />

        {/* Filters + tally */}
        <Reveal>
          <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const on = filter === f.id;
                const count =
                  f.id === "all"
                    ? bounties.length
                    : bounties.filter((b) => b.tier === f.id).length;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={on}
                    className="group relative overflow-hidden border px-4 py-2.5 transition-colors duration-300"
                    style={{
                      borderColor: on ? "var(--gold)" : "var(--line)",
                      background: on ? "rgba(216,182,94,0.12)" : "transparent",
                    }}
                  >
                    <span
                      className="font-type relative z-10 text-[0.6rem] tracking-[0.2em]"
                      style={{ color: on ? "var(--gold-hi)" : "var(--muted)" }}
                    >
                      {f.label.toUpperCase()}
                      <sup className="ml-1.5 opacity-60">{count}</sup>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-right">
              <p
                className="font-type text-[0.52rem] tracking-[0.3em]"
                style={{ color: "var(--brass)" }}
              >
                TOTAL POSTED
              </p>
              <p
                className="font-outlaw text-2xl leading-none"
                style={{ color: "var(--gold)" }}
              >
                ${total.toLocaleString()}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Tier note — only when the board is narrowed to one kind of job */}
        <AnimatePresence mode="wait">
          {filter !== "all" && (
            <motion.p
              key={filter}
              className="font-body -mt-6 mb-10 max-w-xl text-[0.95rem] italic"
              style={{ color: "var(--muted)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {tierMeta[filter].label} — {tierMeta[filter].blurb}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Board */}
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((b, i) => (
              <BountyCard key={b.slug} bounty={b} index={i} onOpen={() => setOpen(b)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal delay={0.15}>
          <p
            className="font-body mt-12 text-center text-sm italic"
            style={{ color: "var(--muted)" }}
          >
            More notices nailed up at{" "}
            <a
              href="https://github.com/Zomiccc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-4 transition-colors hover:text-[var(--gold-hi)]"
              style={{ color: "var(--gold)" }}
            >
              github.com/Zomiccc
            </a>
            .
          </p>
        </Reveal>
      </Container>

      <BountyModal bounty={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

/* ============================================================
   CARD
   ============================================================ */
function BountyCard({
  bounty: b,
  index,
  onOpen,
}: {
  bounty: Bounty;
  index: number;
  onOpen: () => void;
}) {
  const legendary = b.tier === "legendary";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: EASE }}
    >
      <button
        onClick={onOpen}
        className="group relative flex h-full w-full flex-col overflow-hidden p-6 text-left transition-transform duration-500 hover:-translate-y-1.5"
        style={{
          background: legendary
            ? "linear-gradient(165deg, #241B10, #14100A 60%, #0A0806)"
            : "linear-gradient(168deg, #1B1610, #100C08 62%, #0A0806)",
          border: `1px solid ${legendary ? "rgba(216,182,94,0.32)" : "var(--line-soft)"}`,
          boxShadow: "0 22px 46px -28px rgba(0,0,0,0.95)",
        }}
      >
        {/* Sweeping shine on hover */}
        <span
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full skew-x-[-18deg] opacity-0 transition-all duration-1000 ease-out group-hover:translate-x-[420%] group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(240,223,168,0.09), transparent)",
          }}
          aria-hidden
        />

        {/* Corner ticks */}
        <Ticks />

        {/* Top row */}
        <div className="relative mb-4 flex items-start justify-between gap-3">
          <div>
            <p
              className="font-type text-[0.5rem] tracking-[0.28em]"
              style={{ color: legendary ? "var(--gold)" : "var(--brass)" }}
            >
              {legendary ? "★ LEGENDARY" : b.tier === "wanted" ? "WANTED" : "ODD JOB"}
            </p>
            <p
              className="font-type mt-1.5 text-[0.5rem] tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {b.category.toUpperCase()}
            </p>
          </div>
          <StatusPip status={b.status} />
        </div>

        {/* Title */}
        <h3
          className="font-display text-[1.42rem] leading-[1.1] transition-colors duration-300 group-hover:text-[var(--gold-hi)]"
          style={{ color: "var(--parchment)" }}
        >
          {b.title}
        </h3>
        <p
          className="font-body mt-1 text-[0.86rem] italic"
          style={{ color: "var(--brass)" }}
        >
          {b.epithet}
        </p>

        <p
          className="font-body mt-4 flex-1 text-pretty text-[0.92rem] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {b.summary}
        </p>

        {/* Tech */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {b.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-type border px-2 py-1 text-[0.52rem] tracking-[0.1em]"
              style={{ borderColor: "var(--line-soft)", color: "rgba(230,215,184,0.62)" }}
            >
              {t}
            </span>
          ))}
          {b.tech.length > 4 && (
            <span
              className="font-type px-2 py-1 text-[0.52rem]"
              style={{ color: "var(--brass)" }}
            >
              +{b.tech.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div
          className="mt-5 flex items-end justify-between border-t pt-4"
          style={{ borderColor: "var(--line-soft)" }}
        >
          <div>
            <p
              className="font-type text-[0.46rem] tracking-[0.26em]"
              style={{ color: "var(--brass)" }}
            >
              REWARD
            </p>
            <p
              className="font-outlaw text-lg leading-none"
              style={{ color: legendary ? "var(--gold)" : "var(--parchment)" }}
            >
              ${b.reward.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <Difficulty n={b.difficulty} />
            <p
              className="font-type mt-1.5 text-[0.5rem] tracking-[0.2em] transition-colors group-hover:text-[var(--gold-hi)]"
              style={{ color: "var(--muted)" }}
            >
              READ NOTICE →
            </p>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

function Ticks() {
  return (
    <>
      {[
        "left-2 top-2 border-l border-t",
        "right-2 top-2 border-r border-t",
        "bottom-2 left-2 border-b border-l",
        "bottom-2 right-2 border-b border-r",
      ].map((c) => (
        <span
          key={c}
          className={`pointer-events-none absolute h-3 w-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${c}`}
          style={{ borderColor: "var(--gold)" }}
          aria-hidden
        />
      ))}
    </>
  );
}

function StatusPip({ status }: { status: Bounty["status"] }) {
  const live = status !== "Complete";
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span
        className="block h-1.5 w-1.5 rounded-full"
        style={{
          background: live ? "#C1440E" : "var(--sage)",
          boxShadow: live ? "0 0 8px #C1440E" : "none",
          animation: live ? "flicker 2.2s ease-in-out infinite" : undefined,
        }}
      />
      <span
        className="font-type text-[0.46rem] tracking-[0.18em]"
        style={{ color: live ? "#D4703A" : "var(--muted)" }}
      >
        {status.toUpperCase()}
      </span>
    </span>
  );
}

function Difficulty({ n }: { n: number }) {
  return (
    <span className="flex justify-end gap-0.5" aria-label={`Difficulty ${n} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-2.5 w-2.5">
          <path
            d="M12 2 L14.5 9 L22 9.5 L16.2 14 L18 21.5 L12 17.4 L6 21.5 L7.8 14 L2 9.5 L9.5 9 Z"
            fill={i < n ? "var(--gold)" : "transparent"}
            stroke={i < n ? "var(--gold)" : "rgba(168,135,60,0.35)"}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </span>
  );
}

/* ============================================================
   MODAL — the full notice
   ============================================================ */
function BountyModal({ bounty: b, onClose }: { bounty: Bounty | null; onClose: () => void }) {
  useEffect(() => {
    if (!b) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [b, onClose]);

  return (
    <AnimatePresence>
      {b && (
        <motion.div
          className="fixed inset-0 z-[92] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="fixed inset-0"
            style={{ background: "rgba(5,4,3,0.94)", backdropFilter: "blur(14px)" }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${b.title} — bounty notice`}
            className="paper torn relative z-10 w-full max-w-3xl px-7 py-10 sm:px-14 sm:py-14"
            initial={{ opacity: 0, y: 44, scale: 0.95, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <button
              onClick={onClose}
              aria-label="Close notice"
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-[rgba(122,33,24,0.14)]"
              style={{ borderColor: "#8A6A3A", color: "#5A3A18" }}
            >
              ✕
            </button>

            <div className="relative z-10">
              <p
                className="font-type text-[0.52rem] tracking-[0.44em]"
                style={{ color: "#7A5A2A" }}
              >
                BOUNTY NOTICE · {b.year} · {b.category.toUpperCase()}
              </p>

              <h3
                className="font-outlaw mt-4 text-[clamp(1.9rem,6.5vw,3.4rem)] leading-[0.95]"
                style={{ color: "#2A1A0C" }}
              >
                {b.title}
              </h3>
              <p
                className="font-body mt-1.5 text-lg italic"
                style={{ color: "#7A2118" }}
              >
                {b.epithet}
              </p>

              <div
                className="my-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 sm:grid-cols-4"
                style={{ borderColor: "rgba(122,90,42,0.4)" }}
              >
                <Meta k="Reward" v={`$${b.reward.toLocaleString()}`} />
                <Meta k="Status" v={b.status} />
                <Meta k="Difficulty" v={"★".repeat(b.difficulty) + "☆".repeat(5 - b.difficulty)} />
                <Meta k="Year" v={b.year} />
              </div>

              <p
                className="font-body text-pretty text-[1.06rem] leading-relaxed"
                style={{ color: "#2A1A0C" }}
              >
                {b.summary}
              </p>

              <h4
                className="font-type mt-8 text-[0.55rem] tracking-[0.34em]"
                style={{ color: "#7A5A2A" }}
              >
                THE DETAILS
              </h4>
              <ul className="mt-3 space-y-3">
                {b.detail.map((d, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                  >
                    <span style={{ color: "#7A2118" }}>✦</span>
                    <span
                      className="font-body flex-1 text-pretty text-[0.98rem] leading-relaxed"
                      style={{ color: "#3A2A16" }}
                    >
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <h4
                    className="font-type text-[0.55rem] tracking-[0.34em]"
                    style={{ color: "#7A5A2A" }}
                  >
                    TOOLS CARRIED
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {b.tech.map((t) => (
                      <span
                        key={t}
                        className="font-type border px-2.5 py-1 text-[0.56rem] tracking-[0.1em]"
                        style={{ borderColor: "rgba(122,90,42,0.55)", color: "#3A2A16" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4
                    className="font-type text-[0.55rem] tracking-[0.34em]"
                    style={{ color: "#7A5A2A" }}
                  >
                    WHAT IT DOES
                  </h4>
                  <ul className="mt-3 space-y-1.5">
                    {b.features.map((f) => (
                      <li
                        key={f}
                        className="font-body flex items-baseline gap-2 text-[0.9rem]"
                        style={{ color: "#3A2A16" }}
                      >
                        <span style={{ color: "#8A6A3A" }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {(b.github || b.live) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {b.live && (
                    <a
                      href={b.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-type inline-flex items-center gap-2.5 px-6 py-3 text-[0.6rem] tracking-[0.24em] transition-transform hover:-translate-y-0.5"
                      style={{ background: "#7A2118", color: "#F4EBD8" }}
                    >
                      VISIT IT LIVE ↗
                    </a>
                  )}
                  {b.github && (
                    <a
                      href={b.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-type inline-flex items-center gap-2.5 border px-6 py-3 text-[0.6rem] tracking-[0.24em] transition-transform hover:-translate-y-0.5"
                      style={{ borderColor: "#5A3A18", color: "#2A1A0C" }}
                    >
                      READ THE SOURCE ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p
        className="font-type text-[0.48rem] tracking-[0.26em]"
        style={{ color: "#7A5A2A" }}
      >
        {k.toUpperCase()}
      </p>
      <p className="font-display mt-1 text-base" style={{ color: "#2A1A0C" }}>
        {v}
      </p>
    </div>
  );
}
