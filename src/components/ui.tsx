import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------- mascot (public/mascot.png) ---------------- */
export function Mascot({
  size = 220,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative aspect-square max-w-full ${className}`} style={{ width: size }}>
      <Image
        src="/mascot.png"
        alt="Virotica mascot"
        width={size}
        height={size}
        priority={priority}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}

/* ---------------- logo (public/logo.png) ---------------- */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" priority />
      <span className="text-xl font-semibold tracking-tight">virotica</span>
    </Link>
  );
}

/* ---------------- buttons ---------------- */
type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "light" };
export function Button({ href, children, variant = "primary" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold transition-colors";
  const styles = {
    primary: "bg-btn text-white ring-1 ring-white/10 hover:bg-[#2ea043]",
    secondary: "bg-[#21262d] text-ink ring-1 ring-line hover:bg-[#30363d] hover:ring-[#8b949e]",
    ghost: "text-[#58a6ff] hover:underline underline-offset-4",
    light: "bg-ink text-paper hover:bg-white",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/* ---------------- section heading ---------------- */
export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-balance md:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------------- marquee ---------------- */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse ? "" : undefined}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- sequences ---------------- */
export function seq(seed: number, len: number, alphabet = "ACGT") {
  let s = seed;
  let out = "";
  for (let i = 0; i < len; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    out += alphabet[(s >> 16) % alphabet.length];
  }
  return out;
}

const NT: Record<string, string> = {
  A: "text-nt-a",
  C: "text-nt-c",
  G: "text-nt-g",
  T: "text-nt-t",
  U: "text-nt-t",
};

export function Seq({ value, highlight, className = "" }: { value: string; highlight?: number[]; className?: string }) {
  return (
    <span className={`font-mono tracking-[0.12em] ${className}`}>
      {value.split("").map((c, i) =>
        highlight?.includes(i) ? (
          <span key={i} className="rounded-sm bg-lime/40 px-px text-ink">
            {c}
          </span>
        ) : (
          <span key={i} className={NT[c] ?? "text-muted"}>
            {c}
          </span>
        ),
      )}
    </span>
  );
}
