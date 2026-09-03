/**
 * Positioning lives here, not scattered through JSX — rewriting the pitch
 * should be one file, not a search across components.
 *
 * TODO: `name` is a placeholder until the brand/domain is chosen.
 */
export const site = {
  name: "Your Name",
  role: "Marketing that ships",
  description:
    "I run marketing for technical products — positioning, launch, and the pages that convert. I also build the things I market, which is why the handoff never gets lost.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",
  email: "hello@example.com",
  nav: [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ],
} as const;

export type Discipline = "marketing" | "engineering" | "hybrid";

export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  discipline: Discipline;
  year: string;
  /** Outcome first. A marketing portfolio that leads with deliverables doesn't convert. */
  metrics: { label: string; value: string }[];
  href?: string;
};

export const work: WorkItem[] = [
  {
    slug: "chaosx",
    title: "ChaosX Engine",
    summary:
      "Built and launched a C++20 game engine, then wrote the positioning and site that explains it to developers.",
    discipline: "hybrid",
    year: "2026",
    metrics: [
      { label: "Built", value: "Engine + site" },
      { label: "Audience", value: "Developers" },
    ],
    href: "https://example.com",
  },
  {
    slug: "team-finder",
    title: "Team-Finder",
    summary:
      "Full-stack product for matching people to projects. Shipped the app and the go-to-market around it.",
    discipline: "hybrid",
    year: "2025",
    metrics: [
      { label: "Stack", value: "Next.js + Supabase" },
      { label: "Role", value: "End to end" },
    ],
  },
];
