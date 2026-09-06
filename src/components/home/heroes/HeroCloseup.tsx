"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { gentleEase } from "@/components/motion/ease";

const PHOTO = {
  src: "/photos/taylor-beads-closeup.jpg",
  alt: "Taylor holding strands of colorful beaded necklaces beside her face",
};

/**
 * Homepage hero (chosen Sept 2026).
 * Desktop: "Cover" — the close-up fills the viewport, cropped so the
 * strands and Taylor's eye share the frame, with the headline on a solid
 * white plaque pinned to the lower-left like a magazine cover line.
 * Phones: "Editorial Split" — the photo sits above the type on a white
 * field, so the headline is readable without any overlay.
 */
export default function HeroCloseup() {
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
    <section className="relative md:flex md:min-h-[86vh] md:items-end md:overflow-hidden">
      <div className="relative aspect-[4/3] md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={PHOTO.src}
          alt={PHOTO.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[70%_40%] md:object-[50%_42%]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-10 pb-12 md:px-8 md:pt-0 md:pb-10">
        <motion.div
          className="max-w-xl md:max-w-[34rem] md:bg-cream md:px-10 md:pt-10 md:pb-9"
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
            className="mt-4 font-serif text-[2.4rem] leading-[1.04] font-medium md:text-[clamp(2.6rem,4.6vw,4.1rem)] md:leading-[1.02]"
            {...rise(0.3)}
          >
            Jewelry that tells{" "}
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md leading-relaxed text-ink-soft md:max-w-sm md:text-[0.95rem]"
            {...rise(0.42)}
          >
            Beaded pieces made just for you, where the beauty is in the
            details.
          </motion.p>
          <motion.div className="mt-8" {...rise(0.54)}>
            <Button href="/shop?category=new-arrivals">
              Shop New Arrivals
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
