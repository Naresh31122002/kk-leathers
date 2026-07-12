import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    // Breakpoints (doc 02 §6). `lg` is set to 1280 so two-column section
    // layouts + the travelling-shoe overlay engage on standard laptops
    // (1280/1366/1440), not only on 1440+ — otherwise those screens stack and
    // look empty. `xl` remains large-display.
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1920px",
    },
    extend: {
      colors: {
        // Backgrounds
        base: "#050505",
        secondary: "#101010",
        surface: "#171717",
        "surface-hover": "#202020",
        // Accents
        brown: "#7B4A24",
        gold: "#C8A45D",
        // Text
        "text-primary": "#F5F5F5",
        "text-secondary": "#BDBDBD",
        "text-muted": "#7A7A7A",
        // States
        error: "#D85A5A",
        success: "#4CAF50",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
        divider: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        alt: ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        // Typography scale (doc 02 §14)
        hero: ["72px", { lineHeight: "1.1", fontWeight: "700" }],
        section: ["48px", { lineHeight: "1.2", fontWeight: "600" }],
        subheading: ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "card-title": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        "small": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        // 8px base scale (doc 02 §7)
        "1": "8px",
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "8": "64px",
        "10": "80px",
        "12": "96px",
        "15": "120px",
        "20": "160px",
      },
      maxWidth: {
        container: "1400px",
        "container-lg": "1600px",
      },
      borderRadius: {
        // doc 02 §10
        pill: "999px",
        card: "24px",
        image: "24px",
        modal: "32px",
        video: "28px",
        glass: "28px",
      },
      boxShadow: {
        // doc 02 §19
        sm: "0 10px 30px rgba(0,0,0,.25)",
        md: "0 20px 60px rgba(0,0,0,.35)",
        lg: "0 40px 100px rgba(0,0,0,.45)",
        "gold-glow": "0 0 40px rgba(200,164,93,0.15)",
      },
      transitionDuration: {
        // Motion tokens (doc 02 §26)
        fast: "200ms",
        normal: "400ms",
        premium: "800ms",
        heroic: "1200ms",
      },
      transitionTimingFunction: {
        // Aligns with GSAP power3.out feel
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
