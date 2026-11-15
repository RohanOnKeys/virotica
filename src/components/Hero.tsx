import Link from "next/link";
import { EmailSignup } from "./EmailSignup";
import { Mascot } from "./ui";

export function Hero() {
  return (
    <section className="px-4 pb-16 pt-40 md:pt-48">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="text-[clamp(3rem,8vw,6.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
          Push a genome.
          <br />
          Fork a vaccine.
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted text-pretty md:text-[22px]">
          Host viral, bacterial and vaccine sequences in repositories. Branch them, review changes, tag releases and
          cite them.
        </p>

        <div className="mt-10 flex w-full justify-center">
          <EmailSignup id="hero-email" />
        </div>
        <Link href="#" className="mt-5 text-base font-medium text-[#58a6ff] underline-offset-4 hover:underline">
          Install the Virotica CLI
        </Link>

        <Mascot size={380} className="mt-14" priority />
      </div>
    </section>
  );
}
