"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  className?: string;
  /** Fraction visible before it plays. */
  threshold?: number;
  poster?: string;
  rounded?: boolean;
  ariaLabel?: string;
  /** Eagerly load (hero-tier videos). Default lazy via preload=metadata. */
  eager?: boolean;
};

/**
 * Autoplay/muted/loop/playsInline video that plays only while in the viewport
 * and pauses when it leaves (doc 02 §21, doc 09 Phase 07/16).
 *
 * The `src` is set directly in the DOM so the browser reliably fetches at least
 * metadata (a paintable first frame) — no black boxes. An IntersectionObserver
 * drives play/pause, and play() is retried on `canplay`/`loadeddata` to defeat
 * the decode race. Fades in once paintable.
 */
export default function VideoPlayer({
  src,
  className,
  threshold = 0.2,
  poster,
  rounded = true,
  ariaLabel,
  eager = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const wantPlay = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        wantPlay.current = entry.isIntersecting;
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold }
    );
    io.observe(el);

    const onReady = () => {
      setReady(true);
      if (wantPlay.current) el.play().catch(() => {});
    };
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    // Kick a load in case the browser is lazy about metadata.
    if (el.readyState === 0) el.load();

    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [threshold, src]);

  return (
    <video
      ref={ref}
      className={cn(
        "h-full w-full object-cover transition-opacity duration-700 ease-luxury",
        rounded && "rounded-video",
        ready ? "opacity-100" : "opacity-0",
        className
      )}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    />
  );
}
