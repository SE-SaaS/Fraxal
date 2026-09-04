"use client";

import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { useState } from "react";

import { Site } from "@/lib/site";

const TOPICS = [
  { value: "question", label: "A question" },
  { value: "problem", label: "Report a problem" },
  { value: "quote", label: "Ask for a quote" },
  { value: "other", label: "Something else" },
] as const;

const FIELD =
  "w-full rounded-[2px] border border-line bg-[rgba(232,41,74,0.02)] px-4 py-3 text-ink placeholder:text-ink-subtle focus-visible:border-accent focus-visible:outline-none transition-colors duration-200";

const LABEL = "block font-mono text-[0.68rem] tracking-[0.14em] uppercase text-ink-subtle";

/**
 * Composes a mailto rather than posting to a server.
 *
 * That is a deliberate stopgap: with no email provider wired up there is no
 * honest way to accept a submission — a form that silently drops messages is
 * worse than no form. This opens the visitor's mail client with everything
 * filled in, which always works and never loses anything. Swap the submit
 * handler for a server action once a provider is provisioned.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>("question");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const label = TOPICS.find((t) => t.value === data.get("topic"))?.label ?? "Enquiry";

    const body = [
      `From: ${data.get("name") || "(no name given)"}`,
      `Reply to: ${data.get("email") || "(no address given)"}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${Site.email}?subject=${encodeURIComponent(
      `${label} — via fraxal.com`,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <fieldset>
        <legend className={LABEL}>What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {TOPICS.map((option) => (
            <label
              key={option.value}
              className={cn(
                "cursor-pointer rounded-[2px] border px-4 py-2 text-[0.85rem] transition-colors duration-200",
                topic === option.value
                  ? "border-accent bg-[rgba(232,41,74,0.07)] text-accent"
                  : "border-line text-ink-muted hover:border-line-strong",
              )}
            >
              <input
                type="radio"
                name="topic"
                value={option.value}
                checked={topic === option.value}
                onChange={(e) => setTopic(e.target.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`${FIELD} mt-2`}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`${FIELD} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="What is going on? The more specific, the faster we can be useful."
          className={`${FIELD} mt-2 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className={cn(
            buttonVariants({ size: "lg" }),
            "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(232,41,74,0.4)]",
          )}
        >
          Send message
        </button>
        <p className="text-sm text-ink-subtle">
          Opens your mail app. Prefer to write directly?{" "}
          <a href={`mailto:${Site.email}`} className="text-accent hover:underline">
            {Site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
