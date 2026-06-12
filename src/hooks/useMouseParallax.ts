"use client";

import { useState, useEffect, useCallback } from "react";

interface ParallaxState {
  x: number;
  y: number;
}

export function useMouseParallax(intensity: number = 0.05): ParallaxState {
  const [position, setPosition] = useState<ParallaxState>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      setPosition({ x, y });
    },
    [intensity]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
