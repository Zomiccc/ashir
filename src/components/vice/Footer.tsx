"use client";

import { motion } from "framer-motion";
import { Container, EASE } from "./Primitives";
import { RadioTuner } from "./Grade";
import { profile } from "@/lib/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-24" style={{ background: "var(--void)" }}>
      {/* Horizon glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 128%, color-mix(in srgb, var(--hot) 34%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-[-30%] bottom-0 h-48 opacity-40"
        style={{ perspective: "220px", perspectiveOrigin: "50% 0%" }}
        aria-hidden
      >
        <div
          className="grid-floor h-full w-full"
          style={{ transform: "rotateX(74deg)", transformOrigin: "50% 0%" }}
        />
      </div>

      <Container className="relative z-10">
        {/* Brand plate. Sits here rather than mid-page: by the footer the neon
            narrative has closed, so his own blue-branded banner reads as a
            sign-off instead of fighting the palette. */}
        <motion.div
          className="mb-20 overflow-hidden rounded-2xl p-[1.5px]"
          style={{ background: "var(--grad)" }}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <img
            src={profile.banner}
            alt={`${profile.name} — ${profile.tagline} Bridging AI and code, end-to-end solutions.`}
            width={1584}
            height={396}
            loading="lazy"
            className="block w-full rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="pb-20 text-center"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="eyebrow">Still reading?</p>
          <h2
            className="font-display neon-text mx-auto mt-6 max-w-4xl text-[clamp(2rem,7.5vw,5rem)] font-black leading-[0.94]"
          >
            LET&rsquo;S TALK
          </h2>
          <p
            className="mx-auto mt-6 max-w-lg text-pretty text-[1rem] leading-relaxed"
            style={{ color: "var(--fg-dim)" }}
          >
            Whether it&rsquo;s a role, a build, or a system that has started misbehaving —
            the inbox is open.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--grad)" }}
            >
              <span
                className="font-mono text-[0.66rem] font-semibold tracking-[0.14em]"
                style={{ color: "#0a0616" }}
              >
                GET IN TOUCH
              </span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#0a0616" }}
              >
                →
              </span>
            </a>
            <a
              href={profile.cv}
              download
              className="group inline-flex items-center gap-3 rounded-full border px-7 py-3.5"
              style={{ borderColor: "var(--line)" }}
            >
              <span
                className="font-mono text-[0.66rem] font-semibold tracking-[0.14em]"
                style={{ color: "var(--fg)" }}
              >
                DOWNLOAD RÉSUMÉ
              </span>
              <span
                className="block h-px w-5 transition-all duration-300 group-hover:w-9"
                style={{ background: "var(--hot)" }}
              />
            </a>
          </div>
        </motion.div>

        {/* Bottom rail */}
        <div
          className="flex flex-col items-center gap-6 border-t py-8 lg:flex-row lg:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="text-center lg:text-left">
            <p className="font-display text-[0.95rem] font-bold" style={{ color: "var(--fg)" }}>
              Ashir Qureshi
            </p>
            <p
              className="font-mono mt-1 text-[0.55rem] tracking-[0.14em]"
              style={{ color: "var(--fg-mute)" }}
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
                className="font-mono text-[0.6rem] tracking-[0.16em] transition-colors hover:text-[var(--fg)]"
                style={{ color: "var(--fg-mute)" }}
              >
                {l.label.toUpperCase()}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 lg:items-end">
            <RadioTuner compact />
            <p
              className="font-mono text-center text-[0.52rem] tracking-[0.12em] lg:text-right"
              style={{ color: "rgba(133,120,168,0.7)" }}
            >
              © {year} · BUILT WITH NEXT.JS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
