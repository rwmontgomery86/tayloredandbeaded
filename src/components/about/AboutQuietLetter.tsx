"use client";

import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import FloralDecor from "@/components/ui/FloralDecor";
import { HeartIcon } from "@/components/ui/icons";
import { LETTER } from "./letter";
import AboutClosing from "./AboutClosing";

/**
 * About variant A — "Quiet Letter" (safe).
 * Calm interior page: modest heading, one strong sticky portrait,
 * the letter typeset alongside it. Contrast with the homepage as a feature.
 */
export default function AboutQuietLetter() {
  return (
    <>
      <Section className="overflow-hidden pt-12 md:pt-16">
        <FloralDecor className="-left-10 top-24 hidden w-44 text-sage/40 lg:block" />
        <Container>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <Reveal className="md:sticky md:top-32">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <Image
                    src="/photos/taylor.png"
                    alt="Taylor, founder of Taylored & Beaded"
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 85vw"
                    className="object-cover object-[50%_15%]"
                  />
                </div>
                <p className="mt-6 text-center font-serif text-xl italic text-ink-soft">
                  &ldquo;{LETTER.toast}&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow flex items-center gap-2">
                Meet the maker
                <HeartIcon size={13} filled className="text-mauve" />
              </p>
              <h1 className="mt-4 font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight">
                Hi, I&rsquo;m <em className="font-normal italic">Taylor</em>
              </h1>

              <div className="mt-7 max-w-prose space-y-5 leading-relaxed text-ink-soft">
                {LETTER.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                <p className="font-serif text-lg italic text-ink">
                  {LETTER.toast}
                </p>
                <p>{LETTER.thanks}</p>
                <p className="font-serif text-2xl italic text-ink">
                  {LETTER.signoff}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <AboutClosing />
    </>
  );
}
