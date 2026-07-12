import { forwardRef } from "react";
import Container from "./Container";
import { cn } from "@/lib/cn";

type Tone = "base" | "raised" | "none";

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Background tone — alternating tones give the page a gentle rhythm. */
  tone?: Tone;
  /** Set false to opt out of the centered container (full-bleed sections). */
  container?: boolean;
  containerClassName?: string;
  "aria-label"?: string;
};

/**
 * Reusable section shell (doc 02 §8, §33). The "raised" tone is a soft vertical
 * gradient that fades to transparent at the top and bottom edges, so tonal
 * shifts blend into their neighbours instead of forming hard rectangular blocks
 * — the page reads as ONE continuous surface (requirements 4 & 8).
 */
const Section = forwardRef<HTMLElement, Props>(function Section(
  { children, id, className, tone = "base", container = true, containerClassName, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      id={id}
      className={cn("section-pad relative", className)}
      {...rest}
    >
      {tone === "raised" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,rgba(10,8,7,0.4)_20%,rgba(10,8,7,0.4)_80%,transparent)]"
        />
      )}
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
});

export default Section;
