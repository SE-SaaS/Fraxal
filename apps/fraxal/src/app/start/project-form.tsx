"use client";

import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import Link from "next/link";
import { useState } from "react";

import { HoneypotField } from "@/components/honeypot-field";
import { Site } from "@/lib/site";

const MIN_CHARS = 20;
const MAX_CHARS = 4000;

const LABEL = "block font-mono text-[0.68rem] tracking-[0.14em] text-ink-subtle uppercase";

const FIELD =
  "w-full rounded-[2px] border border-line bg-[rgba(232,41,74,0.02)] px-4 text-ink transition-colors duration-200 placeholder:text-ink-subtle focus-visible:border-accent focus-visible:outline-none";

/** Posts to `/api/project`, which emails the brief to the Fraxal inbox as typed. */
export function ProjectForm() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const remaining = MIN_CHARS - description.trim().length;
  const tooShort = remaining > 0;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (tooShort) return;
    const website = new FormData(event.currentTarget).get("website");

    setState("sending");
    setError(null);

    try {
      const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, email, website }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error ?? "Something went wrong.");
        setState("error");
        return;
      }

      setState("sent");
    } catch {
      setError("Could not reach us. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex flex-col gap-8">
        <div className="border border-line-strong bg-[rgba(232,41,74,0.04)] p-6">
          <p className="font-display text-sm font-bold tracking-[0.08em] text-accent uppercase">
            Sent
          </p>
          <p className="mt-3 text-pretty text-ink">
            Your brief is in our inbox, word for word. We will reply to{" "}
            <span className="text-accent">{email}</span>.
          </p>
        </div>

        <p className="text-sm text-ink-subtle">
          Thought of something to add?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Send us a message
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={submit} className="flex flex-col gap-7">
        <div>
          <label htmlFor="description" className={LABEL}>
            Describe the idea
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={9}
            required
            maxLength={MAX_CHARS}
            placeholder="What are you trying to build, and what is in the way? Write it however you would explain it to a colleague — you do not need to know the technical terms."
            className={`${FIELD} mt-3 resize-y py-3.5`}
          />
        </div>

        <div className="max-w-md">
          <label htmlFor="email" className={LABEL}>
            Your email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="So we can reply"
            className={`${FIELD} mt-3 py-3`}
          />
        </div>

        <HoneypotField />

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={tooShort || state === "sending"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300",
              !tooShort && state !== "sending" && "hover:-translate-y-1",
            )}
          >
            {state === "sending" ? "Sending…" : "Send my project"}
          </button>

          <p className="text-sm text-ink-subtle">
            {tooShort
              ? `A sentence or two is enough — ${remaining} more characters.`
              : "It goes straight to our inbox, and a person reads every one."}
          </p>
        </div>
      </form>

      {state === "error" && error ? (
        <div className="border border-line-strong bg-[rgba(232,41,74,0.04)] p-6">
          <p className="font-display text-sm font-bold tracking-[0.08em] text-accent uppercase">
            Could not send it
          </p>
          <p className="mt-3 text-pretty text-ink-muted">{error}</p>
          <p className="mt-4 text-sm text-ink-subtle">
            Nothing you wrote is lost —{" "}
            <a
              href={`mailto:${Site.email}?subject=${encodeURIComponent("Project brief")}&body=${encodeURIComponent(description)}`}
              className="text-accent hover:underline"
            >
              email it to {Site.email}
            </a>{" "}
            with your description already filled in.
          </p>
        </div>
      ) : null}
    </div>
  );
}
