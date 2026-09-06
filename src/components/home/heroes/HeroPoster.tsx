"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";
import { CLOSEUP } from "./HeroSplit";

/**
 * Option 3 — "Poster".
 * Type leads: the headline runs the full width of the page in oversized
 * Bodoni, and the photograph hangs beneath it as a tall portrait panel
 * on the right, tucked under the second line so the two overlap. White
 * space does the work; a single hairline rule anchors the composition.
 */
export default function HeroPoster() {
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
    <section className="overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-14 md:px-8 md:pt-14 md:pb-20">
        <motion.p className="eyebrow" {...rise(0.05)}>
          Handmade. Heartfelt. Timeless.
        </motion.p>
        <motion.h1
          className="relative z-10 mt-4 font-serif text-[2.6rem] leading-[1.0] font-medium md:mt-5 md:text-[clamp(3.4rem,7.6vw,5.4rem)] md:leading-[0.94]"
          {...rise(0.15)}
        >
          Jewelry that tells
          <br className="hidden md:inline" />{" "}
          <em className="font-normal italic">your story.</em>
        </motion.h1>

        <div className="mt-8 grid gap-8 md:-mt-8 md:grid-cols-[1fr_minmax(18rem,38%)] md:items-start md:gap-16">
          <div className="md:pt-20">
            <motion.p
              className="max-w-sm leading-relaxed text-ink-soft md:text-[1.02rem]"
              {...rise(0.28)}
            >
              Beaded pieces made just for you, where the beauty is in the
              details. Every strand hand-strung by Taylor, one at a time.
            </motion.p>
            <motion.div className="mt-8" {...rise(0.4)}>
              <Button href="/shop?category=new-arrivals">
                Shop New Arrivals
              </Button>
            </motion.div>
            <motion.div
              className="mt-14 hidden h-px w-24 bg-ink/20 md:block"
              {...rise(0.5)}
            />
          </div>

          <motion.div
            className="relative aspect-[4/5] md:max-h-[58vh] md:w-full"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1, delay: 0.25, ease: gentleEase },
                })}
          >
            <Image
              src={CLOSEUP.src}
              alt={CLOSEUP.alt}
              fill
              preload
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover object-[65%_35%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
