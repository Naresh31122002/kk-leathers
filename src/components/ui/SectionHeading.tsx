"use client";

import SplitText from "@/components/anim/SplitText";
import Reveal from "@/components/anim/Reveal";
import Eyebrow from "./Eyebrow";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  /** Optional oversized index numeral (e.g. "01") for editorial rhythm. */
  index?: string;
};

/**
 * Consistent, cinematic section header (doc 02 §33). The title uses a masked
 * split-line reveal; eyebrow + intro fade up in sequence.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  index,
}: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {index && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 font-display text-[120px] leading-none text-white/[0.03] sm:text-[160px]"
        >
          {index}
        </span>
      )}

      {eyebrow && (
        <Reveal y={16}>
          <Eyebrow withRule={align === "left"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <SplitText
        as="h2"
        type="lines"
        className="max-w-[20ch] font-display text-[34px] font-semibold leading-[1.12] sm:text-[42px] lg:text-section"
      >
        {title}
      </SplitText>

      {intro && (
        <Reveal y={22} delay={0.1}>
          <p
            className={cn(
              "max-w-[52ch] text-body text-text-secondary",
              align === "center" && "mx-auto"
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
