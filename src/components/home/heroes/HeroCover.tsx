"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";
import { CLOSEUP } from "./HeroSplit";

/**
 * Option 2 — "Cover".
 * The photograph fills the whole viewport, cropped so the strands and
 * Taylor's eye share the frame. The headline sits on a solid white
 * plaque pinned to the lower-left corner, the way a magazine cover
 * carries its cover line. Bold, immersive, the beads at full scale.
 */
export default function HeroCover() {
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
    <section className="relative flex min-h-[80svh] items-end overflow-hidden md:min-h-[86vh]">
      <Image
        src={CLOSEUP.src}
        alt={CLOSEUP.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-[60%_38%] md:object-[50%_42%]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 md:px-8 md:pb-10">
        <motion.div
          className="bg-cream px-6 pt-7 pb-6 md:max-w-[34rem] md:px-10 md:pt-10 md:pb-9"
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.9, ease: gentleEase },
              })}
        >
          <motion.p className="eyebrow" {...rise(0.2)}>
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-3 font-serif text-[2.15rem] leading-[1.06] font-medium md:mt-4 md:text-[clamp(2.6rem,4.6vw,4.1rem)] md:leading-[1.02]"
            {...rise(0.3)}
          >
            Jewelry that tells{" "}
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.p
            className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft md:mt-5 md:text-[0.95rem]"
            {...rise(0.42)}
          >
            Beaded pieces made just for you, where the beauty is in the
            details.
          </motion.p>
          <motion.div className="mt-6 md:mt-8" {...rise(0.54)}>
            <Button
              href="/shop?category=new-arrivals"
              className="w-full md:w-auto"
            >
              Shop New Arrivals
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
