"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";
import { HeartIcon } from "@/components/ui/icons";

/**
 * Mobile variant C — "Recrop".
 * Closest to the live hero: text stays on the image, but art-directed
 * properly for portrait. The beads settle into the lower half of the
 * frame and a porcelain scrim carries the type up top — the two never
 * fight for the same pixels.
 */
export default function HeroMobileRecrop() {
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
    <section className="relative h-full min-h-[640px] overflow-hidden">
      <Image
        src="/photos/hero-beads-wide.png"
        alt="Colorful hand-strung beaded necklaces resting on warm linen"
        fill
        loading="eager"
        sizes="390px"
        className="object-cover object-[50%_88%]"
      />
      {/* porcelain scrim holds the top half clear for type */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-cream via-cream/70 via-45% to-transparent to-75%"
      />

      <div className="relative px-6 pt-14 text-center">
        <motion.p className="eyebrow" {...rise(0.05)}>
          Handmade. Heartfelt. Timeless.
        </motion.p>
        <motion.h1
          className="mt-4 font-serif text-[2.7rem] leading-[1.04] font-medium"
          {...rise(0.15)}
        >
          Jewelry that tells{" "}
          <em className="font-normal italic">your story.</em>
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-[18rem] text-sm leading-relaxed text-ink-soft"
          {...rise(0.28)}
        >
          One-of-a-kind beaded pieces, hand-strung with love in small batches
          for life&rsquo;s little moments.
        </motion.p>
        <motion.div
          className="mt-7 flex flex-col items-center gap-4"
          {...rise(0.4)}
        >
          <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
          <p className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-ink-soft">
            <HeartIcon size={13} filled className="text-mauve" />
            Woman owned
          </p>
        </motion.div>
      </div>
    </section>
  );
}
