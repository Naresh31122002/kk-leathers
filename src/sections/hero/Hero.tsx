"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { images, frameSequences } from "@/lib/assets";
import Image from "next/image";
import ShoeStage from "@/components/shoe/ShoeStage";
import FrameSequence from "@/components/anim/FrameSequence";
import HeroScrollCue from "./HeroScrollCue";
import HeroStats from "./HeroStats";

/**
 * Smooth-scroll to an anchor via Lenis when available.
 * Falls back to native scroll so the Hero CTAs never snap.
 */
function scrollTo(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.5 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Hero (doc 09 Phase 03 + 05 + 15) — the cinematic opening scene.
 *
 * Layout:
 *   Left  — headline, description, CTAs, stats (6/12 cols desktop)
 *   Right — gift-box frame sequence in a luxury vitrine panel (6/12 cols)
 *
 * The gift box scrubs open as you scroll the hero out. Stage 10 anchor
 * positions the travelling Oxford over the panel so the shoe appears to
 * emerge from the opened box as you continue scrolling.
 *
 * All CTAs use Lenis scrollTo so there is no snap-jump.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* ---- Entrance timeline (fires after loader finishes at ~2.3 s) ---- */
      const intro = gsap.timeline({ delay: 2.4 });

      // 1. Eyebrow line slides in
      intro.fromTo(
        "[data-hero-fade='eyebrow']",
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
      );

      // 2. Headline lines rise from masks — staggered
      intro.fromTo(
        "[data-hero-line] > span",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.10 },
        "-=0.5"
      );

      // 3. Sub-copy, CTAs, stats fade up together
      intro.fromTo(
        "[data-hero-fade='body']",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        "-=0.8"
      );

      // 4. Panel blooms in from slightly below
      intro.fromTo(
        "[data-hero-panel]",
        { opacity: 0, scale: 0.93, y: 32 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out" },
        "-=1.0"
      );

      /* ---- Scroll parallax — copy drifts up / panel lifts gently ---- */
      gsap.to("[data-hero-copy]", {
        yPercent: -14,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to("[data-hero-panel]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
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
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-[100px]"
    >
      {/* Radial warm spotlight — gives the product a stage */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_700px_at_76%_30%,rgba(123,74,36,0.18),transparent_58%)]" />
      {/* Cool counter-gradient at lower-left for depth */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_500px_at_6%_72%,rgba(8,6,4,0.55),transparent_60%)]" />

      <div className="container-luxury grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-12">

        {/* ── Copy ── */}
        <div data-hero-copy className="lg:col-span-6">

          {/* Eyebrow */}
          <p
            data-hero-fade="eyebrow"
            className="eyebrow mb-7 flex items-center gap-3 opacity-0 motion-reduce:opacity-100"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
            Est. Atelier · Full-Grain Leather
          </p>

          {/* Headline — 4 masked lines */}
          <h1 className="font-display font-bold leading-[1.03] text-[11vw] sm:text-[7.5vw] lg:text-[clamp(42px,4.2vw,68px)]">
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

          {/* Sub-copy */}
          <p
            data-hero-fade="body"
            className="mt-8 max-w-[42ch] text-body text-text-secondary opacity-0 motion-reduce:opacity-100"
          >
            Shoes, belts and bags made one at a time — cut, stitched and
            burnished by hand to be worn for a lifetime.
          </p>

          {/* CTAs — use Lenis scrollTo, not page-reload href */}
          <div
            data-hero-fade="body"
            className="mt-10 flex flex-wrap items-center gap-4 opacity-0 motion-reduce:opacity-100"
          >
            <button
              type="button"
              onClick={() => scrollTo("#collections")}
              className="group/btn relative inline-flex items-center gap-[10px] overflow-hidden
                rounded-pill bg-[#f4f4f2] px-8 py-[14px]
                text-[13px] font-medium uppercase tracking-[0.10em] text-[#0b0b0b]
                shadow-sm transition-transform duration-300 ease-luxury
                hover:scale-[1.025]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-[#ece0c8] to-[#f8f6f2] transition-transform duration-[520ms] ease-luxury group-hover/btn:translate-y-0" />
              <span className="relative z-10 flex items-center gap-[10px]">
                Discover the Collection
                <svg
                  width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  className="transition-transform duration-300 ease-luxury group-hover/btn:translate-x-[3px]"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#craft")}
              className="group/btn relative inline-flex items-center gap-[10px] overflow-hidden
                rounded-pill border border-white/20 bg-transparent px-8 py-[14px]
                text-[13px] font-medium uppercase tracking-[0.10em] text-text-primary
                transition-transform duration-300 ease-luxury hover:scale-[1.025]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-brown/35 to-brown/10 transition-transform duration-[520ms] ease-luxury group-hover/btn:translate-y-0" />
              <span className="relative z-10">See the Craft</span>
            </button>
          </div>

          <div data-hero-fade="body" className="opacity-0 motion-reduce:opacity-100">
            <HeroStats />
          </div>
        </div>

        {/* ── Framed gift-box panel ── */}
        <div className="lg:col-span-6">
          <div
            data-hero-panel
            className="relative mx-auto w-full max-w-[460px] opacity-0 motion-reduce:opacity-100"
            style={{ aspectRatio: "4/5" }}
          >
            {/* Warm glow bed */}
            <div className="glow-brown absolute inset-0 scale-110 blur-[70px]" />

            {/* Vitrine container */}
            <div className="product-vitrine relative h-full w-full overflow-hidden">
              {/* Gift-box frame sequence — scrubs as hero scrolls out */}
              <FrameSequence
                frames={frameSequences.giftbox}
                pin={false}
                start="top 75%"
                end="bottom top"
                className="h-full w-full"
              />

              {/* Cinematic vignette overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_45%,transparent_50%,rgba(5,5,5,0.65))]" />
              {/* Bottom scrim — grades out at the bottom edge */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d0b09] to-transparent" />

              {/* Caption plate */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="eyebrow text-[9px] tracking-[0.26em]">The Unboxing</span>
                <span className="text-[11px] text-text-muted">Chapter 01</span>
              </div>
            </div>

            {/* Reduced-motion static fallback */}
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center motion-reduce:flex">
              <div className="relative aspect-square w-[72%]">
                <Image
                  src={images.shoes.oxfordBrownMain}
                  alt="Handcrafted brown Oxford leather shoe — the signature KK Leathers piece"
                  fill
                  sizes="320px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Stage 10 — Oxford emerges here; travels from the open gift box */}
            <ShoeStage
              order={10}
              pose={{ width: 300, rotation: -8, tiltY: 14, variant: "main", glow: 0.75 }}
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
