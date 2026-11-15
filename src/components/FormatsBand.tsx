import { Flick } from "./Flick";
import { Marquee } from "./ui";

const ROW_A = ["FASTA", "FASTQ", "GenBank", "GFF3", "SBOL", "SnapGene .dna", "AB1 chromatograms", "EMBL"];
const ROW_B = ["PDB", "mmCIF", "VCF", "BAM / CRAM", "Newick trees", "Dot-bracket", "Plate-reader CSV", "Jupyter"];

function Chip({ label }: { label: string }) {
  return (
    <span className="mx-2 rounded-full bg-white/[0.06] px-5 py-3 font-mono text-sm text-white/80 ring-1 ring-white/10 md:text-base">
      {label}
    </span>
  );
}

export function FormatsBand() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-inset py-20 text-white ring-1 ring-line md:py-28">
        <Flick blur={26} alpha={0.6} radius={220} />
        <div className="relative px-6 text-center">
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance md:text-6xl">
            Bring the files you already have.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60 text-pretty">
            Reads, assemblies, annotations, structures and assay data all live in one repo. Virotica parses each format
            and renders it, so a diff shows the biology that changed.
          </p>
        </div>
        <div className="relative mt-14 space-y-4">
          <Marquee speed={38}>
            {ROW_A.map((f) => (
              <Chip key={f} label={f} />
            ))}
          </Marquee>
          <Marquee speed={44} reverse>
            {ROW_B.map((f) => (
              <Chip key={f} label={f} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
