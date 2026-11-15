import Link from "next/link";
import { Flick } from "./Flick";
import { Button, Logo, Mascot } from "./ui";

export function FinalCta() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-card px-6 pb-0 pt-16 text-center ring-1 ring-line md:pt-24">
        <Flick blur={13} />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-balance md:text-7xl">
            Your lab&apos;s genomes, on main.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-muted">
            Create your first repository in under a minute. Free for public science.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#">Start a repository</Button>
          </div>
          <div className="mt-12 flex justify-center">
            <Mascot size={300} />
          </div>
        </div>
      </div>
    </section>
  );
}

const COLS = [
  { h: "Product", links: ["Registry", "CLI", "API", "Pricing", "Changelog"] },
  { h: "Trust", links: ["Biosafety policy", "Sequence screening", "Security", "Privacy", "Terms"] },
  { h: "Contact", links: ["hello@example.com", "Institutions", "Press", "Careers"] },
];

export function Footer() {
  return (
    <footer className="overflow-hidden px-4 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The registry for biological code. Version, review, fork and cite the sequences behind your science.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div className="text-sm font-semibold">{c.h}</div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:text-ink">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <span>© 2026 Virotica</span>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none mt-6 select-none text-center font-display text-[24vw] font-bold leading-[0.75] tracking-[-0.06em] text-ink/[0.05]"
      >
        virotica
      </div>
    </footer>
  );
}
