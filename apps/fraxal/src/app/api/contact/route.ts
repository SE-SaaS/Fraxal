import { z } from "zod";

import { failedToSend, sendEnquiry } from "@/lib/mail";
import { ContactTopics } from "@/lib/site";

// Sending waits on the mail server; this is the ceiling before the function gives up.
export const maxDuration = 30;

const MAX_CHARS = 5000;

type TopicValue = (typeof ContactTopics)[number]["value"];

const schema = z.object(
  {
    topic: z.enum(
      ContactTopics.map((t) => t.value) as [TopicValue, ...TopicValue[]],
      "Pick what this is about.",
    ),
    // One line: a name is a label, and a line break in it would read as a new field.
    name: z
      .string()
      .trim()
      .max(200)
      .transform((value) => value.replace(/\s+/g, " "))
      .default(""),
    email: z.email("Add an email address so we can reply."),
    message: z
      .string()
      .trim()
      .min(1, "Write a message first.")
      .max(MAX_CHARS, `Keep it under ${MAX_CHARS.toLocaleString("en")} characters.`),
    /** Honeypot — see HoneypotField. */
    website: z.string().nullish(),
  },
  { error: "Could not read that request." },
);

/** Emails a contact-form message to the Fraxal inbox exactly as typed. */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Could not read that request." },
      { status: 400 },
    );
  }

  const { topic, name, email, message, website } = parsed.data;
  if (website) return Response.json({ sent: true });

  const label = ContactTopics.find((t) => t.value === topic)?.label ?? "Enquiry";

  try {
    await sendEnquiry({
      subject: `${label} — ${name || email}`,
      replyTo: email,
      text: [
        message,
        "",
        "—",
        `From: ${name || "(no name given)"}`,
        `Reply to: ${email}`,
        "Sent from the Contact page.",
      ].join("\n"),
    });
  } catch (error) {
    return failedToSend(error);
  }

  return Response.json({ sent: true });
}
