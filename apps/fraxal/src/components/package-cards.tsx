import { cn } from "@repo/ui/lib/cn";

import { Packages, whatsappHref } from "@/lib/site";

/**
 * Each CTA opens WhatsApp with the package already named, so the first message
 * a local owner sends is a yes rather than a blank chat they have to start.
 */
const LABELS = {
  en: {
    from: "From",
    currency: "JD",
    once: "one-off",
    monthly: "per month",
    cta: "Start on WhatsApp",
    message: (name: string) => `Hi Fraxal, I'm interested in the ${name} package.`,
  },
  ar: {
    from: "يبدأ من",
    currency: "دينار",
    once: "لمرة واحدة",
    monthly: "شهرياً",
    cta: "ابدأ عبر واتساب",
    message: (name: string) => `مرحباً فراكسال، أنا مهتم بباقة ${name}.`,
  },
} as const;

export function PackageCards({ lang }: { lang: "en" | "ar" }) {
  const labels = LABELS[lang];
  // Tracking and caps are the brand's Latin voice; on Arabic they break the script.
  const latin = lang === "en";

  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {Packages.map((pkg) => {
        const copy = pkg[lang];

        return (
          <li
            key={pkg.slug}
            className="group flex flex-col border border-line bg-[rgba(232,41,74,0.02)] p-8 transition-colors duration-300 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)]"
          >
            <h3
              className={cn(
                "font-display text-[0.95rem] font-bold text-accent",
                latin && "tracking-[0.12em] uppercase",
              )}
            >
              {copy.name}
            </h3>

            <p className="mt-6 text-[0.8rem] text-ink-subtle">{labels.from}</p>
            <p className="font-display text-ink">
              <span className="text-[2.4rem] leading-none font-black">{pkg.price}</span>{" "}
              <span className="text-[0.9rem] font-bold">{labels.currency}</span>
            </p>
            <p className="mt-1 text-[0.8rem] text-ink-subtle">
              {pkg.monthly ? labels.monthly : labels.once}
            </p>

            <p className="mt-5 text-[0.92rem] text-pretty text-ink-muted">{copy.blurb}</p>

            <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
              {copy.includes.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-[0.92rem] text-ink">
                  <span aria-hidden="true" className="text-accent">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={whatsappHref(labels.message(copy.name))}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "mt-8 block rounded-[2px] border border-accent px-4 py-3 text-center text-sm font-bold text-accent transition-colors duration-200 hover:bg-accent hover:text-accent-ink",
                latin && "tracking-[0.12em] uppercase",
              )}
            >
              {labels.cta}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
