import { H2 } from "./ui";

const QA = [
  {
    q: "What can I store on Virotica?",
    a: "Anything with a sequence: viral and bacterial genomes, plasmids, vaccine constructs, RNA designs and protein sequences. Supporting files like reads, structures, trees and assay results go in the same repo.",
  },
  {
    q: "Is it free?",
    a: "Public repositories are free, with no limits on forks or collaborators. Private repos and institution-wide controls are on paid plans for labs and organisations.",
  },
  {
    q: "How is this different from GenBank or other databases?",
    a: "Databases archive a final sequence. Virotica holds the work in progress: branches, reviews, releases and forks. When you're ready, you can submit a release to a public archive straight from the repo.",
  },
  {
    q: "Can I keep unpublished work private?",
    a: "Yes. Repos are private until you choose to publish, and you can embargo a release until your paper is out.",
  },
  {
    q: "What happens if something dangerous is uploaded?",
    a: "Every push is screened. Flagged content is quarantined, stays private, and is reviewed by our biosecurity team. Repeated or intentional misuse is reported in line with our biosafety policy.",
  },
  {
    q: "Does it work with my existing tools?",
    a: "The CLI and API work with standard formats, so sequencer pipelines, notebooks and design tools can push to Virotica the same way they write files today.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-4 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <H2>Good to know.</H2>
          <p className="mt-5 max-w-xs text-lg text-muted">
            Still curious?{" "}
            <a href="mailto:hello@example.com" className="text-ink underline decoration-accent underline-offset-4">
              Write to us
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {QA.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium">
                {q}
                <span className="faq-plus grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-300">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </summary>
              <p className="-mt-2 max-w-xl pb-6 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
