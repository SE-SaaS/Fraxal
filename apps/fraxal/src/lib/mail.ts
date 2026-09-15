import nodemailer, { type Transporter } from "nodemailer";

import { Site } from "@/lib/site";

// Hostinger hosts the fraxal.dev mailbox. The site signs in as that mailbox and
// sends to itself, so mail arrives from our own domain and passes its checks.
const SMTP_HOST = "smtp.hostinger.com";
const SMTP_PORT = 465;

export class MailNotConfiguredError extends Error {}

export type Enquiry = {
  subject: string;
  /** The visitor's address — pressing Reply in the inbox answers them. */
  replyTo: string;
  text: string;
};

let transporter: Transporter | undefined;

const oneLine = (text: string) => text.replace(/[\r\n]+/g, " ").trim();

/**
 * Delivers an enquiry to the Fraxal inbox and resolves once the mail server has
 * accepted it. Callers must await this before responding: Vercel freezes work
 * left running after a response, and an unawaited send silently never leaves.
 *
 * Needs `SMTP_PASSWORD` (the mailbox password). Without it, local development
 * prints the email to the terminal instead; production refuses.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<void> {
  const password = process.env.SMTP_PASSWORD;

  if (!password) {
    if (process.env.NODE_ENV === "production") {
      throw new MailNotConfiguredError("SMTP_PASSWORD is not set");
    }
    console.warn(
      `[mail] SMTP_PASSWORD not set, printing instead of sending\nReply-To: ${enquiry.replyTo}\nSubject: ${oneLine(enquiry.subject)}\n\n${enquiry.text}\n[/mail]`,
    );
    return;
  }

  transporter ??= nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: { user: Site.email, pass: password },
    // Fail inside the function's time limit rather than hanging until it is killed.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporter.sendMail({
    from: { name: `${Site.name} site`, address: Site.email },
    to: Site.email,
    replyTo: enquiry.replyTo,
    subject: oneLine(enquiry.subject),
    text: enquiry.text,
  });
}

/** What both form routes answer when a message could not be delivered. */
export function failedToSend(error: unknown): Response {
  console.error("[mail] send failed:", error);
  const notConfigured = error instanceof MailNotConfiguredError;
  return Response.json(
    { error: notConfigured ? "Sending is not set up yet." : "We could not send that just now." },
    { status: notConfigured ? 503 : 502 },
  );
}
