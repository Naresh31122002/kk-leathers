"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Button from "@/components/ui/Button";
import FrameSequence from "@/components/anim/FrameSequence";
import ShoeStage from "@/components/shoe/ShoeStage";
import { shoeExplodeFrames } from "@/lib/assets";

const anatomy = [
  { label: "Upper",  copy: "A single panel of full-grain calf, hand-cut with the grain." },
  { label: "Insole", copy: "A leather footbed that moulds to you over the years." },
  { label: "Welt",   copy: "Goodyear-welted so the sole can be renewed, not discarded." },
  { label: "Sole",   copy: "Leather sole, stacked heel, burnished by hand." },
] as const;

/**
 * Product Showcase — the anatomy climax (doc 01 §11 "explode to show construction").
 * A pinned scroll-scrubbed image sequence deconstructs the Oxford into its layers.
 * The travelling shoe overlay is hidden here (stage 40, opacity 0) so this single
 * deconstructing shoe is the sole focus.
 */
export default function ProductShowcase() {
  return (
    <Section id="showcase" container={false} className="grain relative overflow-hidden">

      {/* Heading */}
      <div className="container-luxury mb-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal y={14} className="mb-4">
            <Eyebrow>The Anatomy</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            type="lines"
            className="max-w-[18ch] font-display text-[30px] font-semibold leading-[1.12] sm:text-[40px] lg:text-section"
          >
            Built from the inside out
          </SplitText>
        </div>
        <div className="lg:col-span-6 lg:pt-5">
          <Reveal y={18}>
            <p className="max-w-[46ch] text-body text-text-secondary">
              Scroll to take a KK Oxford apart — every layer chosen so the whole
              can be worn, resoled and worn again for decades. Scroll back to see
              it made whole.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Stage 40 — shoe hides while the exploded sequence plays */}
      <ShoeStage
        order={40}
        pose={{ width: 180, opacity: 0, glow: 0 }}
        className="pointer-events-none absolute left-1/2 top-0 h-2 w-2"
        aria-label="The Oxford, deconstructed"
      />

      {/* Pinned scroll-scrubbed deconstruction */}
      <FrameSequence
        frames={shoeExplodeFrames}
        width={1280}
        height={720}
        scrollLength={2.4}
        className="mx-auto h-[100svh] w-full max-w-[1200px]"
      >
        {/* Warm glow bed */}
        <div className="glow-brown pointer-events-none absolute inset-0 -z-10 scale-110 blur-[80px] opacity-80" />

        {/* Anatomy labels */}
        <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex max-w-container flex-wrap justify-center gap-x-10 gap-y-3 px-6">
          {anatomy.map((a) => (
            <div key={a.label} className="text-center">
              <p className="font-display text-[20px] font-semibold text-gold">{a.label}</p>
              <p className="mx-auto max-w-[22ch] text-caption text-text-muted">{a.copy}</p>
            </div>
          ))}
        </div>

        {/* Corner label */}
        <div className="pointer-events-none absolute right-8 top-8">
          <span className="eyebrow text-[9px] tracking-[0.28em]">Exploded View · Scroll</span>
        </div>
      </FrameSequence>

      <div className="container-luxury mt-6 flex justify-center pb-4">
        <Button href="#contact" variant="secondary" arrow>
          Commission a Pair
        </Button>
      </div>
    </Section>
  );
}
