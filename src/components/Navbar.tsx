"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

function scrollToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [open,      setOpen]      = useState(false);
  const [active,    setActive]    = useState<string>("");
  const lastY      = useRef(0);
  const ticking    = useRef(false);

  /* Scroll state: backdrop blur on scroll + hide/show on direction */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 48);
        // Only hide after scrolling past 300 px down; always show when going up.
        if (y > 300) setHidden(y > lastY.current + 4);
        else          setHidden(false);
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy */
  useEffect(() => {
    const ids      = nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Lock body scroll while mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100]",
        "transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-luxury",
        /* Hide/show on scroll direction */
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        /* Frosted glass once scrolled */
        scrolled
          ? "border-b border-white/[0.06] bg-[rgba(5,5,5,0.76)] backdrop-blur-nav"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-luxury flex h-[68px] items-center justify-between">

        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative text-[11px] font-medium uppercase tracking-[0.20em]",
                  "transition-colors duration-300",
                  isActive ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                )}
              >
                {item.label}
                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute -bottom-[3px] left-0 h-px w-full origin-left",
                    "bg-gradient-to-r from-gold/80 to-gold/30",
                    "transition-transform duration-normal ease-luxury",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            href="#contact"
            variant="secondary"
            className="h-9 px-5 text-[11px] tracking-[0.14em]"
          >
            Enquire
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-text-secondary transition-colors hover:text-text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-[68px] z-[99] flex flex-col",
          "bg-base/95 backdrop-blur-nav md:hidden",
          "transition-[opacity,transform] duration-500 ease-luxury",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        )}
      >
        <div className="container-luxury flex flex-col gap-1 pt-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className={cn(
                "border-b border-white/[0.06] py-5",
                "font-display text-[28px] font-medium text-text-secondary",
                "transition-colors duration-200 hover:text-text-primary"
              )}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-8">
            <Button href="#contact" onClick={() => setOpen(false)} className="w-full">
              Enquire
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
