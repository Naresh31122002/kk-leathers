"use client";

import Section from "@/components/layout/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Button from "@/components/ui/Button";
import FrameSequence from "@/components/anim/FrameSequence";
import ShoeStage from "@/components/shoe/ShoeStage";
import { shoeExplodeFrames } from "@/lib/assets";

// Construction highlights — the exploded-view story (doc 01 §11).
const anatomy = [
  { label: "Upper", copy: "A single panel of full-grain calf, hand-cut with the grain." },
  { label: "Insole", copy: "A leather footbed that moulds to you over the years." },
  { label: "Welt", copy: "Goodyear-welted so the sole can be renewed, not discarded." },
  { label: "Sole", copy: "Leather sole, stacked heel, burnished by hand." },
];

/**
 * Product Showcase (doc 01 §11 "explode to show construction"). A pinned,
 * scroll-scrubbed image sequence deconstructs the Oxford into its layers as you
 * scroll — and reassembles as you scroll back up. This is the climax of the
 * shoe's journey; the travelling overlay is hidden here (stage 40, opacity 0)
 * so this single deconstructing shoe is the sole focus, then it re-emerges after.
 */
export default function ProductShowcase() {
  return (
    <Section id="showcase" container={false} className="grain relative overflow-hidden">
      {/* Anatomy anchor for the pinned scene */}
      <div className="container-luxury mb-2 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal y={16} className="mb-5">
            <Eyebrow>The Anatomy</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            type="lines"
            className="max-w-[18ch] font-display text-[34px] font-semibold leading-[1.14] sm:text-[42px] lg:text-section"
          >
            Built from the inside out
          </SplitText>
        </div>
        <div className="lg:col-span-6 lg:pt-6">
          <Reveal y={20}>
            <p className="max-w-[46ch] text-body text-text-secondary">
              Scroll to take a KK Oxford apart — every layer chosen so the whole
              can be worn, resoled and worn again for decades. Scroll back to see
              it made whole.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Hide the travelling shoe through the deconstruction scene, then let it
          return afterwards (handoff to the frame sequence). */}
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
        {/* Layered ambience + floating anatomy labels over the sequence */}
        <div className="glow-brown pointer-events-none absolute inset-0 -z-10 scale-110 blur-2xl" />

        <div className="pointer-events-none absolute inset-x-0 bottom-10 mx-auto flex max-w-container flex-wrap justify-center gap-x-10 gap-y-3 px-6">
          {anatomy.map((a) => (
            <div key={a.label} className="text-center">
              <p className="font-display text-card-title text-gold">{a.label}</p>
              <p className="mx-auto max-w-[22ch] text-caption text-text-muted">
                {a.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute right-8 top-8">
          <span className="eyebrow text-[10px]">Exploded View · Scroll</span>
        </div>
      </FrameSequence>

      <div className="container-luxury mt-2 flex justify-center">
        <Button href="#contact" variant="secondary" arrow>
          Commission a Pair
        </Button>
      </div>
    </Section>
  );
}
