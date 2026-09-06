"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening. Black screen, a slow burn-in of the name, a chapter card,
 * then the curtain lifts — the way the game opens on a snowfield.
 */
export function Boot() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setPhase(1), 1500); // chapter card
    const t2 = window.setTimeout(() => setPhase(2), 3100); // curtain lift
    const t3 = window.setTimeout(() => {
      setPhase(3);
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }, 4000);

    const bar = window.setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + Math.random() * 9 + 3));
    }, 110);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearInterval(bar);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--black)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Slow warm bloom behind everything */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 52%, rgba(193,68,14,0.14), transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3.2, ease: EASE }}
          />

          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="name"
                className="relative flex flex-col items-center px-6 text-center"
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <motion.p
                  className="eyebrow mb-6"
                  initial={{ opacity: 0, letterSpacing: "1em" }}
                  animate={{ opacity: 1, letterSpacing: "0.42em" }}
                  transition={{ duration: 1.6, ease: EASE }}
                >
                  A Rockstar of a Portfolio
                </motion.p>

                <motion.h1
                  className="font-outlaw gold-text text-[clamp(2rem,9vw,5.5rem)] leading-none"
                  initial={{ opacity: 0, scale: 1.14, filter: "blur(16px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.9, ease: EASE }}
                >
                  ASHIR QURESHI
                </motion.h1>

                <motion.div
                  className="mt-8 h-px w-56 sm:w-80"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--brass), transparent)",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
                />
              </motion.div>
            )}

            {phase >= 1 && (
              <motion.div
                key="chapter"
                className="relative px-6 text-center"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE }}
              >
                <p
                  className="font-type text-[0.62rem] tracking-[0.55em]"
                  style={{ color: "var(--brass)" }}
                >
                  CHAPTER I
                </p>
                <h2
                  className="font-display mt-4 text-[clamp(1.5rem,4.5vw,2.75rem)] tracking-wide"
                  style={{ color: "var(--parchment)" }}
                >
                  Colter, 1899
                </h2>
                <p
                  className="font-body mx-auto mt-4 max-w-md text-sm italic"
                  style={{ color: "var(--muted)" }}
                >
                  Every good story starts somewhere cold. This one starts with a
                  compiler error.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading rule */}
          <div className="absolute bottom-16 left-1/2 w-[min(78vw,26rem)] -translate-x-1/2">
            <div className="mb-3 flex items-center justify-between">
              <span
                className="font-type text-[0.55rem] tracking-[0.32em]"
                style={{ color: "var(--brass)" }}
              >
                SADDLING UP
              </span>
              <span
                className="font-type text-[0.55rem] tabular-nums"
                style={{ color: "var(--muted)" }}
              >
                {Math.min(100, Math.round(pct))}%
              </span>
            </div>
            <div
              className="h-px w-full"
              style={{ background: "rgba(168,135,60,0.22)" }}
            >
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--brass), var(--gold-hi))",
                  boxShadow: "0 0 12px rgba(216,182,94,0.6)",
                }}
                animate={{ width: `${Math.min(100, pct)}%` }}
                transition={{ duration: 0.25, ease: "linear" }}
              />
            </div>
          </div>

          {/* Curtain lift */}
          {phase >= 2 && (
            <>
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2"
                style={{ background: "var(--black)" }}
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{ background: "var(--black)" }}
                initial={{ y: 0 }}
                animate={{ y: "100%" }}
                transition={{ duration: 1.1, ease: EASE }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
