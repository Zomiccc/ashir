"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";

export type Grade = "vice" | "sunset" | "midnight";

export const GRADES: { id: Grade; station: string; name: string; dot: string }[] = [
  { id: "vice", station: "98.3", name: "Vice", dot: "#ff2e88" },
  { id: "sunset", station: "104.7", name: "Sunset", dot: "#ff7a2f" },
  { id: "midnight", station: "88.1", name: "Midnight", dot: "#7c5cff" },
];

interface Ctx {
  grade: Grade;
  setGrade: (g: Grade) => void;
  cycle: () => void;
}

const GradeCtx = createContext<Ctx>({
  grade: "vice",
  setGrade: () => {},
  cycle: () => {},
});

export const useGrade = () => useContext(GradeCtx);

const KEY = "aq-grade";

/**
 * Colour grades, framed the way a GTA player would meet them — as radio
 * stations. The choice is remembered per visitor.
 */
export function GradeProvider({ children }: { children: React.ReactNode }) {
  const [grade, setGradeState] = useState<Grade>("vice");

  // Restore the visitor's last station. Storage can throw in private modes.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Grade | null;
      if (saved && GRADES.some((g) => g.id === saved)) setGradeState(saved);
    } catch {
      /* no stored preference available — the default stands */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-grade", grade);
    try {
      localStorage.setItem(KEY, grade);
    } catch {
      /* not persistable here; the session still works */
    }
  }, [grade]);

  const setGrade = useCallback((g: Grade) => setGradeState(g), []);
  const cycle = useCallback(
    () =>
      setGradeState((g) => {
        const i = GRADES.findIndex((x) => x.id === g);
        return GRADES[(i + 1) % GRADES.length].id;
      }),
    []
  );

  // "R" cycles stations, ignored while typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (t?.isContentEditable) return;
      if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        cycle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  const value = useMemo(() => ({ grade, setGrade, cycle }), [grade, setGrade, cycle]);
  return <GradeCtx.Provider value={value}>{children}</GradeCtx.Provider>;
}

/** The tuner itself — three stations, one active. */
export function RadioTuner({ compact = false }: { compact?: boolean }) {
  const { grade, setGrade } = useGrade();

  return (
    <div className="flex items-center gap-2.5">
      {!compact && (
        <span
          className="font-mono hidden text-[0.55rem] tracking-[0.22em] lg:block"
          style={{ color: "var(--fg-mute)" }}
        >
          RADIO
        </span>
      )}
      <div
        className="flex items-center gap-1 rounded-full border p-1"
        style={{ borderColor: "var(--line)", background: "rgba(6,3,13,0.55)" }}
        role="radiogroup"
        aria-label="Colour theme"
      >
        {GRADES.map((g) => {
          const on = g.id === grade;
          return (
            <button
              key={g.id}
              onClick={() => setGrade(g.id)}
              role="radio"
              aria-checked={on}
              aria-label={`${g.name} theme, ${g.station} FM`}
              title={`${g.station} — ${g.name}`}
              className="relative flex h-7 items-center gap-1.5 rounded-full px-2.5 transition-colors duration-300"
            >
              {on && (
                <motion.span
                  layoutId="station-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "color-mix(in srgb, var(--hot) 20%, transparent)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className="relative block h-1.5 w-1.5 rounded-full transition-transform duration-300"
                style={{
                  background: g.dot,
                  boxShadow: on ? `0 0 8px ${g.dot}` : "none",
                  transform: on ? "scale(1.2)" : "scale(0.85)",
                  opacity: on ? 1 : 0.5,
                }}
              />
              <span
                className="font-mono relative hidden text-[0.55rem] tracking-[0.1em] sm:block"
                style={{ color: on ? "var(--fg)" : "var(--fg-mute)" }}
              >
                {g.station}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
