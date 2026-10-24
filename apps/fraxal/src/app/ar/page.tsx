import { cn } from "@repo/ui/lib/cn";
import { buttonVariants } from "@repo/ui/primitives/button";
import { Container } from "@repo/ui/primitives/container";
import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { NeuralField } from "@/components/neural-field";
import { PackageCards } from "@/components/package-cards";
import { Site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "مواقع وتسويق ومساعدات ذكية لعملك",
  description:
    "فراكسال فريق مهندسين في عمّان: مواقع إلكترونية، تسويق على السوشال ميديا، ومساعدات ذكية على واتساب للأعمال المحلية.",
  alternates: {
    canonical: "/ar",
    languages: { en: "/", ar: "/ar" },
  },
};

/** The home page's buttons, minus the tracked-out caps Arabic cannot take. */
const CTA_BASE =
  "h-auto rounded-[2px] px-10 py-3.5 text-[0.95rem] font-bold transition-all duration-300 hover:-translate-y-1";

const CTA_PRIMARY =
  "border-none bg-gradient-to-br from-accent to-accent-deep hover:shadow-[0_16px_42px_rgba(232,41,74,0.4)]";

const CTA_GHOST =
  "border-accent bg-transparent text-accent hover:border-accent hover:bg-[rgba(232,41,74,0.07)] hover:shadow-[0_0_24px_rgba(232,41,74,0.25)]";

/**
 * Written for a local owner deciding whether to message us, so every claim
 * here has to hold: the hackathon placing is the one in `Projects`.
 */
const Reasons = [
  {
    title: "من عمّان، لعمّان",
    body: "نعرف السوق المحلي، ونتحدث معك بالعربية من أول رسالة إلى آخر تعديل.",
  },
  {
    title: "السعر واضح من البداية",
    body: "تعرف كم ستدفع قبل أن يبدأ أي عمل. لا مفاجآت في الفاتورة.",
  },
  {
    title: "مهندسون، لا قوالب جاهزة",
    body: "فريقنا فاز بالمركز الأول في هاكاثون IEEE الأردن للنمذجة بالذكاء الاصطناعي، ونبني كل موقع بأنفسنا.",
  },
] as const;

const Steps = [
  { title: "أخبرنا عن عملك", body: "رسالة قصيرة تكفي، ونحن نسأل الأسئلة الصحيحة." },
  { title: "نتفق على السعر", body: "قبل أن يبدأ أي عمل، لتعرف بالضبط ما ستحصل عليه." },
  { title: "نبني ونطلق", body: "ترى العمل أثناء بنائه، لا في يوم التسليم فقط." },
  { title: "نبقى معك", body: "مع باقة النمو، نتابع موقعك ونحدّثه كل شهر." },
] as const;

function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="max-w-[54ch]">
      <p className="text-[0.85rem] font-bold text-accent">{eyebrow}</p>
      <h2 className="font-display mt-3 text-[clamp(1.3rem,3.2vw,2rem)] leading-snug font-bold text-balance">
        {title}
      </h2>
      {lede ? <p className="mt-3 text-pretty text-ink-muted">{lede}</p> : null}
    </div>
  );
}

