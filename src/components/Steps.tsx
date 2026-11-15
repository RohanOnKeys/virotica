import type { ReactNode } from "react";
import { H2, Seq, seq } from "./ui";

function Terminal() {
  return (
    <div className="rounded-lg bg-inset p-5 ring-1 ring-line font-mono text-[13px] leading-7 text-white/75">
      <div>
        <span className="text-lime">$</span> viro init lab/phage-library
      </div>
      <div>
        <span className="text-lime">$</span> viro add T4_isolate_09.gb reads/*.fastq
      </div>
      <div>
        <span className="text-lime">$</span> viro commit -m <span className="text-[#a5d6ff]">&quot;Isolate 09, tail fibre variant&quot;</span>
      </div>
      <div>
        <span className="text-lime">$</span> viro push
      </div>
      <div className="text-white/40">Screening passed</div>
      <div className="text-lime">Pushed 168,903 bp to main</div>
    </div>
  );
}

function Diff() {
  const base = seq(55, 22);
  const changed = base.slice(0, 8) + "A" + base.slice(9);
  return (
    <div className="rounded-2xl bg-paper p-5 text-[13px]">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="font-medium">#142 gp37 tail fibre</span>
        <span className="rounded-full bg-nt-a/15 px-2 py-0.5 font-medium text-nt-a ring-1 ring-nt-a/40">2 approvals</span>
      </div>
      <div className="space-y-1.5 rounded-xl bg-card p-3 ring-1 ring-line">
        <div className="flex gap-2 rounded bg-[#f85149]/15 px-2 py-0.5">
          <span className="w-3 text-nt-t">−</span>
          <Seq value={base} />
        </div>
        <div className="flex gap-2 rounded bg-[#2ea043]/15 px-2 py-0.5">
          <span className="w-3 text-nt-a">+</span>
          <Seq value={changed} highlight={[8]} />
        </div>
      </div>
      <div className="mt-3 flex gap-2 text-xs">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-semibold text-white">
          MS
        </span>
        <span className="rounded-xl bg-card px-3 py-1.5 ring-1 ring-line">
          Synonymous. Host range assay attached, looks good.
        </span>
      </div>
    </div>
  );
}

function Citation() {
  return (
    <div className="rounded-2xl bg-paper p-5">
      <div className="text-sm font-semibold">Cite this release</div>
      <div className="mt-3 rounded-xl bg-card p-4 font-mono text-[12px] leading-relaxed ring-1 ring-line">
        Lab, Phage. (2026). <span className="font-semibold">phage-library</span> (v1.3.0) [Genome]. Virotica.
        <br />
        <span className="text-accent">doi:10.xxxx/viro.phage-library.v1.3.0</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        {[
          ["46", "forks"],
          ["12", "citations"],
          ["8", "labs"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-card py-2 ring-1 ring-line">
            <div className="font-display text-lg font-semibold">{v}</div>
            <div className="text-muted">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS: { n: string; title: string; body: string; visual: ReactNode; tint: string }[] = [
  {
    n: "1",
    title: "Push from the bench",
    body: "Install the CLI or drag files into the browser. Reads are assembled and QC'd, and every push is screened before it lands.",
    visual: <Terminal />,
    tint: "bg-card",
  },
  {
    n: "2",
    title: "Review like code",
    body: "Open a pull request for a mutation, an annotation fix or a new construct. Colleagues comment on the exact base and attach assay data.",
    visual: <Diff />,
    tint: "bg-card",
  },
  {
    n: "3",
    title: "Release, fork, get cited",
    body: "Tag a release and get a DOI. Other labs fork it, build on it, and the lineage back to your work stays on record.",
    visual: <Citation />,
    tint: "bg-card",
  },
];

export function Steps() {
  return (
    <section id="how" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <H2 className="mt-4">
            From sample to shared,
            <br />
            in three steps.
          </H2>
        </div>

        <div className="mt-16">
          {STEPS.map((s, i) => (
            <div key={s.n} className="sticky pb-6" style={{ top: `${96 + i * 28}px` }}>
              <div
                className={`grid items-center gap-8 rounded-2xl p-6 ring-1 ring-line shadow-[0_-20px_50px_-30px_rgba(1,4,9,0.3)] md:grid-cols-2 md:p-12 ${s.tint}`}
              >
                <div>
                  <span className="text-sm text-muted">Step {s.n}</span>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{s.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-muted text-pretty">{s.body}</p>
                </div>
                <div>{s.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
