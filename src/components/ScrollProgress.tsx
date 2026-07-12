"use client";

import { useEffect, useRef } from "react";

/**
 * Slim gold scroll-progress bar pinned to the top edge — a subtle premium cue
 * that orients the visitor through the long-form story.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let raf = 0;

    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = `scaleX(${p})`;
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
      className="fixed inset-x-0 top-0 z-[101] h-[2px] bg-transparent"
    >
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-brown via-gold to-brown"
      />
    </div>
  );
}
