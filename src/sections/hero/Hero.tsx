"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { images, frameSequences } from "@/lib/assets";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ShoeStage from "@/components/shoe/ShoeStage";
import FrameSequence from "@/components/anim/FrameSequence";
import HeroScrollCue from "./HeroScrollCue";
import HeroStats from "./HeroStats";

/**
 * Hero (doc 09 Phase 05 + Phase 15) — the opening scene.
 *  • The gift-box film is now a FRAMED, masked luxury panel (not a fullscreen
 *    background) so the typography and product lead (requirement 2).
 *  • The travelling Oxford's FIRST stage anchor sits over the panel — the shoe
 *    "emerges from the gift box" and begins its journey (requirement 1 & 6).
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ delay: 2.3 });
      intro
        .fromTo(
          "[data-hero-line] > span",
          { yPercent: 120 },
          { yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.12 }
        )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
          "-=0.7"
        )
        .fromTo(
          "[data-hero-panel]",
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out" },
          "-=1.1"
        );

      // Gentle parallax on the framed panel as you begin scrolling.
      gsap.to("[data-hero-panel]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      {/* Soft ambient base — dark, no fullscreen video anymore */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_75%_25%,rgba(123,74,36,0.16),transparent_60%)]" />

      <div className="container-luxury grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Copy */}
        <div data-hero-copy className="lg:col-span-6">
          <p data-hero-fade className="eyebrow mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
            Est. Atelier · Full-Grain Leather
          </p>

          <h1 className="font-display font-bold leading-[1.03] text-[11.5vw] sm:text-[8vw] lg:text-[clamp(44px,4.4vw,72px)]">
            <span data-hero-line className="line-mask">
              <span className="block">Handcrafted</span>
            </span>
            <span data-hero-line className="line-mask">
              <span className="block text-gold-gradient">Leather,</span>
            </span>
            <span data-hero-line className="line-mask">
              <span className="block">Timeless</span>
            </span>
            <span data-hero-line className="line-mask">
              <span className="block">by Design</span>
            </span>
          </h1>

          <p data-hero-fade className="mt-8 max-w-[44ch] text-body text-text-secondary">
            Shoes, belts and bags made one at a time — cut, stitched and burnished
            by hand to be worn for a lifetime.
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#collections" arrow>
              Discover the Collection
            </Button>
            <Button href="#craft" variant="secondary">
              See the Craft
            </Button>
          </div>

          <HeroStats />
        </div>

        {/* Framed luxury presentation panel — the gift box opening */}
        <div className="lg:col-span-6">
          <div
            data-hero-panel
            className="relative mx-auto aspect-[4/5] w-full max-w-[440px] opacity-0 motion-reduce:opacity-100"
          >
            {/* Pedestal glow */}
            <div className="glow-brown absolute inset-0 scale-110 blur-[60px]" />

            {/* The framed gift-box sequence — scrubs open as you scroll the hero
                out (no autoplay, no loop; reverses on scroll-up). */}
            <div className="relative h-full w-full overflow-hidden rounded-[36px] border border-white/10 bg-black shadow-lg">
              <FrameSequence
                frames={frameSequences.giftbox}
                pin={false}
                start="top 80%"
                end="bottom top"
                className="h-full w-full"
              />
              {/* Cinematic vignette + bottom scrim for depth */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(5,5,5,0.7))]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base to-transparent" />

              {/* Caption plate */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="eyebrow text-[10px]">The Unboxing</span>
                <span className="text-caption text-text-muted">Chapter 01</span>
              </div>
            </div>

            {/* Hero fallback shoe (reduced-motion only; hidden when overlay runs) */}
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center motion-reduce:flex">
              <div className="relative aspect-square w-[70%]">
                <Image
                  src={images.shoes.oxfordBrownMain}
                  alt="Handcrafted brown Oxford leather shoe — the signature KK Leathers piece"
                  fill
                  sizes="320px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Stage 10 — the Oxford emerges here, over the gift box */}
            <ShoeStage
              order={10}
              pose={{ width: 300, rotation: -8, tiltY: 12, variant: "main", glow: 0.7 }}
              className="absolute inset-0"
              aria-label="Handcrafted Oxford leather shoe"
            />
          </div>
        </div>
      </div>

      <HeroScrollCue />
    </section>
  );
}
