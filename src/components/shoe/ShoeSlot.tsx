"use client";

import Image from "next/image";
import ShoeStage from "./ShoeStage";
import { type ShoePose } from "./ShoeStageContext";
import { images } from "@/lib/assets";
import { cn } from "@/lib/cn";

const VARIANT_SRC: Record<NonNullable<ShoePose["variant"]>, string> = {
  main:     images.shoes.oxfordBrownMain,
  side:     images.shoes.oxfordBrownSide,
  pair:     images.shoes.oxfordBrownPair,
  floating: images.shoes.oxfordBrownFloating,
};

/**
 * "Display case" — a framed vitrine that reserves the space where the
 * travelling Oxford will appear and registers its pose. The shoe itself is
 * drawn on top by <TravellingShoe>. Under reduced motion a static Oxford shows.
 *
 * The product-vitrine class provides: warm radial back-light, dark pedestal
 * gradient, luxury border, and layered shadows — consistent with the design
 * system's "one shadow language".
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
        framed && "product-vitrine",
        ratio,
        className
      )}
    >
      {/* Back-light bloom */}
      <div className="glow-brown pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-75 blur-[44px]" />

      {/* Stage floor gold hairline */}
      <div className="pointer-events-none absolute inset-x-8 bottom-[18%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Floor fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-black/60 to-transparent" />

      {/* Caption */}
      {caption && (
        <span className="absolute bottom-[14px] left-5 z-10 text-[10px] uppercase tracking-[0.22em] text-text-muted">
          {caption}
        </span>
      )}

      {/* Reduced-motion static shoe */}
      <div className="absolute inset-0 hidden items-center justify-center motion-reduce:flex">
        <div className="relative aspect-square w-[60%]">
          <Image
            src={VARIANT_SRC[variant]}
            alt={label ?? "Handcrafted Oxford leather shoe"}
            fill
            sizes="360px"
            className="object-contain drop-shadow-[0_36px_56px_rgba(0,0,0,0.58)]"
          />
        </div>
      </div>

      <ShoeStage
        order={order}
        pose={pose}
        className="absolute inset-0"
        aria-label={label}
      />
    </div>
  );
}
