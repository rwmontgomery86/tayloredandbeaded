"use client";

import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import { HeartIcon } from "@/components/ui/icons";
import { LETTER } from "./letter";
import AboutClosing from "./AboutClosing";

/**
 * About variant C — "Studio Editorial" (bold).
 * Magazine-profile treatment: a full-bleed studio opener echoing the
 * homepage hero, then the letter interleaved with photography —
 * portrait, bead table, finished pieces — closing on the toast as a
 * full-width pull-quote band.
 */
export default function AboutStudioEditorial() {
  return (
    <>
      {/* full-bleed opener */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden md:min-h-[68vh]">
        <Image
          src="/photos/studio-hands-wide.png"
          alt="Taylor stringing pastel beads at her linen-covered studio table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_45%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-cream via-cream/25 to-transparent"
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-10 md:px-8 md:pb-14">
          <Reveal>
            <p className="eyebrow">About Taylored &amp; Beaded</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.05] font-medium">
              Turning setbacks into something{" "}
              <em className="font-normal italic">beautiful.</em>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* letter, interleaved with imagery */}
      <Section className="pt-14 md:pt-20">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-16">
            <Reveal>
              <p className="font-serif text-2xl italic leading-snug md:text-3xl">
                {LETTER.salutation}
              </p>
              <div className="mt-6 max-w-prose space-y-5 leading-relaxed text-ink-soft">
                <p>{LETTER.paragraphs[0]}</p>
                <p>{LETTER.paragraphs[1]}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image
                    src="/photos/taylor.png"
                    alt="Taylor, founder of Taylored & Beaded"
                    fill
                    sizes="(min-width: 768px) 38vw, 85vw"
                    className="object-cover object-[50%_12%]"
                  />
                </div>
                <figcaption className="eyebrow mt-3 text-[0.6rem]">
                  Taylor — founder &amp; maker
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-[1fr_1.15fr] md:gap-16">
            <Reveal className="order-2 md:order-1">
              <figure>
                <div className="relative aspect-square overflow-hidden rounded-[2rem]">
                  <Image
                    src="/photos/studio-hands-square.png"
                    alt="Pastel beads sorted into ceramic trays beside a half-finished necklace"
                    fill
                    sizes="(min-width: 768px) 38vw, 85vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-3 text-[0.6rem]">
                  The bead table
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.1} className="order-1 md:order-2">
              <div className="max-w-prose space-y-5 leading-relaxed text-ink-soft">
                <p>{LETTER.paragraphs[2]}</p>
                <p>{LETTER.paragraphs[3]}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* the toast as a full-width pull-quote band */}
      <Section bg="cream-dark" className="py-16 md:py-24">
        <Container className="max-w-4xl text-center">
          <Reveal>
            <p className="font-serif text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.15] font-medium">
              &ldquo;Here&rsquo;s to turning setbacks into something{" "}
              <em className="font-normal italic">beautiful.</em>&rdquo;
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* thanks + signoff */}
      <Section className="py-16 md:py-20">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <p className="leading-relaxed text-ink-soft">{LETTER.thanks}</p>
            <p className="mt-6 font-serif text-3xl italic">{LETTER.signoff}</p>
            <div className="mt-4 flex justify-center">
              <HeartIcon size={16} filled className="text-mauve" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <AboutClosing />
    </>
  );
}
