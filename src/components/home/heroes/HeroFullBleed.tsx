"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

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
      {/* on desktop the frame is wider than the viewport with its left edge
          pinned, sliding the composition right so the headline sits on open
          satin; the section's overflow-hidden crops the excess */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[140%]">
        <Image
          src="/photos/hero-necklaces-wide.jpg"
          alt="Layered pink, magenta, and coral beaded necklaces with gold accents draped over a white dish on cream satin"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[60%_55%] md:object-[50%_55%]"
        />
      </div>
      {/* readability aids are localized so the photo keeps its saturation:
          a light wash over the left half only, plus a blurred cream glow
          directly behind the text block — desktop only; on phones the
          frosted card provides the readable surface */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-cream/45 to-transparent md:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 md:px-8 md:pb-0">
        <div
          aria-hidden
          className="absolute top-1/2 -left-24 hidden h-[120%] w-[42rem] -translate-y-1/2 rounded-full bg-cream/45 blur-3xl md:block"
        />
        <div className="relative rounded-[1.75rem] border border-white/50 bg-cream/80 px-6 pt-7 pb-6 text-center shadow-[0_18px_50px_-20px_rgba(51,54,58,0.35)] backdrop-blur-lg md:max-w-xl md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-20 md:text-left md:shadow-none md:backdrop-blur-none">
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
            One-of-a-kind beaded pieces, where the beauty is in the
            details.
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
