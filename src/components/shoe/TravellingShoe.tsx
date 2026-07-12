"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { images } from "@/lib/assets";
import { useShoeStages, type ShoePose } from "./ShoeStageContext";

const DEFAULT_POSE: Required<ShoePose> = {
  width: 380,
  rotation: 0,
  tiltX: 0,
  tiltY: 0,
  opacity: 1,
  variant: "main",
  glow: 0.6,
};

/**
 * THE MAIN CHARACTER — ONE Oxford, ONE image, ONE master timeline.
 *
 * Rendered once as a fixed overlay and flown continuously between section
 * stage-anchors by a SINGLE ScrollTrigger (scrub) whose timeline is rebuilt
 * from measured anchor positions. Key correctness choices:
 *   • ONE image only (no variant swapping) — the SAME shoe the whole way, so it
 *     never looks like "a different shoe". Facing changes come from rotation/tilt.
 *   • It is ALWAYS on screen: vertically it is fixed to the viewport centre; only
 *     X, scale, rotation, tilt and (rarely) opacity change. It only fades where a
 *     stage explicitly asks (the closing gift box).
 *   • Works on laptops too (>=1024px), not just large screens.
 *   • scrub + invalidateOnRefresh + rebuild-on-refresh keep it synced at any
 *     scroll speed and after resize (requirements 1, 9, 11).
 */
export default function TravellingShoe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const { getStages, version } = useShoeStages();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const shoe = shoeRef.current;
    const floatEl = floatRef.current;
    if (!wrap || !shoe || !floatEl) return;

    let master: gsap.core.Timeline | null = null;
    let breathing: gsap.core.Timeline | null = null;
    let st: ScrollTrigger | null = null;
    let raf = 0;

    // Continuous life: breathing scale + float on an inner element, so it layers
    // on top of the scroll-driven transform without fighting it (requirement 7).
    breathing = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
    breathing
      .to(floatEl, { y: -10, duration: 3.2 }, 0)
      .to(floatEl, { rotation: 1.5, duration: 3.2 }, 0);

    const build = () => {
      const stages = getStages();
      if (stages.length < 2) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Resolve each stage to (a) the scroll position at which its anchor is
      // centred in the viewport, and (b) the SCREEN point the shoe should hold
      // then — taken from the anchor's own on-screen box, so the path naturally
      // undulates in x AND y (the source of elegant curves, not straight slides).
      const resolved = stages.map((s) => {
        const r = s.el.getBoundingClientRect();
        const anchorCentreY = r.top + window.scrollY + r.height / 2;
        const scrollAt = anchorCentreY - vh / 2;
        const pose = { ...DEFAULT_POSE, ...s.pose };
        const half = pose.width / 2;
        // Where the anchor sits on screen WHEN it is centred (scrollTop=scrollAt):
        // x is the anchor centre; y is its centre relative to the viewport.
        const screenX = r.left + r.width / 2;
        const screenY = r.top + window.scrollY + r.height / 2 - scrollAt;
        // Keep the shoe fully on screen with a comfortable margin.
        const cx = Math.min(vw - half - 16, Math.max(half + 16, screenX));
        const cy = Math.min(vh - half - 16, Math.max(half + 16, screenY));
        return { cx, cy, scrollY: scrollAt, pose };
      });

      master?.kill();
      st?.kill();

      const first = resolved[0];
      const last = resolved[resolved.length - 1];
      const total = Math.max(1, last.scrollY - first.scrollY);

      // Prime the shoe at the first stage.
      gsap.set(shoe, {
        x: first.cx,
        y: first.cy,
        xPercent: -50,
        yPercent: -50,
        width: first.pose.width,
        rotation: first.pose.rotation,
        rotationX: first.pose.tiltX,
        rotationY: first.pose.tiltY,
        opacity: first.pose.opacity,
      });
      gsap.set(glowRef.current, { opacity: first.pose.glow });
      wrap.style.visibility = first.pose.opacity > 0.03 ? "visible" : "hidden";

      master = gsap.timeline({ defaults: { ease: "none" } });

      // (1) Position — ONE smooth Catmull-Rom curve through every stage point, so
      // the shoe arcs gracefully rather than snapping between straight segments.
      const pathPoints = resolved.map((r) => ({ x: r.cx, y: r.cy }));
      master.to(
        shoe,
        {
          motionPath: {
            path: pathPoints,
            curviness: 1.4,
            autoRotate: false,
          },
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );

      // (2) Pose (scale/rotation/tilt/opacity/glow) — segmented so each keys to
      // the same scroll fraction the position reaches that stage at.
      for (let i = 0; i < resolved.length - 1; i++) {
        const a = resolved[i];
        const b = resolved[i + 1];
        const at = (a.scrollY - first.scrollY) / total;
        const dur = Math.max(0.04, (b.scrollY - a.scrollY) / total);
        master.to(
          shoe,
          {
            width: b.pose.width,
            rotation: b.pose.rotation,
            rotationX: b.pose.tiltX,
            rotationY: b.pose.tiltY,
            opacity: b.pose.opacity,
            duration: dur,
            ease: "power2.inOut",
          },
          at
        );
        master.to(
          glowRef.current,
          { opacity: b.pose.glow, duration: dur },
          at
        );
      }

      st = ScrollTrigger.create({
        trigger: document.documentElement,
        start: () => `${Math.max(0, first.scrollY)} top`,
        end: () => `${last.scrollY} top`,
        scrub: 1,
        animation: master,
        invalidateOnRefresh: true,
        onUpdate: () => {
          // Hard-gate the overlay: whenever the shoe body is effectively
          // invisible, hide the whole wrapper so no glow/reflection bleeds
          // through the sections where the shoe must be absent.
          const o = Number(gsap.getProperty(shoe, "opacity"));
          const shouldShow = o > 0.03;
          if (shouldShow) {
            if (wrap.style.visibility === "hidden") {
              wrap.style.visibility = "visible";
            }
          } else if (wrap.style.visibility !== "hidden") {
            wrap.style.visibility = "hidden";
          }
        },
      });
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    };

    // Build after fonts/images settle; rebuild on refresh + resize.
    kick();
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    ScrollTrigger.addEventListener("refresh", build);
    window.addEventListener("resize", kick);
    // Extra safety: re-measure a beat later (covers late media reflow).
    const t = setTimeout(() => ScrollTrigger.refresh(), 1500);

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
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    >
      <div
        ref={shoeRef}
        data-shoe="body"
        className="absolute left-0 top-0 will-change-transform"
        style={{ transformStyle: "preserve-3d", perspective: 1400 }}
      >
        {/* Glow bed + grounded contact shadow (luxury presentation, req 9) */}
        <div
          ref={glowRef}
          className="glow-brown absolute inset-0 -z-10 scale-[1.5] blur-[80px]"
        />
        <div
          ref={floatRef}
          className="relative aspect-square w-full will-change-transform"
        >
          <div className="pointer-events-none absolute -bottom-[6%] left-1/2 h-[10%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-2xl" />
          <Image
            src={images.shoes.oxfordBrownMain}
            alt=""
            fill
            priority
            sizes="480px"
            className="object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.7)]"
          />
          {/* Gold rim-light sweeping the leather — reflections (req 7) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_32%_18%,rgba(200,164,93,0.18),transparent_46%)] mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}
