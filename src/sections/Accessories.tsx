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
    float: { amplitude: 9, duration: 5.5, rotate: 1 },
  },
  {
    id: "slipper",
    kicker: "The Slipper",
    title: "Comfort, considered",
    copy: "Soft-lined and structured, finished with the same hand as our shoes. Luxury for the quiet hours.",
    image: images.slippers.brownFloating,
    alt: "Floating pair of brown leather slippers",
    float: { amplitude: 11, duration: 6.2, rotate: -1 },
  },
] as const;

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
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6"
      >
        {items.map((item) => (
          <StaggerItem key={item.id} y={36}>
            <article
              className="group relative h-full overflow-hidden rounded-card
                border border-white/[0.07]
                bg-surface
                p-8 sm:p-10
                shadow-[0_2px_4px_rgba(0,0,0,.12),0_8px_20px_rgba(0,0,0,.22)]
                transition-[box-shadow,border-color] duration-700 ease-luxury
                hover:border-white/[0.11]
                hover:shadow-[0_4px_8px_rgba(0,0,0,.18),0_16px_40px_rgba(0,0,0,.30)]"
            >
              {/* Brown glow bloom */}
              <div className="glow-brown pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Floating product image */}
              <div className="relative mb-8 aspect-[16/9] w-full">
                <FloatMedia {...item.float}>
                  <div
                    className="relative h-full w-full
                      transition-transform duration-700 ease-luxury
                      group-hover:scale-[1.04]"
                  >
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain drop-shadow-[0_28px_44px_rgba(0,0,0,0.50)]"
                    />
                  </div>
                </FloatMedia>
              </div>

              <p className="eyebrow mb-[6px] text-[10px]">{item.kicker}</p>
              <h3 className="font-display text-[26px] font-semibold leading-[1.22] text-text-primary">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-small text-text-secondary">
                {item.copy}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
