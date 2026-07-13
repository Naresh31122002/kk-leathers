"use client";

import { useEffect, useRef } from "react";

/**
 * Slim gold scroll-progress bar pinned at the very top of the viewport.
 * A subtle premium orientation cue — 2 px high, gold gradient, smooth rAF.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      const h   = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p   = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p.toFixed(4)})`;
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
    <div aria-hidden className="fixed inset-x-0 top-0 z-[102] h-[2px] bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left scale-x-0"
        style={{
          background: "linear-gradient(90deg, rgba(123,74,36,0.6) 0%, #c8a45d 50%, rgba(123,74,36,0.6) 100%)",
        }}
      />
    </div>
  );
}
