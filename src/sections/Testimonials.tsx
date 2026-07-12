"use client";

import { Quote } from "lucide-react";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/anim/Stagger";
import { testimonials } from "@/lib/content";

/**
 * Testimonials (doc 09 Phase 12) — glass cards with an elegant staggered rise,
 * a soft hover elevation, and a gold glow on hover.
 */
export default function Testimonials() {
  return (
    <Section id="testimonials" className="grain">
      <SectionHeading
        eyebrow="In Their Words"
        title="Worn, and loved"
        align="center"
        className="mb-16"
      />

      <StaggerGroup stagger={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <StaggerItem key={i} y={34}>
            <figure
              className="group relative flex h-full flex-col overflow-hidden rounded-glass border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-glass transition-transform duration-500 ease-luxury hover:-translate-y-1"
            >
              <div className="glow-gold pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Quote size={28} className="mb-6 text-gold" aria-hidden />
              <blockquote className="relative flex-1 font-display text-[22px] leading-[1.42] text-text-primary">
                “{t.quote}”
              </blockquote>
              <figcaption className="relative mt-8 border-t border-white/[0.08] pt-6">
                <p className="text-small font-medium text-text-primary">{t.name}</p>
                <p className="text-caption text-text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
