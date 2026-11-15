"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Seq, seq } from "./ui";

/* ------------------------------------------------------------------ */
/* Shared repo window                                                  */
/* ------------------------------------------------------------------ */
function RepoCard({
  owner,
  name,
  badges,
  stars,
  forks,
  commit,
  children,
}: {
  owner: string;
  name: string;
  badges: { label: string; tone?: "accent" | "lime" | "plain" }[];
  stars: string;
  forks: string;
  commit: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-card ring-1 ring-line shadow-[0_40px_80px_-40px_rgba(1,4,9,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-muted" aria-hidden>
            <path
              fill="currentColor"
              d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.71 1.71.75.75 0 1 1-1.06 1.06A2.5 2.5 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.71A2.5 2.5 0 0 1 4.5 9h8Z"
            />
          </svg>
          <span className="truncate text-muted">{owner} /</span>
          <span className="truncate font-semibold">{name}</span>
          {badges.map((b) => (
            <span
              key={b.label}
              className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium sm:inline ${
                b.tone === "accent"
                  ? "bg-accent-soft text-accent"
                  : b.tone === "lime"
                    ? "bg-lime/15 text-lime ring-1 ring-lime/40"
                    : "ring-1 ring-line text-muted"
              }`}
            >
              {b.label}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="flex items-center gap-1.5 rounded-md px-2 py-1 ring-1 ring-line"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" /></svg> {stars}</span>
          <span className="flex items-center gap-1.5 rounded-md px-2 py-1 ring-1 ring-line"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" /></svg> {forks}</span>
        </div>
      </div>
      <div className="p-5">{children}</div>
      <div className="flex items-center gap-2 border-t border-line bg-paper/60 px-5 py-3 text-xs text-muted">
        <span className="font-mono text-ink">
          {Array.from(name)
            .reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)
            .toString(16)
            .padStart(7, "0")
            .slice(0, 7)}
        </span>
        <span className="truncate">{commit}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals per tab                                                     */
/* ------------------------------------------------------------------ */
function VirusVisual() {
  const segs = [
    ["PB2", 2341],
    ["PB1", 2341],
    ["PA", 2233],
    ["HA", 1762],
    ["NP", 1565],
    ["NA", 1467],
    ["M", 1027],
    ["NS", 890],
  ] as const;
  const total = segs.reduce((a, [, n]) => a + n, 0);
  return (
    <div>
      <div className="text-xs font-medium text-muted">8 segments, 13,626 nt</div>
      <div className="mt-3 flex h-10 gap-1">
        {segs.map(([n, len]) => (
          <div
            key={n}
            className={`grid place-items-center rounded-lg text-[11px] font-semibold ${
              n === "HA" ? "bg-accent text-white" : "bg-accent-soft text-accent"
            }`}
            style={{ width: `${(len / total) * 100}%` }}
          >
            {n}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-paper p-4 text-[12px]">
        <div className="mb-2 flex justify-between text-[11px] text-muted">
          <span>HA, antigenic site B</span>
          <span className="font-mono">+2 −2</span>
        </div>
        <div className="space-y-1">
          <div className="flex gap-2 rounded bg-[#f85149]/15 px-2 py-0.5">
            <span className="w-3 text-nt-t">−</span>
            <Seq value={seq(101, 24)} />
          </div>
          <div className="flex gap-2 rounded bg-[#2ea043]/15 px-2 py-0.5">
            <span className="w-3 text-nt-a">+</span>
            <Seq value={seq(101, 24).slice(0, 11) + "G" + seq(101, 24).slice(12)} highlight={[11]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BacteriaVisual() {
  const genes = [
    { n: "thrL", w: 6, s: 1 },
    { n: "thrA", w: 18, s: 1 },
    { n: "thrB", w: 10, s: 1 },
    { n: "thrC", w: 13, s: 1 },
    { n: "yaaX", w: 6, s: -1 },
    { n: "yaaA", w: 9, s: -1 },
    { n: "yaaJ", w: 14, s: -1 },
    { n: "talB", w: 11, s: 1 },
    { n: "mog", w: 7, s: 1 },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["4.64 Mb", "genome"],
          ["4,288", "genes"],
          ["50.8%", "GC"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-paper p-3">
            <div className="font-display text-xl font-semibold">{v}</div>
            <div className="text-xs text-muted">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-paper p-4">
        <div className="mb-3 flex justify-between font-mono text-[10px] text-muted">
          <span>0</span>
          <span>5,000</span>
          <span>10,000 bp</span>
        </div>
        {[1, -1].map((strand) => (
          <div key={strand} className="relative mb-2 flex h-7 items-center">
            <div className="absolute inset-x-0 h-px bg-line" />
            <div className="relative flex w-full gap-1">
              {genes.map((g) => (
                <div key={g.n} style={{ width: `${g.w}%` }} className="h-6">
                  {g.s === strand && (
                    <div
                      className={`grid h-full place-items-center text-[10px] font-semibold text-white ${
                        strand === 1 ? "bg-nt-a" : "bg-nt-c"
                      }`}
                      style={{
                        clipPath:
                          strand === 1
                            ? "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)"
                            : "polygon(8px 0, 100% 0, 100% 100%, 8px 100%, 0 50%)",
                      }}
                    >
                      {g.n}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VaccineVisual() {
  const parts = [
    { n: "Cap", w: 6, c: "bg-[#30363d] text-ink" },
    { n: "5′UTR", w: 12, c: "bg-accent-soft text-accent" },
    { n: "SP", w: 7, c: "bg-nt-g/80 text-white" },
    { n: "Antigen ORF", w: 42, c: "bg-accent text-white" },
    { n: "3′UTR", w: 14, c: "bg-accent-soft text-accent" },
    { n: "poly(A)", w: 19, c: "bg-lime text-inset" },
  ];
  return (
    <div>
      <div className="text-xs font-medium text-muted">mRNA construct, 1,968 nt</div>
      <div className="mt-3 flex h-11 overflow-hidden rounded-xl">
        {parts.map((p) => (
          <div key={p.n} className={`grid place-items-center text-[11px] font-semibold ${p.c}`} style={{ width: `${p.w}%` }}>
            {p.n}
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {[
          ["v2.1", "Codon-optimized ORF, N1-methyl-Ψ", "latest", true],
          ["v2.0", "Swapped 3′UTR for stability", "", false],
          ["v1.0", "Initial construct from preclinical study", "", false],
        ].map(([tag, msg, label, latest]) => (
          <div key={tag as string} className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-2.5 text-sm">
            <span className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] ${latest ? "bg-lime/15 text-lime ring-1 ring-lime/40" : "ring-1 ring-line"}`}>
              {tag}
            </span>
            <span className="truncate">{msg}</span>
            {label && <span className="ml-auto shrink-0 text-[11px] font-medium text-nt-a">{label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlasmidVisual() {
  const r = 70;
  const C = 2 * Math.PI * r;
  const arcs = [
    { start: 0.02, len: 0.22, color: "var(--color-nt-a)", label: "GFP", ang: 0.13 },
    { start: 0.3, len: 0.08, color: "var(--color-nt-g)", label: "lacZα", ang: 0.34 },
    { start: 0.46, len: 0.26, color: "var(--color-nt-t)", label: "AmpR", ang: 0.59 },
    { start: 0.78, len: 0.1, color: "var(--color-accent)", label: "ori", ang: 0.83 },
  ];
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <svg viewBox="0 0 200 200" className="h-44 w-44 shrink-0">
        <circle cx="100" cy="100" r={r} fill="none" stroke="var(--color-line)" strokeWidth="10" />
        {arcs.map((a) => (
          <circle
            key={a.label}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth="10"
            strokeDasharray={`${a.len * C} ${C}`}
            strokeDashoffset={-a.start * C}
            transform="rotate(-90 100 100)"
            strokeLinecap="round"
          />
        ))}
        {arcs.map((a) => {
          const t = a.ang * 2 * Math.PI - Math.PI / 2;
          return (
            <text
              key={a.label}
              x={100 + Math.cos(t) * 94}
              y={100 + Math.sin(t) * 94 + 3}
              textAnchor="middle"
              className="fill-ink text-[9px] font-semibold"
            >
              {a.label}
            </text>
          );
        })}
        <text x="100" y="98" textAnchor="middle" className="fill-ink font-display text-[13px] font-semibold">
          pUC19-GFP
        </text>
        <text x="100" y="113" textAnchor="middle" className="fill-muted font-mono text-[9px]">
          3,406 bp
        </text>
      </svg>
      <div className="w-full space-y-2 text-sm">
        {[
          ["EcoRI", "396"],
          ["BamHI", "417"],
          ["HindIII", "447"],
        ].map(([e, p]) => (
          <div key={e} className="flex justify-between rounded-xl bg-paper px-3 py-2">
            <span className="font-medium">{e}</span>
            <span className="font-mono text-xs text-muted">{p}</span>
          </div>
        ))}
        <div className="rounded-xl bg-lime/15 px-3 py-2 text-xs text-lime ring-1 ring-lime/30">Sequence-verified by 4 labs</div>
      </div>
    </div>
  );
}

function RnaVisual() {
  const s = "GGCGAUAGCGAAGCCUUCGGGCUUCGCUAUCGCC";
  const db = "((((((((((((((....))))))))))))))..";
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-paper p-3">
          <div className="font-display text-xl font-semibold">−24.3</div>
          <div className="text-xs text-muted">MFE kcal/mol</div>
        </div>
        <div className="rounded-2xl bg-paper p-3">
          <div className="font-display text-xl font-semibold">34 nt</div>
          <div className="text-xs text-muted">stem-loop</div>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto rounded-2xl bg-inset p-4 text-[12px] leading-6">
        <div>
          <Seq value={s} />
        </div>
        <div className="font-mono tracking-[0.12em] text-lime">{db}</div>
      </div>
      <div className="mt-4 flex justify-center">
        <svg viewBox="0 0 220 70" className="h-16 w-full max-w-xs" aria-hidden>
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <line x1={20 + i * 22} y1="22" x2={20 + i * 22} y2="48" stroke="var(--color-line)" strokeWidth="2" />
              <circle cx={20 + i * 22} cy="22" r="6" fill="var(--color-accent)" />
              <circle cx={20 + i * 22} cy="48" r="6" fill="var(--color-nt-a)" />
            </g>
          ))}
          <path d="M 174 22 C 205 10, 205 60, 174 48" fill="none" stroke="var(--color-nt-g)" strokeWidth="3" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tabs                                                                */
/* ------------------------------------------------------------------ */
const TABS = [
  {
    label: "Viruses",
    title: "Track every variant like a branch.",
    body: "Segmented, circular or linear genomes, with surveillance pushes diffed against the reference so you can see the exact nucleotide that changed.",
    card: (
      <RepoCard
        owner="flu-watch"
        name="h3n2-2026-27"
        badges={[{ label: "BSL-2", tone: "accent" }, { label: "public" }]}
        stars="1.2k"
        forks="318"
        commit="N158K in HA confirmed across 14 isolates"
      >
        <VirusVisual />
      </RepoCard>
    ),
  },
  {
    label: "Bacteria",
    title: "Whole genomes, annotated in the open.",
    body: "Host reference strains, track gene annotations on both strands, and let the community submit corrections as pull requests.",
    card: (
      <RepoCard
        owner="model-orgs"
        name="ecoli-k12-mg1655"
        badges={[{ label: "BSL-1", tone: "lime" }, { label: "reference" }]}
        stars="4.8k"
        forks="2.1k"
        commit="Re-annotated yaaJ start codon (#812)"
      >
        <BacteriaVisual />
      </RepoCard>
    ),
  },
  {
    label: "Vaccines",
    title: "Constructs with a full release history.",
    body: "Tag each version of an mRNA, vector or subunit design, and link it to the trials and papers that used it.",
    card: (
      <RepoCard
        owner="open-vax"
        name="mrna-rsv-prefusion-f"
        badges={[{ label: "release v2.1", tone: "accent" }, { label: "CC-BY" }]}
        stars="962"
        forks="140"
        commit="Link release to trial records"
      >
        <VaccineVisual />
      </RepoCard>
    ),
  },
  {
    label: "DNA & plasmids",
    title: "Plasmid maps you can actually fork.",
    body: "Interactive maps, restriction sites and verification status, with every edit to a construct recorded like a commit.",
    card: (
      <RepoCard
        owner="synbio-core"
        name="puc19-gfp"
        badges={[{ label: "verified", tone: "lime" }, { label: "MIT" }]}
        stars="2.3k"
        forks="5.6k"
        commit="Swap promoter to J23100"
      >
        <PlasmidVisual />
      </RepoCard>
    ),
  },
  {
    label: "RNA",
    title: "Sequence and structure, side by side.",
    body: "Store secondary structures, folding energies and probing data next to the sequence they describe.",
    card: (
      <RepoCard
        owner="rna-lab"
        name="hairpin-library"
        badges={[{ label: "SHAPE data", tone: "accent" }, { label: "public" }]}
        stars="611"
        forks="87"
        commit="Add SHAPE reactivities for 240 variants"
      >
        <RnaVisual />
      </RepoCard>
    ),
  },
];

export function Registry() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / total, 0), 0.9999);
      setActive(Math.floor(p * TABS.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (total * (i + 0.5)) / TABS.length, behavior: "smooth" });
  };

  return (
    <section id="registry" ref={ref} className="relative" style={{ height: `${TABS.length * 80 + 40}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-4 pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance md:text-5xl">
              Everything that replicates, versioned.
            </h2>
          </div>

          {/* tab bar */}
          <div className="mt-7 flex justify-center">
            <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-card p-1 ring-1 ring-line [scrollbar-width:none]">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => goTo(i)}
                  className={`shrink-0 rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                    i === active ? "bg-[#30363d] text-ink ring-1 ring-[#8b949e]/40" : "text-muted hover:text-ink"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="relative mt-8 md:mt-12">
            {TABS.map((t, i) => (
              <div
                key={t.label}
                aria-hidden={i !== active}
                className={`grid items-center gap-6 transition-all duration-500 md:grid-cols-[0.8fr_1.2fr] md:gap-14 ${
                  i === active
                    ? "relative opacity-100"
                    : "pointer-events-none absolute inset-0 translate-y-6 opacity-0"
                }`}
              >
                <div className="hidden md:block">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-balance">{t.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">{t.body}</p>
                </div>
                <p className="text-center text-sm text-muted md:hidden">{t.title}</p>
                <div className="mx-auto w-full max-w-xl">{t.card}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
