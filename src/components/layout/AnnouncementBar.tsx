"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeartIcon, SparkleIcon } from "@/components/ui/icons";

const DEFAULT_MESSAGES = [
  "Handmade with love",
  "Free shipping on orders $75+",
  "Woman owned",
];

/**
 * Desktop: all messages inline. Mobile: gentle crossfade rotation,
 * starting at index 0 post-mount so server and client HTML match.
 */
export default function AnnouncementBar({
  messages = DEFAULT_MESSAGES,
}: {
  messages?: string[];
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || messages.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4500);
    return () => clearInterval(id);
  }, [messages.length, reduce]);

  return (
    <div className="bg-cream-dark text-ink">
      <div className="mx-auto hidden max-w-6xl items-center justify-between gap-8 px-8 py-2.5 md:flex">
        {messages.map((msg, i) => (
          <p
            key={msg}
            className="flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase"
          >
            {i % 2 === 0 ? (
              <HeartIcon size={13} className="text-mauve-deep" />
            ) : (
              <SparkleIcon size={13} className="text-mauve-deep" />
            )}
            {msg}
          </p>
        ))}
      </div>
      <div className="relative flex h-9 items-center justify-center overflow-hidden md:hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase"
          >
            <HeartIcon size={12} className="text-mauve-deep" />
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
