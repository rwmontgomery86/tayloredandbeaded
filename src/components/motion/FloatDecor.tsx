"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Slow vertical drift for decorative elements. Purely ornamental. */
export default function FloatDecor({
  children,
  className,
  duration = 7,
  distance = 8,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={className}
      animate={reduce ? undefined : { y: [-distance, distance, -distance] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
