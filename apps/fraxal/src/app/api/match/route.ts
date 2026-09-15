import { z } from "zod";

import { failedToSend, sendEnquiry } from "@/lib/mail";
import { matchByKeywords } from "@/lib/match";
import { Services } from "@/lib/site";

// Sending waits on the mail server; this is the ceiling before the function gives up.
export const maxDuration = 30;

const MIN_CHARS = 20;
const MAX_CHARS = 4000;

const schema = z.object(
  {
    description: z
      .string()
      .trim()
      .min(
        MIN_CHARS,
        "Tell us a bit more — at least a sentence or two about what you want to build.",
      )
      .max(MAX_CHARS, `Keep it under ${MAX_CHARS.toLocaleString("en")} characters.`),
    email: z.email("Add an email address so we can reply."),
    /** Honeypot — see HoneypotField. */
    website: z.string().nullish(),
  },
  { error: "Could not read that request." },
);

/**
 * Emails the brief to the Fraxal inbox exactly as typed, then tells the visitor
 * which services it points to. Matching is keyword-based and free; an AI summary
 * can slot in here later without changing the response shape.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Could not read that request." },
      { status: 400 },
    );
  }

  const { description, email, website } = parsed.data;
  const matches = matchByKeywords(description);
  const reply = { services: matches.map(({ slug, hits }) => ({ slug, hits })) };

  if (website) return Response.json(reply);

  const titles = matches.map((m) => Services.find((s) => s.slug === m.slug)?.title ?? m.slug);

  try {
    await sendEnquiry({
      subject: `Project brief — ${titles.join(", ")}`,
      replyTo: email,
      text: [
        description,
        "",
        "—",
        `Reply to: ${email}`,
        `Points to: ${matches
          .map((m, i) => (m.hits.length > 0 ? `${titles[i]} (${m.hits.join(", ")})` : titles[i]))
          .join("; ")}`,
        "Sent from the Start a Project page.",
      ].join("\n"),
    });
  } catch (error) {
    return failedToSend(error);
  }

  return Response.json(reply);
}
