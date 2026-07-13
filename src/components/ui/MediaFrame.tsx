import { cn } from "@/lib/cn";

/**
 * Elegant media frame — rounded, bordered, subtle shadow.
 * Gold hairline corner accents appear on hover for a luxury vitrine feel.
 * The `scrim` prop adds a bottom gradient for caption legibility.
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
        "group relative overflow-hidden rounded-video",
        "border border-white/[0.07]",
        "bg-secondary",
        "shadow-[0_4px_8px_rgba(0,0,0,.22),0_16px_40px_rgba(0,0,0,.32)]",
        className
      )}
    >
      <div className={cn("relative w-full", ratio)}>{children}</div>

      {scrim && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/80 via-base/20 to-transparent" />
      )}

      {/* Hairline gold corner accents — appear on hover */}
      <span className="pointer-events-none absolute left-[14px] top-[14px] h-[18px] w-[18px] border-l border-t border-gold/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[14px] right-[14px] h-[18px] w-[18px] border-b border-r border-gold/35 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
