import type { Config } from "tailwindcss";

/**
 * Every color is a CSS variable holding an `R G B` triplet, so Tailwind's
 * `/<alpha-value>` opacity syntax keeps working (`bg-surface/60`) while a single
 * `.dark` class swaps the whole palette. Tokens live in app/globals.css.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: token("--canvas"),
        surface: token("--surface"),
        surface2: token("--surface-2"),
        line: token("--line"),
        line2: token("--line-strong"),
        fg: token("--fg"),
        muted: token("--muted"),
        subtle: token("--subtle"),
        accent: {
          DEFAULT: token("--accent"),
          fg: token("--accent-fg"),
          soft: token("--accent-soft"),
          strong: token("--accent-strong"),
        },
        accent2: token("--accent-2"),
        positive: token("--positive"),
        danger: token("--danger"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-sm": ["clamp(2.25rem, 6vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        display: ["clamp(2.75rem, 9vw, 5.5rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        page: "76rem",
        prose: "68ch",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.12)",
        lift: "0 1px 2px rgb(0 0 0 / 0.05), 0 24px 48px -24px rgb(0 0 0 / 0.35)",
        glow: "0 0 0 1px rgb(var(--accent) / 0.25), 0 16px 48px -20px rgb(var(--accent) / 0.5)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        drift: "drift 26s ease-in-out infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "spin-slow": "spin 24s linear infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%, 4%, 0) scale(0.94)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
