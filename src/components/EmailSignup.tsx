"use client";

import { useState } from "react";

/** GitHub-style email row: one input joined to one button. No backend yet. */
export function EmailSignup({ id }: { id: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-sm text-muted">Thanks. We&apos;ll email you when sign-ups open.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:gap-0"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        autoComplete="email"
        placeholder="Enter your email"
        className="h-12 w-full min-w-0 rounded-md sm:flex-1 bg-paper px-4 text-ink ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent sm:rounded-r-none"
      />
      <button
        type="submit"
        className="h-12 shrink-0 rounded-md bg-btn px-5 text-base font-semibold text-white ring-1 ring-white/10 transition-colors hover:bg-[#2ea043] sm:rounded-l-none"
      >
        Sign up for Virotica
      </button>
    </form>
  );
}
