/**
 * Positioning lives here, not scattered through JSX — rewriting the pitch
 * should be one file, not a search across components.
 *
 * DELIBERATELY NO REFERENCE TO FRAXAL. This site and the company site are kept
 * apart: no links, no "I build X", no shared work. Everything below is Aws's
 * own, from his own account. Company output belongs on the company site.
 */
export const Site = {
  name: "Aws Hanaqtah",
  role: "Systems & AI Engineer",
  /** The one line that has to land before anyone scrolls. */
  intro:
    "I build the layers most people import. Game engines, GPU primitives, and transformer architectures written from first principles — because understanding the thing underneath is what makes the thing on top trustworthy.",
  location: "Amman, Jordan",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001",
  email: "awshanaqtah12@outlook.com",
  socials: [
    { label: "GitHub", href: "https://github.com/awshanaqtah" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aws-hanaqtah-53b9a731a" },
    { label: "X", href: "https://x.com/AwsHanaqtahay1" },
  ],
  nav: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ],
} as const;

/**
 * Written in the first person because this is a personal page, not a company
 * one. Two short paragraphs — anything longer and nobody reads the second.
 */
export const About = [
  "Most of what I build, I build from scratch first. A C++20 game engine with its own application and event layer. LLaMA 3 and GPT-2 reimplemented in PyTorch, component by component, to understand a decoder-only model rather than call one. A GPU sorting primitive benchmarked against NVIDIA's own.",
  "That is not a preference for reinventing things — it is how I learn what a library is actually doing, and where it stops being the right tool. It also means when something breaks three layers down, I know where to look.",
] as const;

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

/** Grouped by what they are for, not by language, so it reads as capability. */
export const Skills: SkillGroup[] = [
  {
    title: "Systems",
    blurb: "The layer where performance actually lives.",
    items: ["C++20", "CUDA", "Engine architecture", "premake5", "Windows / Linux"],
  },
  {
    title: "Machine Learning",
    blurb: "Models built and trained, not just called.",
    items: ["PyTorch", "Transformers", "LoRA", "YOLO", "ResNet"],
  },
  {
    title: "Product",
    blurb: "The part a person actually opens.",
    items: ["TypeScript", "Next.js", "React", "Supabase", "Tauri"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  stack: string[];
  href: string;
  /** Only ever something verifiable — a placing, a score, a state. */
  note?: string;
};

/**
 * Aws's own public repositories. Descriptions are the repos' own, condensed.
 * Nothing from any organisation account belongs on this list.
 */
export const Projects: Project[] = [
  {
    name: "ChaosX Engine",
    blurb:
      "A C++20 game engine built from the ground up — custom application and entry-point architecture, an event system, and logging, targeting Windows and Linux.",
    stack: ["C++20", "premake5", "Cross-platform"],
    href: "https://github.com/awshanaqtah/ChaosX",
    note: "In development",
  },
  {
    name: "LLaMA 3 From Scratch",
    blurb:
      "A ground-up reimplementation of the LLaMA 3 transformer in PyTorch, built to understand — not just use — every component of a modern decoder-only LLM.",
    stack: ["PyTorch", "Transformers", "LLM"],
    href: "https://github.com/awshanaqtah/LLaMA-3-Transformer-From-Scratch-Implementation",
  },
  {
    name: "GPT-2 From Scratch",
    blurb:
      "GPT-2 written from first principles, following the same read-the-whole-thing approach as the LLaMA 3 build.",
    stack: ["PyTorch", "Transformers"],
    href: "https://github.com/awshanaqtah/Gpt-2-Implmenation-from-Scratch",
  },
  {
    name: "ResNet Face Attributes",
    blurb:
      "Two-stage face-attribute pipeline: YOLO separates person from animal, then ResNet-34 models read gender, age and expression from each face.",
    stack: ["YOLO", "ResNet-34", "UTKFace + RAF-DB"],
    href: "https://github.com/awshanaqtah/resnet-face-attributes",
    note: "Trained on a Modal A100",
  },
  {
    name: "Team-Finder",
    blurb:
      "AI-powered university team builder — finds teammates, generates project ideas, and assembles balanced teams, shipped for web and desktop.",
    stack: ["React 19", "Supabase", "Tauri"],
    href: "https://github.com/awshanaqtah/TeamFinder",
  },
];
