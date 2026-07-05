"use client";

import { motion, useReducedMotion } from "framer-motion";
import { gentleEase } from "./ease";

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: gentleEase },
  },
};

/** Container that staggers its StaggerItem children into view. */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={parent}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  );
}
