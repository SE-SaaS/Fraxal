import { Output, generateText } from "ai";
import { z } from "zod";

import { services } from "@/lib/site";

// Long enough for a considered answer, short enough that a stuck request fails
// rather than hanging the page.
export const maxDuration = 30;

const SLUGS = services.map((s) => s.slug) as [string, ...string[]];

const schema = z.object({
  summary: z
    .string()
    .describe("One sentence restating what the person wants to build, in plain language."),
  services: z
    .array(
      z.object({
        slug: z.enum(SLUGS).describe("Which service this is."),
        why: z
          .string()
          .describe("One sentence on why this service applies to what they described."),
      }),
    )
    .min(1)
    .max(4)
    .describe("Most relevant first. Only include services that genuinely apply."),
  clarifying: z
    .array(z.string())
    .max(3)
    .describe("Questions worth asking before quoting. Empty if the brief is already clear."),
});

const CATALOGUE = services.map((s) => `- ${s.slug} (${s.title}): ${s.body}`).join("\n");

export async function POST(request: Request) {
  let description: unknown;
  try {
    ({ description } = await request.json());
  } catch {
    return Response.json({ error: "Could not read that request." }, { status: 400 });
  }

  if (typeof description !== "string" || description.trim().length < 20) {
    return Response.json(
      { error: "Tell us a bit more — at least a sentence or two about what you want to build." },
      { status: 400 },
    );
  }

  // Hard cap: a huge paste would otherwise run up the bill on one submission.
  const brief = description.trim().slice(0, 4000);

  try {
    const { output } = await generateText({
      model: "anthropic/claude-sonnet-5",
      output: Output.object({ schema }),
      system: [
        "You route incoming project enquiries for Fraxal, a company that builds AI systems and the software around them.",
        "Given a description of what someone wants to build, pick the services from the catalogue that genuinely apply.",
        "Be honest and selective: two well-matched services beat four loose ones. Never invent a service that is not listed.",
        "If the brief is vague about scope, budget, data or timeline, put that in clarifying questions rather than guessing.",
        "Write for the person who submitted it — plain, direct, second person. No sales language.",
        "",
        "Catalogue:",
        CATALOGUE,
      ].join("\n"),
      prompt: brief,
    });

    return Response.json(output);
  } catch (error) {
    // Surface the shape of the failure without leaking keys or stack traces.
    const missingKey = error instanceof Error && /api key|unauthor|credential/i.test(error.message);
    console.error("[match] failed:", error);
    return Response.json(
      {
        error: missingKey
          ? "The matcher is not configured yet. Set AI_GATEWAY_API_KEY and try again."
          : "The matcher could not be reached. Email us and we will read it ourselves.",
      },
      { status: missingKey ? 503 : 502 },
    );
  }
}
