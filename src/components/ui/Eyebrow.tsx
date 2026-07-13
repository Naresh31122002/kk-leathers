import { cn } from "@/lib/cn";

/**
 * Gold kicker label — the recurring luxury eyebrow signature.
 * Uses a thin leading rule (optional) to anchor the text visually.
 */
export default function Eyebrow({
  children,
  className,
  withRule = true,
}: {
  children: React.ReactNode;
  className?: string;
  withRule?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[10px]", className)}>
      {withRule && (
        <span className="block h-px w-6 flex-shrink-0 bg-gradient-to-r from-transparent via-gold/60 to-gold/90" />
      )}
      <span className="eyebrow">{children}</span>
    </span>
  );
}
