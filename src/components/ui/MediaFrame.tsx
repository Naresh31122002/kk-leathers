import { cn } from "@/lib/cn";

/**
 * Elegant media frame: rounded, bordered, soft shadow, with a hairline gold
 * corner accent and a top gradient scrim for caption legibility. Gives videos
 * and imagery layered depth (Phase 3 — luxury color balance + elegant shadows).
 */
export default function MediaFrame({
  children,
  className,
  ratio = "aspect-[16/9]",
  scrim = false,
}: {
  children: React.ReactNode;
  className?: string;
  ratio?: string;
  scrim?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-video border border-white/[0.07] bg-secondary shadow-lg",
        className
      )}
    >
      <div className={cn("relative w-full", ratio)}>{children}</div>

      {scrim && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent" />
      )}

      {/* Hairline gold corner accents */}
      <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-gold/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-gold/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
