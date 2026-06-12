"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 h-[2px] bg-accent z-[90] origin-left"
      style={{ width: `${progress * 100}%` }}
      transition={{ type: "tween", ease: "linear", duration: 0.1 }}
    />
  );
}
