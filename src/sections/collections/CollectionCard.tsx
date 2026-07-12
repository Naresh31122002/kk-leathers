"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { StaggerItem } from "@/components/anim/Stagger";
import { cn } from "@/lib/cn";

export type Collection = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  span: "large" | "wide" | "small";
};

const spanClass: Record<Collection["span"], string> = {
  large: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  small: "",
};

/**
 * A single collection card: masked image, hover lift + zoom, brown glow, and a
 * caption that rises on hover. Premium card transition (Phase 3/4).
 */
export default function CollectionCard({ c }: { c: Collection }) {
  return (
    <StaggerItem className={spanClass[c.span]} y={40}>
      <article
        className="group relative h-full overflow-hidden rounded-card border border-white/[0.06] bg-secondary"
      >
        {/* Layered ambience */}
        <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Product image */}
        <Image
          src={c.image}
          alt={c.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-10 transition-transform duration-[900ms] ease-luxury group-hover:-translate-y-2 group-hover:scale-[1.07]"
        />

        {/* Caption — kicker + title always visible, description reveals on hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base via-base/70 to-transparent p-7 pt-16">
          <p className="eyebrow mb-2 text-[11px]">{c.kicker}</p>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-card-title font-semibold text-text-primary">
                {c.title}
              </h3>
              <p
                className={cn(
                  "mt-1 max-w-[34ch] text-caption text-text-muted",
                  "max-h-0 translate-y-1 overflow-hidden opacity-0 transition-all duration-500 ease-luxury",
                  "group-hover:max-h-24 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                {c.description}
              </p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-text-muted transition-all duration-300 group-hover:border-gold/60 group-hover:text-gold">
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              />
            </span>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}
