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
];

/**
 * Business collection (doc 09 Phase 08) — the laptop bag for the professional,
 * with the duffle rotation film as a layered, parallaxed secondary media beat.
 */
export default function Business() {
  return (
    <Section id="business" className="grain overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Media stack */}
        <div className="relative order-2 lg:order-1">
          <div className="glow-gold pointer-events-none absolute inset-0 -z-10 scale-110 blur-2xl" />
          <MediaFrame ratio="aspect-[16/12]" scrim>
            <VideoPlayer
              src={videos.hero.laptopReveal}
              ariaLabel="Leather laptop bag reveal"
              threshold={0.2}
              eager
            />
          </MediaFrame>

          {/* Parallax duffle inset — travel companion cross-sell (still image,
              not another product film). */}
          <Parallax speed={50} className="absolute -bottom-8 -left-3 w-[38%] max-w-[200px] sm:-left-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-video border border-white/10 bg-secondary shadow-lg">
              <Image
                src={images.bags.duffle}
                alt="Brown leather duffle travel bag"
                fill
                sizes="200px"
                className="object-contain p-4"
              />
            </div>
          </Parallax>
        </div>

        {/* Copy — the shoe intentionally does NOT appear here; the bags lead. */}
        <div className="relative order-1 lg:order-2">
          <Reveal y={16} className="mb-5">
            <Eyebrow>For the Professional</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            type="lines"
            className="max-w-[16ch] font-display text-[34px] font-semibold leading-[1.15] sm:text-[42px] lg:text-section"
          >
            The bag that carries your day
          </SplitText>
          <Reveal y={20} delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-body text-text-secondary">
              A structured leather laptop bag built for the boardroom and the
              commute alike — padded, quietly luxurious, made to soften with every
              year of use.
            </p>
          </Reveal>

          <StaggerGroup
            stagger={0.08}
            className="mt-8 grid grid-cols-1 gap-3 text-small text-text-secondary sm:grid-cols-2"
          >
            {features.map((f) => (
              <StaggerItem key={f} y={16}>
                <span className="flex items-center gap-3">
                  <span className="h-[6px] w-[6px] rounded-full bg-gold" />
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
