"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Luxury loader (doc 09 Phase 04):
 *  1. Monogram fades + rises into view.
 *  2. Gold line draws from left.
 *  3. Tagline fades in below.
 *  4. Entire overlay lifts off to reveal the hero.
 * Scroll is locked until the overlay is dismissed.
 */
export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const rootRef    = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLSpanElement>(null);
  const markRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
      onComplete?.();
    };

    if (reduced) { finish(); return; }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl
        // Monogram rises in
        .fromTo(
          markRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
        )
        // Gold line draws
        .fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.0, ease: "power2.inOut" },
          "-=0.2"
        )
        // Tagline fades in
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.3"
        )
        // Hold for a beat
        .to({}, { duration: 0.50 })
        // Mark fades out
        .to(markRef.current, { opacity: 0, y: -8, duration: 0.45, ease: "power2.in" })
        // Overlay lifts off
        .to(
          rootRef.current,
          { yPercent: -100, duration: 1.05, ease: "power3.inOut" },
          "-=0.05"
        );
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [reduced, onComplete]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-base"
      aria-hidden
    >
      <div ref={markRef} className="flex flex-col items-center gap-5">
        {/* Monogram */}
        <div className="font-display text-[42px] font-semibold tracking-tight">
          <span className="text-gold">KK</span>
          <span className="ml-[8px] text-text-primary">Leathers</span>
        </div>
        {/* Gold draw line */}
        <span
          ref={lineRef}
          className="block h-px w-[160px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(200,164,93,0.4) 20%, #c8a45d 50%, rgba(200,164,93,0.4) 80%, transparent 100%)",
          }}
        />
        {/* Tagline */}
        <span
          ref={taglineRef}
          className="text-[10px] uppercase tracking-[0.34em] text-text-muted opacity-0"
        >
          Handcrafted · Timeless
        </span>
      </div>
    </div>
  );
}
