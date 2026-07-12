"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  /** Ordered frame URLs (frame 0 → last). */
  frames: string[];
  className?: string;
  /** Intrinsic frame size for the canvas backing store. */
  width?: number;
  height?: number;
  /** How far (in viewport heights) the pinned scrub lasts. Pinned mode only. */
  scrollLength?: number;
  /** Pin the section while scrubbing (a dedicated scene). Default true. */
  pin?: boolean;
  /** Play the sequence backwards (last→first) as you scroll down. */
  reverse?: boolean;
  /** ScrollTrigger start/end for NON-pinned mode (scrubs across the element). */
  start?: string;
  end?: string;
  /** Extra scene rendered over the canvas (captions, labels). */
  children?: React.ReactNode;
};

/**
 * Scroll-scrubbed image-sequence player (canvas) — the site's core motion tool.
 * The frame is driven by scroll PROGRESS, so it plays forward on scroll-down and
 * reverses on scroll-up automatically, with fractional cross-fade for smoothness.
 *
 *  • pin (default): the section pins while the sequence advances — a dedicated
 *    cinematic scene (e.g. the exploded deconstruction).
 *  • non-pinned: the sequence scrubs across the element's own scroll range as it
 *    passes through the viewport (e.g. a gift box opening in the hero panel).
 *  • reverse: last→first (e.g. the gift box CLOSING in the footer).
 *
 * All frames preload before playing (no blank flashes). Reduced motion paints a
 * representative frame statically with no scroll binding.
 */
export default function FrameSequence({
  frames,
  className,
  width = 1280,
  height = 720,
  scrollLength = 2.2,
  pin = true,
  reverse = false,
  start,
  end,
  children,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Preload every frame once.
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = frames.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        done += 1;
        setLoaded(done);
        if (done === frames.length) setReady(true);
      };
      return img;
    });
    imagesRef.current = imgs;
    return () => {
      imgs.forEach((img) => (img.onload = img.onerror = null));
    };
  }, [frames]);

  // Draw one image contain-fit into the canvas at a given alpha.
  const paint = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | undefined,
    alpha: number
  ) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const canvas = ctx.canvas;
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    ctx.globalAlpha = 1;
  };

  /**
   * Render a FRACTIONAL frame position. The base frame is painted opaque and the
   * next frame is cross-faded on top by the fractional remainder, so between two
   * discrete frames the eye reads continuous motion — smoothing the sequence far
   * beyond its raw frame count.
   */
  const drawAt = (pos: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const last = frames.length - 1;
    const clamped = Math.max(0, Math.min(last, pos));
    const base = Math.floor(clamped);
    const frac = clamped - base;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paint(ctx, imagesRef.current[base], 1);
    if (frac > 0.001 && base < last) paint(ctx, imagesRef.current[base + 1], frac);
  };

  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    if (!section) return;

    const last = frames.length - 1;
    const posFor = (progress: number) => (reverse ? (1 - progress) * last : progress * last);

    // Reduced motion → paint a representative frame, no scroll binding.
    if (reduced) {
      drawAt(reverse ? 0 : last);
      return;
    }

    const state = { pos: posFor(0) };
    drawAt(state.pos);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: start ?? "top top",
        end: end ?? (pin ? () => `+=${window.innerHeight * scrollLength}` : "bottom top"),
        pin,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          state.pos = posFor(self.progress);
          drawAt(state.pos);
        },
      });
      return () => st.kill();
    }, section);

    const onResize = () => drawAt(state.pos);
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, [ready, reduced, frames.length, scrollLength, pin, reverse, start, end]);

  return (
    <div ref={sectionRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="h-full w-full object-contain"
        aria-hidden
      />
      {/* Loading shimmer until frames are ready */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-gold" />
          <span className="sr-only">Loading {loaded}/{frames.length}</span>
        </div>
      )}
      {children}
    </div>
  );
}
