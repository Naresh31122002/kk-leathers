"use client";

/**
 * Luxury scroll cue — an animated gold line descends inside a pill container.
 * Reads "Scroll" in small eyebrow caps. Reduced-motion: shows as static.
 */
export default function HeroScrollCue() {
  return (
    <div
      data-hero-cue
      aria-hidden
      className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-[10px]"
    >
      <span className="text-[9px] uppercase tracking-[0.30em] text-text-muted">Scroll</span>

      {/* Pill track */}
      <span className="relative flex h-12 w-[1px] overflow-hidden bg-white/[0.08]">
        {/* Animated gold line */}
        <span
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gold to-transparent motion-reduce:hidden"
          style={{ animation: "scrollcue 1.9s cubic-bezier(0.4,0,0.6,1) infinite" }}
        />
      </span>

      <style>{`
        @keyframes scrollcue {
          0%   { transform: translateY(-100%); opacity: 0;   }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
