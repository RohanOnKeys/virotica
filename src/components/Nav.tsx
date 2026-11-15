"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./ui";

const LINKS = [
  { href: "#registry", label: "Registry" },
  { href: "#how", label: "How it works" },
  { href: "#biosafety", label: "Biosafety" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-inset/90 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden items-center gap-6 text-[15px] font-medium text-ink md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-muted">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="hidden h-8 w-64 items-center gap-2 rounded-md bg-paper px-3 text-sm text-muted ring-1 ring-line lg:flex">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M10.68 11.74a6 6 0 0 1-7.92-8.98 6 6 0 0 1 8.98 7.92l3.04 3.04a.75.75 0 0 1-1.06 1.06ZM11.5 7a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0Z" />
            </svg>
            <input
              placeholder="Search genomes, plasmids…"
              className="w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
            <kbd className="rounded border border-line px-1.5 font-mono text-[11px]">/</kbd>
          </label>
          <Link href="#" className="hidden text-[15px] font-medium text-ink hover:text-muted sm:block">
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-1.5 text-[15px] font-medium text-ink ring-1 ring-[#8b949e]/60 transition-colors hover:ring-ink"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
