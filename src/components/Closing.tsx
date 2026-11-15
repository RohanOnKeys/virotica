import Link from "next/link";
import { EmailSignup } from "./EmailSignup";
import { ICONS, Octicon } from "./icons";
import { H2, Logo, Mascot } from "./ui";

export function SignupBand() {
  return (
    <section className="px-4 py-32 md:py-40">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Mascot size={260} className="mb-10" />
        <H2>Join the open registry for biology</H2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">
          Every repository adds something to the shared record. See what labs are sequencing, then create an account
          and push your own.
        </p>
        <div className="mt-10 flex w-full justify-center">
          <EmailSignup id="footer-email" />
        </div>
      </div>
    </section>
  );
}

const COLS = [
  { h: "Product", links: ["Registry", "Screening", "CLI", "Pipelines", "Releases", "Access control", "Pricing", "All features"] },
  { h: "Developers", links: ["API", "CLI docs", "File formats", "Integrations", "Changelog"] },
  { h: "Support", links: ["Docs", "Community forum", "Biosafety policy", "Status", "Contact"] },
  { h: "Company", links: ["About", "Blog", "Careers", "Press", "Security"] },
];

const SOCIAL = [
  { label: "Virotica on GitHub", href: "https://github.com/RohanOnKeys/virotica", icon: ICONS.github },
  { label: "Virotica on X", href: "#", icon: ICONS.x },
  { label: "Virotica on LinkedIn", href: "#", icon: ICONS.linkedin },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-4 pt-16">
      <div className="mx-auto max-w-[1280px] md:px-4">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <h3 className="mt-6 text-lg font-semibold">The Virotica newsletter</h3>
            <p className="mt-2 text-base leading-relaxed text-muted">
              Guides, release notes and biosafety updates. Twice a month, in your inbox.
            </p>
            <Link
              href="#"
              className="mt-5 inline-block rounded-md bg-[#21262d] px-4 py-2 text-base font-medium ring-1 ring-line hover:bg-[#30363d]"
            >
              Subscribe
            </Link>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h3 className="text-base font-semibold">{c.h}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-base text-muted hover:text-[#58a6ff]">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line py-8 text-[15px] text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>© 2026 Virotica</span>
            {["Terms", "Privacy", "Manage cookies"].map((l) => (
              <Link key={l} href="#" className="hover:text-[#58a6ff]">
                {l}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-ink">
                <Octicon d={s.icon} size={20} />
              </a>
            ))}
            <span className="flex items-center gap-2 rounded-md px-3 py-1.5 ring-1 ring-line">
              <Octicon d={ICONS.globe} /> English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
