"use client";

import { ElementType, useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  /** Split granularity. Lines read most cinematic for headings. */
  type?: "lines" | "words" | "chars";
  /** Trigger on scroll-into-view, or immediately (hero entrance). */
  trigger?: "scroll" | "mount";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: string;
  start?: string;
};

/**
 * Cinematic masked split-text reveal (doc 09 Phase 01 SplitType requirement,
 * Phase 15 Text Reveal). Each line/word is masked and rises into place.
 */
export default function SplitText({
  children,
  as: Tag = "span",
  className,
  type = "lines",
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
  duration = 1.05,
  y = "110%",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitType(el, {
      types: type,
      tagName: "span",
    });

    const parts =
      type === "chars" ? split.chars : type === "words" ? split.words : split.lines;
    if (!parts || !parts.length) return;

    // Wrap each part in an overflow-hidden mask for the rise effect.
    parts.forEach((p) => {
      p.style.display = "inline-block";
      const parent = document.createElement("span");
      parent.style.display = type === "lines" ? "block" : "inline-block";
      parent.style.overflow = "hidden";
      parent.style.verticalAlign = "top";
      p.parentNode?.insertBefore(parent, p);
      parent.appendChild(p);
    });

    gsap.set(el, { opacity: 1 });

    const anim = gsap.fromTo(
      parts,
      { yPercent: parseFloat(y) },
      {
        yPercent: 0,
        duration,
        delay,
        stagger,
        ease: "power4.out",
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start } }
          : {}),
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      split.revert();
      ScrollTrigger.refresh();
    };
  }, [children, reduced, type, trigger, delay, stagger, duration, y, start]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn("opacity-0", className)}
    >
      {children}
    </Tag>
  );
}
