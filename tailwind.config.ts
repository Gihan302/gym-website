import type { Config } from "tailwindcss";

// ━━━ STEP 9: tailwind.config.ts ━━━

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold:     "#D5A310",
        brown:    "#292113",
        black:    "#040304",
        charcoal: "#2C2C2C",
        cream:    "#F1F0EB",
      },
      fontFamily: {
        primary: ["var(--font-primary)", "sans-serif"],
      },
      fontSize: {
        hero:  "var(--text-hero)",
        h1:    "var(--text-h1)",
        h2:    "var(--text-h2)",
        h3:    "var(--text-h3)",
        h4:    "var(--text-h4)",
        base:  "var(--text-base)",
        sm:    "var(--text-sm)",
        xs:    "var(--text-xs)",
        label: "var(--text-label)",
      },
      letterSpacing: {
        normal: "var(--tracking-normal)",
        wide:   "var(--tracking-wide)",
        wider:  "var(--tracking-wider)",
        widest: "var(--tracking-widest)",
      },
      lineHeight: {
        tight:  "var(--leading-tight)",
        snug:   "var(--leading-snug)",
        normal: "var(--leading-normal)",
      },
    },
  },
  plugins: [],
};

export default config;
