"use client";

import Image from "next/image";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import FloatMedia from "@/components/anim/FloatMedia";
import { images } from "@/lib/assets";

const items = [
  {
    id: "belt",
    kicker: "The Belt",
    title: "Cut from one piece",
    copy: "A single strip of full-grain leather, edge-painted and burnished — no bonded layers, no shortcuts.",
    image: images.belts.brownFloating,
    alt: "Floating brown full-grain leather belt",
    float: { amplitude: 8, duration: 5.5, rotate: 1 },
  },
  {
    id: "slipper",
    kicker: "The Slipper",
    title: "Comfort, considered",
    copy: "Soft-lined and structured, finished with the same hand as our shoes. Luxury for the quiet hours.",
    image: images.slippers.brownFloating,
    alt: "Floating pair of brown leather slippers",
    float: { amplitude: 10, duration: 6, rotate: -1 },
  },
];

/**
 * Accessories (doc 09 Phase 09) — belt + slipper on the floating hero webps,
 * with a gentle continuous drift and a soft lift-on-hover (doc 02 §25).
 */
export default function Accessories() {
  return (
    <Section id="accessories" tone="raised" className="grain">
      <SectionHeading
        index="04"
        eyebrow="Accessories"
        title="The finishing pieces"
        intro="Small objects, made with the same devotion as the marquee collection."
        className="mb-14"
      />

      <StaggerGroup
        stagger={0.14}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
      >
        {items.map((item) => (
          <StaggerItem key={item.id} y={40}>
            <article
              className="group relative h-full overflow-hidden rounded-card border border-white/[0.06] bg-surface p-8 sm:p-10"
            >
              <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative mb-8 aspect-[16/10] w-full">
                <FloatMedia {...item.float}>
                  <div className="relative h-full w-full transition-transform duration-700 ease-luxury group-hover:scale-[1.05]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                </FloatMedia>
              </div>
              <p className="eyebrow mb-2 text-[11px]">{item.kicker}</p>
              <h3 className="font-display text-subheading font-semibold">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-small text-text-secondary">
                {item.copy}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
