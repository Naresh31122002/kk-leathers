// Centralized GSAP registration so plugins are registered once, client-side
// only (doc 05 spirit / doc 02 §32 easing consistency).
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  // Consistent premium easing defaults across the whole site.
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export { gsap, ScrollTrigger, MotionPathPlugin };
