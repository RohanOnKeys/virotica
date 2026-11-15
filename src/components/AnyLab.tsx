import { H2, Mascot, Seq, seq } from "./ui";

export function AnyLab() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <H2>
            One sequence.
            <br />
            Every lab.
          </H2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted text-pretty">
            Push from the sequencer, review from anywhere, and fork into your own lab.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          {/* left: push from the bench */}
          <div>
            <div className="rounded-xl bg-card p-5 ring-1 ring-line shadow-[0_30px_60px_-30px_rgba(1,4,9,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Mumbai</span>
              </div>
              <div className="mt-4 rounded-lg bg-inset p-4 ring-1 ring-line font-mono text-[12px] leading-relaxed text-white/80">
                <div>
                  <span className="text-lime">$</span> viro push run_0412.fastq
                </div>
                <div className="text-white/50">QC passed, 98.7% Q30</div>
                <div className="text-white/50">Assembled 29,903 bp</div>
                <div className="text-white/50">3 variants vs main</div>
                <div className="mt-1 text-lime">Pushed to lab/sars2-surveillance</div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft font-display font-semibold text-accent">
                  AK
                </div>
                <div>
                  <div className="font-medium">Ward 7 isolate, Nov batch</div>
                  <div className="text-xs text-muted">4f2a9c1, just now</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <Mascot size={260} />
            </div>
          </div>

          {/* right: collaborator view */}
          <div>
            <div className="rounded-xl bg-card p-5 ring-1 ring-line shadow-[0_30px_60px_-30px_rgba(1,4,9,0.25)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Rotterdam</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                  forked
                </span>
              </div>
              <div className="mt-4 space-y-2 rounded-2xl bg-paper p-4 text-[12px] leading-relaxed">
                <div className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-muted">23,401</span>
                  <Seq value={seq(7, 18)} highlight={[9]} />
                </div>
                <div className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-muted">23,419</span>
                  <Seq value={seq(19, 18)} />
                </div>
                <div className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-muted">23,437</span>
                  <Seq value={seq(33, 18)} highlight={[4]} />
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-accent-soft/60 p-3 text-sm">
                <span className="font-medium">Review:</span> <span className="text-muted">Spike change confirmed by Sanger, merging into our panel.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
