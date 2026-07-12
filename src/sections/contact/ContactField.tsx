"use client";

import { cn } from "@/lib/cn";

/**
 * Floating-label field with a gold focus underline — a premium form interaction.
 * Works for input and textarea.
 */
export default function ContactField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  rows = 5,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: "text" | "email";
  textarea?: boolean;
  rows?: number;
}) {
  const shared = cn(
    "peer w-full rounded-2xl border bg-base px-5 pb-3 pt-6 text-small text-text-primary outline-none transition-colors duration-300",
    "placeholder-transparent focus:border-gold/60",
    error ? "border-error/70" : "border-white/[0.08]"
  );

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-5 top-4 text-caption uppercase tracking-[0.12em] text-text-muted transition-all duration-200",
          "peer-focus:top-[10px] peer-focus:text-[11px] peer-focus:text-gold",
          "peer-[:not(:placeholder-shown)]:top-[10px] peer-[:not(:placeholder-shown)]:text-[11px]"
        )}
      >
        {label}
      </label>
      {error && <span className="mt-1 block text-caption text-error">{error}</span>}
    </div>
  );
}
