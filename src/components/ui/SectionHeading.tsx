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
  /** Oversized ghost index numeral for editorial rhythm — e.g. "01" */
  index?: string;
};

/**
 * Consistent, cinematic section header (doc 02 §33).
 * Title uses a masked split-line reveal; eyebrow and intro stagger behind it.
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
        "relative flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Ghost index numeral — purely decorative, very low opacity */}
      {index && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-8 font-display leading-none",
            "text-[100px] sm:text-[140px]",
            "text-white/[0.028]",
            "select-none",
            align === "center" ? "inset-x-0 text-center" : "right-0"
          )}
        >
          {index}
        </span>
      )}

      {eyebrow && (
        <Reveal y={14}>
          <Eyebrow withRule={align === "left"}>{eyebrow}</Eyebrow>
        </Reveal>
      )}

      <SplitText
        as="h2"
        type="lines"
        className={cn(
          "font-display font-semibold leading-[1.12]",
          "text-[30px] sm:text-[38px] lg:text-section",
          "max-w-[20ch]",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </SplitText>

      {intro && (
        <Reveal y={20} delay={0.12}>
          <p
            className={cn(
              "text-body text-text-secondary",
              "max-w-[50ch]",
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
