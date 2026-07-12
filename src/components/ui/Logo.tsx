import Link from "next/link";
import { cn } from "@/lib/cn";

// Wordmark logo — Playfair, with a gold-accented monogram.
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#top"
      aria-label="KK Leathers — home"
      className={cn(
        "font-display text-[22px] font-semibold leading-none tracking-tight text-text-primary",
        className
      )}
    >
      <span className="text-gold">KK</span>
      <span className="ml-[6px]">Leathers</span>
    </Link>
  );
}
