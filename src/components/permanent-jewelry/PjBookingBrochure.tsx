import Image from "next/image";
import Link from "next/link";
import Section, { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/motion/Reveal";
import {
  Headline,
  CTAS,
  HERO,
  WHAT,
  EVENTS,
  OCCASIONS,
  STEPS,
  STEPS_HEADING,
  FAQ,
  FAQ_HEADING,
  CLOSING,
  PHOTOS,
} from "./content";

/**
 * "Booking Brochure" — the adopted /permanent-jewelry page layout
 * (winner of the /lab/permanent-jewelry comparison).
 * A service page built to convert: a sticky booking card keeps the
 * event inquiry in view while the story, steps, and FAQ scroll beside
 * it in a single editorial column.
 *
 * `faq` lets the real page pass CMS-managed items (category
 * "permanent-jewelry"); the lab renders the built-in copy.
 */
export default function PjBookingBrochure({
  faq,
}: {
  faq?: { id: string; question: string; answer: string }[];
}) {
  const faqItems = faq && faq.length > 0 ? faq : [...FAQ];
  return (
    <Section className="pt-12 md:pt-16">
      <Container>
        {/* type-led header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow">{HERO.eyebrow}</p>
            <h1 className="mt-4 font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] leading-[1.1] font-medium">
              <Headline text={HERO.headline} />
            </h1>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-soft">
              {HERO.sub}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[2fr_3fr] md:gap-16">
          {/* sticky booking card */}
          <div>
            <Reveal className="md:sticky md:top-24">
              <div className="overflow-hidden rounded-[2rem] border border-ink/10 bg-cream">
                <Image
                  src={PHOTOS.event.src}
                  alt={PHOTOS.event.alt}
                  width={PHOTOS.event.width}
                  height={PHOTOS.event.height}
                  sizes="(min-width: 768px) 38vw, 90vw"
                  priority
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-7 md:p-8">
                  <p className="eyebrow">{EVENTS.eyebrow}</p>
                  <h2 className="mt-2 font-serif text-2xl leading-snug">
                    <Headline text={EVENTS.heading} />
                  </h2>
                  <ul className="mt-6 space-y-3.5 text-sm text-ink-soft">
                    {OCCASIONS.map(({ icon: Icon, label, detail }) => (
                      <li key={label} className="flex items-start gap-3">
                        <Icon
                          size={17}
                          className="mt-0.5 shrink-0 text-mauve-deep"
                        />
                        <span>
                          <span className="text-ink">{label}</span> — {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={CTAS.event.href}
                    className="mt-7 w-full"
                  >
                    {CTAS.event.label}
                  </Button>
                  <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft">
                    Just want one for yourself?{" "}
                    <Link
                      href={CTAS.fitting.href}
                      className="link-underline text-ink"
                    >
                      Book a fitting
                    </Link>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* scrolling column */}
          <div className="space-y-16 md:space-y-24">
            {/* what it is */}
            <Reveal>
              <p className="eyebrow mb-3">{WHAT.eyebrow}</p>
              <h2 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-medium">
                <Headline text={WHAT.heading} />
              </h2>
              {WHAT.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="mt-5 leading-relaxed text-ink-soft"
                >
                  {p}
                </p>
              ))}
              <div className="mt-8 overflow-hidden rounded-[2rem]">
                <Image
                  src={PHOTOS.wrist.src}
                  alt={PHOTOS.wrist.alt}
                  width={PHOTOS.wrist.width}
                  height={PHOTOS.wrist.height}
                  sizes="(min-width: 768px) 55vw, 90vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>

            {/* steps */}
            <Reveal>
              <p className="eyebrow mb-3">{STEPS_HEADING.eyebrow}</p>
              <h2 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-medium">
                <Headline text={STEPS_HEADING.heading} />
              </h2>
              <ol className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {STEPS.map(({ n, title, detail }) => (
                  <li key={n} className="flex gap-6 py-6">
                    <span className="font-serif text-2xl text-mauve-deep">
                      {n}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* faq */}
            <Reveal>
              <p className="eyebrow mb-3">{FAQ_HEADING.eyebrow}</p>
              <h2 className="font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.15] font-medium">
                <Headline text={FAQ_HEADING.heading} />
              </h2>
              <div className="mt-8">
                <Accordion items={faqItems} />
              </div>
            </Reveal>

            {/* closing note */}
            <Reveal>
              <div className="rounded-[2rem] bg-cream-dark p-8 text-center md:p-10">
                <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-medium">
                  <Headline text={CLOSING.heading} />
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                  {CLOSING.sub}
                </p>
                <div className="mt-6">
                  <Button href={CTAS.closing.href} variant="outline">
                    {CTAS.closing.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
