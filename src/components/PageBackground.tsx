"use client";

import { useEffect, useRef } from "react";

/**
 * ONE continuous luxury background for the whole film.
 * A 260vh gradient column drifts upward as you scroll, carrying the colour
 * temperature through five tonal bands so every section reads a slightly
 * different warmth:
 *
 *   0 %    deep black     — loader / hero sky
 *  18 %    rich charcoal  — collections
 *  36 %    warm espresso  — craft / anatomy
 *  54 %    leather brown  — mid journey warmth peak
 *  72 %    deep charcoal  — business / accessories
 *  88 %    near-black     — gallery / story
 * 100 %    base black     — testimonials → footer
 *
 * A fixed radial brown bloom sits at 68 % × 42 % for ambient warmth.
 * A vignette darkens the edges for a cinematic frame.
 */
export default function PageBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const h   = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p   = max > 0 ? h.scrollTop / max : 0;
      // Slide the 260 vh column so the warm band crosses the viewport midway.
      el.style.transform = `translate3d(0, ${(-p * 60).toFixed(2)}%, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

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
      {/* Tall gradient column — translates on scroll */}
      <div
        ref={ref}
        className="absolute inset-x-0 top-0 h-[260vh] will-change-transform"
        style={{
          background: [
            "linear-gradient(180deg,",
            "  #050505 0%,",        /* deep black */
            "  #0d0b09 10%,",       /* hint of warmth */
            "  #141009 20%,",       /* charcoal-brown */
            "  #1c1410 30%,",       /* warm espresso */
            "  #221810 40%,",       /* richer espresso */
            "  #281d12 50%,",       /* leather warm peak */
            "  #1d140e 62%,",       /* pulling back */
            "  #130f0b 74%,",       /* deep charcoal */
            "  #0a0807 86%,",       /* near-black */
            "  #050505 100%",       /* base */
            ")",
          ].join(""),
        }}
      />

      {/* Soft warm bloom — stationary, sits over the leather band for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(1400px_900px_at_68%_42%,rgba(123,74,36,0.13),transparent_58%)]" />

      {/* Cool counter-bloom on left — stops the page feeling one-sided */}
      <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_8%_55%,rgba(30,20,12,0.30),transparent_60%)]" />

      {/* Cinematic vignette — darkens edges, keeps focus on centre */}
      <div className="absolute inset-0 bg-[radial-gradient(150%_130%_at_50%_48%,transparent_55%,rgba(0,0,0,0.62))]" />
    </div>
  );
}
