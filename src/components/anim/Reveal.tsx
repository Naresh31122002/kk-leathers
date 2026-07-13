"use client";

import { ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Initial vertical offset in px — lower is subtler. Default 28. */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

/**
 * Framer Motion in-view reveal (doc 09 Phase 01).
 * Uses the luxury cubic-bezier from the design system for consistent easing.
 * Reduced motion: fades only, no translation.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  y = 26,
  delay = 0,
  duration = 0.85,
  once = true,
  amount = 0.30,
}: Props) {
  const reduced  = useReducedMotion();
  const MotionEl = motion(as as ElementType);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionEl
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionEl>
  );
}
