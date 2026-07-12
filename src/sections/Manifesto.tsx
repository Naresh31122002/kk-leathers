"use client";

import Section from "@/components/layout/Section";
import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

// Brand vocabulary marquee — words drawn from doc 01 §15 approved voice.
const words = [
  "Crafted",
  "Handmade",
  "Timeless",
  "Premium",
  "Designed",
  "Luxury",
  "Discover",
  "Experience",
];

/**
 * Manifesto — a cinematic brand statement between the hero and the collections.
 * Full-bleed marquee of the brand's own vocabulary, then a split-text pledge.
 * Pure storytelling, no product; gives the page a breath (doc 02 §31).
 */
export default function Manifesto() {
  return (
    <Section id="manifesto" container={false} className="overflow-hidden">
      {/* Marquee */}
      <div
        aria-hidden
        className="mb-16 flex select-none whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div className="animate-marquee flex shrink-0">
          {[...words, ...words].map((w, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[44px] font-medium text-white/[0.08] sm:text-[64px]"
            >
              {w}
              <span className="mx-8 align-middle text-gold/40">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-luxury">
        <div className="mx-auto max-w-[24ch] text-center sm:max-w-[30ch]">
          <Reveal y={16} className="mb-8 flex justify-center">
            <Eyebrow withRule={false}>Our Promise</Eyebrow>
          </Reveal>
          <SplitText
            as="p"
            type="lines"
            stagger={0.1}
            className="font-display text-[28px] font-medium leading-[1.35] text-text-primary sm:text-[40px] lg:text-[46px]"
          >
            We do not make many things. We make a few things, slowly, so they last
            longer than the trends that surround them.
          </SplitText>
        </div>
      </div>
    </Section>
  );
}
