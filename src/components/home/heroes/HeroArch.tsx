"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";
import FloatDecor from "@/components/motion/FloatDecor";
import { gentleEase } from "@/components/motion/ease";
import { HeartIcon, SparkleIcon } from "@/components/ui/icons";

/**
 * Variant A — "Boutique Arch" (safe evolution).
 * Same split composition as the launch hero, but the photo sits in a
 * boutique-window arch with an offset outline arch echoing it.
 */
export default function HeroArch() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: gentleEase },
        };

  return (
    <section className="relative overflow-hidden">
      <FloatDecor className="absolute -left-10 top-8 hidden w-44 text-sage/50 lg:block" duration={8}>
        <FloralDecor className="h-full w-full" />
      </FloatDecor>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-8 md:pt-16 md:pb-24">
        <div className="relative text-center md:text-left">
          <motion.p className="eyebrow" {...rise(0)}>
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-[clamp(2.3rem,4.6vw,3.9rem)] leading-[1.08] font-medium"
            {...rise(0.08)}
          >
            Jewelry that tells
            <br />
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.div className="mt-6 flex justify-center md:justify-start" {...rise(0.16)}>
            <HeartIcon size={18} filled className="text-mauve" />
          </motion.div>
          <motion.p
            className="mx-auto mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft md:mx-0"
            {...rise(0.24)}
          >
            Colorful, meaningful pieces made to celebrate life&rsquo;s little
            moments and stand out in the best way.
          </motion.p>
          <motion.div className="mt-9" {...rise(0.32)}>
            <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-sm md:max-w-md"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: gentleEase }}
        >
          {/* offset outline arch echo */}
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-4 translate-y-4 rounded-b-[2rem] rounded-t-[999px] border border-mauve/40"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px]">
            <Image
              src="/photos/taylor.png"
              alt="Taylor, the maker behind Taylored & Beaded"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 88vw"
              className="object-cover object-[50%_12%]"
            />
          </div>
          <SparkleIcon size={26} className="absolute -top-3 -right-2 text-mauve-deep/70" />
        </motion.div>
      </div>
    </section>
  );
}
