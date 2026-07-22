import Image from "next/image";
import Link from "next/link";
import Section, { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
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
 * Variant C — "Gallery Mosaic" (bold).
 * Leans into the Gallery palette: a tiled hero mixing type and
 * photography, then occasions, steps, and FAQ as card grids. The
 * closing CTA is a dark tile completing the FAQ grid.
 */
export default function PjGalleryMosaic() {
  return (
    <>
      {/* mosaic hero */}
      <Section className="pt-8 pb-0 md:pt-10">
        <Container wide>
          <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-12">
            {/* type tile */}
            <StaggerItem className="col-span-2 md:col-span-7">
              <div className="flex h-full flex-col justify-between rounded-[2rem] bg-cream-dark p-8 md:p-12">
                <p className="eyebrow">{HERO.eyebrow}</p>
                <div className="py-10 md:py-14">
                  <h1 className="font-serif text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[1.05] font-medium">
                    <Headline text={HERO.headline} />
                  </h1>
                  <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                    {HERO.sub}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button href={CTAS.event.href}>{CTAS.event.label}</Button>
                  <Button href={CTAS.fitting.href} variant="outline">
                    {CTAS.fitting.label}
                  </Button>
                </div>
              </div>
            </StaggerItem>
            {/* lead photo tile */}
            <StaggerItem className="col-span-2 md:col-span-5">
              <div className="relative h-64 overflow-hidden rounded-[2rem] md:h-full md:min-h-[26rem]">
                <Image
                  src={PHOTOS.event.src}
                  alt={PHOTOS.event.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
            {/* photo strip */}
            <StaggerItem className="col-span-1 md:col-span-4">
              <div className="relative h-48 overflow-hidden rounded-[2rem] md:h-72">
                <Image
                  src={PHOTOS.wrist.src}
                  alt={PHOTOS.wrist.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 45vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
            <StaggerItem className="col-span-1 md:col-span-3">
              <div className="relative h-48 overflow-hidden rounded-[2rem] md:h-72">
                <Image
                  src={PHOTOS.chains.src}
                  alt={PHOTOS.chains.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
            <StaggerItem className="col-span-2 md:col-span-5">
              <div className="relative h-48 overflow-hidden rounded-[2rem] md:h-72">
                <Image
                  src={PHOTOS.party.src}
                  alt={PHOTOS.party.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </Section>

      {/* what it is — quiet type interlude between tile groups */}
      <Section className="pb-0">
        <Container wide>
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-3">{WHAT.eyebrow}</p>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.9rem)] leading-[1.15] font-medium">
              <Headline text={WHAT.heading} />
            </h2>
            {WHAT.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* occasions cards */}
      <Section className="pb-0">
        <Container wide>
          <SectionHeading
            eyebrow={EVENTS.eyebrow}
            align="left"
            className="mb-8 md:mb-10"
          >
            <Headline text={EVENTS.heading} />
          </SectionHeading>
          <p className="-mt-4 mb-10 max-w-2xl leading-relaxed text-ink-soft md:-mt-6">
            {EVENTS.body}
          </p>
          <Stagger className="grid gap-3 md:grid-cols-4">
            {OCCASIONS.map(({ icon: Icon, label, detail }) => (
              <StaggerItem key={label}>
                <div className="h-full rounded-[2rem] border border-ink/10 p-7">
                  <Icon size={26} className="text-mauve-deep" />
                  <h3 className="mt-5 font-serif text-lg">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8">
            <Button href={CTAS.event.href}>{CTAS.event.label}</Button>
          </div>
        </Container>
      </Section>

      {/* steps cards */}
      <Section className="pb-0">
        <Container wide>
          <SectionHeading eyebrow={STEPS_HEADING.eyebrow} align="left">
            <Headline text={STEPS_HEADING.heading} />
          </SectionHeading>
          <Stagger className="grid gap-3 md:grid-cols-3">
            {STEPS.map(({ n, title, detail }) => (
              <StaggerItem key={n}>
                <div className="h-full rounded-[2rem] bg-cream-dark p-8">
                  <span className="font-serif text-5xl font-medium text-ink/15">
                    {n}
                  </span>
                  <h3 className="mt-6 font-serif text-xl">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {detail}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* faq cards + dark closing tile */}
      <Section>
        <Container wide>
          <SectionHeading eyebrow={FAQ_HEADING.eyebrow} align="left">
            <Headline text={FAQ_HEADING.heading} />
          </SectionHeading>
          <div className="grid gap-3 md:grid-cols-2">
            {FAQ.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.05}>
                <div className="h-full rounded-[2rem] border border-ink/10 p-7">
                  <h3 className="font-serif text-lg leading-snug">
                    {f.question}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {f.answer}
                  </p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={FAQ.length * 0.05}>
              <div className="flex h-full flex-col items-start justify-between gap-6 rounded-[2rem] bg-ink p-7 text-cream">
                <div>
                  <h3 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] leading-snug font-medium [&_em]:font-normal [&_em]:italic">
                    <Headline text={CLOSING.heading} />
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
                    {CLOSING.sub}
                  </p>
                </div>
                <Link
                  href={CTAS.closing.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/50 px-7 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:border-cream"
                >
                  {CTAS.closing.label}
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
