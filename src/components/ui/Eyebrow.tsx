import { cn } from "@/lib/cn";

// Gold kicker label with a leading rule — a recurring luxury signature.
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
    <span className={cn("inline-flex items-center gap-3", className)}>
      {withRule && (
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70" />
      )}
      <span className="eyebrow">{children}</span>
    </span>
  );
}
