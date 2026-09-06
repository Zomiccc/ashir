"use client";

import { useEffect, useRef } from "react";

/** Film grain, vignette, and warm colour wash — always on, always subtle. */
export function Atmosphere() {
  return (
    <>
      <div className="grain-layer" aria-hidden />
      <div className="warm-wash" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

interface DustProps {
  /** Particle count. Scaled down automatically on small screens. */
  density?: number;
  className?: string;
}

/**
 * Drifting dust motes on a canvas — the air of the frontier.
 * Pauses when off-screen and respects reduced-motion.
 */
export function Dust({ density = 70, className = "" }: DustProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    interface Mote {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      tw: number;
    }
    let motes: Mote[] = [];

    const seed = () => {
      const count = Math.round(
        density * (window.innerWidth < 768 ? 0.45 : 1)
      );
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.7 + 0.35,
        vx: (Math.random() - 0.35) * 0.16,
        vy: -(Math.random() * 0.14 + 0.02),
        a: Math.random() * 0.4 + 0.08,
        tw: Math.random() * Math.PI * 2,
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

    function draw() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.tw += 0.018;
        if (m.y < -8) {
          m.y = h + 8;
          m.x = Math.random() * w;
        }
        if (m.x < -8) m.x = w + 8;
        if (m.x > w + 8) m.x = -8;

        const alpha = m.a * (0.55 + 0.45 * Math.sin(m.tw));
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 214, 176, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    if (!reduced) raf = requestAnimationFrame(draw);
    else {
      // Draw one static frame so the texture is still present.
      for (const m of motes) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 214, 176, ${m.a})`;
        ctx.fill();
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}

/** Rising campfire embers — used in the footer. */
export function Embers({ count = 18 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = (i * 0.73) % 6;
        const dur = 4.5 + ((i * 1.3) % 4);
        const size = 1.5 + ((i * 0.7) % 2.5);
        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: i % 3 === 0 ? "var(--gold-hi)" : "var(--ember)",
              boxShadow: `0 0 ${size * 3}px var(--ember)`,
              animation: `ember-rise ${dur}s linear ${delay}s infinite`,
              ["--dx" as string]: `${((i % 5) - 2) * 18}px`,
            }}
          />
        );
      })}
    </div>
  );
}
