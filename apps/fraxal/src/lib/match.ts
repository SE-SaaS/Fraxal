import { Services, type ServiceSlug } from "@/lib/site";

export type ServiceMatch = {
  slug: ServiceSlug;
  points: number;
  /** The words as the visitor wrote them, e.g. "copies", "by hand". */
  hits: string[];
};

const DIRECT_POINTS = 2;
const HINT_POINTS = 1;
const SHOW_AT = 2;
const SHOW_MAX = 4;

/**
 * "copy" → copy, copies, copied, copying. Only the last word of a phrase
 * bends, and only when it is plain letters — "c++" and "24/7" match as written.
 */
function formsOf(signal: string): string[] {
  const head = signal.slice(0, signal.lastIndexOf(" ") + 1);
  const word = signal.slice(head.length);
  if (!/^[a-z]{3,}$/.test(word)) return [signal];

  const forms = [word, `${word}s`, `${word}es`, `${word}ed`, `${word}ing`];
  if (word.endsWith("e")) forms.push(`${word}d`, `${word.slice(0, -1)}ing`);
  if (/[^aeiou]y$/.test(word)) forms.push(`${word.slice(0, -1)}ies`, `${word.slice(0, -1)}ied`);
  return forms.map((form) => head + form);
}

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest first, so "web design" claims its words before "design" can.
const MATCHERS = Services.flatMap((service) =>
  (
    [
      [service.signals.direct, DIRECT_POINTS],
      [service.signals.hints, HINT_POINTS],
    ] as const
  ).flatMap(([signals, points]) =>
    signals.map((signal) => ({
      slug: service.slug,
      points,
      length: signal.length,
      pattern: new RegExp(
        `(?<![a-z0-9'])(?:${formsOf(signal).map(escape).join("|")})(?![a-z0-9'])`,
        "g",
      ),
    })),
  ),
).sort((a, b) => b.length - a.length);

/**
 * Scores a brief against every service's signals. Returns what `/start` should
 * show: services on 2+ points (at most 4, strongest first); failing that, the
 * best of the weak ones; failing that, Consulting — a brief nothing matched is
 * exactly the conversation Consulting is for.
 */
export function matchByKeywords(description: string): ServiceMatch[] {
  let text = description.toLowerCase().replace(/[‘’]/g, "'");
  const tally = new Map<ServiceSlug, ServiceMatch>();

  for (const matcher of MATCHERS) {
    let counted = false;
    text = text.replace(matcher.pattern, (hit) => {
      const entry = tally.get(matcher.slug) ?? { slug: matcher.slug, points: 0, hits: [] };
      // A signal scores once however often it appears; repeating "website" is not three requests.
      if (!counted) entry.points += matcher.points;
      counted = true;
      if (!entry.hits.includes(hit)) entry.hits.push(hit);
      tally.set(matcher.slug, entry);
      // Blank the words out so a shorter signal cannot count them again.
      return " ".repeat(hit.length);
    });
  }

  const order = Services.map((s) => s.slug);
  const ranked = [...tally.values()].sort(
    (a, b) => b.points - a.points || order.indexOf(a.slug) - order.indexOf(b.slug),
  );

  const strong = ranked.filter((m) => m.points >= SHOW_AT);
  if (strong.length > 0) return strong.slice(0, SHOW_MAX);
  const best = ranked[0];
  if (best) return ranked.filter((m) => m.points === best.points).slice(0, SHOW_MAX);
  return [{ slug: "consulting", points: 0, hits: [] }];
}
