import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
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
 * Variant A — "Editorial Bands" (safe).
 * The site's classic long scroll: full-bleed event hero with the
 * headline on the photo's negative space, then alternating photo/text
 * bands, an icon step row, FAQ accordion, and a soft closing band.
 */
export default function PjEditorialBands() {
  return (
    <>
      {/* full-bleed event hero */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden md:min-h-[74vh]">
        <Image
          src={PHOTOS.event.src}
          alt={PHOTOS.event.alt}
          fill
          sizes="100vw"
          className="object-cover object-[70%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/60 to-cream/10"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="max-w-xl py-16 md:py-20">
            <Reveal>
              <p className="eyebrow">{HERO.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-4 font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05] font-medium">
                <Headline text={HERO.headline} />
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                {HERO.sub}
              </p>
            </Reveal>
            <Reveal delay={0.34} className="mt-8 flex flex-wrap gap-4">
              <Button href={CTAS.event.href}>{CTAS.event.label}</Button>
              <Button href={CTAS.fitting.href} variant="outline">
                {CTAS.fitting.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what it is */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src={PHOTOS.wrist.src}
                  alt={PHOTOS.wrist.alt}
                  width={PHOTOS.wrist.width}
                  height={PHOTOS.wrist.height}
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-3">{WHAT.eyebrow}</p>
              <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.15] font-medium">
                <Headline text={WHAT.heading} />
              </h2>
              {WHAT.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              <div className="mt-8">
                <Button href={CTAS.fitting.href} variant="outline">
                  {CTAS.fitting.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* events pitch */}
      <Section bg="cream-dark">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal className="md:order-2">
              <div className="overflow-hidden rounded-[2rem]">
                <Image
                  src={PHOTOS.party.src}
                  alt={PHOTOS.party.alt}
                  width={PHOTOS.party.width}
                  height={PHOTOS.party.height}
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:order-1">
              <p className="eyebrow mb-3">{EVENTS.eyebrow}</p>
              <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.15] font-medium">
                <Headline text={EVENTS.heading} />
              </h2>
              <p className="mt-5 leading-relaxed text-ink-soft">{EVENTS.body}</p>
              <ul className="mt-8 space-y-4 text-sm text-ink-soft">
                {OCCASIONS.map(({ icon: Icon, label, detail }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 shrink-0 text-mauve-deep" />
                    <span>
                      <span className="text-ink">{label}</span> — {detail}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href={CTAS.event.href}>{CTAS.event.label}</Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* how it works */}
      <Section>
        <Container>
          <SectionHeading eyebrow={STEPS_HEADING.eyebrow}>
            <Headline text={STEPS_HEADING.heading} />
          </SectionHeading>
          <Stagger className="grid gap-12 md:grid-cols-3 md:gap-10">
            {STEPS.map(({ n, icon: Icon, title, detail }) => (
              <StaggerItem key={n} className="text-center">
                <Icon size={30} className="mx-auto text-mauve-deep" />
                <p className="eyebrow mt-5">{n}</p>
                <h3 className="mt-2 font-serif text-xl">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* faq */}
      <Section bg="cream-dark">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={FAQ_HEADING.eyebrow}>
            <Headline text={FAQ_HEADING.heading} />
          </SectionHeading>
          <Reveal>
            <Accordion items={[...FAQ]} />
          </Reveal>
        </Container>
      </Section>

      {/* closing */}
      <Section bg="blush" className="py-16 md:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] font-medium">
              <Headline text={CLOSING.heading} />
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-soft">
              {CLOSING.sub}
            </p>
            <div className="mt-8">
              <Button href={CTAS.closing.href}>{CTAS.closing.label}</Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
