"use client";

import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup } from "@/components/anim/Stagger";
import ShoeSlot from "@/components/shoe/ShoeSlot";
import { collections } from "@/lib/content";
import CollectionCard from "./CollectionCard";

export default function Collections() {
  return (
    <Section id="collections" tone="raised" className="grain">
      {/* Intro row — heading + the Oxford's profile stage */}
      <div className="mb-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
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
            pose={{ width: 320, rotation: 4, tiltY: -14, variant: "side", glow: 0.75 }}
            label="The Oxford, presented in profile"
            caption="The Signature Oxford"
          />
        </div>
      </div>

      {/* Bento grid — 4 columns on desktop */}
      <StaggerGroup
        stagger={0.09}
        className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:auto-rows-[250px] lg:grid-cols-4"
      >
        {collections.map((c) => (
          <CollectionCard key={c.id} c={c} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
