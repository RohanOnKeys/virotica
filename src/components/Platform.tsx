import Link from "next/link";
import type { ReactNode } from "react";
import { ICONS, Octicon } from "./icons";
import { Button, H2, Seq, seq } from "./ui";

/* ---------------- small product visuals ---------------- */
function Panel({ children }: { children: ReactNode }) {
  return <div className="h-full rounded-lg bg-paper p-5 ring-1 ring-line">{children}</div>;
}

function DiffVisual() {
  const base = seq(55, 20);
  const changed = base.slice(0, 8) + "A" + base.slice(9);
  return (
    <Panel>
      <div className="mb-4 flex items-center justify-between text-[15px]">
        <span className="font-semibold">#142 gp37 tail fibre</span>
        <span className="flex items-center gap-1.5 text-lime">
          <Octicon d={ICONS.check} /> 2 approvals
        </span>
      </div>
      <div className="space-y-1.5 text-[15px]">
        <div className="flex gap-3 rounded bg-[#f85149]/15 px-3 py-1">
          <span className="w-3 text-nt-t">-</span>
          <Seq value={base} />
        </div>
        <div className="flex gap-3 rounded bg-[#2ea043]/15 px-3 py-1">
          <span className="w-3 text-nt-a">+</span>
          <Seq value={changed} highlight={[8]} />
        </div>
      </div>
      <p className="mt-4 rounded-md bg-card px-4 py-3 text-[15px] text-muted ring-1 ring-line">
        <span className="font-semibold text-ink">mshah</span> Synonymous change. Host range assay attached, looks good.
      </p>
    </Panel>
  );
}

function ScreeningVisual() {
  const rows = [
    ["Sequences of concern", "None found"],
    ["Biosafety level", "BSL-2, matches repository"],
    ["Access", "3 approved labs"],
    ["Audit log", "Signed and recorded"],
  ];
  return (
    <Panel>
      <div className="mb-4 flex items-center gap-2 text-[15px] font-semibold">
        <Octicon d={ICONS.shield} className="text-lime" /> Screening passed for push 4f2a9c1
      </div>
      <div className="divide-y divide-line rounded-md ring-1 ring-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-3 text-[15px]">
            <span className="text-muted">{k}</span>
            <span className="flex items-center gap-2 text-right">
              <Octicon d={ICONS.check} className="text-lime" /> {v}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TerminalVisual() {
  return (
    <div className="h-full rounded-lg bg-inset p-5 font-mono text-sm leading-7 text-white/80 ring-1 ring-line">
      <div>
        <span className="text-lime">$</span> viro init lab/phage-library
      </div>
      <div>
        <span className="text-lime">$</span> viro add T4_isolate_09.gb
      </div>
      <div>
        <span className="text-lime">$</span> viro push
      </div>
      <div className="text-white/50">Screening passed</div>
      <div className="text-lime">Pushed 168,903 bp to main</div>
    </div>
  );
}

function PipelineVisual() {
  const jobs = [
    ["Assemble reads", "1m 12s"],
    ["Quality control", "34s"],
    ["Annotate genes", "2m 05s"],
    ["Screen sequence", "18s"],
  ];
  return (
    <Panel>
      <div className="space-y-3">
        {jobs.map(([j, t]) => (
          <div key={j} className="flex items-center gap-3 text-[15px]">
            <Octicon d={ICONS.check} className="text-lime" />
            <span className="flex-1">{j}</span>
            <span className="text-muted">{t}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ReleaseVisual() {
  return (
    <Panel>
      <div className="flex items-center gap-2 text-[15px]">
        <Octicon d={ICONS.tag} className="text-muted" />
        <span className="font-semibold">v1.3.0</span>
        <span className="rounded-full px-2.5 py-0.5 text-[13px] text-lime ring-1 ring-lime/50">Latest</span>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Phage Lab (2026). phage-library v1.3.0. Virotica.
        <br />
        <span className="font-mono text-sm text-[#58a6ff]">doi:10.xxxx/viro.phage-library.v1.3.0</span>
      </p>
    </Panel>
  );
}

function AccessVisual() {
  const tiers = [
    ["BSL-1", "Anyone can view and fork"],
    ["BSL-2", "Verified institutions"],
    ["BSL-3", "Approved labs only"],
    ["BSL-4", "Case-by-case review"],
  ];
  return (
    <Panel>
      <div className="space-y-3">
        {tiers.map(([t, d]) => (
          <div key={t} className="flex items-center gap-3 text-[15px]">
            <Octicon d={ICONS.lock} className="text-muted" />
            <span className="w-14 font-semibold">{t}</span>
            <span className="text-muted">{d}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function FormatsVisual() {
  const f = ["FASTA", "FASTQ", "GenBank", "GFF3", "SBOL", "PDB", "mmCIF", "VCF", "BAM", "Newick", "AB1", "SnapGene"];
  return (
    <Panel>
      <div className="flex flex-wrap gap-2">
        {f.map((x) => (
          <span key={x} className="rounded-md bg-card px-3 py-1.5 text-[15px] ring-1 ring-line">
            {x}
          </span>
        ))}
      </div>
    </Panel>
  );
}

/* ---------------- sections ---------------- */
function Card({
  title,
  desc,
  visual,
  links,
  className = "",
}: {
  title: string;
  desc: string;
  visual: ReactNode;
  links: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col rounded-xl bg-card p-6 ring-1 ring-line md:p-8 ${className}`}>
      <div className="flex-1">{visual}</div>
      <h3 className="mt-7 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-lg text-muted">{desc}</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <Link key={l} href="#" className="text-lg font-medium text-[#58a6ff] underline-offset-4 hover:underline">
            {l}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Platform() {
  return (
    <>
      <section id="platform" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <H2 className="text-center">Virotica platform</H2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Card
              title="Registry"
              desc="Sequence hosting, review and collaboration"
              visual={<DiffVisual />}
              links={["Learn more", "See plans and pricing"]}
            />
            <Card
              title="Screening"
              desc="Biosecurity checks on every push"
              visual={<ScreeningVisual />}
              links={["Learn more", "Read the biosafety policy"]}
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <H2 className="text-center">More ways to use Virotica</H2>
          <div className="mt-14 grid gap-6 lg:grid-cols-6">
            <Card className="lg:col-span-2" title="CLI" desc="Push straight from the sequencer" visual={<TerminalVisual />} links={["Explore the CLI"]} />
            <Card className="lg:col-span-2" title="Pipelines" desc="Assembly, QC and annotation on every push" visual={<PipelineVisual />} links={["Explore Pipelines"]} />
            <Card className="lg:col-span-2" title="Releases" desc="Tagged versions with a citable DOI" visual={<ReleaseVisual />} links={["Explore Releases"]} />
            <Card className="lg:col-span-3" title="Access control" desc="Permissions that follow the biosafety level" visual={<AccessVisual />} links={["Explore access control"]} />
            <Card className="lg:col-span-3" title="Formats" desc="Reads, assemblies, annotations and structures" visual={<FormatsVisual />} links={["Explore formats"]} />
          </div>
        </div>
      </section>
    </>
  );
}

export function CtaBand() {
  return (
    <section className="px-4 py-32 md:py-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <H2>Whatever you&apos;re sequencing, you can version it on Virotica</H2>
        <div className="mt-10">
          <Button href="#">Start a lab workspace</Button>
        </div>
      </div>
    </section>
  );
}
