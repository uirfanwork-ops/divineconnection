import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#F4EDE3",
        sand: "#C9B89C",
        sandSoft: "#EAE1D0",
        stone: "#A89377",
        clay: "#8B6F47",
        amber: "#D4A574",
        mist: "#8B8278",
        mistBone: "#EDE7DC",
        ink: "#1F1A14",
        hairline: "rgba(31,26,20,0.18)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Tiempos Headline",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "Neue Haas Grotesk Display",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1.4", letterSpacing: "0.22em" }],
        caption: ["13px", { lineHeight: "1.5" }],
        body: ["16px", { lineHeight: "1.65" }],
        "body-lg": ["24px", { lineHeight: "1.5" }],
        h3: ["28px", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        wordmark: "0.04em",
        nav: "0.18em",
        eyebrow: "0.22em",
        hero: "0.32em",
        tight: "-0.02em",
        tighter: "-0.025em",
      },
      maxWidth: {
        page: "1440px",
        prose: "580px",
        proseLg: "720px",
      },
      spacing: {
        gutter: "96px",
        "gutter-md": "64px",
        "gutter-sm": "32px",
        "section-y": "96px",
        "section-y-sm": "56px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
export default config;
