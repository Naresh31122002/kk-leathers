"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./ui/Logo";
import Button from "./ui/Button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

// Smooth-scroll to an in-page anchor via Lenis when available.
function scrollToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null;
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } })
    .lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
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

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToHash(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-luxury",
        scrolled
          ? "border-b border-white/[0.06] bg-base/70 backdrop-blur-glass"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-luxury flex h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                aria-current={isActive}
                className={cn(
                  "relative text-caption font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:text-text-primary",
                  isActive ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-luxury",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            href="#contact"
            variant="secondary"
            className="px-6 py-3 text-caption"
          >
            Enquire
          </Button>
        </div>

        <button
          type="button"
          className="text-text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-[99] flex flex-col gap-2 bg-base/95 px-6 pt-8 backdrop-blur-glass transition-all duration-500 ease-luxury md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        )}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNav(e, item.href)}
            className="border-b border-white/[0.06] py-5 font-display text-[28px] text-text-primary"
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
    </header>
  );
}
