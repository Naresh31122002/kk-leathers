"use client";

import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import VideoPlayer from "@/components/ui/VideoPlayer";

type Step = { id: string; step: string; title: string; copy: string; video: string };

/**
 * Stacked craft grid for mobile/tablet and reduced motion — same content as the
 * pinned scene, minus the scrubbing. Videos still play only in viewport.
 */
export default function CraftGridFallback({ steps }: { steps: readonly Step[] }) {
  return (
    <StaggerGroup
      stagger={0.1}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {steps.map((s) => (
        <StaggerItem key={s.id}>
          <article className="overflow-hidden rounded-card border border-white/[0.06] bg-surface">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <VideoPlayer
                src={s.video}
                rounded={false}
                ariaLabel={`${s.title} — craftsmanship step`}
                threshold={0.4}
              />
              <span className="absolute right-4 top-4 font-display text-[15px] text-gold">
                {s.step}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-card-title font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-small text-text-secondary">{s.copy}</p>
            </div>
          </article>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
