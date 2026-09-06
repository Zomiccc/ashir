"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./Primitives";

/**
 * A short load-in: the name resolves out of a gradient wash, then the
 * panel splits and clears. Kept under two seconds — nobody should wait
 * to read a CV.
 */
export function Intro() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setPhase(1), 1500);
    const t2 = window.setTimeout(() => {
      setPhase(2);
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }, 2350);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Split panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2"
            style={{ background: "var(--void)" }}
            animate={{ y: phase >= 1 ? "-100%" : "0%" }}
            transition={{ duration: 0.85, ease: EASE }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "var(--void)" }}
            animate={{ y: phase >= 1 ? "100%" : "0%" }}
            transition={{ duration: 0.85, ease: EASE }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6"
            animate={{ opacity: phase >= 1 ? 0 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.div
              className="absolute h-[46vmin] w-[46vmin] rounded-full"
              style={{ background: "var(--grad)", filter: "blur(90px)", opacity: 0.32 }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.32 }}
              transition={{ duration: 1.5, ease: EASE }}
            />

            <motion.p
              className="font-mono relative mb-5 text-[0.6rem] tracking-[0.4em]"
              style={{ color: "var(--hot)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              ISLAMABAD · PAKISTAN
            </motion.p>

            <motion.h1
              className="font-display neon-text relative text-center text-[clamp(2.2rem,10vw,6rem)] leading-none"
              initial={{ opacity: 0, scale: 1.08, filter: "blur(18px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              ASHIR QURESHI
            </motion.h1>

            <motion.div
              className="relative mt-8 h-[2px] w-40 overflow-hidden rounded-full sm:w-64"
              style={{ background: "rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full"
                style={{ background: "var(--grad)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.35, ease: EASE }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
