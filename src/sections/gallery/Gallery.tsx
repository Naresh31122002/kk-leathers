"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import { gallery } from "@/lib/content";
import Lightbox from "./Lightbox";
import { cn } from "@/lib/cn";

const sizeClass: Record<string, string> = {
  tall:  "row-span-2",
  wide:  "sm:col-span-2",
  small: "",
};

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="gallery" className="grain">
      <SectionHeading
        index="05"
        eyebrow="Gallery"
        title="Leather, up close"
        intro="Grain, stitch and shadow — the details that only reveal themselves in person."
        className="mb-14 max-w-[42ch]"
      />

      <StaggerGroup
        stagger={0.06}
        className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
      >
        {gallery.map((g, i) => (
          <StaggerItem
            key={`${g.src}-${i}`}
            className={cn("h-full", sizeClass[g.size])}
            y={28}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${g.alt}`}
              className={cn(
                "group relative block h-full w-full overflow-hidden rounded-image",
                "border border-white/[0.06]",
                "bg-secondary",
                "shadow-[0_2px_6px_rgba(0,0,0,.16)]",
                "transition-[box-shadow,border-color] duration-500 ease-luxury",
                "hover:border-white/[0.10]",
                "hover:shadow-[0_4px_12px_rgba(0,0,0,.22),0_16px_36px_rgba(0,0,0,.28)]"
              )}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={cn(
                  "object-contain p-5",
                  "transition-transform duration-[900ms] ease-luxury",
                  "group-hover:scale-[1.08]"
                )}
              />
              {/* Brown glow on hover */}
              <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Expand icon */}
              <span
                className={cn(
                  "absolute right-[10px] top-[10px]",
                  "flex h-8 w-8 items-center justify-center",
                  "rounded-full border border-white/[0.14]",
                  "bg-base/50 text-text-muted backdrop-blur-sm",
                  "translate-y-[3px] opacity-0",
                  "transition-all duration-300",
                  "group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                <Maximize2 size={13} strokeWidth={1.6} />
              </span>
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Lightbox
        items={gallery}
        index={open}
        onClose={() => setOpen(null)}
        onNav={setOpen}
      />
    </Section>
  );
}
