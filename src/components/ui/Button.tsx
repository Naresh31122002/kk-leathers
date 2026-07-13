"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/anim/Magnetic";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  arrow?: boolean;
  magnetic?: boolean;
};

const base = [
  "group/btn relative inline-flex items-center justify-center gap-2",
  "overflow-hidden rounded-pill",
  "px-8 py-[14px]",
  "text-[13px] font-medium tracking-[0.10em] uppercase",
  "transition-transform duration-300 ease-luxury",
  "hover:scale-[1.025] focus-visible:scale-[1.025]",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

const variants: Record<Variant, string> = {
  primary:   "bg-[#f4f4f2] text-[#0b0b0b] shadow-sm",
  secondary: "border border-white/20 bg-transparent text-text-primary",
  ghost:     "bg-transparent text-text-secondary hover:text-text-primary",
};

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <span className="relative z-10 inline-flex items-center gap-[10px]">
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          strokeWidth={1.6}
          className="transition-transform duration-300 ease-luxury group-hover/btn:translate-x-[3px]"
        />
      )}
    </span>
  );
}

/* Sweeping fill on hover — rises from below */
function Sweep({ variant }: { variant: Variant }) {
  if (variant === "ghost") return null;
  return (
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 z-0 translate-y-full",
        "transition-transform duration-[520ms] ease-luxury group-hover/btn:translate-y-0",
        variant === "primary"
          ? "bg-gradient-to-t from-[#ece0c8] to-[#f8f6f2]"
          : "bg-gradient-to-t from-brown/35 to-brown/10"
      )}
    />
  );
}

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
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <Sweep variant={variant} />
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );

  return magnetic ? <Magnetic strength={0.22}>{content}</Magnetic> : content;
}
