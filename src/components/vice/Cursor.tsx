"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft neon dot with a trailing ring. Deliberately understated — the
 * page already carries plenty of colour.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 1500, damping: 60, mass: 0.2 });
  const dy = useSpring(y, { stiffness: 1500, damping: 60, mass: 0.2 });
  const rx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 220, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(
        !!el?.closest('a, button, [role="button"], [role="radio"], input, textarea, select, [data-hot]')
      );
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div className="cursor-layer" style={{ x: rx, y: ry }}>
        <motion.div
          className="rounded-full border"
          style={{
            borderColor: "var(--hot)",
            marginLeft: -20,
            marginTop: -20,
            width: 40,
            height: 40,
          }}
          animate={{
            scale: down ? 0.72 : hot ? 1.35 : 1,
            opacity: hot ? 0.95 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </motion.div>

      {/* Leading dot */}
      <motion.div className="cursor-layer" style={{ x: dx, y: dy }}>
        <motion.div
          className="rounded-full"
          style={{ marginLeft: -3, marginTop: -3, background: "var(--cool)" }}
          animate={{
            width: hot ? 4 : 6,
            height: hot ? 4 : 6,
            boxShadow: hot ? "0 0 12px var(--cool)" : "0 0 6px var(--cool)",
          }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
    </>
  );
}
