"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, EASE, Reveal, Section, SectionHeading } from "./Primitives";
import { experience, education, awards } from "@/lib/data/experience";

export function Experience() {
  const [active, setActive] = useState(0);
  const role = experience[active];

  return (
    <Section
      id="experience"
      background="linear-gradient(180deg, var(--night), var(--void) 50%, var(--night))"
    >
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={
            <>
              Three years,
              <br />
              <span className="neon-text">six teams.</span>
            </>
          }
          lede="Startups, contract work, and internships — mostly backend, always shipping into production."
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-16">
          {/* ---------------- ROLE LIST ---------------- */}
          <ul className="relative space-y-1">
            {/* spine */}
            <span
              className="absolute bottom-4 left-[7px] top-4 w-px"
              style={{ background: "rgba(255,255,255,0.09)" }}
              aria-hidden
            />
            {experience.map((r, i) => {
              const on = i === active;
              return (
                <li key={r.id} className="relative">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="group flex w-full items-start gap-5 py-3.5 pl-7 text-left"
                  >
                    <span
                      className="absolute left-0 top-[22px] block h-[15px] w-[15px] rounded-full border-2 transition-all duration-300"
                      style={{
                        borderColor: on ? "transparent" : "rgba(255,255,255,0.18)",
                        background: on ? "var(--grad)" : "var(--void)",
                        boxShadow: on ? "0 0 14px color-mix(in srgb, var(--hot) 60%, transparent)" : "none",
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline gap-x-3">
                        <span
                          className="font-display text-[1.02rem] font-bold leading-tight transition-colors"
                          style={{ color: on ? "var(--fg)" : "var(--fg-dim)" }}
                        >
                          {r.role}
                        </span>
                        {r.kind === "internship" && (
                          <span
                            className="font-mono rounded-full border px-2 py-0.5 text-[0.48rem] tracking-[0.12em]"
                            style={{ borderColor: "var(--line)", color: "var(--fg-mute)" }}
                          >
                            INTERN
                          </span>
                        )}
                      </span>
                      <span
                        className="mt-0.5 block text-[0.86rem]"
                        style={{ color: on ? "var(--cool)" : "var(--fg-mute)" }}
                      >
                        {r.org}
                      </span>
                      <span
                        className="font-mono mt-0.5 block text-[0.58rem] tracking-[0.1em]"
                        style={{ color: "var(--fg-mute)" }}
                      >
                        {r.period.toUpperCase()}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ---------------- DETAIL ---------------- */}
          <div className="lg:min-h-[24rem]">
            <AnimatePresence mode="wait">
              <motion.article
                key={role.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: EASE }}
                className="glass edge-lit edge-always relative overflow-hidden rounded-2xl p-7 sm:p-9"
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full"
                  style={{ background: "var(--grad)", filter: "blur(70px)", opacity: 0.22 }}
                  aria-hidden
                />

                <div className="relative">
                  <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="eyebrow">{role.period}</span>
                    {role.location && (
                      <span
                        className="font-mono text-[0.58rem] tracking-[0.12em]"
                        style={{ color: "var(--fg-mute)" }}
                      >
                        {role.location.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h3
                    className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] font-bold leading-tight"
                    style={{ color: "var(--fg)" }}
                  >
                    {role.role}
                  </h3>
                  <p className="mt-1 text-[1.02rem]" style={{ color: "var(--cool)" }}>
                    {role.org}
                  </p>
                  {role.context && (
                    <p className="mt-1 text-[0.88rem]" style={{ color: "var(--fg-mute)" }}>
                      {role.context}
                    </p>
                  )}

                  <ul className="mt-6 space-y-3.5">
                    {role.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
                      >
                        <span
                          className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--grad)" }}
                        />
                        <span
                          className="flex-1 text-pretty text-[0.95rem] leading-relaxed"
                          style={{ color: "var(--fg-dim)" }}
                        >
                          {b}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-1.5">
                    {role.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------------- EDUCATION + AWARD ---------------- */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass edge-lit h-full rounded-2xl p-7 sm:p-8">
              <span className="eyebrow">Education</span>
              <h3
                className="font-display mt-4 text-[1.35rem] font-bold leading-tight"
                style={{ color: "var(--fg)" }}
              >
                {education.degree}
              </h3>
              <p className="mt-1 text-[0.98rem]" style={{ color: "var(--cool)" }}>
                {education.school}
              </p>
              <p
                className="font-mono mt-1.5 text-[0.58rem] tracking-[0.12em]"
                style={{ color: "var(--fg-mute)" }}
              >
                {education.location.toUpperCase()} · {education.period.toUpperCase()}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {education.coursework.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {awards.map((a) => (
            <Reveal key={a.title} delay={0.08}>
              <div className="glass edge-lit edge-always relative h-full overflow-hidden rounded-2xl p-7 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-20 -bottom-20 h-44 w-44 rounded-full"
                  style={{ background: "var(--grad)", filter: "blur(60px)", opacity: 0.24 }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow">Hackathon</span>
                    <span
                      className="font-mono text-[0.55rem] tracking-[0.12em]"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {a.date.toUpperCase()}
                    </span>
                  </div>
                  <h3
                    className="font-display mt-4 text-[1.35rem] font-bold leading-tight"
                    style={{ color: "var(--fg)" }}
                  >
                    {a.title}
                  </h3>
                  <p className="mt-1 text-[0.9rem]" style={{ color: "var(--cool)" }}>
                    {a.org}
                  </p>
                  <p
                    className="mt-4 text-pretty text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--fg-dim)" }}
                  >
                    {a.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
