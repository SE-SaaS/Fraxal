/**
 * One place for anything that changes when the domain or positioning changes.
 * `NEXT_PUBLIC_SITE_URL` is set per-environment on Vercel; the localhost
 * fallback keeps `metadataBase` valid during local dev and CI builds.
 */
export const Site = {
  name: "Fraxal",
  tagline: "Create · Code · Conquer",
  /**
   * The one line under the lockup that says what the company sells.
   *
   * Deliberately empty — this is yours to write. The hero renders without it
   * and nothing looks unfinished; fill in the string and it appears, with the
   * tagline dropping below it automatically. No other change needed.
   */
  headline: "",
  description:
    "Fraxal builds AI systems and the software around them — automation, models, pipelines, and the products they run inside.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "fraxal@outlook.com",
  github: "https://github.com/SE-SaaS",
  nav: [
    { href: "/#services", label: "Services" },
    { href: "/assets", label: "Assets" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

/**
 * Your list, in your order. Titles are tightened for the grid; the one-line
 * descriptions are mine and are meant to be rewritten in your voice.
 */
export const Services = [
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

/**
 * The nine services in three groups. Members are service slugs, so the titles
 * stay in sync with `services` and cannot drift.
 *
 * The grouping argues something on its own: model, then the system around it,
 * then the product it ships inside.
 */
export const Pillars = [
  {
    title: "Intelligence",
    blurb: "Getting a model to do something useful with your data.",
    members: ["ai-automation", "ai-modeling", "ai-chatbots"],
  },
  {
    title: "Systems",
    blurb: "The engineering that makes it run the same way every time.",
    members: ["pipelines", "systems-engines", "software-process"],
  },
  {
    title: "Product",
    blurb: "What the people you are building for actually touch.",
    members: ["websites", "arts", "consulting"],
  },
] as const;

/**
 * PLACEHOLDER — these four steps are mine, not yours.
 *
 * A process section is a promise clients will hold you to, so read these and
 * rewrite them to match how you genuinely run a project. If they do not match,
 * delete the array and the section stops rendering.
 */
export const ProcessSteps = [
  { title: "Scope", body: "We tell you what it takes, before any money moves." },
  { title: "Prototype", body: "The riskiest part first, so it fails cheap if it is going to." },
  { title: "Build", body: "Shipped in slices you can see running, not one delivery at the end." },
  { title: "Hand over", body: "Documented and readable, so it is yours to maintain without us." },
] as const;

/** Order here is the order the storefront renders its sections in. */
export const AssetCategories = [
  {
    id: "ai",
    title: "AI & Data",
    blurb: "Systems that turn a model into something you can actually run in production.",
  },
  {
    id: "tools",
    title: "Developer Tools",
    blurb:
      "Libraries and tooling that remove a recurring cost — a primitive, a hook, a CLI, a check that runs itself.",
  },
  {
    id: "game",
    title: "Game Systems",
    blurb: "Drop-in mechanics for Unreal, Unity and Godot, written to be read and re-tuned.",
  },
] as const;

export type AssetCategory = (typeof AssetCategories)[number]["id"];

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
 * Real products, with two caveats worth keeping visible:
 *
 *   - 3D Modular System is not finished, so it stays "coming-soon" with no
 *     price. Listing it as available would be the one lie on this page.
 *   - Weapon System's description is mine, not yours. Replace it.
 *
 * Anything added here must be something that exists. One invented entry beside
 * real ones makes the real ones look invented too.
 */
export const Assets: Asset[] = [
  {
    slug: "rag-system",
    name: "RAG System",
    blurb:
      "Ingestion, chunking, embedding and reranking wired end to end — with an evaluation set, so you can prove retrieval quality instead of hoping for it.",
    category: "ai",
    worksWith: ["Python", "TypeScript", "Any vector DB"],
    price: "On enquiry",
    status: "available",
  },
  {
    slug: "gravitysort",
    // Real, and the only one here that is licensed rather than delivered as
    // source. The implementation is the product, so the repository stays
    // private and the research paper is what makes the numbers checkable.
    name: "GravitySort",
    blurb:
      "A distribution sort for int32 keys that routes input to a pipeline chosen from its own distribution. Roughly 4.6x cub::DeviceRadixSort where values repeat, parity on uniform. Available under commercial licence.",
    category: "tools",
    worksWith: ["CUDA", "NVIDIA GPUs", "CPU fallback"],
    price: "On enquiry",
    status: "available",
  },
  {
    slug: "movement-system",
    name: "Movement System",
    blurb:
      "Character controller with grounded and airborne states, slope handling and step-up, tuned through exposed values rather than buried constants.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity", "Godot"],
    price: "On enquiry",
    status: "available",
  },
  {
    slug: "inventory-system",
    name: "Inventory System",
    blurb:
      "Slots, stacking, equipment and persistence, with the data model kept separate from the UI so you can reskin it without rewriting it.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity"],
    price: "On enquiry",
    status: "available",
  },
  {
    slug: "event-system",
    // Grounded in how ChaosX actually dispatches events. Rewrite if the
    // packaged version differs from the engine's.
    name: "Event System",
    blurb:
      "Input, window and application events routed through a single dispatcher, so gameplay code never reaches into the platform layer.",
    category: "game",
    worksWith: ["C++", "Unreal Engine", "Unity"],
    price: "On enquiry",
    status: "available",
  },
  {
    slug: "weapon-system",
    // TODO: the specifics here are mine — you said you have it, not what it
    // does. One line from you replaces this.
    name: "Weapon System",
    blurb:
      "Weapon behaviour with the configuration held as data, so adding a weapon is a definition rather than a new code path.",
    category: "game",
    worksWith: ["Unreal Engine", "Unity"],
    price: "On enquiry",
    status: "available",
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
  /** Omitted for private work — the card then renders without a link. */
  href?: string;
  /** Anything genuinely verifiable — a placing, a score. Never invented. */
  note?: string;
  /** Shows a "Private" tag and suppresses the link. */
  private?: boolean;
  /** Set on personal work so it is never presented as company output. */
  by?: string;
};

/**
 * Pulled from the real repos at github.com/SE-SaaS, with their own descriptions
 * condensed. PUBLIC REPOSITORIES ONLY — the org's private repos are excluded on
 * purpose and must stay that way.
 */
export const Projects: Project[] = [
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
  {
    name: "Sign Language Bridge",
    blurb:
      "Fine-tuning Qwen3-VL-2B-Instruct for continuous ASL to English translation, with multi-tier LoRA, staged OpenASL and How2Sign training, and a MediaPipe preprocessing pipeline.",
    stack: ["Qwen3-VL", "LoRA", "MediaPipe"],
    href: "https://github.com/mamounyosef/sign-language-bridge",
  },
  {
    name: "Chest X-Ray Bench",
    blurb:
      "A controlled comparison of 43 chest X-ray models on CheXpert, separating the design choices that actually move scores from the ones that are just noise.",
    stack: ["CheXpert", "ConvNeXt", "Medical imaging"],
    href: "https://github.com/mamounyosef/chest-xray-bench",
    note: "Best ensemble 0.9174 AUROC on test500",
  },
  {
    // Still no link: Algorithems/GravitySort is private, so the URL would 404
    // for every visitor. Make the repo public and add `href` to link it.
    //
    // The headline is deliberately "4.6x on low-cardinality, parity on
    // uniform" rather than a bare 4.6x. The project's own README is candid
    // that gaussian is a loss, and a claim that survives someone checking it
    // is worth more here than a bigger one that does not.
    name: "GravitySort",
    blurb:
      "A distribution sort for int32 keys, CPU and GPU. A gateway samples the input and routes it to a pipeline chosen for its distribution — counting and filling when values repeat, exiting after one pass when data already arrives ordered — so each route skips the work it does not need.",
    stack: ["CUDA", "A100", "Research"],
    note: "4.6x cub::DeviceRadixSort on low-cardinality data, parity on uniform · N=10⁹, A100-80GB",
    private: true,
  },
];

/**
 * Home page order, by exact project name. Anything not listed follows in the
 * order it appears in `Projects`. Reordering the site is editing this line.
 */
export const FeaturedOrder: string[] = [
  // Your three, in your order.
  "ChaosX Engine",
  "GravitySort",
  "Energy Degradation Prediction",
  // Then by how well each one survives being checked: a hard metric first,
  // then depth of description, then whether it describes itself at all.
  "Chest X-Ray Bench",
  "Sign Language Bridge",
  "Health-Navigator",
  "Team-Finder",
  "Video Captioning",
  "RSNA Knee Abnormality Detection",
];

/**
 * Independent work by the team, from their own accounts. Kept in a separate
 * list and rendered under its own heading so nothing here reads as something
 * the company was paid to build. Descriptions are the repos' own.
 */
export const PersonalProjects: Project[] = [
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
  /**
   * The person's colour, sampled along the same crimson-to-blue ramp the hero
   * canvas draws with, so the team reads as part of the same system. Lightened
   * from the raw brand accents — #4a5fad is too dark to set 1rem text on
   * near-black at a readable contrast.
   */
  accent?: string;
};

/**
 * Real people. Links are only filled in where they were actually supplied —
 * the empty ones render as a card with no links rather than a guessed URL.
 *
 * Aws's LinkedIn was pulled from his GitHub profile README, as asked.
 */
export const Team: Person[] = [
  {
    name: "Lana Alostath",
    accent: "#ff5c78",
    role: "Art / AI Engineer",
  },
  {
    name: "Aws Hanaqtah",
    accent: "#c47ab8",
    role: "System Engineer",
    github: "https://github.com/awshanaqtah",
    linkedin: "https://www.linkedin.com/in/aws-hanaqtah-53b9a731a",
    // Add `scholar` here once the algorithm paper is out. Your GitHub lists no
    // Scholar profile, and a guessed URL risks linking a stranger's work.
  },
  {
    name: "Ayham al Suwi",
    accent: "#8f8ce0",
    role: "ML Engineering",
    github: "https://github.com/AyhamAlsuwi",
    linkedin: "https://www.linkedin.com/in/ayhamalsuwi",
  },
  {
    name: "Mamoun Yosef",
    accent: "#6f8ae8",
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
export const Reviews: Review[] = [];
