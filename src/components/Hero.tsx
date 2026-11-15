import { Flick } from "./Flick";
import { Button, Mascot } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-36 md:pb-32 md:pt-44">
      <Flick blur={13} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[1] tracking-[-0.03em] text-balance">
          Push a genome.
          <br />
          <span className="text-accent">Fork</span> a vaccine.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
          Host viral, bacterial and vaccine sequences in repositories. Branch them, review changes, tag releases and
          cite them.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="#">Start a repository</Button>
          <Button href="#registry" variant="secondary">
            Explore the registry
          </Button>
        </div>

        <Mascot size={380} className="mt-10" priority />
      </div>
    </section>
  );
}
