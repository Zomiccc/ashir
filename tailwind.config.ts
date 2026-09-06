import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#070604",
        night: "#0C0A07",
        leather: { DEFAULT: "#16120C", light: "#1F1913" },
        dust: "#2C241A",
        parchment: "#E6D7B8",
        paper: { DEFAULT: "#D8C5A0", deep: "#C2AC84" },
        bone: "#F4EBD8",
        gold: { DEFAULT: "#D8B65E", hi: "#F0DFA8" },
        brass: "#A8873C",
        blood: { DEFAULT: "#8E1B12", hi: "#C0392B" },
        ember: "#C1440E",
        sage: "#6E7455",
        muted: "#9A8B6F",
      },
      fontFamily: {
        outlaw: ["var(--font-outlaw)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Georgia", "serif"],
        type: ["var(--font-type)", "Courier New", "monospace"],
      },
      borderRadius: {
        lg: "0.25rem",
        md: "0.125rem",
        sm: "0.0625rem",
      },
      transitionTimingFunction: {
        frontier: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
