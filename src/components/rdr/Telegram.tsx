"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, Container } from "./Section";
import { Reveal } from "./Reveal";
import { Dust } from "./Atmosphere";
import { profile } from "@/lib/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Telegram() {
  const [from, setFrom] = useState("");
  const [origin, setOrigin] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site — the wire runs through the visitor's own mail client.
    const subject = `Telegram from ${from || "a stranger"}${origin ? ` (${origin})` : ""}`;
    const lines = [
      body,
      "",
      "—",
      from && `From: ${from}`,
      origin && `Company: ${origin}`,
    ].filter(Boolean);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <Section
      id="telegram"
      background="linear-gradient(180deg, #100C08 0%, #0A0806 55%, #070604 100%)"
    >
      <Dust density={45} />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          {/* ---------- PITCH ---------- */}
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-4">
                <span
                  className="font-type text-[0.58rem] tracking-[0.4em]"
                  style={{ color: "var(--blood-hi)" }}
                >
                  VII
                </span>
                <span className="eyebrow">Send Word</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                className="font-display text-[clamp(2.1rem,6vw,4.2rem)] leading-[0.98] tracking-tight"
                style={{ color: "var(--parchment)" }}
              >
                Got work that
                <br />
                needs doing?
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="font-body mt-6 max-w-lg text-pretty text-[1.05rem] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Freelance projects, full-time roles, or an interesting problem you want a
                second opinion on — the wire is open. I reply to everything, usually within
                a day.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-px" style={{ background: "var(--line-soft)" }}>
                {[
                  { k: "Email", v: profile.email, href: profile.links.email },
                  { k: "WhatsApp", v: profile.phone, href: profile.links.whatsapp },
                  { k: "LinkedIn", v: "in/ashirqureshiaq", href: profile.links.linkedin },
                  { k: "GitHub", v: `@${profile.alias}`, href: profile.links.github },
                ].map((row) => (
                  <li key={row.k} style={{ background: "var(--night)" }}>
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 p-4 transition-colors duration-300 hover:bg-[rgba(216,182,94,0.05)]"
                    >
                      <span
                        className="font-type text-[0.55rem] tracking-[0.28em]"
                        style={{ color: "var(--brass)" }}
                      >
                        {row.k.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-3">
                        <span
                          className="font-body text-[0.95rem] transition-colors group-hover:text-[var(--gold-hi)]"
                          style={{ color: "rgba(230,215,184,0.85)" }}
                        >
                          {row.v}
                        </span>
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: "var(--brass)" }}
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div
                className="mt-8 flex items-center gap-3 border px-5 py-3.5"
                style={{ borderColor: "var(--line)", background: "rgba(110,116,85,0.06)" }}
              >
                <span
                  className="block h-2 w-2 rounded-full"
                  style={{ background: "var(--sage)", boxShadow: "0 0 10px var(--sage)" }}
                />
                <span
                  className="font-type text-[0.58rem] tracking-[0.2em]"
                  style={{ color: "rgba(230,215,184,0.8)" }}
                >
                  AVAILABLE FOR FREELANCE &amp; FULL-TIME · {profile.timezone}
                </span>
              </div>
            </Reveal>
          </div>

          {/* ---------- THE TELEGRAM FORM ---------- */}
          <Reveal delay={0.1}>
            <motion.form
              onSubmit={onSubmit}
              className="paper torn relative px-7 py-9 sm:px-10 sm:py-12"
              initial={{ rotate: 1.4 }}
              whileInView={{ rotate: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <div className="relative z-10">
                <div className="text-center">
                  <p
                    className="font-outlaw text-[clamp(1.1rem,4vw,1.6rem)] leading-none"
                    style={{ color: "#2A1A0C" }}
                  >
                    WESTERN UNION
                  </p>
                  <p
                    className="font-type mt-1.5 text-[0.52rem] tracking-[0.42em]"
                    style={{ color: "#7A5A2A" }}
                  >
                    TELEGRAM
                  </p>
                </div>

                <div
                  className="my-6 h-px w-full"
                  style={{ background: "rgba(122,90,42,0.5)" }}
                />

                <div className="space-y-6">
                  <Field
                    label="From"
                    value={from}
                    onChange={setFrom}
                    placeholder="Your name"
                    required
                  />
                  <Field
                    label="Origin"
                    value={origin}
                    onChange={setOrigin}
                    placeholder="Company or town"
                  />
                  <Field
                    label="Message"
                    value={body}
                    onChange={setBody}
                    placeholder="What needs building?"
                    textarea
                    required
                  />
                </div>

                <div
                  className="mt-7 flex items-center justify-between gap-4 border-t pt-5"
                  style={{ borderColor: "rgba(122,90,42,0.4)" }}
                >
                  <p
                    className="font-type text-[0.46rem] leading-relaxed tracking-[0.14em]"
                    style={{ color: "#7A5A2A" }}
                  >
                    CHARGES PREPAID · DELIVERED
                    <br />
                    VIA YOUR MAIL CLIENT
                  </p>

                  <button
                    type="submit"
                    className="group relative overflow-hidden px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ background: "#7A2118" }}
                  >
                    <span
                      className="font-type relative z-10 text-[0.6rem] tracking-[0.26em]"
                      style={{ color: "#F4EBD8" }}
                    >
                      SEND THE WIRE
                    </span>
                    <span
                      className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      style={{ background: "#5A100A" }}
                      aria-hidden
                    />
                  </button>
                </div>
              </div>

              {/* SENT stamp */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="animate-stamp flex flex-col items-center border-4 px-10 py-5"
                      style={{
                        borderColor: "rgba(122,33,24,0.75)",
                        color: "rgba(122,33,24,0.8)",
                      }}
                    >
                      <span className="font-outlaw text-3xl leading-none">SENT</span>
                      <span className="font-type mt-1 text-[0.5rem] tracking-[0.3em]">
                        CHECK YOUR MAIL CLIENT
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared = {
    value,
    required,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className:
      "font-type w-full border-0 border-b bg-transparent pb-2 pt-1 text-[0.92rem] outline-none transition-colors placeholder:opacity-45 focus:border-[#7A2118]",
    style: {
      color: "#2A1A0C",
      borderColor: "rgba(122,90,42,0.55)",
      borderBottomWidth: 1,
    } as React.CSSProperties,
  };

  return (
    <label className="block">
      <span
        className="font-type mb-2 block text-[0.5rem] tracking-[0.32em]"
        style={{ color: "#7A5A2A" }}
      >
        {label.toUpperCase()}
        {required && <span style={{ color: "#7A2118" }}> *</span>}
      </span>
      {textarea ? (
        <textarea rows={4} {...shared} className={`${shared.className} resize-none`} />
      ) : (
        <input type="text" {...shared} />
      )}
    </label>
  );
}
