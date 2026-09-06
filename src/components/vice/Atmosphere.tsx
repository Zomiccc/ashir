"use client";

import { useEffect, useRef } from "react";

/** Grain, scanlines, vignette. Always on, always quiet. */
export function Atmosphere() {
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

/**
 * Slow-drifting light motes. Reads as humid night air rather than snow —
 * few particles, low opacity, no sparkle.
 */
export function Motes({ count = 46, className = "" }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;

    interface Mote {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      hue: number;
    }
    let motes: Mote[] = [];

    const seed = () => {
      const n = Math.round(count * (window.innerWidth < 768 ? 0.5 : 1));
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.14,
        vy: -(Math.random() * 0.12 + 0.02),
        a: Math.random() * 0.35 + 0.06,
        hue: Math.random() > 0.5 ? 320 : 190,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !reduced) raf = requestAnimationFrame(draw);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    function paint(m: Mote, alpha: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${m.hue}, 90%, 72%, ${alpha})`;
      ctx.fill();
    }

    function draw() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -6) {
          m.y = h + 6;
          m.x = Math.random() * w;
        }
        if (m.x < -6) m.x = w + 6;
        if (m.x > w + 6) m.x = -6;
        paint(m, m.a);
      }
      raf = requestAnimationFrame(draw);
    }

    if (!reduced) raf = requestAnimationFrame(draw);
    else motes.forEach((m) => paint(m, m.a));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
