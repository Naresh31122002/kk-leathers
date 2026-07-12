"use client";

import { useEffect, useRef } from "react";

/**
 * ONE continuous background for the whole film (requirement 6):
 * black → charcoal → espresso → warm leather → black. A fixed full-viewport
 * layer whose vertical gradient offset is driven by scroll progress, so the
 * colour temperature drifts as you move through the story and every section
 * melts into the next — no per-section background blocks.
 */
export default function PageBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      // Slide the tall gradient upward as we scroll so the warm middle passes by.
      el.style.transform = `translate3d(0, ${(-p * 55).toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#050505]"
    >
      {/* Tall gradient (220vh) that translates on scroll to reveal the warm
          middle. Colours: black → charcoal → espresso → warm leather → black. */}
      <div
        ref={ref}
        className="absolute inset-x-0 top-0 h-[230vh] will-change-transform"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, #0e0b0a 20%, #17100c 40%, #241812 58%, #14100d 76%, #080606 90%, #050505 100%)",
        }}
      />
      {/* Soft warm bloom that sits over the leather-toned middle for depth. */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_70%_45%,rgba(123,74,36,0.10),transparent_60%)]" />
      {/* Very subtle vignette to keep edges cinematic. */}
      <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_50%_50%,transparent_60%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
