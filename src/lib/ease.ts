// Shared easing + timing tokens so every animation speaks one language
// (doc 02 §26 motion tokens, §32 easing consistency).
export const EASE = {
  luxury: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
  // CSS cubic-bezier mirror of the GSAP luxury curve.
  css: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const DUR = {
  fast: 0.2,
  normal: 0.4,
  premium: 0.8,
  hero: 1.2,
} as const;

// Framer Motion variant presets (doc 09 Phase 01 requires framer-motion).
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export const staggerParent = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
