"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDeadEye } from "./DeadEye";

/**
 * The aiming reticle — replaces the pointer on fine-pointer devices.
 * Snaps wider and turns red over anything you can act on.
 */
export function Reticle() {
  const { active: deadEye } = useDeadEye();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.25 });
  // The outer ring lags slightly — gives the aim a little weight.
  const lx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ly = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHot(
        !!el?.closest(
          'a, button, [role="button"], input, textarea, select, [data-hot]'
        )
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

  const tint = deadEye ? "#FF5A45" : hot ? "#E8503C" : "#D8B65E";
  const ring = hot ? 34 : 22;

  return (
    <>
      {/* Outer ring with tick marks */}
      <motion.div className="reticle" style={{ x: lx, y: ly }}>
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{ marginLeft: -40, marginTop: -40 }}
          animate={{
            scale: down ? 0.82 : 1,
            rotate: deadEye ? 45 : 0,
            opacity: hot ? 1 : 0.72,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        >
          <motion.circle
            cx="40"
            cy="40"
            r={ring}
            fill="none"
            stroke={tint}
            strokeWidth="1"
            animate={{ r: ring }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
          {[0, 90, 180, 270].map((deg) => (
            <motion.line
              key={deg}
              x1="40"
              y1={40 - ring - 8}
              x2="40"
              y2={40 - ring - 2}
              stroke={tint}
              strokeWidth="1.4"
              style={{ transformOrigin: "40px 40px", rotate: deg }}
              animate={{ y1: 40 - ring - 8, y2: 40 - ring - 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Centre dot — tracks the pointer almost exactly */}
      <motion.div className="reticle" style={{ x: sx, y: sy }}>
        <motion.div
          className="rounded-full"
          animate={{
            width: hot ? 5 : 6,
            height: hot ? 5 : 6,
            backgroundColor: tint,
          }}
          style={{ marginLeft: -3, marginTop: -3 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  );
}
