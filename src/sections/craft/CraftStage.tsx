"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import MediaFrame from "@/components/ui/MediaFrame";

type Step = { id: string; step: string; title: string; video: string };

/**
 * The pinned stage: a stack of process films that crossfade as `active` changes.
 * Only the active <video> plays; the rest are paused to save CPU. A large ghost
 * numeral gives the scene editorial weight.
 */
export default function CraftStage({
  steps,
  active,
}: {
  steps: readonly Step[];
  active: number;
}) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  return (
    <MediaFrame ratio="aspect-[16/10]" scrim>
      {steps.map((s, i) => (
        <video
          key={s.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-luxury",
            i === active ? "opacity-100" : "opacity-0"
          )}
          src={s.video}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "none"}
          aria-hidden={i !== active}
          aria-label={i === active ? `${s.title} — craftsmanship step` : undefined}
        />
      ))}

      {/* Ghost numeral + active caption */}
      <span className="pointer-events-none absolute left-6 top-4 z-10 font-display text-[92px] font-semibold leading-none text-white/10">
        {steps[active].step}
      </span>
      <div className="absolute bottom-6 left-6 z-10">
        <p className="eyebrow mb-1 text-[11px]">In the Atelier</p>
        <p className="font-display text-subheading text-text-primary">
          {steps[active].title}
        </p>
      </div>
    </MediaFrame>
  );
}
