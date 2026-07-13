"use client";

import { Quote } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <Section id="testimonials" className="grain">
      <SectionHeading
        eyebrow="In Their Words"
        title="Worn, and loved"
        align="center"
        className="mb-16"
      />

      <StaggerGroup
        stagger={0.13}
        className="grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <StaggerItem key={i} y={32}>
            <figure
              className="group relative flex h-full flex-col overflow-hidden rounded-glass
                border border-white/[0.08] bg-white/[0.032]
                p-8 backdrop-blur-glass
                shadow-[0_2px_4px_rgba(0,0,0,.12),0_8px_24px_rgba(0,0,0,.20)]
                transition-[transform,box-shadow,border-color] duration-500 ease-luxury
                hover:-translate-y-[3px]
                hover:border-white/[0.12]
                hover:shadow-[0_4px_8px_rgba(0,0,0,.18),0_16px_40px_rgba(0,0,0,.28),0_0_0_1px_rgba(200,164,93,0.08)]"
            >
              {/* Gold glow bloom on hover */}
              <div className="glow-gold pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100" />

              <Quote
                size={26}
                strokeWidth={1.4}
                className="mb-7 flex-shrink-0 text-gold/75"
                aria-hidden
              />

              <blockquote className="relative flex-1 font-display text-[21px] leading-[1.46] text-text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="relative mt-8 border-t border-white/[0.07] pt-6">
                <p className="text-small font-medium text-text-primary">{t.name}</p>
                <p className="mt-[3px] text-caption text-text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
