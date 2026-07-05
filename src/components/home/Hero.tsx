"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";
import FloatDecor from "@/components/motion/FloatDecor";
import { gentleEase } from "@/components/motion/ease";
import { HeartIcon, SparkleIcon } from "@/components/ui/icons";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: gentleEase },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce ? {} : rise(delay);

  return (
    <section className="relative overflow-hidden">
      <FloatDecor className="absolute -left-10 top-8 hidden w-44 text-sage/50 lg:block" duration={8}>
        <FloralDecor className="h-full w-full" />
      </FloatDecor>
      <FloatDecor className="absolute -right-12 bottom-4 hidden w-40 text-blush lg:block" duration={9}>
        <FloralDecor className="h-full w-full" flip />
      </FloatDecor>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 md:grid-cols-[1fr_1.05fr] md:gap-8 md:px-8 md:pt-16 md:pb-24">
        <div className="relative text-center md:text-left">
          <motion.p className="eyebrow" {...anim(0)}>
            Handmade. Heartfelt. Timeless.
          </motion.p>
          <motion.h1
            className="mt-5 font-serif text-[clamp(2.3rem,4.6vw,3.9rem)] leading-[1.08] font-medium"
            {...anim(0.08)}
          >
            Jewelry that tells
            <br />
            <em className="font-normal italic">your story.</em>
          </motion.h1>
          <motion.div
            className="mt-6 flex justify-center md:justify-start"
            {...anim(0.16)}
          >
            <HeartIcon size={18} filled className="text-mauve" />
          </motion.div>
          <motion.p
            className="mx-auto mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft md:mx-0"
            {...anim(0.24)}
          >
            Colorful, meaningful pieces made to celebrate life&rsquo;s little
            moments and stand out in the best way.
          </motion.p>
          <motion.div className="mt-9" {...anim(0.32)}>
            <Button href="/shop?category=new-arrivals">Shop New Arrivals</Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md md:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: gentleEase }}
        >
          <div className="relative aspect-[6/5] overflow-hidden [border-radius:46%_54%_52%_48%/58%_52%_48%_42%]">
            <Image
              src="/photos/taylor.png"
              alt="Taylor, the maker behind Taylored & Beaded, smiling in a floral dress"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 90vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
          <SparkleIcon
            size={26}
            className="absolute -top-2 right-6 text-mauve-deep/70"
          />
        </motion.div>
      </div>
    </section>
  );
}
