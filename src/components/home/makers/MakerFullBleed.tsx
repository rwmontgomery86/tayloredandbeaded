"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { HeartIcon } from "@/components/ui/icons";

/**
 * Maker variant C — "Full-Bleed Studio" (bold).
 * Bookends the full-bleed hero: an edge-to-edge behind-the-scenes
 * photograph with the story overlaid on the right, mirroring the
 * hero's composition so the homepage feels composed top to bottom.
 */
export default function MakerFullBleed() {
  return (
    <section className="relative flex min-h-[62vh] items-center overflow-hidden md:min-h-[72vh]">
      <Image
        src="/photos/studio-hands-wide.png"
        alt="Taylor stringing pastel beads at her linen-covered studio table"
        fill
        sizes="100vw"
        className="object-cover object-[20%_50%]"
      />
      {/* cream wash over the right negative space, mirroring the hero */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-l from-cream/80 via-cream/25 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="ml-auto max-w-xl py-20 text-center md:text-right">
          <Reveal>
            <p className="eyebrow flex items-center justify-center gap-2 md:justify-end">
              Meet the maker
              <HeartIcon size={13} filled className="text-mauve" />
            </p>
            <h2 className="mt-5 font-serif text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.08] font-medium">
              Turning setbacks into
              <br />
              something <em className="font-normal italic">beautiful.</em>
            </h2>
            <p className="mt-6 ml-auto max-w-md leading-relaxed text-ink-soft">
              Hi, I&rsquo;m Taylor. What started as a way to keep my hands busy
              after losing my job became my creative outlet, my therapy, and my
              passion&mdash;every piece hand-strung with a little piece of my
              story.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5 md:justify-end">
              <p className="font-serif text-2xl italic">Love, Taylor</p>
              <Button href="/about" variant="outline">
                Read My Story
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
