import { z } from "zod";

import { failedToSend, sendEnquiry } from "@/lib/mail";

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

/** Emails a Start a Project brief to the Fraxal inbox exactly as typed. */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Could not read that request." },
      { status: 400 },
    );
  }

  const { description, email, website } = parsed.data;
  if (website) return Response.json({ sent: true });

  try {
    await sendEnquiry({
      subject: `Project brief — ${email}`,
      replyTo: email,
      text: [
        description,
        "",
        "—",
        `Reply to: ${email}`,
        "Sent from the Start a Project page.",
      ].join("\n"),
    });
  } catch (error) {
    return failedToSend(error);
  }

  return Response.json({ sent: true });
}
