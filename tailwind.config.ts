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
        heading: token("--heading"),
        body: token("--body"),
        muted: token("--muted"),
        subtle: token("--subtle"),
        accent: {
          DEFAULT: token("--accent"),
          fg: token("--accent-fg"),
          strong: token("--accent-strong"),
        },
        positive: token("--positive"),
        danger: token("--danger"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      maxWidth: {
        page: "64rem",
        prose: "68ch",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        caret: "caret 1.05s steps(1, end) infinite",
        orbit: "spin 70s linear infinite",
        "orbit-reverse": "spin 70s linear infinite reverse",
        "orbit-slow": "spin 110s linear infinite reverse",
        "orbit-slow-reverse": "spin 110s linear infinite",
        "pulse-soft": "pulseSoft 2.4s ease-in-out infinite",
      },
      keyframes: {
        caret: {
          "0%, 55%": { opacity: "1" },
          "56%, 100%": { opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
