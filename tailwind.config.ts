import type { Config } from "tailwindcss";

/**
 * FOUNDA DESIGN TOKENS — Direction A "Trusted Corporate" + dark variant.
 * Every visual decision lives HERE. No random styles anywhere else. (Design Token Rule)
 * Radius scale: 3 values only. Shadow scale: 2 values only. Motion: 2 easings, 4 durations.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        sm: "var(--radius-sm)", // 6px  — inputs, badges
        md: "var(--radius-md)", // 10px — cards
        lg: "var(--radius-lg)", // 14px — hero panels, modals
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)", // hover state: 2px lift + this, nothing louder
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",  // entrances
        inout: "cubic-bezier(0.65, 0, 0.35, 1)", // toggles, accordions
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "450ms",
        reveal: "650ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
