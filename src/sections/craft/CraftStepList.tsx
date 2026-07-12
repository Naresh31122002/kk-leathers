"use client";

import { cn } from "@/lib/cn";

type Step = { id: string; step: string; title: string; copy: string };

/**
 * Interactive step list beside the pinned stage. The active step brightens and
 * its copy expands; a gold rail marks progress through the process.
 */
export default function CraftStepList({
  steps,
  active,
  onSelect,
}: {
  steps: readonly Step[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <ol className="relative flex flex-col gap-1 pl-8">
      {/* Progress rail */}
      <span className="absolute left-[3px] top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
      <span
        className="absolute left-[3px] top-2 w-px bg-gradient-to-b from-gold to-brown transition-[height] duration-500 ease-luxury"
        style={{ height: `${((active + 1) / steps.length) * 100}%` }}
      />

      {steps.map((s, i) => {
        const isActive = i === active;
        return (
          <li key={s.id} className="relative">
            <span
              className={cn(
                "absolute -left-8 top-[14px] h-[7px] w-[7px] rounded-full transition-all duration-500",
                isActive ? "scale-150 bg-gold" : "bg-white/25"
              )}
            />
            <button
              type="button"
              onClick={() => onSelect(i)}
              className="group block w-full py-4 text-left"
              aria-current={isActive}
            >
              <span className="flex items-baseline gap-3">
                <span
                  className={cn(
                    "font-display text-caption transition-colors",
                    isActive ? "text-gold" : "text-text-muted"
                  )}
                >
                  {s.step}
                </span>
                <span
                  className={cn(
                    "font-display text-[22px] font-semibold transition-colors duration-500",
                    isActive ? "text-text-primary" : "text-text-muted"
                  )}
                >
                  {s.title}
                </span>
              </span>
              <span
                className={cn(
                  "block max-w-[42ch] overflow-hidden text-small text-text-secondary transition-all duration-500 ease-luxury",
                  isActive
                    ? "mt-2 max-h-24 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {s.copy}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
