"use client";

import { useEffect, useId, useRef } from "react";
import { useShoeStages, type ShoePose } from "./ShoeStageContext";
import { cn } from "@/lib/cn";

/**
 * An invisible anchor that reserves the space where the travelling Oxford will
 * appear inside a section, and registers the pose it should hold there. The
 * shoe itself is rendered by <TravellingShoe> as a fixed overlay, so laying out
 * this empty box keeps the section's grid/spacing intact (no layout shift).
 */
export default function ShoeStage({
  order,
  pose,
  className,
  "aria-label": ariaLabel,
}: {
  /** Journey order — lower flies first (hero=10, collections=20, …). */
  order: number;
  pose: ShoePose;
  className?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { register } = useShoeStages();

  // Keep the latest pose without forcing a re-register on every render.
  const poseRef = useRef(pose);
  poseRef.current = pose;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return register({ id, el, pose: poseRef.current, order });
  }, [id, order, register]);

  return (
    <div
      ref={ref}
      data-shoe-stage={order}
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      {/* Reserves space; the real shoe is drawn by TravellingShoe. */}
      {ariaLabel ? <span className="sr-only">{ariaLabel}</span> : null}
    </div>
  );
}
