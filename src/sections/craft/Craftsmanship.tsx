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
 * Craftsmanship (doc 09 Phase 07 + Phase 15) — a pinned, scroll-driven story.
 * The stage (video + numeral) stays pinned while the six process steps advance;
 * the active step's film crossfades in and its copy highlights. Only the active
 * video plays, so CPU stays low (Phase 07 DoD). Reduced-motion / small screens
 * fall back to a clean stacked grid.
 */
export default function Craftsmanship() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;
    // Only run the pinned scene where there's room (lg+).
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    const ctx = gsap.context(() => {
      const steps = craftSteps.length;
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${steps * 60}%`,
        pin: ".craft-pin",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            steps - 1,
            Math.floor(self.progress * steps)
          );
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="craft" className="grain relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(10,8,7,0.4)_20%,rgba(10,8,7,0.4)_80%,transparent)]"
      />
      <div className="container-luxury section-pad">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              index="02"
              eyebrow="The Craft"
              title="Every hour shows"
              intro="No machine shortcuts the process. Follow a single piece as it comes to life inside the atelier."
            />
          </div>
          {/* The Oxford pauses here (stage 30), tilted as if under the maker's lamp */}
          <div className="lg:col-span-4">
            <ShoeSlot
              order={30}
              ratio="aspect-[4/3]"
              pose={{ width: 300, rotation: -8, tiltX: 6, tiltY: 8, variant: "main", glow: 0.95 }}
              label="The Oxford under the maker's lamp"
              caption="Under the Lamp"
            />
          </div>
        </div>
      </div>

      {/* Pinned cinematic scene (desktop) */}
      <div ref={rootRef} className="relative hidden lg:block">
        <div className="craft-pin">
          <div className="container-luxury grid grid-cols-12 items-center gap-12 pb-20">
            <div className="col-span-7">
              <CraftStage steps={craftSteps} active={active} />
            </div>
            <div className="col-span-5">
              <CraftStepList
                steps={craftSteps}
                active={active}
                onSelect={setActive}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stacked fallback (mobile / tablet / reduced motion) */}
      <div className="container-luxury pb-4 lg:hidden">
        <CraftGridFallback steps={craftSteps} />
      </div>
    </section>
  );
}
