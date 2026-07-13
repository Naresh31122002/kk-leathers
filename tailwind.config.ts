import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/sections/**/*.{ts,tsx}",
  ],
  theme: {
    // Breakpoints (doc 02 §6). `lg` kept at 1280 so two-column layouts and the
    // travelling-shoe overlay engage on standard laptops (1280/1366/1440).
    screens: {
      sm:  "768px",
      md:  "1024px",
      lg:  "1280px",
      xl:  "1920px",
    },
    extend: {
      colors: {
        // Backgrounds
        base:            "#050505",
        secondary:       "#101010",
        surface:         "#171717",
        "surface-hover": "#202020",
        // Accents
        brown:  "#7B4A24",
        gold:   "#C8A45D",
        // Text
        "text-primary":   "#F5F5F5",
        "text-secondary": "#BDBDBD",
        "text-muted":     "#7A7A7A",
        // States
        error:   "#D85A5A",
        success: "#4CAF50",
      },
      borderColor: {
        DEFAULT:  "rgba(255,255,255,0.08)",
        divider:  "rgba(255,255,255,0.08)",
        subtle:   "rgba(255,255,255,0.05)",
        emphasis: "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans:    ["var(--font-inter)", "sans-serif"],
        alt:     ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        // Typography scale (doc 02 §14)
        hero:        ["72px",  { lineHeight: "1.06", fontWeight: "700" }],
        section:     ["48px",  { lineHeight: "1.15", fontWeight: "600" }],
        subheading:  ["32px",  { lineHeight: "1.22", fontWeight: "600" }],
        "card-title":["24px",  { lineHeight: "1.30", fontWeight: "600" }],
        body:        ["18px",  { lineHeight: "1.72", fontWeight: "400" }],
        small:       ["16px",  { lineHeight: "1.65", fontWeight: "400" }],
        caption:     ["13px",  { lineHeight: "1.55", fontWeight: "400" }],
      },
      spacing: {
        // 8px base scale (doc 02 §7)
        "1":  "8px",
        "2":  "16px",
        "3":  "24px",
        "4":  "32px",
        "5":  "40px",
        "6":  "48px",
        "8":  "64px",
        "10": "80px",
        "12": "96px",
        "15": "120px",
        "20": "160px",
      },
      maxWidth: {
        container:    "1400px",
        "container-lg": "1600px",
      },
      borderRadius: {
        // doc 02 §10 — one unified system
        pill:  "999px",
        card:  "24px",
        image: "24px",
        modal: "32px",
        video: "28px",
        glass: "28px",
      },
      boxShadow: {
        // doc 02 §19 — soft, deep, minimal luxury shadows
        sm: "0 4px 12px rgba(0,0,0,.22)",
        md: "0 12px 32px rgba(0,0,0,.32)",
        lg: "0 28px 64px rgba(0,0,0,.40)",
        xl: "0 48px 100px rgba(0,0,0,.50)",

        // Specialty
        "gold-glow":    "0 0 48px rgba(200,164,93,0.18)",
        "brown-glow":   "0 0 48px rgba(123,74,36,0.22)",
        "product":
          "0 4px 8px rgba(0,0,0,.20), 0 16px 40px rgba(0,0,0,.36), 0 40px 80px rgba(0,0,0,.40)",
        "card":
          "0 2px 4px rgba(0,0,0,.12), 0 8px 20px rgba(0,0,0,.22), 0 24px 56px rgba(0,0,0,.28)",
        "inset-top": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      transitionDuration: {
        fast:   "200ms",
        normal: "400ms",
        premium:"800ms",
        heroic: "1200ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        glass: "20px",
        nav:   "24px",
      },
      // Keyframes for inline utility use
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-in":  "fadeIn 0.5s cubic-bezier(0.16,1,0.3,1)",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1)",
        "shimmer":  "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
