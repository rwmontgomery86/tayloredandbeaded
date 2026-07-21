"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

/**
 * Mobile variant B — "Frosted Panel".
 * The photograph stays immersive and edge-to-edge; every word lives on a
 * frosted-glass card anchored to the bottom of the frame. Keeps the
 * campaign energy while giving the type a guaranteed-readable surface.
 */
export default function HeroMobilePanel() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-full min-h-[640px] overflow-hidden">
      <Image
        src="/photos/hero-beads-wide.png"
        alt="Colorful hand-strung beaded necklaces resting on warm linen"
        fill
        loading="eager"
        sizes="390px"
        className="object-cover object-[68%_50%]"
      />

      <motion.div
        className="absolute inset-x-4 bottom-4 rounded-[1.75rem] border border-white/50 bg-cream/80 px-6 pt-7 pb-6 text-center shadow-[0_18px_50px_-20px_rgba(51,54,58,0.35)] backdrop-blur-lg"
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, delay: 0.15, ease: gentleEase },
            })}
      >
        <p className="eyebrow text-[0.65rem]">Handmade. Heartfelt. Timeless.</p>
        <h1 className="mt-3 font-serif text-[2.15rem] leading-[1.06] font-medium">
          Jewelry that tells{" "}
          <em className="font-normal italic">your story.</em>
        </h1>
        <p className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-ink-soft">
          One-of-a-kind beaded pieces, where the beauty is in the details.
        </p>
        <Button href="/shop?category=new-arrivals" className="mt-6 w-full">
          Shop New Arrivals
        </Button>
      </motion.div>
    </section>
  );
}
