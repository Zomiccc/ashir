"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Container,
  EASE,
  Reveal,
  Section,
  SectionHeading,
  StatusDot,
} from "./Primitives";
import { projects, tierMeta, type Project, type Tier } from "@/lib/data/projects";

const FILTERS: { id: Tier | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "flagship", label: "Flagship" },
  { id: "production", label: "Production" },
  { id: "lab", label: "Lab" },
];

export function Work() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.tier === filter)),
    [filter]
  );

  const liveCount = projects.filter((p) => p.status === "Live").length;

  return (
    <Section id="work" background="linear-gradient(180deg, var(--night), var(--void) 60%, var(--night))">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title={
            <>
              Platforms, pipelines,
              <br />
              <span className="neon-text">and things people use.</span>
            </>
          }
          lede={`${projects.length} projects — ${liveCount} of them live in production today. The flagship six are the ones I'd want judged.`}
        />

        {/* Filters */}
        <Reveal>
          <div className="mb-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              const count =
                f.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.tier === f.id).length;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={on}
                  className="relative rounded-full border px-4 py-2.5 transition-colors duration-300"
                  style={{
                    borderColor: on ? "transparent" : "var(--line)",
                    background: on ? "var(--grad)" : "transparent",
                  }}
                >
                  <span
                    className="font-mono text-[0.62rem] font-semibold tracking-[0.12em]"
                    style={{ color: on ? "#0a0616" : "var(--fg-mute)" }}
                  >
                    {f.label.toUpperCase()}
                    <sup className="ml-1.5 opacity-70">{count}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {filter !== "all" && (
            <motion.p
              key={filter}
              className="mb-10 max-w-xl text-[0.95rem]"
              style={{ color: "var(--fg-mute)" }}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {tierMeta[filter].blurb}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Grid — flagship cards take half a row, the rest take a third */}
        <motion.ul layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={i}
                onOpen={() => setOpen(p)}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </Section>
  );
}

/* ============================================================
   CARD
   ============================================================ */
function ProjectCard({
  project: p,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const flagship = p.tier === "flagship";

  return (
    <motion.li
      layout
      className={flagship ? "sm:col-span-2 lg:col-span-3" : "lg:col-span-2"}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.05, ease: EASE }}
    >
      <button
        onClick={onOpen}
        className={`glass edge-lit group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 text-left transition-transform duration-500 hover:-translate-y-1.5 sm:p-7 ${
          flagship ? "edge-always" : ""
        }`}
      >
        {/* corner wash */}
        <span
          className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--grad)", filter: "blur(58px)" }}
          aria-hidden
        />

        <div className="relative mb-4 flex items-start justify-between gap-3">
          <span
            className="font-mono text-[0.55rem] tracking-[0.18em]"
            style={{ color: flagship ? "var(--hot)" : "var(--fg-mute)" }}
          >
            {flagship ? "◆ FLAGSHIP" : p.category.toUpperCase()}
          </span>
          <StatusDot status={p.status} />
        </div>

        <h3
          className={`font-display leading-tight ${flagship ? "text-[1.75rem]" : "text-[1.3rem]"}`}
          style={{ color: "var(--fg)" }}
        >
          {p.title}
        </h3>
        <p className="mt-1.5 text-[0.88rem]" style={{ color: "var(--cool)" }}>
          {p.kicker}
        </p>

        <p
          className="mt-4 flex-1 text-pretty text-[0.93rem] leading-relaxed"
          style={{ color: "var(--fg-dim)" }}
        >
          {p.summary}
        </p>

        {flagship && (
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {p.highlights.slice(0, 4).map((h) => (
              <li
                key={h}
                className="flex items-center gap-1.5 text-[0.78rem]"
                style={{ color: "var(--fg-mute)" }}
              >
                <span
                  className="block h-1 w-1 rounded-full"
                  style={{ background: "var(--hot)" }}
                />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tech.slice(0, flagship ? 5 : 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {p.tech.length > (flagship ? 5 : 3) && (
            <span className="chip" style={{ color: "var(--hot)" }}>
              +{p.tech.length - (flagship ? 5 : 3)}
            </span>
          )}
        </div>

        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="flex items-center gap-3">
            {p.live && (
              <span
                className="font-mono text-[0.55rem] tracking-[0.12em]"
                style={{ color: "var(--cool)" }}
              >
                {(p.liveLabel ?? "LIVE SITE").toUpperCase()}
              </span>
            )}
            {p.github && (
              <span
                className="font-mono text-[0.55rem] tracking-[0.12em]"
                style={{ color: "var(--fg-mute)" }}
              >
                SOURCE
              </span>
            )}
          </span>
          <span
            className="font-mono text-[0.58rem] tracking-[0.12em] transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: "var(--fg)" }}
          >
            READ MORE →
          </span>
        </div>
      </button>
    </motion.li>
  );
}

/* ============================================================
   MODAL
   ============================================================ */
function ProjectModal({
  project: p,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          className="fixed inset-0 z-[92] flex items-start justify-center overflow-y-auto p-4 py-10 sm:p-8 sm:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="fixed inset-0"
            style={{ background: "rgba(4,2,9,0.92)", backdropFilter: "blur(16px)" }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.title}
            className="glass edge-lit edge-always relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl p-7 sm:p-12"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full"
              style={{ background: "var(--grad)", filter: "blur(70px)", opacity: 0.3 }}
              aria-hidden
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: "var(--line)", color: "var(--fg-dim)" }}
            >
              ✕
            </button>

            <div className="relative">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="eyebrow">{p.category}</span>
                <span
                  className="font-mono text-[0.58rem] tracking-[0.14em]"
                  style={{ color: "var(--fg-mute)" }}
                >
                  {p.year}
                </span>
                <StatusDot status={p.status} />
              </div>

              <h3
                className="font-display mt-4 text-[clamp(1.9rem,5.5vw,3rem)] font-black leading-[0.98]"
                style={{ color: "var(--fg)" }}
              >
                {p.title}
              </h3>
              <p className="mt-2 text-[1.05rem]" style={{ color: "var(--cool)" }}>
                {p.kicker}
              </p>

              <p
                className="mt-7 text-pretty text-[1.05rem] leading-relaxed"
                style={{ color: "var(--fg-dim)" }}
              >
                {p.summary}
              </p>

              <h4 className="eyebrow mt-9">What I built</h4>
              <ul className="mt-4 space-y-3.5">
                {p.detail.map((d, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: EASE }}
                  >
                    <span
                      className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--grad)" }}
                    />
                    <span
                      className="flex-1 text-pretty text-[0.98rem] leading-relaxed"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {d}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-9 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="eyebrow">Stack</h4>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="eyebrow">Highlights</h4>
                  <ul className="mt-4 space-y-2">
                    {p.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-baseline gap-2.5 text-[0.9rem]"
                        style={{ color: "var(--fg-dim)" }}
                      >
                        <span style={{ color: "var(--hot)" }}>—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {(p.github || p.live) && (
                <div className="mt-10 flex flex-wrap gap-3">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono inline-flex items-center gap-2 rounded-full px-6 py-3 text-[0.62rem] font-semibold tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                      style={{ background: "var(--grad)", color: "#0a0616" }}
                    >
                      {(p.liveLabel ?? "Visit live site").toUpperCase()} ↗
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[0.62rem] font-semibold tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                      style={{ borderColor: "var(--line)", color: "var(--fg)" }}
                    >
                      SOURCE ↗
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
