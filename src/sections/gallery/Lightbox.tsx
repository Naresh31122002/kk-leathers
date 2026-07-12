"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryItem = { src: string; alt: string };

/**
 * Accessible lightbox: focus-trapped-ish overlay with keyboard nav (Esc / ←/→),
 * scroll lock, and a soft backdrop blur. Elevates the gallery beyond a grid.
 */
export default function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: readonly GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNav: (next: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onNav((index + dir + items.length) % items.length);
    },
    [index, items.length, onNav]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onClose]);

  if (!open || index === null) return null;
  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery viewer"
      className="fixed inset-0 z-[300] flex items-center justify-center bg-base/90 backdrop-blur-glass animate-[fadein_.3s_ease]"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors hover:border-gold/60 hover:text-gold"
      >
        <X size={20} />
      </button>

      <button
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors hover:border-gold/60 hover:text-gold sm:left-10"
      >
        <ChevronLeft size={22} />
      </button>

      <figure
        className="relative mx-16 h-[70vh] w-[min(80vw,900px)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="80vw"
          className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
        />
        <figcaption className="absolute inset-x-0 -bottom-10 text-center text-caption text-text-muted">
          {item.alt}
        </figcaption>
      </figure>

      <button
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-text-secondary transition-colors hover:border-gold/60 hover:text-gold sm:right-10"
      >
        <ChevronRight size={22} />
      </button>

      <style>{`@keyframes fadein{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
