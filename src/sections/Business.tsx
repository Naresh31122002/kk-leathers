"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Parallax from "@/components/anim/Parallax";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import VideoPlayer from "@/components/ui/VideoPlayer";
import MediaFrame from "@/components/ui/MediaFrame";
import Button from "@/components/ui/Button";
import { videos, images } from "@/lib/assets";

const features = [
  "Full-grain protective shell",
  "Padded device compartment",
  "Hand-stitched handles",
  "Ages into a personal patina",
] as const;

/**
 * Business collection (doc 09 Phase 08).
 * Laptop bag video as primary media. Duffle bag as parallaxed inset.
 * The shoe intentionally does NOT appear here — the bags lead.
 */
export default function Business() {
  return (
    <Section id="business" className="grain overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Media stack */}
        <div className="relative order-2 lg:order-1">
          {/* Ambient glow */}
          <div className="glow-gold pointer-events-none absolute inset-0 -z-10 scale-110 blur-[80px] opacity-70" />

          <MediaFrame ratio="aspect-[16/11]" scrim>
            <VideoPlayer
              src={videos.hero.laptopReveal}
              ariaLabel="Leather laptop bag reveal"
              threshold={0.2}
              eager
            />
          </MediaFrame>

          {/* Parallaxed duffle inset — cross-sell still, not another video */}
          <Parallax
            speed={44}
            className="absolute -bottom-8 -left-4 w-[36%] max-w-[190px] sm:-left-10"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-video
                border border-white/[0.09]
                bg-surface
                shadow-[0_8px_24px_rgba(0,0,0,.34)]"
            >
              <Image
                src={images.bags.duffle}
                alt="Brown leather duffle travel bag"
                fill
                sizes="190px"
                className="object-contain p-4"
              />
            </div>
          </Parallax>
        </div>

        {/* Copy */}
        <div className="relative order-1 lg:order-2">
          <Reveal y={14} className="mb-5">
            <Eyebrow>For the Professional</Eyebrow>
          </Reveal>

          <SplitText
            as="h2"
            type="lines"
            className="max-w-[16ch] font-display text-[30px] font-semibold leading-[1.14] sm:text-[38px] lg:text-section"
          >
            The bag that carries your day
          </SplitText>

          <Reveal y={18} delay={0.1}>
            <p className="mt-6 max-w-[46ch] text-body text-text-secondary">
              A structured leather laptop bag built for the boardroom and the
              commute alike — padded, quietly luxurious, made to soften with every
              year of use.
            </p>
          </Reveal>

          <StaggerGroup
            stagger={0.08}
            className="mt-8 grid grid-cols-1 gap-[10px] sm:grid-cols-2"
          >
            {features.map((f) => (
              <StaggerItem key={f} y={14}>
                <span className="flex items-center gap-3 text-small text-text-secondary">
                  <span className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-gold" />
                  {f}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-10">
            <Button href="#contact" arrow>
              Enquire About the Bag
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
