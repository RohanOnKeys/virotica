import Link from "next/link";
import { Fragment } from "react";
import { ICONS, Octicon } from "./icons";
import { H2 } from "./ui";

type Ev = { kind: "merge" | "star" | "fork" | "push" | "pr" | "release"; user: string; repo: string; date: string };

const EVENT: Record<Ev["kind"], { label: string; icon: string; color: string }> = {
  merge: { label: "branch merged", icon: ICONS.merge, color: "text-[#a371f7]" },
  star: { label: "repo starred", icon: ICONS.star, color: "text-[#e3b341]" },
  fork: { label: "repo forked", icon: ICONS.fork, color: "text-muted" },
  push: { label: "sequence pushed", icon: ICONS.push, color: "text-[#58a6ff]" },
  pr: { label: "pull request opened", icon: ICONS.pr, color: "text-lime" },
  release: { label: "release tagged", icon: ICONS.tag, color: "text-[#f0883e]" },
};

const FEED: Ev[] = [
  { kind: "push", user: "akumar", repo: "flu-watch/h3n2-2026-27", date: "Nov 16" },
  { kind: "merge", user: "lvdberg", repo: "model-orgs/ecoli-k12-mg1655", date: "Nov 16" },
  { kind: "star", user: "mshah", repo: "synbio-core/puc19-gfp", date: "Nov 16" },
  { kind: "release", user: "open-vax", repo: "open-vax/mrna-rsv-prefusion-f", date: "Nov 15" },
  { kind: "fork", user: "tanaka-lab", repo: "rna-lab/hairpin-library", date: "Nov 15" },
  { kind: "pr", user: "jokafor", repo: "phage-db/t4-isolates", date: "Nov 15" },
  { kind: "push", user: "ccosta", repo: "dengue-net/denv2-genotypes", date: "Nov 15" },
  { kind: "merge", user: "rpatel", repo: "synbio-core/promoter-library", date: "Nov 14" },
  { kind: "star", user: "evolkov", repo: "flu-watch/h5n1-avian-2026", date: "Nov 14" },
];

const STATS = [
  { n: "40+", label: "file formats read and rendered natively" },
  { n: "BSL 1 to 4", label: "access tiers enforced on every repository" },
  { n: "Every push", label: "screened before anything is shared" },
];

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="py-12 text-center md:py-16">
      <div className="text-6xl font-semibold tracking-[-0.03em] md:text-8xl">{n}</div>
      <p className="mt-3 text-xl text-muted">{label}</p>
    </div>
  );
}

export function Activity() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <H2 className="text-center">Virotica activity</H2>
        <div className="mt-12">
          {FEED.map((e, i) => {
            const k = EVENT[e.kind];
            return (
              <Fragment key={i}>
                <Link
                  href="#"
                  className="flex items-center gap-4 border-b border-line py-4 text-lg transition-colors hover:bg-card/60 md:px-4"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card ring-1 ring-line ${k.color}`}>
                    <Octicon d={k.icon} />
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    <span className="font-semibold">{e.user}</span> <span className="text-muted">{k.label}</span>{" "}
                    <span className="text-[#58a6ff]">{e.repo}</span>
                  </span>
                  <span className="shrink-0 text-base text-muted">{e.date}</span>
                </Link>
                {i % 3 === 2 && <Stat {...STATS[Math.floor(i / 3)]} />}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
