"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#stacks", label: "Tech Stacks" },
  { href: "#how", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden bg-lime text-ink">
            <span className="font-display text-lg font-extrabold tracking-tight">
              T
            </span>
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ink/30" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ice">
            talento<span className="text-lime">cart</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-ice"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary px-4 py-2 text-sm">
            Hire talent
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center border border-white/15 text-ice md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-xs">{open ? "CLOSE" : "MENU"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-ice"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-2"
              onClick={() => setOpen(false)}
            >
              Hire talent
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
