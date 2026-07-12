"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Continuous, gentle float for isolated leather products (doc 01 §11 — slow,
 * purposeful motion; never bouncy). A soft sine drift on Y with tiny rotation.
 */
export default function FloatMedia({
  children,
  className,
  amplitude = 12,
  duration = 5,
  rotate = 1.5,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(el, {
        y: amplitude,
        rotation: rotate,
        duration,
        ease: "sine.inOut",
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, amplitude, duration, rotate]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
