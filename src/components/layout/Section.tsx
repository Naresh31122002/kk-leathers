import { forwardRef } from "react";
import Container from "./Container";
import { cn } from "@/lib/cn";

type Tone = "base" | "raised" | "none";

type Props = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /**
   * "raised" adds a subtle vertical gradient overlay so adjacent sections
   * gently differentiate without hard colour borders — the page reads as
   * ONE continuous surface (requirements 4 & 8 of the design system).
   */
  tone?: Tone;
  /** False = full-bleed; no inner Container. */
  container?: boolean;
  containerClassName?: string;
  "aria-label"?: string;
};

/**
 * Reusable section shell (doc 02 §8, §33).
 * Alternating "raised" tone sections produce gentle visual rhythm without
 * breaking the dark-luxury continuity of the page.
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
      {/* "raised" overlay: fades in from transparent at top/bottom edges so
          sections melt into their neighbours instead of forming hard blocks.   */}
      {tone === "raised" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg," +
              "transparent 0%," +
              "rgba(8,6,4,0.36) 18%," +
              "rgba(8,6,4,0.42) 50%," +
              "rgba(8,6,4,0.36) 82%," +
              "transparent 100%)",
          }}
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
