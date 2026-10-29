import type { Config } from "tailwindcss";

// Tokens follow the ElevenLabs benchmark: near-white warm canvas, achromatic
// palette, whisper-level layered shadows, pill buttons.
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        body: "#4e4e4e",
        muted: "#777169",
        surface: "#f5f5f5",
        stone: "#f5f2ef",
        line: "#e5e5e5",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04)",
        pill: "0 0 1px rgba(0,0,0,0.4), 0 4px 4px rgba(0,0,0,0.04)",
        warm: "0 6px 16px rgba(78,50,23,0.04)",
        edge: "inset 0 0 0 0.5px rgba(0,0,0,0.075)",
      },
      letterSpacing: {
        body: "0.01em",
      },
    },
  },
  plugins: [],
} satisfies Config;
