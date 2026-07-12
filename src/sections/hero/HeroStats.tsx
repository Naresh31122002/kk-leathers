"use client";

// Small trust strip beneath the hero CTAs — real brand facts, no fake metrics.
const stats = [
  { value: "100%", label: "Full-grain leather" },
  { value: "1", label: "Maker per piece" },
  { value: "∞", label: "Made to be inherited" },
];

export default function HeroStats() {
  return (
    <dl
      data-hero-fade
      className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/[0.07] pt-8"
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col">
          <dt className="font-display text-[28px] font-semibold text-text-primary">
            {s.value}
          </dt>
          <dd className="mt-1 max-w-[16ch] text-caption uppercase tracking-[0.14em] text-text-muted">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
