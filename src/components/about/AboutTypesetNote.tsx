"use client";

import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import FloralDecor from "@/components/ui/FloralDecor";
import { HeartIcon } from "@/components/ui/icons";
import { LETTER } from "./letter";
import AboutClosing from "./AboutClosing";

/**
 * About variant B — "Typeset Note" (medium).
 * The letter as a beautiful piece of stationery: one centered column,
 * an oversized serif salutation, a small round portrait like a wax
 * seal, and a single studio snapshot tucked mid-letter.
 */
export default function AboutTypesetNote() {
  return (
    <>
      <Section className="overflow-hidden pt-14 md:pt-20">
        <FloralDecor className="-left-12 top-40 hidden w-48 text-sage/35 lg:block" />
        <FloralDecor className="-right-12 bottom-24 hidden w-44 text-blush lg:block" flip />

        <Container className="max-w-2xl">
          <Reveal>
            <div className="text-center">
              <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full ring-1 ring-ink/15">
                <Image
                  src="/photos/taylor.png"
                  alt="Taylor, founder of Taylored & Beaded"
                  fill
                  priority
                  sizes="96px"
                  className="object-cover object-[50%_10%]"
                />
              </div>
              <p className="eyebrow mt-5">A note from Taylor</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-10 text-center font-serif text-[clamp(3rem,8vw,5.5rem)] font-medium italic leading-none">
              {LETTER.salutation}
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mx-auto mt-12 space-y-6 text-[1.02rem] leading-[1.85] text-ink-soft">
              {LETTER.paragraphs.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}

              <figure className="!my-10">
                <div className="relative mx-auto aspect-[16/10] max-w-lg overflow-hidden rounded-xl">
                  <Image
                    src="/photos/studio-hands-square.png"
                    alt="Pastel beads and a half-finished necklace on Taylor's worktable"
                    fill
                    sizes="(min-width: 640px) 512px, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="eyebrow mt-3 text-center text-[0.6rem]">
                  The bead table, most mornings
                </figcaption>
              </figure>

              {LETTER.paragraphs.slice(2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}

              <p className="pt-2 text-center font-serif text-2xl italic leading-snug text-ink">
                &ldquo;{LETTER.toast}&rdquo;
              </p>
              <p>{LETTER.thanks}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col items-center gap-3 border-t border-ink/10 pt-10 text-center">
              <p className="font-serif text-4xl italic">{LETTER.signoff}</p>
              <HeartIcon size={16} filled className="text-mauve" />
            </div>
          </Reveal>
        </Container>
      </Section>
      <AboutClosing />
    </>
  );
}
