"use client";

import { useState, type ReactNode } from "react";
import { ICONS, Octicon } from "./icons";
import { Seq, seq } from "./ui";

/* ------------------------------------------------------------------ */
/* GitHub-style repository page                                        */
/* ------------------------------------------------------------------ */
const REPO_NAV = [
  { label: "Sequence", icon: ICONS.code },
  { label: "Annotations", icon: ICONS.file },
  { label: "Pull requests", icon: ICONS.pr, count: "3" },
  { label: "Screening", icon: ICONS.shield },
  { label: "Releases", icon: ICONS.tag },
];

function shortHash(name: string) {
  return Array.from(name)
    .reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7)
    .toString(16)
    .padStart(7, "0")
    .slice(0, 7);
}

function RepoCard({
  owner,
  name,
  topics,
  stars,
  forks,
  commit,
  about,
  children,
}: {
  owner: string;
  name: string;
  topics: string[];
  stars: string;
  forks: string;
  commit: string;
  about: string;
  children: ReactNode;
}) {
  const btn = "flex items-center gap-2 rounded-md bg-[#21262d] px-3 py-1.5 text-sm font-medium text-ink ring-1 ring-line";
  return (
    <div className="w-full overflow-hidden rounded-xl bg-paper ring-1 ring-line shadow-[0_40px_120px_-40px_rgba(1,4,9,0.9)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-5">
        <div className="flex min-w-0 items-center gap-2 text-lg">
          <Octicon d={ICONS.repo} className="text-muted" />
          <span className="truncate text-[#58a6ff]">{owner}</span>
          <span className="text-muted">/</span>
          <span className="truncate font-semibold text-[#58a6ff]">{name}</span>
          <span className="ml-1 rounded-full px-2.5 py-0.5 text-[13px] font-medium text-muted ring-1 ring-line">Public</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className={btn}>
            <Octicon d={ICONS.fork} className="text-muted" /> Fork
            <span className="rounded-full bg-[#30363d] px-2 text-[13px]">{forks}</span>
          </span>
          <span className={btn}>
            <Octicon d={ICONS.star} className="text-muted" /> Star
            <span className="rounded-full bg-[#30363d] px-2 text-[13px]">{stars}</span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-1 overflow-x-auto border-b border-line px-4 [scrollbar-width:none]">
        {REPO_NAV.map((n, i) => (
          <span
            key={n.label}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-[15px] ${
              i === 0 ? "border-[#f78166] font-semibold text-ink" : "border-transparent text-muted"
            }`}
          >
            <Octicon d={n.icon} className="text-muted" />
            {n.label}
            {n.count && <span className="rounded-full bg-[#30363d] px-2 text-[13px] text-ink">{n.count}</span>}
          </span>
        ))}
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-[1fr_250px]">
        <div className="min-w-0 overflow-hidden rounded-lg ring-1 ring-line">
          <div className="flex items-center gap-3 border-b border-line bg-card px-4 py-3 text-sm text-muted">
            <span className="font-mono text-ink">{shortHash(name)}</span>
            <span className="truncate">{commit}</span>
          </div>
          <div className="bg-card/60 p-5">{children}</div>
        </div>
        <aside className="text-[15px]">
          <h3 className="text-base font-semibold">About</h3>
          <p className="mt-3 leading-relaxed text-ink/90">{about}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-[13px] font-medium text-[#58a6ff]">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-2.5 text-muted">
            <div className="flex items-center gap-2">
              <Octicon d={ICONS.star} /> <span className="font-semibold text-ink">{stars}</span> stars
            </div>
            <div className="flex items-center gap-2">
              <Octicon d={ICONS.fork} /> <span className="font-semibold text-ink">{forks}</span> forks
            </div>
          </div>
        </aside>
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
      <div className="text-sm font-medium text-muted">8 segments, 13,626 nt</div>
      <div className="mt-3 flex h-10 gap-1">
        {segs.map(([n, len]) => (
          <div
            key={n}
            className={`grid place-items-center rounded-lg text-[13px] font-semibold ${
              n === "HA" ? "bg-accent text-white" : "bg-accent-soft text-accent"
            }`}
            style={{ width: `${(len / total) * 100}%` }}
          >
            {n}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-paper p-4 text-sm">
        <div className="mb-2 flex justify-between text-[13px] text-muted">
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
            <div className="text-2xl font-semibold">{v}</div>
            <div className="text-sm text-muted">{l}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-paper p-4">
        <div className="mb-3 flex justify-between font-mono text-[13px] text-muted">
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
                      className={`grid h-full place-items-center text-[13px] font-semibold text-white ${
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
      <div className="text-sm font-medium text-muted">mRNA construct, 1,968 nt</div>
      <div className="mt-3 flex h-11 overflow-hidden rounded-xl">
        {parts.map((p) => (
          <div key={p.n} className={`grid place-items-center text-[13px] font-semibold ${p.c}`} style={{ width: `${p.w}%` }}>
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
            <span className={`rounded-md px-1.5 py-0.5 font-mono text-[13px] ${latest ? "bg-lime/15 text-lime ring-1 ring-lime/40" : "ring-1 ring-line"}`}>
              {tag}
            </span>
            <span className="truncate">{msg}</span>
            {label && <span className="ml-auto shrink-0 text-[13px] font-medium text-nt-a">{label}</span>}
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
      <svg viewBox="0 0 200 200" className="h-56 w-56 shrink-0">
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
              className="fill-ink text-[12px] font-semibold"
            >
              {a.label}
            </text>
          );
        })}
        <text x="100" y="98" textAnchor="middle" className="fill-ink font-display text-[15px] font-semibold">
          pUC19-GFP
        </text>
        <text x="100" y="113" textAnchor="middle" className="fill-muted font-mono text-[12px]">
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
            <span className="font-mono text-sm text-muted">{p}</span>
          </div>
        ))}
        <div className="rounded-xl bg-lime/15 px-3 py-2 text-sm text-lime ring-1 ring-lime/30">Sequence-verified by 4 labs</div>
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
          <div className="text-2xl font-semibold">−24.3</div>
          <div className="text-sm text-muted">MFE kcal/mol</div>
        </div>
        <div className="rounded-2xl bg-paper p-3">
          <div className="text-2xl font-semibold">34 nt</div>
          <div className="text-sm text-muted">stem-loop</div>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto rounded-2xl bg-inset p-4 text-sm leading-6">
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
/* Product walkthrough                                                 */
/* ------------------------------------------------------------------ */
const TABS = [
  {
    label: "Viruses",
    caption: "Surveillance pushes are diffed against the reference, down to the nucleotide.",
    owner: "flu-watch",
    name: "h3n2-2026-27",
    topics: ["influenza", "surveillance", "bsl-2"],
    stars: "1.2k",
    forks: "318",
    commit: "N158K in HA confirmed across 14 isolates",
    about: "Season 2026-27 H3N2 isolates from 14 sentinel sites, aligned to the vaccine reference.",
    visual: <VirusVisual />,
  },
  {
    label: "Bacteria",
    caption: "Reference genomes with community annotation fixes sent as pull requests.",
    owner: "model-orgs",
    name: "ecoli-k12-mg1655",
    topics: ["reference-genome", "e-coli", "bsl-1"],
    stars: "4.8k",
    forks: "2.1k",
    commit: "Re-annotated yaaJ start codon (#812)",
    about: "Escherichia coli K-12 MG1655 complete genome with curated gene annotations.",
    visual: <BacteriaVisual />,
  },
  {
    label: "Vaccines",
    caption: "Every version of a construct is tagged, so you always know which one was tested.",
    owner: "open-vax",
    name: "mrna-rsv-prefusion-f",
    topics: ["mrna", "vaccine", "rsv"],
    stars: "962",
    forks: "140",
    commit: "Link release to trial records",
    about: "Open mRNA construct encoding a stabilised RSV prefusion F antigen.",
    visual: <VaccineVisual />,
  },
  {
    label: "DNA and plasmids",
    caption: "Plasmid maps, restriction sites and verification status, forked like code.",
    owner: "synbio-core",
    name: "puc19-gfp",
    topics: ["plasmid", "gfp", "verified"],
    stars: "2.3k",
    forks: "5.6k",
    commit: "Swap promoter to J23100",
    about: "pUC19 backbone carrying superfolder GFP. Sequence-verified by four labs.",
    visual: <PlasmidVisual />,
  },
  {
    label: "RNA",
    caption: "Structures, folding energies and probing data stored next to the sequence.",
    owner: "rna-lab",
    name: "hairpin-library",
    topics: ["rna-structure", "shape"],
    stars: "611",
    forks: "87",
    commit: "Add SHAPE reactivities for 240 variants",
    about: "Designed hairpin variants with measured SHAPE reactivities and predicted folds.",
    visual: <RnaVisual />,
  },
];

export function Walkthrough() {
  const [active, setActive] = useState(0);
  const t = TABS[active];

  return (
    <section id="registry" className="px-4 pb-28">
      <h2 className="sr-only">Product walkthrough</h2>
      <div className="mx-auto max-w-6xl">
        <RepoCard
          key={t.name}
          owner={t.owner}
          name={t.name}
          topics={t.topics}
          stars={t.stars}
          forks={t.forks}
          commit={t.commit}
          about={t.about}
        >
          {t.visual}
        </RepoCard>

        <div role="tablist" aria-label="Repository examples" className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {TABS.map((x, i) => (
            <button
              key={x.label}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`border-b-2 px-4 py-2.5 text-lg font-medium transition-colors ${
                i === active ? "border-[#f78166] text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted">{t.caption}</p>
      </div>
    </section>
  );
}
