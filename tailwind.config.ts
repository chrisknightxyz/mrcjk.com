import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111110",
        cream: "#F5F1E8",
        paper: "#FFFDF8",
        accent: "#FF5B2E",
        lime: "#D9F26B",
        muted: "#5F5B53",
        line: "#E3DDCF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
