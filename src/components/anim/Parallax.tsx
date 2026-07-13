"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Pixels of upward travel as element scrolls past. Positive = moves up. */
  speed?: number;
  scale?: number;
};

/**
 * Scroll-scrubbed parallax layer (doc 09 Phase 15 Parallax).
 * Subtle depth — never jerky. Background layers should move less than foreground.
 */
export default function Parallax({ children, className, speed = 70, scale }: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, scale: scale ? 1 : undefined },
        {
          yPercent: (-speed / el.offsetHeight) * 100,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start:   "top bottom",
            end:     "bottom top",
            scrub:   1.0,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, speed, scale]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
