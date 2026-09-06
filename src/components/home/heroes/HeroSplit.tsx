"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

export const CLOSEUP = {
  src: "/photos/taylor-beads-closeup.jpg",
  alt: "Taylor holding strands of colorful beaded necklaces beside her face",
};

/**
 * Option 1 — "Editorial Split".
 * A calm 50/50: type on a white field, the close-up photograph running
 * edge-to-edge on the right at full height. Reads like a magazine opener;
 * the portrait keeps its natural proportions so nothing is cropped away.
 */
export default function HeroSplit() {
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
    <section className="grid md:min-h-[82vh] md:grid-cols-2">
      <div className="relative aspect-[4/3] md:order-2 md:aspect-auto">
        <Image
          src={CLOSEUP.src}
          alt={CLOSEUP.alt}
          fill
          preload
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[70%_40%]"
        />
      </div>

      <div className="flex items-center px-5 py-12 md:order-1 md:px-12 md:py-20 lg:px-20">
        <div className="max-w-xl">
          <motion.p className="eyebrow" {...rise(0.05)}>
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-4 font-serif text-[2.4rem] leading-[1.04] font-medium md:mt-6 md:text-[clamp(3rem,5.4vw,4.9rem)] md:leading-[1.0]"
            {...rise(0.15)}
          >
            Jewelry that tells{" "}
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md leading-relaxed text-ink-soft md:mt-7 md:text-[1.02rem]"
            {...rise(0.28)}
          >
            Beaded pieces made just for you, where the beauty is in the
            details.
          </motion.p>
          <motion.div className="mt-8 md:mt-10" {...rise(0.4)}>
            <Button href="/shop?category=new-arrivals">
              Shop New Arrivals
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
