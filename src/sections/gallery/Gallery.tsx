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
  tall: "row-span-2",
  wide: "sm:col-span-2",
  small: "",
};

/**
 * Gallery (doc 09 Phase 10) — luxury masonry with progressive staggered reveal,
 * smooth hover zoom, and a full lightbox (Esc / arrow-key navigation).
 */
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
        stagger={0.07}
        className="grid auto-rows-[190px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4"
      >
        {gallery.map((g, i) => (
          <StaggerItem key={`${g.src}-${i}`} className={sizeClass[g.size]} y={30}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View ${g.alt}`}
              className="group relative block h-full w-full overflow-hidden rounded-image border border-white/[0.06] bg-secondary"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-6 transition-transform duration-[900ms] ease-luxury group-hover:scale-[1.09]"
              />
              <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span
                className={cn(
                  "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-base/40 text-text-secondary backdrop-blur-sm transition-all duration-300",
                  "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                <Maximize2 size={15} />
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
