"use client";

import { ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Stagger container + item pair for elegant list/grid reveals (doc 09 Phase 12).
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  amount = 0.25,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  as?: ElementType;
}) {
  const MotionTag = motion(as as ElementType);
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
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

export function StaggerItem({
  children,
  className,
  y = 34,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion(as as ElementType);
  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <MotionTag className={cn(className)} variants={variants}>
      {children}
    </MotionTag>
  );
}
