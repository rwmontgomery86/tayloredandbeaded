"use client";

import Image from "next/image";
import Link from "next/link";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Maker variant B — "Pull-Quote Editorial" (medium departure).
 * Typography carries the story: a huge Bodoni quote between hairline
 * rules, then two captioned squares and the invitation to read more.
 */
export default function MakerPullQuote() {
  return (
    <Section className="overflow-hidden">
      <Container>
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
            <p className="eyebrow">Meet the maker</p>
            <p className="eyebrow hidden sm:block">The story behind the beads</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="py-12 md:py-16">
            <p className="font-serif text-[clamp(1.9rem,4.6vw,3.8rem)] leading-[1.12] font-medium">
              &ldquo;Here&rsquo;s to turning setbacks into something{" "}
              <em className="font-normal italic">beautiful.</em>&rdquo;
            </p>
            <cite className="mt-6 block font-serif text-xl not-italic text-ink-soft">
              <span className="italic">&mdash; Taylor</span>, founder &amp; maker
            </cite>
          </blockquote>
        </Reveal>

        <Stagger className="grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-[1fr_1fr_1.3fr] md:gap-8">
          <StaggerItem>
            <figure>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/photos/taylor.png"
                  alt="Taylor, founder of Taylored & Beaded"
                  fill
                  sizes="(min-width: 768px) 26vw, 90vw"
                  className="object-cover object-[50%_10%]"
                />
              </div>
              <figcaption className="eyebrow mt-3 text-[0.6rem]">
                01 — The maker
              </figcaption>
            </figure>
          </StaggerItem>

          <StaggerItem>
            <figure>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/photos/studio-hands-square.png"
                  alt="Hands sorting pastel beads at the studio table"
                  fill
                  sizes="(min-width: 768px) 26vw, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-3 text-[0.6rem]">
                02 — The practice
              </figcaption>
            </figure>
          </StaggerItem>

          <StaggerItem className="flex flex-col justify-center">
            <p className="max-w-md leading-relaxed text-ink-soft">
              After unexpectedly losing her job, Taylor traded spreadsheets for
              bead trays. What began as therapy became a calling: one-of-a-kind
              pieces, hand-strung in small batches, each carrying a little
              piece of her story.
            </p>
            <Link
              href="/about"
              className="link-underline mt-6 inline-flex w-fit items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase"
            >
              More about Taylor
              <ArrowRightIcon size={12} />
            </Link>
          </StaggerItem>
        </Stagger>
      </Container>
    </Section>
  );
}
