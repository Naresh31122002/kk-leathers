"use client";

import Image from "next/image";
import ShoeStage from "./ShoeStage";
import { type ShoePose } from "./ShoeStageContext";
import { images } from "@/lib/assets";
import { cn } from "@/lib/cn";

const VARIANT_SRC: Record<NonNullable<ShoePose["variant"]>, string> = {
  main: images.shoes.oxfordBrownMain,
  side: images.shoes.oxfordBrownSide,
  pair: images.shoes.oxfordBrownPair,
  floating: images.shoes.oxfordBrownFloating,
};

/**
 * A "display case" that receives the travelling Oxford: a framed vitrine with a
 * back-light, gradient floor and reflection so the space reads as an intentional
 * pedestal even in the instants the shoe is mid-flight elsewhere — no empty
 * holes (requirement 2/10). ShoeStage registers the pose; the moving shoe is
 * drawn on top by TravellingShoe. Under reduced motion a static Oxford shows.
 */
export default function ShoeSlot({
  order,
  pose,
  className,
  ratio = "aspect-square",
  label,
  framed = true,
  caption,
}: {
  order: number;
  pose: ShoePose;
  className?: string;
  ratio?: string;
  label?: string;
  framed?: boolean;
  caption?: string;
}) {
  const variant = pose.variant ?? "main";
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        framed &&
          "rounded-[28px] border border-white/[0.07] bg-[radial-gradient(120%_90%_at_50%_20%,rgba(123,74,36,0.14),transparent_60%),linear-gradient(180deg,#141210,#0a0a0a)] shadow-lg",
        ratio,
        className
      )}
    >
      {/* Back-light bloom */}
      <div className="glow-brown pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-80 blur-[40px]" />
      {/* Floor + reflection */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[16%] h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-black/50 to-transparent" />

      {caption && (
        <span className="absolute bottom-4 left-5 z-10 text-caption uppercase tracking-[0.18em] text-text-muted">
          {caption}
        </span>
      )}

      {/* Reduced-motion static shoe fallback */}
      <div className="absolute inset-0 hidden items-center justify-center motion-reduce:flex">
        <div className="relative aspect-square w-[62%]">
          <Image
            src={VARIANT_SRC[variant]}
            alt={label ?? "Handcrafted Oxford leather shoe"}
            fill
            sizes="360px"
            className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>

      <ShoeStage order={order} pose={pose} className="absolute inset-0" aria-label={label} />
    </div>
  );
}
