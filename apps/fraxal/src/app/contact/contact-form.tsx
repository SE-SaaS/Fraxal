"use client";

import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { useState } from "react";

import { HoneypotField } from "@/components/honeypot-field";
import { ContactTopics, Site } from "@/lib/site";

const FIELD =
  "w-full rounded-[2px] border border-line bg-[rgba(232,41,74,0.02)] px-4 py-3 text-ink placeholder:text-ink-subtle focus-visible:border-accent focus-visible:outline-none transition-colors duration-200";

const LABEL = "block font-mono text-[0.68rem] tracking-[0.14em] uppercase text-ink-subtle";

/**
 * Posts to `/api/contact`, which emails the message to the Fraxal inbox as typed.
 * If sending fails, the visitor gets a mailto with everything filled in, so a
 * message is never lost to an outage.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<string>("question");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState("");
  const [replyTo, setReplyTo] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = {
      topic: String(data.get("topic") ?? ""),
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: data.get("website"),
    };

    const label = ContactTopics.find((t) => t.value === fields.topic)?.label ?? "Enquiry";
    const body = [
      `From: ${fields.name || "(no name given)"}`,
      `Reply to: ${fields.email}`,
      "",
      fields.message,
    ].join("\n");
    setFallback(
      `mailto:${Site.email}?subject=${encodeURIComponent(label)}&body=${encodeURIComponent(body)}`,
    );

    setState("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error ?? "Something went wrong.");
        setState("error");
        return;
      }

      setReplyTo(fields.email);
      setState("sent");
    } catch {
      setError("Could not reach us. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-line-strong bg-[rgba(232,41,74,0.04)] p-6">
        <p className="font-display text-sm font-bold tracking-[0.08em] text-accent uppercase">
          Sent
        </p>
        <p className="mt-3 text-pretty text-ink">
          Your message is in our inbox. We will reply to{" "}
          <span className="text-accent">{replyTo}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <fieldset>
        <legend className={LABEL}>What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {ContactTopics.map((option) => (
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
            required
            autoComplete="email"
            placeholder="So we can reply"
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
          maxLength={5000}
          placeholder="What is going on? The more specific, the faster we can be useful."
          className={`${FIELD} mt-2 resize-y`}
        />
      </div>

      <HoneypotField />

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={state === "sending"}
          className={cn(
            buttonVariants({ size: "lg" }),
            "to-accent-deep h-auto rounded-[2px] border-none bg-gradient-to-br from-accent px-10 py-3.5 text-[0.85rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_42px_rgba(232,41,74,0.4)]",
          )}
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-ink-subtle">
          Goes straight to our inbox. Prefer to write directly?{" "}
          <a href={`mailto:${Site.email}`} className="text-accent hover:underline">
            {Site.email}
          </a>
        </p>
      </div>

      {state === "error" && error ? (
        <div className="border border-line-strong bg-[rgba(232,41,74,0.04)] p-6">
          <p className="font-display text-sm font-bold tracking-[0.08em] text-accent uppercase">
            Could not send it
          </p>
          <p className="mt-3 text-pretty text-ink-muted">{error}</p>
          <p className="mt-4 text-sm text-ink-subtle">
            Nothing you wrote is lost —{" "}
            <a href={fallback} className="text-accent hover:underline">
              send it from your mail app
            </a>{" "}
            with everything already filled in.
          </p>
        </div>
      ) : null}
    </form>
  );
}
