"use client";

import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import Link from "next/link";
import { useState } from "react";

import { services, site } from "@/lib/site";

type Match = {
  summary: string;
  services: { slug: string; why: string }[];
  clarifying: string[];
};

const MIN_CHARS = 20;

export function ProjectMatcher() {
  const [description, setDescription] = useState("");
  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [match, setMatch] = useState<Match | null>(null);
  const [error, setError] = useState<string | null>(null);

  const tooShort = description.trim().length < MIN_CHARS;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (tooShort) return;

    setState("working");
    setError(null);

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error ?? "Something went wrong.");
        setState("error");
        return;
      }

      setMatch(payload as Match);
      setState("done");
    } catch {
      setError("Could not reach the matcher. Check your connection and try again.");
      setState("error");
    }
  }

  const titleFor = (slug: string) => services.find((s) => s.slug === slug)?.title ?? slug;

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={submit} className="flex flex-col gap-5">
        <label
          htmlFor="description"
          className="block font-mono text-[0.68rem] tracking-[0.14em] text-ink-subtle uppercase"
        >
          Describe the idea
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={9}
          required
          placeholder="What are you trying to build, and what is in the way? Write it however you would explain it to a colleague — you do not need to know the technical terms."
          className="w-full resize-y rounded-[2px] border border-line bg-[rgba(232,41,74,0.02)] px-4 py-3.5 text-ink transition-colors duration-200 placeholder:text-ink-subtle focus-visible:border-accent focus-visible:outline-none"
        />

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={tooShort || state === "working"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300",
              !tooShort && state !== "working" && "hover:-translate-y-1",
            )}
          >
            {state === "working" ? "Reading…" : "Match my project"}
          </button>

          <p className="text-sm text-ink-subtle">
            {tooShort
              ? `A sentence or two is enough — ${MIN_CHARS - description.trim().length} more characters.`
              : "We will work out which services this needs."}
          </p>
        </div>
      </form>

      {state === "error" && error ? (
        <div className="border border-line-strong bg-[rgba(232,41,74,0.04)] p-6">
          <p className="font-display text-sm font-bold tracking-[0.08em] text-accent uppercase">
            Could not match it
          </p>
          <p className="mt-3 text-pretty text-ink-muted">{error}</p>
          <p className="mt-4 text-sm text-ink-subtle">
            Send it to{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{" "}
            and a person will read it instead.
          </p>
        </div>
      ) : null}

      {state === "done" && match ? (
        <div className="border-t border-line pt-10">
          <p className="font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
            What we read
          </p>
          <p className="mt-3 text-lg text-pretty text-ink">{match.summary}</p>

          <p className="mt-10 font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
            Services this needs
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {match.services.map((item) => (
              <li key={item.slug} className="border border-line bg-[rgba(232,41,74,0.02)] p-6">
                <h3 className="font-display text-[0.9rem] font-bold tracking-[0.08em] text-ink uppercase">
                  {titleFor(item.slug)}
                </h3>
                <p className="mt-2.5 text-[0.9rem] text-pretty text-ink-subtle">{item.why}</p>
              </li>
            ))}
          </ul>

          {match.clarifying.length > 0 ? (
            <>
              <p className="mt-10 font-mono text-[0.68rem] tracking-[0.16em] text-accent uppercase">
                What we would need to know
              </p>
              <ul className="mt-4 space-y-2.5">
                {match.clarifying.map((question) => (
                  <li key={question} className="flex gap-3 text-pretty text-ink-muted">
                    <span aria-hidden="true" className="text-accent">
                      →
                    </span>
                    {question}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-line pt-8">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Project — " + match.summary.slice(0, 80))}&body=${encodeURIComponent(description)}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1",
              )}
            >
              Send this to us
            </a>
            <p className="text-sm text-ink-subtle">
              Your description comes along with it.{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Or ask something first
              </Link>
              .
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
