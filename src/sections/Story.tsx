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

export default function Story() {
  return (
    <Section id="story" tone="raised" className="grain overflow-hidden">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">

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

          {/* Parallax inset — hand-stitching detail */}
          <Parallax
            speed={40}
            className="absolute -bottom-10 right-0 w-[36%] max-w-[190px]"
          >
            <div
              className="overflow-hidden rounded-video
                border border-white/[0.09]
                shadow-[0_8px_24px_rgba(0,0,0,.32)]"
            >
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
        <div className="relative lg:col-span-6 lg:pt-6">
          {/* Gold rail */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-gold/55 via-white/[0.08] to-transparent" />

          <StaggerGroup stagger={0.16} className="flex flex-col gap-12">
            {storyTimeline.map((b) => (
              <StaggerItem key={b.year} y={28}>
                <div className="relative pl-10">
                  {/* Timeline node */}
                  <span className="absolute left-0 top-[7px] flex h-[14px] w-[14px] items-center justify-center rounded-full border border-gold/60 bg-base">
                    <span className="h-[6px] w-[6px] rounded-full bg-gold" />
                  </span>
                  <p className="eyebrow mb-3 text-[10px]">{b.year}</p>
                  <h3 className="font-display text-[26px] font-semibold leading-[1.22] text-text-primary">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-small text-text-secondary">
                    {b.copy}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal y={18} className="mt-12 pl-10">
            <blockquote
              className="border-l-2 border-gold/45 pl-5
                font-display text-[21px] italic leading-[1.46]
                text-text-primary"
            >
              &ldquo;Buy once. Wear it for life.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
