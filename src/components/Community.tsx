import Image from "next/image";
import Link from "next/link";
import { ICONS, Octicon } from "./icons";
import { H2, Marquee } from "./ui";

const LAB_TYPES = [
  "Public health labs",
  "Vaccine developers",
  "Academic sequencing cores",
  "Synthetic biology startups",
  "Biofoundries",
  "Clinical microbiology",
  "Plant pathology",
  "Phage therapy groups",
];

const GUIDES = [
  { title: "Track a variant across fourteen surveillance sites", bg: "bg-[#1f6feb]" },
  { title: "Release an mRNA construct with its full history", bg: "bg-[#8957e5]" },
  { title: "Share a plasmid library between three labs", bg: "bg-[#bd561d]" },
];

const REPOS = [
  ["flu-watch", "h3n2-2026-27", "H3N2 surveillance isolates from 14 sentinel sites", "214"],
  ["model-orgs", "ecoli-k12-mg1655", "Curated E. coli K-12 reference genome and annotations", "188"],
  ["synbio-core", "puc19-gfp", "pUC19 with superfolder GFP, verified by four labs", "176"],
  ["open-vax", "mrna-rsv-prefusion-f", "Open mRNA construct for an RSV prefusion F antigen", "151"],
  ["rna-lab", "hairpin-library", "Designed hairpins with SHAPE reactivity data", "97"],
  ["phage-db", "t4-isolates", "T4-like phage isolates with host range assays", "92"],
  ["dengue-net", "denv2-genotypes", "Dengue serotype 2 genotype panel with phylogeny", "88"],
  ["synbio-core", "promoter-library", "Characterised constitutive promoters, measured in E. coli", "81"],
  ["yeast-commons", "s288c-reference", "S. cerevisiae S288C reference with community fixes", "74"],
  ["crispr-tools", "cas9-variants", "Engineered Cas9 variants with activity benchmarks", "69"],
  ["amr-watch", "carbapenemase-genes", "Resistance gene catalogue linked to isolate metadata", "63"],
  ["plant-path", "xylella-isolates", "Xylella fastidiosa isolates from olive groves", "52"],
];

export function Community() {
  return (
    <>
      {/* stats strip */}
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 text-center md:grid-cols-2">
          <div>
            <div className="text-7xl font-semibold tracking-[-0.03em] md:text-8xl">1 click</div>
            <p className="mt-3 text-xl text-muted">to fork any public genome into your lab</p>
          </div>
          <div>
            <div className="text-7xl font-semibold tracking-[-0.03em] md:text-8xl">DOI</div>
            <p className="mt-3 text-xl text-muted">minted for every tagged release</p>
          </div>
        </div>
      </section>

      {/* built for */}
      <section className="py-16">
        <h2 className="mb-10 text-center text-xl font-medium text-muted">Built for</h2>
        <Marquee speed={50}>
          {LAB_TYPES.map((l) => (
            <span key={l} className="mx-10 whitespace-nowrap text-3xl font-semibold text-ink/55 md:text-4xl">
              {l}
            </span>
          ))}
        </Marquee>
      </section>

      {/* guides */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <H2 className="text-center">Guides</H2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.title} href="#" className="group overflow-hidden rounded-xl bg-card ring-1 ring-line">
                <div className={`grid h-56 place-items-center ${g.bg}`}>
                  <Image src="/mascot.png" alt="" width={190} height={190} className="h-44 w-auto" />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-semibold leading-snug tracking-tight group-hover:text-[#58a6ff]">{g.title}</h3>
                  <span className="mt-5 block text-lg font-medium text-[#58a6ff]">Read the guide</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* featured repositories */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <H2 className="text-center">Featured repositories</H2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPOS.map(([owner, name, desc, stars]) => (
              <Link
                key={owner + name}
                href="#"
                className="flex flex-col rounded-xl bg-card p-6 ring-1 ring-line transition-colors hover:ring-muted"
              >
                <div className="flex items-center gap-2 text-lg">
                  <Octicon d={ICONS.repo} className="text-muted" />
                  <span className="truncate">
                    <span className="text-[#58a6ff]">{owner}</span> <span className="text-muted">/</span>{" "}
                    <span className="font-semibold text-[#58a6ff]">{name}</span>
                  </span>
                </div>
                <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[15px] text-muted">
                  <Octicon d={ICONS.star} /> {stars} new stars this week
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
