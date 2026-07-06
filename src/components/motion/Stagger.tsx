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

/**
 * Container that staggers its StaggerItem children in.
 *
 * `trigger` controls what starts the reveal:
 *  - "view" (default): reveal on scroll into view — best for below-the-fold sections.
 *  - "mount": reveal as soon as it mounts — required for grids reached via
 *    client-side navigation (e.g. shop category filters). A scroll-based trigger
 *    doesn't reliably re-fire when the grid remounts already in the viewport, which
 *    would leave the cards stuck at opacity 0 until a full page reload.
 */
export function Stagger({
  children,
  className,
  trigger = "view",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "view" | "mount";
}) {
  const reduce = useReducedMotion();
  const reveal =
    trigger === "mount"
      ? { animate: "show" as const }
      : {
          whileInView: "show" as const,
          viewport: { once: true, margin: "-60px" as const },
        };
  return (
    <motion.div
      className={className}
      variants={parent}
      initial={reduce ? false : "hidden"}
      {...reveal}
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
