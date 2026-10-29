import type { Config } from "tailwindcss";

// Tokens follow the ElevenLabs benchmark: near-white warm canvas, achromatic
// palette, whisper-level layered shadows, pill buttons. Colours are CSS
// variables (globals.css) so light and dark mode swap in one place.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: token("ink"),
        body: token("body"),
        muted: token("muted"),
        surface: token("surface"),
        stone: token("stone"),
        line: token("line"),
        canvas: token("canvas"),
        card: token("card"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 0 0 1px rgb(var(--ink) / 0.06), 0 1px 2px rgb(0 0 0 / 0.04), 0 2px 4px rgb(0 0 0 / 0.04)",
        pill: "0 0 0 1px rgb(var(--ink) / 0.08), 0 4px 4px rgb(0 0 0 / 0.04)",
        warm: "0 6px 16px rgba(78,50,23,0.04)",
        edge: "inset 0 0 0 0.5px rgb(var(--ink) / 0.075)",
      },
      letterSpacing: {
        body: "0.01em",
      },
    },
  },
  plugins: [],
} satisfies Config;
