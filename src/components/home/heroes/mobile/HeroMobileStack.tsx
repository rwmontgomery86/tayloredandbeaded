"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

/**
 * Mobile variant A — "Porcelain Stack".
 * Type and photograph never overlap: the headline owns a clean porcelain
 * panel up top and the campaign photo gets its own full-width moment
 * below. Typographic-first — the subhead moves below the fold.
 */
export default function HeroMobileStack() {
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
    <section className="flex h-full min-h-[640px] flex-col bg-cream">
      <div className="px-6 pt-14 pb-10">
        <motion.p className="eyebrow" {...rise(0.05)}>
          Handmade. Heartfelt. Timeless.
        </motion.p>
        <motion.h1
          className="mt-4 font-serif text-[3.3rem] leading-[1.02] font-medium"
          {...rise(0.15)}
        >
          Jewelry that tells{" "}
          <em className="font-normal italic">your story.</em>
        </motion.h1>
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4"
          {...rise(0.3)}
        >
          <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
        </motion.div>
      </div>

      <motion.div
        className="relative flex-1 overflow-hidden"
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 0.25, ease: gentleEase },
            })}
      >
        <Image
          src="/photos/hero-beads-wide.png"
          alt="Colorful hand-strung beaded necklaces resting on warm linen"
          fill
          loading="eager"
          sizes="390px"
          className="object-cover object-[62%_50%]"
        />
      </motion.div>
    </section>
  );
}
