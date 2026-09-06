"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, EASE, Reveal, Section, SectionHeading } from "./Primitives";
import { services } from "@/lib/data/skills";
import { certifications } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";

interface GhStats {
  repos: number;
  languages: [string, number][];
  lastPush?: string;
}

const FALLBACK: [string, number][] = [
  ["JavaScript", 6],
  ["Python", 6],
  ["HTML", 4],
  ["TypeScript", 3],
  ["CSS", 2],
  ["PowerShell", 1],
];

/** Live GitHub numbers. Falls back quietly if the API is rate-limited. */
function useGitHub() {
  const [data, setData] = useState<GhStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch("https://api.github.com/users/Zomiccc"),
          fetch("https://api.github.com/users/Zomiccc/repos?per_page=100&sort=pushed"),
        ]);
        if (!uRes.ok || !rRes.ok) return;
        const user = await uRes.json();
        const repos: { language: string | null; pushed_at: string; fork: boolean }[] =
          await rRes.json();

        const own = repos.filter((r) => !r.fork);
        const tally = new Map<string, number>();
        for (const r of own) {
          if (!r.language) continue;
          tally.set(r.language, (tally.get(r.language) ?? 0) + 1);
        }

        if (!cancelled) {
          setData({
            repos: user.public_repos ?? own.length,
            languages: [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
            lastPush: own[0]?.pushed_at,
          });
        }
      } catch {
        /* offline or throttled — the fallback still reads correctly */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

export function Services() {
  const gh = useGitHub();
  const langs = gh?.languages?.length ? gh.languages : FALLBACK;
  const max = langs[0][1] || 1;

  return (
    <Section id="services" background="linear-gradient(180deg, var(--night), var(--deep) 55%, var(--night))">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Services"
          title={
            <>
              What I take on
              <br />
              <span className="neon-text">for clients and teams.</span>
            </>
          }
          lede="Tell me what you're building and I'll tell you honestly whether I'm the right person for it — and what I'd do first."
        />

        {/* ---------------- SERVICES ---------------- */}
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              className="glass edge-lit group relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            >
              <span
                className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--grad)", filter: "blur(60px)" }}
                aria-hidden
              />
              <div className="relative">
                <span
                  className="font-mono text-[0.55rem] tracking-[0.2em]"
                  style={{ color: "var(--hot)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="font-display mt-4 text-[clamp(1.25rem,2.6vw,1.7rem)] font-bold leading-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {s.title}
                </h3>

                <p
                  className="mt-3 text-pretty text-[0.97rem] leading-relaxed"
                  style={{ color: "var(--fg-dim)" }}
                >
                  {s.blurb}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-baseline gap-3 text-[0.9rem]"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      <span
                        className="block h-1 w-1 shrink-0 translate-y-[-2px] rounded-full"
                        style={{ background: "var(--hot)" }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ---------------- GITHUB + CERTS ---------------- */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="glass edge-lit h-full rounded-2xl p-7 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="eyebrow">Live from GitHub</span>
                <span
                  className="block h-1.5 w-1.5 rounded-full animate-pulse-soft"
                  style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
                />
              </div>

              <h3
                className="font-display text-[1.35rem] font-bold"
                style={{ color: "var(--fg)" }}
              >
                github.com/{profile.alias}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-6">
                <Figure label="Public repos" value={gh ? String(gh.repos) : "25"} />
                <Figure
                  label="Last push"
                  value={
                    gh?.lastPush
                      ? new Date(gh.lastPush).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Recently"
                  }
                />
              </div>

              <p className="eyebrow mt-8">Most-used languages</p>
              <div className="mt-4 space-y-2.5">
                {langs.map(([lang, n], i) => (
                  <div key={lang} className="flex items-center gap-3">
                    <span
                      className="font-mono w-24 shrink-0 text-[0.6rem] tracking-[0.06em]"
                      style={{ color: "var(--fg-dim)" }}
                    >
                      {lang}
                    </span>
                    <span
                      className="h-1 flex-1 overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.span
                        className="block h-full rounded-full"
                        style={{ background: "var(--grad)" }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(n / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: EASE }}
                      />
                    </span>
                    <span
                      className="font-mono w-5 shrink-0 text-right text-[0.58rem] tabular-nums"
                      style={{ color: "var(--fg-mute)" }}
                    >
                      {n}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono mt-8 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.14em] transition-colors"
                style={{ color: "var(--cool)" }}
              >
                VIEW FULL PROFILE ↗
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass edge-lit h-full rounded-2xl p-7 sm:p-9">
              <span className="eyebrow">Certifications</span>
              <h3
                className="font-display mt-4 text-[1.35rem] font-bold leading-tight"
                style={{ color: "var(--fg)" }}
              >
                Job simulations &amp; coursework
              </h3>

              <ul className="mt-6 space-y-3">
                {certifications.map((c, i) => (
                  <motion.li
                    key={`${c.name}-${c.issuer}`}
                    className="flex items-baseline gap-3 border-b pb-3 last:border-0"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                  >
                    <span
                      className="mt-1.5 block h-1 w-1 shrink-0 rounded-full"
                      style={{
                        background: c.kind === "simulation" ? "var(--hot)" : "var(--cool)",
                      }}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-[0.93rem] leading-snug"
                        style={{ color: "var(--fg)" }}
                      >
                        {c.name}
                      </span>
                      <span
                        className="font-mono block text-[0.55rem] tracking-[0.1em]"
                        style={{ color: "var(--fg-mute)" }}
                      >
                        {c.issuer.toUpperCase()}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display neon-text text-[1.9rem] font-black leading-none">{value}</p>
      <p
        className="font-mono mt-2 text-[0.55rem] tracking-[0.14em]"
        style={{ color: "var(--fg-mute)" }}
      >
        {label.toUpperCase()}
      </p>
    </div>
  );
}
