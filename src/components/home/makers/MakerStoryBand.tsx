"use client";

import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";
import { HeartIcon } from "@/components/ui/icons";

const DEFAULT_TEASER =
  "What started as a way to relieve stress after unexpectedly losing my job became my creative outlet, my therapy, and my passion. Every piece is handmade with love, creativity, and a little piece of my story.";

/**
 * Maker variant A — "Story Band": the chosen homepage Meet-the-Maker
 * section. The paragraph stays editable via Sanity's aboutTeaser;
 * the pull-quote and signature are fixed brand prose.
 */
export default function MakerStoryBand({ teaser }: { teaser?: string }) {
  return (
    <Section bg="cream-dark" className="overflow-hidden">
      <FloralDecor className="right-[-3rem] top-1/2 hidden w-56 -translate-y-1/2 text-mauve/25 lg:block" flip />
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src="/photos/taylor.png"
                  alt="Taylor, the maker behind Taylored & Beaded"
                  fill
                  sizes="(min-width: 768px) 40vw, 85vw"
                  className="object-cover object-[50%_12%]"
                />
              </div>
              <div className="absolute -bottom-5 right-2 flex h-24 w-24 items-center justify-center rounded-full border border-ink/15 bg-cream text-center md:h-28 md:w-28">
                <p className="text-[0.55rem] leading-[1.7] tracking-[0.22em] uppercase">
                  Made
                  <br />
                  with
                  <br />
                  love
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow flex items-center gap-2">
              Meet the maker
              <HeartIcon size={13} filled className="text-mauve" />
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight">
              Hi, I&rsquo;m <em className="font-normal italic">Taylor</em>
            </h2>
            <p className="mt-5 font-serif text-xl italic leading-snug text-ink md:text-2xl">
              &ldquo;Sometimes new beginnings come from the most unexpected
              circumstances.&rdquo;
            </p>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
              {teaser ?? DEFAULT_TEASER}
            </p>
            <p className="mt-5 font-serif text-2xl italic">Love, Taylor</p>
            <div className="mt-7">
              <Button href="/about" variant="outline">
                Read My Story
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