export default function ArabicHomePage() {
  return (
    <main id="top" lang="ar" dir="rtl">
      {/* ── 01 · Hero ── same field and lockup as the English page; the
          wordmark stays Latin because it is the brand, not a translation. */}
      <section className="relative flex min-h-[78svh] items-center justify-center overflow-hidden border-b border-line py-24">
        <NeuralField className="absolute inset-0 h-full w-full" />

        <div className="animate-boot relative z-10 px-6 text-center">
          <h1>
            <span dir="ltr" className="block">
              <Logo pulse className="text-[clamp(2rem,9vw,4.8rem)]" />
            </span>
            <span className="font-display mx-auto mt-8 block max-w-[20ch] text-[clamp(1.3rem,3.4vw,2.1rem)] leading-snug font-bold text-balance text-ink">
              حضور رقمي يجلب لعملك زبائن حقيقيين
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[46ch] text-[clamp(1rem,2vw,1.15rem)] text-pretty text-ink-muted">
            مواقع إلكترونية، تسويق على السوشال ميديا، ومساعدات ذكية على واتساب، من فريق مهندسين في
            عمّان.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="#packages"
              className={cn(buttonVariants({ size: "lg" }), CTA_BASE, CTA_PRIMARY)}
            >
              اطّلع على الباقات
            </Link>
            <Link
              href="#contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                CTA_BASE,
                CTA_GHOST,
              )}
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>

      {/* ── 02 · Why us ── */}
      <section id="why" className="scroll-mt-24 py-20">
        <Container width="wide">
          <SectionHead eyebrow="لماذا فراكسال" title="فريق محلي بخبرة هندسية حقيقية" />

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {Reasons.map((reason) => (
              <li
                key={reason.title}
                className="border border-line bg-[rgba(232,41,74,0.02)] p-8 transition-colors duration-300 hover:border-line-strong hover:bg-[rgba(232,41,74,0.05)]"
              >
                <h3 className="font-display text-[1rem] font-bold text-accent">{reason.title}</h3>
                <p className="mt-3 text-[0.95rem] text-pretty text-ink-muted">{reason.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── 03 · Packages ── */}
      <section
        id="packages"
        className="scroll-mt-24 border-y border-line bg-[rgba(232,41,74,0.02)] py-20"
      >
        <Container width="wide">
          <SectionHead
            eyebrow="الباقات"
            title="ثلاث طرق للبدء"
            lede="أسعار تبدأ من هنا للأعمال المحلية. المشاريع الأكبر أو الخاصة نسعّرها بعد محادثة أولى مجانية."
          />
          <PackageCards lang="ar" />
        </Container>
      </section>

      {/* ── 04 · Client work ── the same project that leads the English page. */}
      <section id="work" className="scroll-mt-24 pt-20">
        <Container width="wide">
          <SectionHead eyebrow="من أعمالنا" title="عيادة قاع الحوض في عمّان" />

          <div className="mt-10 max-w-[62ch] border-s-2 border-accent ps-6">
            <p className="text-[1rem] text-pretty text-ink-muted">
              موقع بالعربية والإنجليزية لعيادة خاصة في عمّان، بديلاً عن موقعها القديم على Wix. يحجز
              المريض موعده مباشرة عبر واتساب، دون تخزين أي بيانات للمرضى ودون أي تتبع، بما يتوافق مع
              قانون حماية البيانات الشخصية الأردني.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 05 · How we work ── */}
      <section id="how" className="scroll-mt-24 py-20">
        <Container width="wide">
          <SectionHead eyebrow="كيف نعمل" title="من أول رسالة إلى موقع يعمل" />

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-accent pt-5">
                <span className="font-mono text-[0.75rem] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-2 text-[1rem] font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-pretty text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── 06 · Contact ── WhatsApp first: it is how people here reach a business. */}
      <section id="contact" className="scroll-mt-24 pb-24">
        <Container width="wide">
          <div className="border border-line-strong bg-[rgba(232,41,74,0.02)] px-6 py-20 text-center">
            <h2 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] font-black text-accent">
              جاهز لتبدأ؟
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-ink-muted">
              اكتب لنا بالعربية أو بالإنجليزية عن عملك وما تحتاجه، ونرد عليك بأنفسنا.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-5">
              <a
                href={whatsappHref("مرحباً فراكسال، أريد أن أسأل عن موقع لعملي.")}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ size: "lg" }), CTA_BASE, CTA_PRIMARY)}
              >
                راسلنا على واتساب
              </a>
              <a
                href={`mailto:${Site.email}`}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  CTA_BASE,
                  CTA_GHOST,
                )}
              >
                راسلنا على البريد
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-subtle">
              <span dir="ltr">{Site.whatsappDisplay}</span>
              <span aria-hidden="true"> · </span>
              <span dir="ltr">{Site.email}</span>
            </p>
            <p className="mt-2 text-sm text-ink-subtle">
              أو استخدم{" "}
              <Link href="/start" className="text-accent hover:underline">
                نموذج المشروع
              </Link>
              ، وهو بالإنجليزية حالياً ويمكنك الكتابة فيه بالعربية.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
