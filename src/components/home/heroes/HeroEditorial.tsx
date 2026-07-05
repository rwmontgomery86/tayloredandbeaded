"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

/**
 * Variant B — "Editorial Split" (medium departure).
 * Left-aligned magazine composition: hairline-framed grid, oversized
 * headline, and two clean rectangles — the maker and the pieces —
 * hung at staggered heights like a gallery wall.
 */
export default function HeroEditorial() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: gentleEase },
        };

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-20 md:px-8 md:pt-14 md:pb-24">
        <motion.div
          className="flex items-baseline justify-between border-b border-ink/15 pb-4"
          {...rise(0)}
        >
          <p className="eyebrow">Handmade. Heartfelt. Timeless.</p>
          <p className="eyebrow hidden sm:block">One-of-a-kind, hand-strung</p>
        </motion.div>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="flex flex-col justify-between">
            <motion.h1
              className="font-serif text-[clamp(2.6rem,5.6vw,4.6rem)] leading-[1.04] font-medium"
              {...rise(0.08)}
            >
              Jewelry that
              <br />
              tells <em className="font-normal italic">your story.</em>
            </motion.h1>

            <motion.div className="mt-10 md:mt-0" {...rise(0.2)}>
              <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
                Colorful, meaningful pieces made to celebrate life&rsquo;s
                little moments and stand out in the best way. Every piece is
                hand-strung by Taylor in small batches.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
                <Button href="/about" variant="ghost" className="px-0">
                  Meet the maker
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <motion.figure {...rise(0.14)}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/photos/taylor.png"
                  alt="Taylor, the maker behind Taylored & Beaded"
                  fill
                  priority
                  sizes="(min-width: 768px) 24vw, 46vw"
                  className="object-cover object-[50%_10%]"
                />
              </div>
              <figcaption className="eyebrow mt-3 text-[0.6rem]">
                01 — The maker
              </figcaption>
            </motion.figure>

            <motion.figure className="mt-12" {...rise(0.26)}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/products/necklace-warm-tones.png"
                  alt="Hand-strung beaded necklaces in warm sunset tones"
                  fill
                  sizes="(min-width: 768px) 24vw, 46vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-3 text-[0.6rem]">
                02 — The pieces
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
