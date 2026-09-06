"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Section, Container, SectionHeading } from "./Section";
import { Reveal } from "./Reveal";
import { services } from "@/lib/data/arsenal";
import { certifications } from "@/lib/data/trail";
import { profile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

interface GhStats {
  repos: number;
  followers: number;
  languages: [string, number][];
  lastPush?: string;
}

/** Live GitHub numbers, fetched client-side. Falls back silently if rate-limited. */
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
        const languages = [...tally.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

        if (!cancelled) {
          setData({
            repos: user.public_repos ?? own.length,
            followers: user.followers ?? 0,
            languages,
            lastPush: own[0]?.pushed_at,
          });
        }
      } catch {
        /* offline or rate-limited — the static fallback below still reads well */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

export function Ledger() {
  const gh = useGitHub();

  return (
    <Section
      id="ledger"
      background="linear-gradient(180deg, #0C0A07 0%, #0A0806 40%, #100C08 100%)"
    >
      <Container>
        <SectionHeading
          chapter="VI"
          eyebrow="The Camp Ledger"
          title="What you can hire me for"
          lede="Straightforward terms. Pick the work, and I will tell you honestly whether I'm the right person for it."
        />

        {/* ---------- SERVICES ---------- */}
        <div className="grid gap-px sm:grid-cols-2" style={{ background: "var(--line-soft)" }}>
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              className="group relative overflow-hidden p-8 sm:p-10"
              style={{ background: "var(--night)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(80% 60% at 20% 0%, rgba(216,182,94,0.08), transparent 70%)",
                }}
                aria-hidden
              />

              <div className="relative">
                <div className="mb-4 flex items-baseline justify-between gap-4">
                  <span
                    className="font-type text-[0.5rem] tracking-[0.3em]"
                    style={{ color: "var(--brass)" }}
                  >
                    NO. {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-type text-[0.5rem] tracking-[0.2em]"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.price.toUpperCase()}
                  </span>
                </div>

                <h3
                  className="font-display text-[clamp(1.3rem,3vw,1.85rem)] leading-tight transition-colors duration-300 group-hover:text-[var(--gold-hi)]"
                  style={{ color: "var(--parchment)" }}
                >
                  {s.title}
                </h3>

                <p
                  className="font-body mt-3 text-pretty text-[0.98rem] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {s.blurb}
                </p>

                <ul className="mt-6 space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="font-body flex items-baseline gap-3 text-[0.9rem]"
                      style={{ color: "rgba(230,215,184,0.7)" }}
                    >
                      <span style={{ color: "var(--brass)" }}>—</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ---------- GITHUB + PAPERS ---------- */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Live from the wire */}
          <Reveal>
            <div className="leather corners h-full p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-4">
                <span className="eyebrow">Live from the wire</span>
                <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                <span
                  className="block h-1.5 w-1.5 rounded-full animate-flicker"
                  style={{ background: "#C1440E", boxShadow: "0 0 8px #C1440E" }}
                />
              </div>

              <h3
                className="font-display text-[1.6rem] leading-tight"
                style={{ color: "var(--parchment)" }}
              >
                github.com/{profile.alias}
              </h3>

              <div className="mt-7 grid grid-cols-2 gap-6">
                <Figure label="Public Repos" value={gh ? String(gh.repos) : "25"} />
                <Figure
                  label="Last Push"
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

              <p
                className="font-type mt-8 text-[0.5rem] tracking-[0.3em]"
                style={{ color: "var(--brass)" }}
              >
                MOST-USED LANGUAGES
              </p>
              <div className="mt-4 space-y-2.5">
                {(gh?.languages ?? FALLBACK_LANGS).map(([lang, n], i) => {
                  const max = (gh?.languages ?? FALLBACK_LANGS)[0][1] || 1;
                  return (
                    <div key={lang} className="flex items-center gap-3">
                      <span
                        className="font-type w-24 shrink-0 text-[0.58rem] tracking-[0.1em]"
                        style={{ color: "rgba(230,215,184,0.72)" }}
                      >
                        {lang}
                      </span>
                      <span
                        className="h-[3px] flex-1 overflow-hidden"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                      >
                        <motion.span
                          className="block h-full"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--brass), var(--gold-hi))",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(n / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
                        />
                      </span>
                      <span
                        className="font-type w-6 shrink-0 text-right text-[0.55rem]"
                        style={{ color: "var(--muted)" }}
                      >
                        {n}
                      </span>
                    </div>
                  );
                })}
              </div>

              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-type mt-8 inline-flex items-center gap-2 text-[0.6rem] tracking-[0.24em] transition-colors hover:text-[var(--gold-hi)]"
                style={{ color: "var(--gold)" }}
              >
                OPEN THE FULL RECORD ↗
              </a>
            </div>
          </Reveal>

          {/* Papers */}
          <Reveal delay={0.1}>
            <div className="h-full">
              <div className="mb-6 flex items-center gap-4">
                <span className="eyebrow">Papers &amp; Schooling</span>
                <span className="h-px flex-1" style={{ background: "var(--line)" }} />
              </div>

              <div
                className="mb-8 border-l-2 pl-6"
                style={{ borderColor: "var(--gold)" }}
              >
                <h3
                  className="font-display text-[1.35rem] leading-tight"
                  style={{ color: "var(--parchment)" }}
                >
                  BS Computer Science
                </h3>
                <p className="font-body text-[0.98rem]" style={{ color: "var(--gold)" }}>
                  Capital University of Science &amp; Technology
                </p>
                <p
                  className="font-type mt-1 text-[0.55rem] tracking-[0.2em]"
                  style={{ color: "var(--muted)" }}
                >
                  ISLAMABAD · EXPECTED 2027
                </p>
              </div>

              <ul className="space-y-px" style={{ background: "var(--line-soft)" }}>
                {certifications.map((c, i) => (
                  <motion.li
                    key={`${c.name}-${c.issuer}`}
                    className="group flex items-baseline gap-4 p-4 transition-colors duration-300 hover:bg-[rgba(216,182,94,0.04)]"
                    style={{ background: "var(--night)" }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  >
                    <span
                      className="font-type shrink-0 text-[0.5rem]"
                      style={{ color: "var(--brass)" }}
                    >
                      {c.kind === "virtual-experience" ? "◆" : "◇"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="font-body block text-[0.95rem] leading-snug"
                        style={{ color: "rgba(230,215,184,0.85)" }}
                      >
                        {c.name}
                      </span>
                      <span
                        className="font-type block text-[0.52rem] tracking-[0.16em]"
                        style={{ color: "var(--muted)" }}
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

const FALLBACK_LANGS: [string, number][] = [
  ["Python", 6],
  ["JavaScript", 6],
  ["TypeScript", 3],
  ["HTML", 4],
  ["CSS", 2],
  ["PowerShell", 1],
];

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-[1.9rem] leading-none" style={{ color: "var(--gold)" }}>
        {value}
      </p>
      <p
        className="font-type mt-2 text-[0.5rem] tracking-[0.24em]"
        style={{ color: "var(--brass)" }}
      >
        {label.toUpperCase()}
      </p>
    </div>
  );
}
