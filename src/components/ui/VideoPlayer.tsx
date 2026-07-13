"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  className?: string;
  threshold?: number;
  poster?: string;
  rounded?: boolean;
  ariaLabel?: string;
  eager?: boolean;
};

/**
 * Viewport-aware autoplay video (doc 02 §21, doc 09 Phase 07/16).
 * Plays only while in the viewport. Fades in once the first frame is paintable
 * so there are never black boxes. A shimmer skeleton shows while loading.
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
  const ref       = useRef<HTMLVideoElement>(null);
  const [ready, setReady]     = useState(false);
  const wantPlay  = useRef(false);

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
    el.addEventListener("canplay",    onReady);
    if (el.readyState === 0) el.load();

    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay",    onReady);
    };
  }, [threshold, src]);

  return (
    <div className="relative h-full w-full">
      {/* Shimmer skeleton while loading */}
      {!ready && (
        <div
          className={cn(
            "absolute inset-0 bg-surface",
            rounded && "rounded-video"
          )}
          style={{
            background:
              "linear-gradient(90deg, #171717 25%, #202020 50%, #171717 75%)",
            backgroundSize: "400px 100%",
            animation: "shimmer 1.6s linear infinite",
          }}
        />
      )}
      <video
        ref={ref}
        className={cn(
          "h-full w-full object-cover",
          "transition-opacity duration-700 ease-luxury",
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
    </div>
  );
}
