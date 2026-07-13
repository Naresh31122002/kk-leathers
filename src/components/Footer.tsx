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
 * Footer — the cinematic ending.
 * The gift box CLOSES (reverse frame sequence) as you arrive, mirroring the
 * hero's opening. The Oxford descends above the box and fades inside.
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
      gsap.fromTo(
        el.querySelector("[data-box-glow]"),
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer className="grain relative overflow-hidden border-t border-white/[0.06]">
      <div className="container-luxury py-24">

        {/* Cinematic closing note */}
        <div ref={boxRef} className="mb-20 flex flex-col items-center gap-8 text-center">
          {/* Oxford descends toward the box */}
          <div className="relative h-[40px] w-full">
            <ShoeStage
              order={80}
              pose={{ width: 130, rotation: 0, tiltX: 22, variant: "main", glow: 0.28 }}
              className="absolute inset-x-0 -top-24 mx-auto h-[130px] w-[130px]"
              aria-label="The Oxford returning to its box"
            />
          </div>

          <div className="relative h-[240px] w-[300px]">
            <div
              data-box-glow
              className="glow-brown absolute inset-0 scale-125 opacity-0 blur-[60px]"
            />
            {/* Gift box CLOSES — sequence played in reverse */}
            <FrameSequence
              frames={frameSequences.giftbox}
              reverse
              pin={false}
              start="top 92%"
              end="bottom bottom"
              className="h-full w-full"
            />
            {/* Shoe is now inside the box — fully faded, completing the journey */}
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
            stagger={0.1}
            className="max-w-[22ch] font-display text-[24px] font-medium leading-[1.36] text-text-primary"
          >
            Every piece leaves the atelier boxed by hand.
          </SplitText>
        </div>

        {/* Footer grid */}
        <div
          className="grid grid-cols-1 gap-12
            border-t border-white/[0.06] pt-14
            md:grid-cols-4"
        >
          {/* Brand column */}
          <Reveal className="md:col-span-2">
            <div className="font-display text-[22px] font-semibold">
              <span className="text-gold">KK</span>
              <span className="ml-[6px]">Leathers</span>
            </div>
            <p className="mt-4 max-w-[38ch] text-small text-text-muted leading-[1.65]">
              {site.tagline}. Handmade leather goods, crafted to be worn for a
              lifetime.
            </p>
          </Reveal>

          {/* Navigation */}
          <Reveal as="nav" aria-label="Footer navigation">
            <p className="eyebrow mb-5 text-[10px]">Explore</p>
            <ul className="flex flex-col gap-[14px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-small text-text-muted transition-colors duration-200 hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact */}
          <Reveal>
            <p className="eyebrow mb-5 text-[10px]">Atelier</p>
            <ul className="flex flex-col gap-[14px] text-small text-text-muted">
              <li>{site.address}</li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-200 hover:text-text-primary"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {(["instagram", "linkedin", "pinterest"] as const).map((s) => (
                <a
                  key={s}
                  href={site.social[s]}
                  className="text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-200 hover:text-text-primary"
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-4
            border-t border-white/[0.06] pt-8
            text-caption text-text-muted
            sm:flex-row"
        >
          <p>© {year} {site.name}. Handcrafted with care.</p>
          <p className="order-first text-[10px] uppercase tracking-[0.18em] sm:order-none">
            Crafted · Timeless · Handmade
          </p>
          <Magnetic>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="flex items-center gap-2 rounded-pill
                border border-white/[0.12] px-4 py-2
                text-[10px] uppercase tracking-[0.18em] text-text-muted
                transition-[color,border-color] duration-300
                hover:border-gold/50 hover:text-gold"
            >
              Top <ArrowUp size={12} strokeWidth={1.6} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
