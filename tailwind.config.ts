import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        card: "var(--card)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          soft: "var(--accent-soft)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          soft: "var(--amber-soft)",
        },
        focus: {
          DEFAULT: "var(--focus-color)",
          soft: "var(--focus-soft)",
        },
        calm: {
          DEFAULT: "var(--calm-color)",
          soft: "var(--calm-soft)",
        },
        visual: {
          DEFAULT: "var(--visual-color)",
          soft: "var(--visual-soft)",
        },
        reading: {
          DEFAULT: "var(--reading-color)",
          soft: "var(--reading-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-cairo)", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 16px -4px rgba(28, 27, 25, 0.08)",
        card: "0 4px 24px -6px rgba(28, 27, 25, 0.10)",
        lift: "0 12px 32px -8px rgba(28, 27, 25, 0.16)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
