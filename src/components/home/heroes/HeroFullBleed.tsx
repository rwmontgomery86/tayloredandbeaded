"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";
import { HeartIcon } from "@/components/ui/icons";

/**
 * Variant C — "Full-Bleed" (bold).
 * Edge-to-edge campaign photograph of the jewelry with the headline
 * set directly on the image's negative space. Immersive, magazine-cover
 * energy; the product is the hero.
 */
export default function HeroFullBleed() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: gentleEase },
        };

  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden md:min-h-[82vh]">
      <Image
        src="/photos/hero-beads-wide.png"
        alt="Colorful hand-strung beaded necklaces resting on warm linen"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[75%_50%]"
      />
      {/* soft cream wash keeps ink text readable over the linen */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-cream/75 via-cream/25 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="max-w-xl py-20 text-center md:text-left">
          <motion.p className="eyebrow" {...rise(0.05)}>
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-[clamp(2.8rem,6.5vw,5.2rem)] leading-[1.02] font-medium"
            {...rise(0.15)}
          >
            Jewelry that tells{" "}
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-soft md:mx-0"
            {...rise(0.28)}
          >
            One-of-a-kind beaded pieces, hand-strung with love in small
            batches for life&rsquo;s little moments.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-5 md:justify-start"
            {...rise(0.4)}
          >
            <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
            <p className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-ink-soft">
              <HeartIcon size={13} filled className="text-mauve" />
              Woman owned
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
