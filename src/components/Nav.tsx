"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ICONS, Octicon } from "./icons";
import { Logo } from "./ui";

type Group = { title: string; links: { label: string; desc?: string }[] };
type Menu = { label: string; groups: Group[] };

const MENUS: Menu[] = [
  {
    label: "Product",
    groups: [
      {
        title: "Platform",
        links: [
          { label: "Registry", desc: "Host, review and fork sequences" },
          { label: "Screening", desc: "Biosecurity checks on every push" },
        ],
      },
      { title: "Build", links: [{ label: "CLI" }, { label: "Pipelines" }, { label: "Releases and DOIs" }] },
      { title: "Secure", links: [{ label: "Access control" }, { label: "Audit log" }, { label: "All features" }] },
    ],
  },
  {
    label: "Developers",
    groups: [
      { title: "Learn", links: [{ label: "Documentation" }, { label: "File formats" }, { label: "Tutorials" }] },
      { title: "Build", links: [{ label: "API" }, { label: "CLI" }, { label: "Integrations" }] },
      { title: "Explore", links: [{ label: "Trending repositories" }, { label: "Changelog" }] },
    ],
  },
  {
    label: "Labs",
    groups: [
      {
        title: "By type",
        links: [{ label: "Public health" }, { label: "Vaccine developers" }, { label: "Academic cores" }, { label: "Startups" }],
      },
      { title: "Evaluate", links: [{ label: "Why Virotica" }, { label: "Biosafety policy" }, { label: "Trust center" }] },
    ],
  },
  {
    label: "Resources",
    groups: [
      { title: "Learn", links: [{ label: "Blog" }, { label: "Guides" }, { label: "Webinars" }] },
      { title: "Support", links: [{ label: "Docs" }, { label: "Community forum" }, { label: "Status" }] },
      { title: "Company", links: [{ label: "About" }, { label: "Careers" }, { label: "Contact" }] },
    ],
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-inset/95 backdrop-blur-xl" : "border-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <ul className="hidden items-center lg:flex">
            {MENUS.map((m) => (
              <li key={m.label} className="relative" onMouseEnter={() => setOpen(m.label)}>
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-ink hover:text-muted"
                  aria-expanded={open === m.label}
                  onClick={() => setOpen(open === m.label ? null : m.label)}
                  onFocus={() => setOpen(m.label)}
                >
                  {m.label}
                  <Octicon d={ICONS.chevronDown} className={`opacity-60 transition-transform ${open === m.label ? "rotate-180" : ""}`} />
                </button>
                {open === m.label && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="flex gap-10 rounded-xl bg-card p-7 ring-1 ring-line shadow-[0_16px_40px_rgba(1,4,9,0.6)]">
                      {m.groups.map((g) => (
                        <div key={g.title} className="min-w-44">
                          <div className="mb-3 text-sm font-medium text-muted">{g.title}</div>
                          <ul className="space-y-3">
                            {g.links.map((l) => (
                              <li key={l.label}>
                                <Link href="#" className="block text-base text-ink hover:text-[#58a6ff]">
                                  {l.label}
                                  {l.desc && <span className="mt-0.5 block text-sm text-muted">{l.desc}</span>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li>
              <Link href="#" className="rounded-md px-3 py-2 text-base font-medium text-ink hover:text-muted">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden h-9 w-60 items-center gap-2 rounded-md bg-paper/70 px-3 text-[15px] text-muted ring-1 ring-line hover:ring-muted xl:flex">
            <Octicon d={ICONS.search} />
            <span className="flex-1 text-left">Search</span>
            <kbd className="rounded border border-line px-1.5 font-mono text-[13px]">/</kbd>
          </button>
          <Link href="#" className="hidden text-base font-medium text-ink hover:text-muted sm:block">
            Sign in
          </Link>
          <Link
            href="#"
            className="rounded-md px-3.5 py-1.5 text-base font-medium text-ink ring-1 ring-ink/70 transition-colors hover:ring-ink"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
