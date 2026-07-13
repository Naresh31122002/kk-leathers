"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { craftSteps } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ShoeSlot from "@/components/shoe/ShoeSlot";
import CraftStage from "./CraftStage";
import CraftStepList from "./CraftStepList";
import CraftGridFallback from "./CraftGridFallback";

/**
 * Craftsmanship (doc 09 Phase 07 + Phase 15).
 * Pinned on desktop: the stage (video + ghost numeral) stays fixed while
 * six process steps advance via scroll. Only the active video plays.
 * Mobile / reduced-motion: clean stacked grid fallback.
 */
export default function Craftsmanship() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const ctx = gsap.context(() => {
      const steps = craftSteps.length;
      ScrollTrigger.create({
        trigger: el,
        start:   "top top",
        end:     () => `+=${steps * 65}%`,
        pin:     ".craft-pin",
        scrub:   true,
        onUpdate: (self) => {
          const idx = Math.min(steps - 1, Math.floor(self.progress * steps));
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="craft" className="grain relative">
      {/* Subtle vertical overlay to visually anchor this section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg,transparent 0%,rgba(10,8,7,0.38) 15%,rgba(10,8,7,0.38) 85%,transparent 100%)",
        }}
      />

      {/* Section header row */}
      <div className="container-luxury section-pad pb-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              index="02"
              eyebrow="The Craft"
              title="Every hour shows"
              intro="No machine shortcuts the process. Follow a single piece as it comes to life inside the atelier."
            />
          </div>
          {/* Oxford pauses here under the maker's lamp */}
          <div className="lg:col-span-4">
            <ShoeSlot
              order={30}
              ratio="aspect-[4/3]"
              pose={{ width: 300, rotation: -9, tiltX: 6, tiltY: 9, variant: "main", glow: 1.0 }}
              label="The Oxford under the maker's lamp"
              caption="Under the Lamp"
            />
          </div>
        </div>
      </div>

      {/* Pinned cinematic scene (desktop only) */}
      <div ref={rootRef} className="relative hidden pt-14 lg:block">
        <div className="craft-pin">
          <div className="container-luxury grid grid-cols-12 items-center gap-12 pb-24">
            <div className="col-span-7">
              <CraftStage steps={craftSteps} active={active} />
            </div>
            <div className="col-span-5">
              <CraftStepList steps={craftSteps} active={active} onSelect={setActive} />
            </div>
          </div>
        </div>
      </div>

      {/* Stacked fallback (mobile / tablet / reduced motion) */}
      <div className="container-luxury pb-4 pt-12 lg:hidden">
        <CraftGridFallback steps={craftSteps} />
      </div>
    </section>
  );
}
