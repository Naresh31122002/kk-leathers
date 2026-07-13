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
  wide:  "sm:col-span-2",
  small: "",
};

export default function CollectionCard({ c }: { c: Collection }) {
  return (
    <StaggerItem className={cn("h-full", spanClass[c.span])} y={36}>
      <article
        className={cn(
          "group relative h-full overflow-hidden rounded-card",
          "border border-white/[0.07]",
          "bg-surface",
          "shadow-[0_2px_4px_rgba(0,0,0,.14),0_8px_20px_rgba(0,0,0,.22)]",
          "transition-shadow duration-700 ease-luxury",
          "hover:shadow-[0_4px_8px_rgba(0,0,0,.20),0_16px_40px_rgba(0,0,0,.34),0_0_0_1px_rgba(200,164,93,0.10)]"
        )}
      >
        {/* Brown glow on hover — blooms from centre */}
        <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* Product image */}
        <Image
          src={c.image}
          alt={c.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-contain p-8 sm:p-10",
            "transition-transform duration-[1000ms] ease-luxury",
            "group-hover:-translate-y-[6px] group-hover:scale-[1.06]"
          )}
        />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/75 to-transparent p-6 pt-20">
          <p className="eyebrow mb-[6px] text-[10px]">{c.kicker}</p>
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-[20px] font-semibold leading-[1.25] text-text-primary">
                {c.title}
              </h3>
              <p
                className={cn(
                  "mt-1 max-w-[34ch] text-caption text-text-muted",
                  "max-h-0 translate-y-[4px] overflow-hidden opacity-0",
                  "transition-all duration-500 ease-luxury",
                  "group-hover:max-h-20 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                {c.description}
              </p>
            </div>
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center",
                "rounded-full border border-white/[0.12]",
                "text-text-muted",
                "transition-all duration-normal ease-luxury",
                "group-hover:border-gold/55 group-hover:text-gold"
              )}
            >
              <ArrowUpRight
                size={16}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              />
            </span>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}
