"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Motes } from "./Atmosphere";
import { Container, EASE, Reveal, Section } from "./Primitives";
import { profile } from "@/lib/data/profile";

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site — the message goes out through the visitor's own mail client.
    const subject = `Portfolio enquiry from ${name || "a visitor"}${
      company ? ` (${company})` : ""
    }`;
    const body = [message, "", "—", name && `From: ${name}`, company && `Company: ${company}`]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 6000);
  };

  const rows = [
    { k: "Email", v: profile.email, href: profile.links.email },
    { k: "WhatsApp", v: profile.phone, href: profile.links.whatsapp },
    { k: "LinkedIn", v: "in/ashirqureshiaq", href: profile.links.linkedin },
    { k: "GitHub", v: `@${profile.alias}`, href: profile.links.github },
  ];

  return (
    <Section id="contact" background="linear-gradient(180deg, var(--night), var(--void))">
      <Motes count={30} />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          {/* ---------------- PITCH ---------------- */}
          <div>
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[0.62rem]" style={{ color: "var(--hot)" }}>
                  06
                </span>
                <span className="eyebrow">Contact</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                className="font-display text-[clamp(2.1rem,6vw,4.2rem)] font-black leading-[0.98]"
                style={{ color: "var(--fg)" }}
              >
                Let&rsquo;s build
                <br />
                <span className="neon-text">something solid.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p
                className="mt-6 max-w-lg text-pretty text-[1.05rem] leading-relaxed"
                style={{ color: "var(--fg-dim)" }}
              >
                Open to backend and full-stack roles, freelance projects, and interesting
                problems you want a second opinion on. I reply to everything, usually within
                a day.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul
                className="mt-10 overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--line)" }}
              >
                {rows.map((row, i) => (
                  <li
                    key={row.k}
                    className={i > 0 ? "border-t" : ""}
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 p-4 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.03)]"
                    >
                      <span
                        className="font-mono text-[0.58rem] tracking-[0.2em]"
                        style={{ color: "var(--fg-mute)" }}
                      >
                        {row.k.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-3">
                        <span
                          className="text-[0.94rem] transition-colors"
                          style={{ color: "var(--fg)" }}
                        >
                          {row.v}
                        </span>
                        <span
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: "var(--hot)" }}
                        >
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div
                className="mt-6 flex items-center gap-3 rounded-xl border px-5 py-3.5"
                style={{ borderColor: "var(--line)", background: "rgba(74,222,128,0.05)" }}
              >
                <span
                  className="block h-2 w-2 shrink-0 rounded-full animate-pulse-soft"
                  style={{ background: "#4ade80", boxShadow: "0 0 10px #4ade80" }}
                />
                <span
                  className="font-mono text-[0.6rem] tracking-[0.14em]"
                  style={{ color: "var(--fg-dim)" }}
                >
                  AVAILABLE · {profile.location.toUpperCase()} · {profile.timezone}
                </span>
              </div>
            </Reveal>
          </div>

          {/* ---------------- FORM ---------------- */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass edge-lit edge-always relative overflow-hidden rounded-2xl p-7 sm:p-10"
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full"
                style={{ background: "var(--grad)", filter: "blur(70px)", opacity: 0.26 }}
                aria-hidden
              />

              <div className="relative">
                <span className="eyebrow">Send a message</span>
                <h3
                  className="font-display mt-3 text-[1.5rem] font-bold leading-tight"
                  style={{ color: "var(--fg)" }}
                >
                  Tell me what you&rsquo;re building
                </h3>

                <div className="mt-8 space-y-7">
                  <Field label="Name" value={name} onChange={setName} placeholder="Your name" required />
                  <Field
                    label="Company"
                    value={company}
                    onChange={setCompany}
                    placeholder="Optional"
                  />
                  <Field
                    label="Message"
                    value={message}
                    onChange={setMessage}
                    placeholder="A sentence or two about the project or role"
                    textarea
                    required
                  />
                </div>

                <div
                  className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <p
                    className="font-mono max-w-[14rem] text-[0.52rem] leading-relaxed tracking-[0.08em]"
                    style={{ color: "var(--fg-mute)" }}
                  >
                    OPENS IN YOUR MAIL CLIENT — NOTHING IS STORED HERE
                  </p>

                  <button
                    type="submit"
                    className="group relative overflow-hidden rounded-full px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ background: "var(--grad)" }}
                  >
                    <span
                      className="font-mono relative text-[0.66rem] font-semibold tracking-[0.14em]"
                      style={{ color: "#0a0616" }}
                    >
                      SEND MESSAGE →
                    </span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                    style={{ background: "rgba(6,3,13,0.86)", backdropFilter: "blur(6px)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="text-center"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p className="font-display neon-text text-3xl font-black">SENT</p>
                      <p
                        className="font-mono mt-2 text-[0.58rem] tracking-[0.16em]"
                        style={{ color: "var(--fg-dim)" }}
                      >
                        CHECK YOUR MAIL CLIENT
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
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
      "w-full border-0 border-b bg-transparent pb-2.5 pt-1 text-[0.95rem] outline-none transition-colors placeholder:opacity-40 focus:border-[var(--hot)]",
    style: {
      color: "var(--fg)",
      borderColor: "rgba(255,255,255,0.14)",
      borderBottomWidth: 1,
    } as React.CSSProperties,
  };

  return (
    <label className="block">
      <span
        className="font-mono mb-2.5 block text-[0.55rem] tracking-[0.2em]"
        style={{ color: "var(--fg-mute)" }}
      >
        {label.toUpperCase()}
        {required && <span style={{ color: "var(--hot)" }}> *</span>}
      </span>
      {textarea ? (
        <textarea rows={4} {...shared} className={`${shared.className} resize-none`} />
      ) : (
        <input type="text" {...shared} />
      )}
    </label>
  );
}
