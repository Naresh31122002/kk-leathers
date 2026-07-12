"use client";

import { ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

/**
 * Reusable Framer Motion in-view reveal (doc 09 Phase 01 framer-motion use).
 * Honors reduced motion. Use for non-scrubbed, one-shot element reveals.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  y = 28,
  delay = 0,
  duration = 0.9,
  once = true,
  amount = 0.35,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
