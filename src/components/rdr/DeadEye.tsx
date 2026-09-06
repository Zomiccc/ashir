"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DeadEyeCtx {
  active: boolean;
  toggle: () => void;
  charge: number;
}

const Ctx = createContext<DeadEyeCtx>({ active: false, toggle: () => {}, charge: 100 });

export const useDeadEye = () => useContext(Ctx);

/**
 * Dead Eye drains while held and refills when released — same rhythm as the game.
 * Toggle with the on-screen button or the "E" key.
 */
export function DeadEyeProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [charge, setCharge] = useState(100);

  const toggle = useCallback(() => setActive((a) => !a), []);

  // Keyboard shortcut — ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (t?.isContentEditable) return;
      if (e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setActive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Drain / refill loop.
  useEffect(() => {
    const id = window.setInterval(() => {
      setCharge((c) => {
        if (active) {
          const next = c - 1.6;
          if (next <= 0) {
            setActive(false);
            return 0;
          }
          return next;
        }
        return Math.min(100, c + 0.9);
      });
    }, 90);
    return () => window.clearInterval(id);
  }, [active]);

  // Apply the cinematic filter to the page shell.
  useEffect(() => {
    const el = document.getElementById("page-shell");
    if (!el) return;
    el.classList.toggle("dead-eye-active", active);
    el.classList.toggle("dead-eye-off", !active);
  }, [active]);

  const value = useMemo(() => ({ active, toggle, charge }), [active, toggle, charge]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            key="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="deadeye-veil"
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/** The Dead Eye HUD — meter, label, and the toggle itself. */
export function DeadEyeToggle() {
  const { active, toggle, charge } = useDeadEye();

  return (
    <div className="pointer-events-auto flex items-center gap-3">
      <button
        onClick={toggle}
        aria-pressed={active}
        aria-label="Toggle Dead Eye mode"
        className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
        style={{
          borderColor: active ? "var(--blood-hi)" : "var(--line)",
          background: active ? "rgba(142,27,18,0.25)" : "rgba(12,10,7,0.65)",
          backdropFilter: "blur(6px)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" strokeWidth="1.4">
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke={active ? "var(--blood-hi)" : "var(--gold)"}
            opacity="0.9"
          />
          <circle cx="12" cy="12" r="2.4" fill={active ? "var(--blood-hi)" : "var(--gold)"} />
          <path
            d="M12 1.4v3.2M12 19.4v3.2M1.4 12h3.2M19.4 12h3.2"
            stroke={active ? "var(--blood-hi)" : "var(--gold)"}
          />
        </svg>
        {active && (
          <span
            className="absolute inset-0 animate-ping rounded-full border"
            style={{ borderColor: "var(--blood-hi)" }}
          />
        )}
      </button>

      <div className="hidden w-28 sm:block">
        <div className="mb-1 flex items-baseline justify-between">
          <span
            className="font-type text-[0.55rem] tracking-[0.3em]"
            style={{ color: active ? "var(--blood-hi)" : "var(--brass)" }}
          >
            DEAD EYE
          </span>
          <span className="font-type text-[0.55rem]" style={{ color: "var(--muted)" }}>
            E
          </span>
        </div>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: active
                ? "linear-gradient(90deg, var(--blood), var(--blood-hi))"
                : "linear-gradient(90deg, var(--brass), var(--gold-hi))",
            }}
            animate={{ width: `${charge}%` }}
            transition={{ duration: 0.15, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
