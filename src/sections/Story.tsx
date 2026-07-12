"use client";

import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/anim/Reveal";
import Parallax from "@/components/anim/Parallax";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import VideoPlayer from "@/components/ui/VideoPlayer";
import MediaFrame from "@/components/ui/MediaFrame";
import { storyTimeline } from "@/lib/content";
import { videos } from "@/lib/assets";

/**
 * Brand story (doc 09 Phase 11) — the workshop paired with a three-beat timeline
 * (hide · hand · years). A parallaxed secondary film adds depth; each beat
 * reveals with a staggered rise along a gold rail.
 */
export default function Story() {
  return (
    <Section id="story" tone="raised" className="grain overflow-hidden">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Media column */}
        <div className="relative lg:col-span-6">
          <SectionHeading
            index="06"
            eyebrow="Our Story"
            title="Leather worth keeping"
            intro="KK Leathers began with a simple conviction: objects made slowly, by hand, are worth living with."
            className="mb-10"
          />
          <MediaFrame ratio="aspect-[16/10]" scrim>
            <VideoPlayer
              src={videos.story.workshop}
              ariaLabel="Inside the luxury leather workshop"
              threshold={0.3}
            />
          </MediaFrame>

          {/* Parallax stitching inset */}
          <Parallax speed={44} className="absolute -bottom-8 right-0 w-[38%] max-w-[200px]">
            <div className="overflow-hidden rounded-video border border-white/10 shadow-lg">
              <div className="relative aspect-square">
                <VideoPlayer
                  src={videos.story.stitching}
                  ariaLabel="Hand stitching leather"
                  threshold={0.3}
                />
              </div>
            </div>
          </Parallax>
        </div>

        {/* Timeline column */}
        <div className="relative lg:col-span-6 lg:pt-4">
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-gold/60 via-white/10 to-transparent" />
          <StaggerGroup stagger={0.15} className="flex flex-col gap-12">
            {storyTimeline.map((b) => (
              <StaggerItem key={b.year} y={30}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-[6px] h-[15px] w-[15px] rounded-full border border-gold/70 bg-base">
                    <span className="absolute inset-[3px] rounded-full bg-gold" />
                  </span>
                  <p className="eyebrow mb-3 text-[11px]">{b.year}</p>
                  <h3 className="font-display text-subheading font-semibold">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-small text-text-secondary">
                    {b.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal y={20} className="mt-12 pl-10">
            <blockquote className="border-l-2 border-gold/50 pl-5 font-display text-[22px] italic leading-[1.4] text-text-primary">
              “Buy once. Wear it for life.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
