"use client";

import { motion } from "framer-motion";
import { Embers } from "./Atmosphere";
import { Container } from "./Section";
import { profile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-28"
      style={{ background: "linear-gradient(180deg, #070604 0%, #0C0806 60%, #140C06 100%)" }}
    >
      {/* Campfire glow on the horizon */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(58% 100% at 50% 118%, rgba(193,68,14,0.3), rgba(122,33,24,0.09) 45%, transparent 72%)",
        }}
        aria-hidden
      />
      <Embers count={22} />

      <Container className="relative z-10">
        {/* End of chapter card */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="rule-ornate mx-auto max-w-md">
            <span
              className="font-type shrink-0 text-[0.52rem] tracking-[0.44em]"
              style={{ color: "var(--brass)" }}
            >
              END OF CHAPTER
            </span>
          </div>

          <h2
            className="font-outlaw mt-8 text-[clamp(1.8rem,7vw,4rem)] leading-none"
            style={{ color: "var(--parchment)", opacity: 0.92 }}
          >
            THE STORY CONTINUES
          </h2>

          <p
            className="font-body mx-auto mt-5 max-w-lg text-pretty text-[1rem] italic"
            style={{ color: "var(--muted)" }}
          >
            &ldquo;Some things are worth building slowly. Most things are worth building
            twice.&rdquo;
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#telegram"
              className="group inline-flex items-center gap-3 border px-7 py-3.5 transition-colors duration-300"
              style={{ borderColor: "var(--gold)", background: "rgba(216,182,94,0.06)" }}
            >
              <span
                className="font-type text-[0.62rem] tracking-[0.26em]"
                style={{ color: "var(--gold-hi)" }}
              >
                START A CONVERSATION
              </span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "var(--gold-hi)" }}
              >
                →
              </span>
            </a>
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-2 py-3.5"
            >
              <span
                className="font-type text-[0.62rem] tracking-[0.26em]"
                style={{ color: "var(--parchment)" }}
              >
                TAKE THE CV
              </span>
              <span
                className="block h-px w-6 transition-all duration-300 group-hover:w-12"
                style={{ background: "var(--brass)" }}
              />
            </a>
          </div>
        </motion.div>

        {/* Bottom rail */}
        <div
          className="flex flex-col items-center gap-6 border-t py-9 sm:flex-row sm:justify-between"
          style={{ borderColor: "var(--line-soft)" }}
        >
          <div className="text-center sm:text-left">
            <p
              className="font-display text-sm tracking-[0.24em]"
              style={{ color: "var(--parchment)" }}
            >
              ASHIR QURESHI
            </p>
            <p
              className="font-type mt-1 text-[0.52rem] tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {profile.location.toUpperCase()} · {profile.timezone}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {[
              { label: "GitHub", href: profile.links.github },
              { label: "LinkedIn", href: profile.links.linkedin },
              { label: "Email", href: profile.links.email },
              { label: "WhatsApp", href: profile.links.whatsapp },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="font-type text-[0.58rem] tracking-[0.24em] transition-colors hover:text-[var(--gold-hi)]"
                style={{ color: "var(--brass)" }}
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </nav>

          <p
            className="font-type text-center text-[0.5rem] tracking-[0.18em] sm:text-right"
            style={{ color: "rgba(154,139,111,0.55)" }}
          >
            © {new Date().getFullYear()} ASHIR QURESHI
            <br />
            BUILT WITH NEXT.JS · NO HORSES HARMED
          </p>
        </div>
      </Container>
    </footer>
  );
}
