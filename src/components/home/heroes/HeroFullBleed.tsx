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
 *
 * On phones the negative space disappears, so the content block becomes
 * a frosted-glass card anchored to the bottom of the frame (the adopted
 * "Frosted Panel" variant from /lab/hero-mobile).
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
    <section className="relative flex min-h-[88svh] items-end overflow-hidden md:min-h-[82vh] md:items-center">
      <Image
        src="/photos/hero-beads-wide.png"
        alt="Colorful hand-strung beaded necklaces resting on warm linen"
        fill
        preload
        sizes="100vw"
        className="object-cover object-[68%_50%] md:object-[75%_50%]"
      />
      {/* soft cream wash keeps ink text readable over the linen — desktop
          only; on phones the frosted card provides the readable surface */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-cream/75 via-cream/25 to-transparent md:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 md:px-8 md:pb-0">
        <div className="rounded-[1.75rem] border border-white/50 bg-cream/80 px-6 pt-7 pb-6 text-center shadow-[0_18px_50px_-20px_rgba(51,54,58,0.35)] backdrop-blur-lg md:max-w-xl md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-20 md:text-left md:shadow-none md:backdrop-blur-none">
          <motion.p
            className="eyebrow text-[0.65rem] md:text-[0.75rem]"
            {...rise(0.05)}
          >
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-3 font-serif text-[2.15rem] leading-[1.06] font-medium md:mt-5 md:text-[clamp(2.8rem,6.5vw,5.2rem)] md:leading-[1.02]"
            {...rise(0.15)}
          >
            Jewelry that tells{" "}
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-ink-soft md:mx-0 md:mt-6 md:max-w-md md:text-[0.95rem]"
            {...rise(0.28)}
          >
            One-of-a-kind beaded pieces, hand-strung with love in small
            batches
            <span className="hidden md:inline">
              {" "}
              for life&rsquo;s little moments
            </span>
            .
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col items-center gap-4 md:mt-9 md:flex-row md:flex-wrap md:gap-5"
            {...rise(0.4)}
          >
            <Button
              href="/shop?category=new-arrivals"
              className="w-full md:w-auto"
            >
              Shop New Arrivals
            </Button>
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
