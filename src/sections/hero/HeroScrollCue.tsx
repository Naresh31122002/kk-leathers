"use client";

// Minimal scroll cue with an animated draw line (doc 01 §12 scroll-first).
export default function HeroScrollCue() {
  return (
    <div
      data-hero-cue
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-text-muted"
    >
      <span className="text-caption uppercase tracking-[0.24em]">Scroll</span>
      <span className="relative block h-10 w-px overflow-hidden bg-white/10">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-gradient-to-b from-gold to-transparent" />
      </span>
      <style>{`
        @keyframes scrollcue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-hero-cue] span span { animation: none; }
        }
      `}</style>
    </div>
  );
}
