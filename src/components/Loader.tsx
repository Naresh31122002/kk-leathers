"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Luxury loader (doc 09 Phase 04): monogram fades in, a gold line draws across,
 * then the whole overlay lifts to reveal the hero. Locks scroll while active.
 */
export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Lock scroll during the intro.
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      setDone(true);
      onComplete?.();
    };

    if (reduced) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(
        markRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power2.inOut" },
          "-=0.3"
        )
        .to(markRef.current, { opacity: 0, duration: 0.5, delay: 0.35 })
        .to(
          rootRef.current,
          { yPercent: -100, duration: 1, ease: "power3.inOut" },
          "-=0.1"
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
      <div ref={markRef} className="flex flex-col items-center gap-6">
        <div className="font-display text-[40px] font-semibold tracking-tight">
          <span className="text-gold">KK</span>
          <span className="ml-2 text-text-primary">Leathers</span>
        </div>
        <span
          ref={lineRef}
          className="block h-px w-[180px] origin-left bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <span className="eyebrow text-[11px] text-text-muted">
          Handcrafted · Timeless
        </span>
      </div>
    </div>
  );
}
