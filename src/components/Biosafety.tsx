import type { ReactNode } from "react";
import { H2 } from "./ui";

const CARDS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Screened before it's shared",
    body: "Every push is checked against sequences of concern. Anything flagged is held for review by our biosecurity team and never goes public automatically.",
    icon: (
      <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Zm-1 12.5-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
    ),
  },
  {
    title: "Access follows biosafety level",
    body: "Repos are tagged BSL-1 to BSL-4. Higher levels require a verified institution and an approved lab before anyone can view or clone them.",
    icon: (
      <path d="M17 9V7A5 5 0 0 0 7 7v2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2ZM9 7a3 3 0 0 1 6 0v2H9V7Zm4 8.7V18h-2v-2.3a2 2 0 1 1 2 0Z" />
    ),
  },
  {
    title: "Every change on the record",
    body: "Commits are signed, history can't be rewritten, and every view, clone and fork of a restricted repo is logged for your biosafety officer.",
    icon: (
      <path d="M13 3a9 9 0 0 0-9 9H1l3.9 3.9.1.1L9 12H6a7 7 0 1 1 2.05 4.95l-1.42 1.42A9 9 0 1 0 13 3Zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12Z" />
    ),
  },
];

export function Biosafety() {
  return (
    <section id="biosafety" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <H2 className="mt-4">Careful by default.</H2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted text-pretty">
            These rules apply to every repository, public or private.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <div key={c.title}>
              <div className="h-full rounded-xl bg-card p-7 ring-1 ring-line ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-muted)" aria-hidden>
                  {c.icon}
                </svg>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
