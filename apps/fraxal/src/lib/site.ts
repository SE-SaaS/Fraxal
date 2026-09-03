/**
 * One place for anything that changes when the domain or positioning changes.
 * `NEXT_PUBLIC_SITE_URL` is set per-environment on Vercel; the localhost
 * fallback keeps `metadataBase` valid during local dev and CI builds.
 */
export const site = {
  name: "Fraxal",
  tagline: "Create · Code · Conquer",
  description:
    "Fraxal builds AI systems and the software around them — automation, models, pipelines, and the products they run inside.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "fraxal@outlook.com",
  github: "https://github.com/SE-SaaS",
  nav: [
    { href: "/#services", label: "Services" },
    { href: "/assets", label: "Assets" },
    { href: "/who-we-are", label: "Who We Are" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/**
 * Your list, in your order. Titles are tightened for the grid; the one-line
 * descriptions are mine and are meant to be rewritten in your voice.
 */
export const services = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    body: "Take the repetitive work out of a process and hand it to a system that runs without being asked.",
  },
  {
    slug: "ai-modeling",
    title: "AI Modeling",
    body: "Models trained, tuned and evaluated against your data — not a general-purpose one bolted on and hoped for.",
  },
  {
    slug: "pipelines",
    title: "Pipelines",
    body: "The path from raw input to finished output, built once so it runs the same way every time.",
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots & Systems",
    body: "Assistants and agents that do real work against your tools, with the plumbing to make them dependable.",
  },
  {
    slug: "websites",
    title: "Websites",
    body: "Fast, built to last, and measurable. Sites that earn their traffic instead of just holding a domain.",
  },
  {
    slug: "arts",
    title: "Arts",
    body: "Visual work made to sit inside a product, not beside it — assets, direction, and the pieces in between.",
  },
  {
    slug: "systems-engines",
    title: "Systems & Engines",
    body: "Low-level engineering where performance actually lives: runtimes, engines, and the layers underneath.",
  },
  {
    slug: "software-process",
    title: "Software Process",
    body: "How the work gets shipped — reviews, environments, releases, and the automation that holds them together.",
  },
  {
    slug: "consulting",
    title: "Consulting",
    body: "A read on what you have, what it will cost to get where you are going, and what to do first.",
  },
] as const;

/** Order here is the order the storefront renders its sections in. */
export const assetCategories = [
  {
    id: "ai",
    title: "AI & Data",
    blurb: "Systems that turn a model into something you can actually run in production.",
  },
  {
    id: "tools",
    title: "Developer Tools",
    blurb: "Small things that remove a recurring cost — a hook, a CLI, a check that runs itself.",
  },
  {
    id: "game",
    title: "Game Systems",
    blurb: "Drop-in mechanics for Unreal, Unity and Godot, written to be read and re-tuned.",
  },
] as const;

export type AssetCategory = (typeof assetCategories)[number]["id"];

export type Asset = {
  slug: string;
  name: string;
  blurb: string;
  category: AssetCategory;
  /** What it plugs into — an engine, a runtime, or a language. */
  worksWith: string[];
  price: string;
  /** Nothing is purchasable until a payment provider is wired up. */
  status: "available" | "coming-soon";
};

/**
 * EXAMPLE DATA — these are not real products. They exist so the page layout is
 * visible and so the shape of a real listing is settled. Replace wholesale
 * before this site is public; shipping invented products with prices on a live
 * storefront is the kind of thing that gets a business in trouble.
 */
export const assets: Asset[] = [
  {
    slug: "rag-system",
    name: "RAG System",
    blurb:
      "Ingestion, chunking, embedding and reranking wired end to end — with an evaluation set, so you can prove retrieval quality instead of hoping for it.",
    category: "ai",
    worksWith: ["Python", "TypeScript", "Any vector DB"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "ai-pipeline",
    name: "AI Pipeline",
    blurb:
      "Data validation, versioned runs and deployment around your training and inference code, so a notebook becomes something you can operate.",
    category: "ai",
    worksWith: ["Python", "Docker", "CI"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "domain-models",
    name: "Domain Models",
    blurb:
      "Models fine-tuned for one task and shipped with the evaluation that proves it — you see where they hold and where they fail before you deploy.",
    category: "ai",
    worksWith: ["PyTorch", "ONNX", "Hugging Face"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "cli-toolkit",
    name: "CLI Toolkit",
    blurb:
      "A command-line scaffold with argument parsing, config resolution and structured output already handled, ready to wrap whatever you need automated.",
    category: "tools",
    worksWith: ["Node", "Python"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "git-hooks-ci",
    name: "Hooks & CI Checks",
    blurb:
      "Pre-commit and pre-push hooks with the CI workflow to match, so the same rules run on your machine and on the server — and nothing lands broken.",
    category: "tools",
    worksWith: ["Git", "GitHub Actions"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "movement-system",
    name: "Movement System",
    blurb:
      "Character controller with grounded and airborne states, slope handling and step-up, tuned through exposed values rather than buried constants.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity", "Godot"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "inventory-system",
    name: "Inventory System",
    blurb:
      "Slots, stacking, equipment and persistence, with the data model kept separate from the UI so you can reskin it without rewriting it.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity"],
    price: "—",
    status: "coming-soon",
  },
  {
    slug: "modular-3d-system",
    name: "3D Modular System",
    blurb:
      "Tileable pieces with snapping, collision and LODs configured, so a blockout turns into a dressed level without a pass of manual cleanup.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity", "FBX / glTF"],
    price: "—",
    status: "coming-soon",
  },
];

export type Project = {
  name: string;
  blurb: string;
  stack: string[];
  href: string;
  /** Anything genuinely verifiable — a placing, a score. Never invented. */
  note?: string;
  /** Set on personal work so it is never presented as company output. */
  by?: string;
};

/**
 * Pulled from the real repos at github.com/SE-SaaS, with their own descriptions
 * condensed. PUBLIC REPOSITORIES ONLY — the org's private repos are excluded on
 * purpose and must stay that way.
 */
export const projects: Project[] = [
  {
    name: "Health-Navigator",
    blurb:
      "An agentic medical assistant that reasons over patient data through multi-agent orchestration, combining pre-trained ML models with relational and vector databases.",
    stack: ["Multi-agent", "Vector DB", "Jupyter"],
    href: "https://github.com/SE-SaaS/Health-Navigator",
  },
  {
    name: "Energy Degradation Prediction",
    blurb:
      "Predicting an energy degradation index across 42 channels under train/test distributional shift, blending four tabular foundation models.",
    stack: ["TabPFN", "Nori-30M", "TabFM"],
    href: "https://github.com/SE-SaaS/energy-degradation-prediction",
    note: "1st place — IEEE Jordan AI Modeling Hackathon 2.0 · RMSLE 0.19877",
  },
  {
    name: "Video Captioning",
    blurb:
      "Samples frames with ffmpeg and sends them to vision models for captions in four voices, then runs an ensemble with a judge model picking the best result.",
    stack: ["VLM ensemble", "ffmpeg", "Python"],
    href: "https://github.com/SE-SaaS/video-captioning",
  },
  {
    name: "Team-Finder",
    blurb:
      "Security-hardened team-matching platform that pairs students by skill similarity and verifies members against university email domains.",
    stack: ["Next.js", "FastAPI", "Supabase"],
    href: "https://github.com/SE-SaaS/Team-Finder",
  },
  {
    name: "RSNA Knee Abnormality Detection",
    blurb: "Detecting knee abnormalities from RSNA medical imaging data.",
    stack: ["Medical imaging", "Deep learning"],
    href: "https://github.com/SE-SaaS/RSNA-Knee-Abnormality-Detection",
  },
  {
    name: "ChaosX Engine",
    blurb:
      "A C++ game engine built from the ground up — custom application and entry-point architecture, event system, and logging, targeting Windows and Linux.",
    stack: ["C++", "premake5", "Cross-platform"],
    href: "https://github.com/awshanaqtah/ChaosX",
    note: "In development",
  },
];

/**
 * Independent work by the team, from their own accounts. Kept in a separate
 * list and rendered under its own heading so nothing here reads as something
 * the company was paid to build. Descriptions are the repos' own.
 */
export const personalProjects: Project[] = [
  {
    name: "LLaMA 3 From Scratch",
    blurb:
      "A ground-up reimplementation of the LLaMA 3 transformer in PyTorch, built to understand — not just use — every component of a modern decoder-only LLM.",
    stack: ["PyTorch", "Transformers", "LLM"],
    href: "https://github.com/awshanaqtah/LLaMA-3-Transformer-From-Scratch-Implementation",
    by: "Aws Hanaqtah",
  },
  {
    name: "GPT-2 From Scratch",
    blurb:
      "A GPT-2 implementation written from first principles, following the same read-the-whole-thing approach as the LLaMA 3 build.",
    stack: ["PyTorch", "Transformers"],
    href: "https://github.com/awshanaqtah/Gpt-2-Implmenation-from-Scratch",
    by: "Aws Hanaqtah",
  },
  {
    name: "ResNet Face Attributes",
    blurb:
      "Two-stage face-attribute pipeline: YOLO separates person from animal, then ResNet-34 models read gender, age and expression from each face.",
    stack: ["YOLO", "ResNet-34", "UTKFace + RAF-DB"],
    href: "https://github.com/awshanaqtah/resnet-face-attributes",
    note: "Trained on a Modal A100",
    by: "Aws Hanaqtah",
  },
];

export type Person = {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
  /** Published research. Worth showing on an AI company's site when it exists. */
  scholar?: string;
};

/**
 * Real people. Links are only filled in where they were actually supplied —
 * the empty ones render as a card with no links rather than a guessed URL.
 *
 * Aws's LinkedIn was pulled from his GitHub profile README, as asked.
 */
export const team: Person[] = [
  {
    name: "Lana Alostath",
    role: "Art / AI Engineer",
  },
  {
    name: "Aws Hanaqtah",
    role: "System Engineer",
    github: "https://github.com/awshanaqtah",
    linkedin: "https://www.linkedin.com/in/aws-hanaqtah-53b9a731a",
    // Add `scholar` here once the algorithm paper is out. Your GitHub lists no
    // Scholar profile, and a guessed URL risks linking a stranger's work.
  },
  {
    name: "Ayham al Suwi",
    role: "ML Engineering",
  },
  {
    name: "Mamoun Yosef",
    role: "AI Engineer — Computer Vision",
    github: "https://github.com/mamounyosef",
    linkedin: "https://www.linkedin.com/in/mamoun-yosef",
    scholar: "https://scholar.google.com/citations?user=4tsrEQcAAAAJ&hl=en",
  },
];

export type Review = {
  quote: string;
  author: string;
  role: string;
  project: string;
};

/**
 * Deliberately empty.
 *
 * Writing plausible-sounding client testimonials would mean publishing
 * fabricated reviews under invented people's names — that is not a placeholder,
 * it is a fake. The page renders an honest empty state until you supply real
 * ones, with permission from the clients quoted.
 */
export const reviews: Review[] = [];
