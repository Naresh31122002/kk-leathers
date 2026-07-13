"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { images } from "@/lib/assets";
import { useShoeStages, type ShoePose } from "./ShoeStageContext";

const DEFAULT_POSE: Required<ShoePose> = {
  width:    360,
  rotation: 0,
  tiltX:    0,
  tiltY:    0,
  opacity:  1,
  variant:  "main",
  glow:     0.65,
};

/**
 * THE MAIN CHARACTER — ONE Oxford, ONE image, ONE master timeline.
 *
 * Architectural principles:
 *  • ONE fixed overlay, ONE <Image>, never swapped. Same shoe the whole way.
 *  • Position is a Catmull-Rom motionPath through every registered stage anchor
 *    so the shoe arcs naturally rather than sliding in straight lines.
 *  • Pose changes (scale / rotation / tilt / opacity / glow) are segmented tweens
 *    keyed to the same scroll fraction the motionPath reaches each anchor — so
 *    the shoe always looks right when it arrives, not just mid-flight.
 *  • A separate inner "breathing" layer (y float + micro-rotation) runs on top of
 *    the scroll-driven transform without fighting it.
 *  • Visibility is hard-gated: if opacity < 0.03 the overlay is display:none so
 *    no glow / shadow bleeds through sections where the shoe must be absent.
 *  • Only active on md+ (≥1024 px). Mobile / reduced-motion: null.
 *  • invalidateOnRefresh + resize rebuild keep it synced after reflow.
 */
