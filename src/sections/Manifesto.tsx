"use client";

import Section from "@/components/layout/Section";
import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

const words = [
  "Crafted", "Handmade", "Timeless", "Premium",
  "Designed", "Luxury", "Discover", "Experience",
];

/**
 * Manifesto — a cinematic brand statement between Hero and Collections.
 * Full-bleed marquee of the brand's own vocabulary, then a split-text pledge.
 * Pure storytelling, no product — a deliberate breath (doc 02 §31).
 */
export default function Manifesto() {
  return (
    <Section id="manifesto" container={false} className="overflow-hidden py-0">

      {/* Marquee */}
      <div
        aria-hidden
        className="mb-16 flex select-none whitespace-nowrap [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div className="animate-marquee flex shrink-0">
          {[...words, ...words].map((w, i) => (
            <span
              key={i}
              className="mx-8 font-display text-[40px] font-medium text-white/[0.065] sm:text-[60px]"
            >
              {w}
              <span className="mx-8 align-middle text-gold/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Brand pledge */}
      <div className="container-luxury">
        <div className="mx-auto max-w-[22ch] text-center sm:max-w-[30ch]">
          <Reveal y={14} className="mb-8 flex justify-center">
            <Eyebrow withRule={false}>Our Promise</Eyebrow>
          </Reveal>
          <SplitText
            as="p"
            type="lines"
            stagger={0.09}
            className="font-display text-[26px] font-medium leading-[1.38] text-text-primary sm:text-[38px] lg:text-[44px]"
          >
            We do not make many things. We make a few things, slowly, so they last
            longer than the trends that surround them.
          </SplitText>
        </div>
      </div>

      {/* Bottom spacing to match section rhythm */}
      <div className="h-[72px] sm:h-[96px] lg:h-[120px]" />
    </Section>
  );
}
