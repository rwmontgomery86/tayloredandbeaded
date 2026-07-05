"use client";

import { motion, useReducedMotion } from "framer-motion";

import { gentleEase } from "./ease";

/**
 * Fade-and-rise on scroll into view. `delay` staggers siblings that
 * aren't inside a Stagger container.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: gentleEase }}
    >
      {children}
    </Tag>
  );
}
