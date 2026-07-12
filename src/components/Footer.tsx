"use client";

import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { site, nav } from "@/lib/site";
import { frameSequences } from "@/lib/assets";
import Reveal from "@/components/anim/Reveal";
import SplitText from "@/components/anim/SplitText";
import Magnetic from "@/components/anim/Magnetic";
import ShoeStage from "@/components/shoe/ShoeStage";
import FrameSequence from "@/components/anim/FrameSequence";

function scrollTop() {
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Footer (doc 09 Phase 14) — a cinematic ending. The signature gift box scales
 * and settles as it enters view (a "closing" gesture that mirrors the hero's
 * opening film), then navigation, contact and copyright. Includes back-to-top.
 */
export default function Footer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  useEffect(() => {
    if (reduced) return;
    const el = boxRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Warm glow blooms as the closing gift-box sequence comes into view.
      gsap.fromTo(
        el.querySelector("[data-box-glow]"),
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer className="grain relative overflow-hidden border-t border-white/[0.06]">
      <div className="container-luxury py-20">
        {/* Cinematic closing note */}
        <div ref={boxRef} className="mb-16 flex flex-col items-center gap-8 text-center">
          {/* Penultimate stage (80): the Oxford descends toward the box, small
              and dimming, just above it. */}
          <div className="relative h-[40px] w-full">
            <ShoeStage
              order={80}
              pose={{ width: 130, rotation: 0, tiltX: 20, variant: "main", glow: 0.3 }}
              className="absolute inset-x-0 -top-24 mx-auto h-[130px] w-[130px]"
              aria-label="The Oxford returning to its box"
            />
          </div>

          <div className="relative h-[240px] w-[300px]">
            <div
              data-box-glow
              className="glow-brown absolute inset-0 scale-110 opacity-0 blur-[40px]"
            />
            {/* The gift box CLOSES as you reach the end — the sequence played in
                reverse, mirroring the hero's opening (gift box → … → gift box). */}
            <FrameSequence
              frames={frameSequences.giftbox}
              reverse
              pin={false}
              start="top 90%"
              end="bottom bottom"
              className="h-full w-full"
            />
            {/* Final stage (85): the shoe is now inside — fully faded as the box
                closes, completing the journey. */}
            <ShoeStage
              order={85}
              pose={{ width: 90, rotation: 0, tiltX: 40, opacity: 0, variant: "main", glow: 0 }}
              className="absolute inset-0"
              aria-label="The Oxford, boxed"
            />
          </div>
          <SplitText
            as="p"
            type="lines"
            className="max-w-[22ch] font-display text-[26px] leading-[1.3] text-text-primary"
          >
            Every piece leaves the atelier boxed by hand.
          </SplitText>
        </div>

        <div className="grid grid-cols-1 gap-12 border-t border-white/[0.06] pt-14 md:grid-cols-4">
          <Reveal className="md:col-span-2">
            <div className="font-display text-[24px] font-semibold">
              <span className="text-gold">KK</span>
              <span className="ml-2">Leathers</span>
            </div>
            <p className="mt-4 max-w-[38ch] text-small text-text-muted">
              {site.tagline}. Handmade leather goods, crafted to be worn for a
              lifetime.
            </p>
          </Reveal>

          <Reveal as="nav" aria-label="Footer">
            <p className="eyebrow mb-5 text-[11px]">Explore</p>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-small text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="eyebrow mb-5 text-[11px]">Atelier</p>
            <ul className="flex flex-col gap-3 text-small text-text-secondary">
              <li>{site.address}</li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-text-primary">
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-caption uppercase tracking-[0.12em] text-text-muted">
              <a href={site.social.instagram} className="hover:text-text-primary">
                Instagram
              </a>
              <a href={site.social.linkedin} className="hover:text-text-primary">
                LinkedIn
              </a>
              <a href={site.social.pinterest} className="hover:text-text-primary">
                Pinterest
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-caption text-text-muted sm:flex-row">
          <p>
            © {year} {site.name}. Handcrafted with care.
          </p>
          <p className="order-first sm:order-none">Crafted · Timeless · Handmade</p>
          <Magnetic>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex items-center gap-2 rounded-pill border border-white/15 px-4 py-2 text-caption uppercase tracking-[0.14em] text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
            >
              Top <ArrowUp size={14} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