export default function TravellingShoe() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const shoeRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const { getStages, version } = useShoeStages();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const wrap  = wrapRef.current;
    const shoe  = shoeRef.current;
    const float = floatRef.current;
    if (!wrap || !shoe || !float) return;

    let master:   gsap.core.Timeline | null = null;
    let breathing: gsap.core.Timeline | null = null;
    let st:       ScrollTrigger | null = null;
    let raf = 0;

    /* ── Breathing life (inner layer — never fights the scroll tween) ── */
    breathing = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" },
    });
    breathing
      .to(float, { y: -12, duration: 3.4 }, 0)
      .to(float, { rotation: 1.8, duration: 3.4 }, 0);

    /* ── Build (or rebuild) the master scroll timeline ── */
    const build = () => {
      const stages = getStages();
      if (stages.length < 2) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      /*
       * For each stage, resolve:
       *   scrollAt  — the document scroll position at which the anchor is
       *               centred in the viewport.
       *   cx / cy   — the SCREEN point the shoe centre should hold at that
       *               scroll position (clamped to keep the shoe fully on screen).
       */
      const resolved = stages.map((s) => {
        const r  = s.el.getBoundingClientRect();
        const anchorDocY  = r.top + window.scrollY + r.height / 2;
        const scrollAt    = anchorDocY - vh / 2;
        const pose        = { ...DEFAULT_POSE, ...s.pose };
        const half        = pose.width / 2;
        const margin      = 20;

        // Screen X/Y when this anchor is centred (scrollTop === scrollAt).
        const rawX = r.left + r.width  / 2;
        const rawY = r.top  + window.scrollY + r.height / 2 - scrollAt;

        const cx = Math.min(vw - half - margin, Math.max(half + margin, rawX));
        const cy = Math.min(vh - half - margin, Math.max(half + margin, rawY));

        return { cx, cy, scrollAt, pose };
      });

      /* Kill previous animation before rebuilding */
      master?.kill();
      st?.kill();

      const first = resolved[0];
      const last  = resolved[resolved.length - 1];
      const total = Math.max(1, last.scrollAt - first.scrollAt);

      /* Prime the shoe at stage 0 */
      gsap.set(shoe, {
        x:          first.cx,
        y:          first.cy,
        xPercent:   -50,
        yPercent:   -50,
        width:      first.pose.width,
        rotation:   first.pose.rotation,
        rotationX:  first.pose.tiltX,
        rotationY:  first.pose.tiltY,
        opacity:    first.pose.opacity ?? 1,
      });
      gsap.set(glowRef.current, { opacity: first.pose.glow ?? DEFAULT_POSE.glow });

      /* Initial visibility */
      const startOpacity = first.pose.opacity ?? 1;
      wrap.style.display = startOpacity > 0.03 ? "block" : "none";

      master = gsap.timeline({ defaults: { ease: "none" } });

      /* (A) Position — one smooth Catmull-Rom arc through all stage points */
      master.to(
        shoe,
        {
          motionPath: {
            path:       resolved.map((r) => ({ x: r.cx, y: r.cy })),
            curviness:  1.2,   // reduced from 1.4 — still curves, not over-dramatic
            autoRotate: false,
          },
          duration: 1,
          ease:     "power1.inOut",
        },
        0
      );

      /* (B) Pose — segmented tweens keyed to the same scroll fractions */
      for (let i = 0; i < resolved.length - 1; i++) {
        const a   = resolved[i];
        const b   = resolved[i + 1];
        const at  = (a.scrollAt - first.scrollAt) / total;
        const dur = Math.max(0.05, (b.scrollAt - a.scrollAt) / total);

        master.to(
          shoe,
          {
            width:     b.pose.width     ?? DEFAULT_POSE.width,
            rotation:  b.pose.rotation  ?? DEFAULT_POSE.rotation,
            rotationX: b.pose.tiltX     ?? DEFAULT_POSE.tiltX,
            rotationY: b.pose.tiltY     ?? DEFAULT_POSE.tiltY,
            opacity:   b.pose.opacity   ?? DEFAULT_POSE.opacity,
            duration:  dur,
            ease:      "power2.inOut",
          },
          at
        );
        master.to(
          glowRef.current,
          { opacity: b.pose.glow ?? DEFAULT_POSE.glow, duration: dur },
          at
        );
      }

      st = ScrollTrigger.create({
        trigger: document.documentElement,
        start:   () => `${Math.max(0, first.scrollAt)} top`,
        end:     () => `${last.scrollAt} top`,
        scrub:   1.2,          // slightly looser than 1 — feels more organic
        animation: master,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const o = Number(gsap.getProperty(shoe, "opacity"));
          wrap.style.display = o > 0.03 ? "block" : "none";
        },
      });
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    };

    kick();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    ScrollTrigger.addEventListener("refresh", build);
    window.addEventListener("resize", kick);
    const t = setTimeout(() => ScrollTrigger.refresh(), 1600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", kick);
      ScrollTrigger.removeEventListener("refresh", build);
      master?.kill();
      breathing?.kill();
      st?.kill();
    };
  }, [getStages, version, reduced]);

  if (reduced) return null;

  return (
    <div
      ref={wrapRef}
      data-shoe="overlay"
      aria-hidden
      // Hidden on mobile (< md = 1024 px); floating above the page on desktop.
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    >
      <div
        ref={shoeRef}
        data-shoe="body"
        className="absolute left-0 top-0 will-change-transform"
        style={{ transformStyle: "preserve-3d", perspective: 1400 }}
      >
        {/* Ambient glow bed */}
        <div
          ref={glowRef}
          className="glow-brown absolute inset-0 -z-10 scale-[1.55] blur-[90px]"
        />

        {/* Floating inner wrapper — breathing animation lives here */}
        <div
          ref={floatRef}
          className="relative aspect-square w-full will-change-transform"
        >
          {/* Grounded contact shadow */}
          <div className="pointer-events-none absolute -bottom-[5%] left-1/2 h-[9%] w-[60%] -translate-x-1/2 rounded-[50%] bg-black/50 blur-[18px]" />

          <Image
            src={images.shoes.oxfordBrownMain}
            alt=""
            fill
            priority
            sizes="(max-width:1280px) 320px, 420px"
            className="object-contain drop-shadow-[0_40px_64px_rgba(0,0,0,0.72)]"
          />

          {/* Gold rim-light — subtle leather reflection */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_70%_at_30%_16%,rgba(200,164,93,0.16),transparent_44%)] mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}
