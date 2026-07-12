"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/anim/Magnetic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Show a trailing arrow that slides on hover. */
  arrow?: boolean;
  /** Wrap in a magnetic pull (desktop). Default true. */
  magnetic?: boolean;
};

// Pill buttons (doc 02 §17): scale 1.02 on hover, 0.3s, with a sweeping fill.
const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-8 py-[15px] text-small font-medium tracking-wide transition-transform duration-300 ease-luxury hover:scale-[1.02] focus-visible:scale-[1.02] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-[#f5f5f5] text-[#0b0b0b] shadow-sm",
  secondary: "border border-white/25 bg-transparent text-text-primary",
};

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      {arrow && (
        <ArrowRight
          size={17}
          className="transition-transform duration-300 ease-luxury group-hover/btn:translate-x-1"
        />
      )}
    </span>
  );
}

// Sweeping brown fill for secondary; brighten for primary.
const Sweep = ({ variant }: { variant: Variant }) => (
  <span
    aria-hidden
    className={cn(
      "absolute inset-0 z-0 translate-y-full transition-transform duration-500 ease-luxury group-hover/btn:translate-y-0",
      variant === "primary"
        ? "bg-gradient-to-t from-[#e9dcc2] to-white"
        : "bg-gradient-to-t from-brown/40 to-brown/10"
    )}
  />
);

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
  arrow = false,
  magnetic = true,
}: Props) {
  const classes = cn(base, variants[variant], className);

  const content = href ? (
    <Link href={href} className={classes}>
      <Sweep variant={variant} />
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      <Sweep variant={variant} />
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );

  return magnetic ? <Magnetic strength={0.25}>{content}</Magnetic> : content;
}
