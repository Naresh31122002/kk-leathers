"use client";

import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/anim/Stagger";
import ShoeSlot from "@/components/shoe/ShoeSlot";
import { collections } from "@/lib/content";
import CollectionCard from "./CollectionCard";

/**
 * Featured collections (doc 09 Phase 06). The travelling Oxford arrives here
 * (stage 20) beside the heading — presented as a pair, turned to show its
 * profile — before the bento grid of the wider family reveals below.
 */
export default function Collections() {
  return (
    <Section id="collections" tone="raised" className="grain">
      {/* Intro row — heading + the shoe's landing slot */}
      <div className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            index="01"
            eyebrow="The Collections"
            title="Four families, made one at a time"
            intro="Each cut from a single hide and finished by a single maker — the marquee pieces of the atelier."
          />
        </div>
        <div className="lg:col-span-5">
          <ShoeSlot
            order={20}
            ratio="aspect-[4/3]"
            pose={{ width: 320, rotation: 4, tiltY: -12, variant: "side", glow: 0.7 }}
            label="The Oxford, presented in profile"
            caption="The Signature Oxford"
          />
        </div>
      </div>

      <StaggerGroup
        stagger={0.1}
        className="grid auto-rows-[240px] grid-cols-1 gap-5 sm:auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-4"
      >
        {collections.map((c) => (
          <CollectionCard key={c.id} c={c} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
