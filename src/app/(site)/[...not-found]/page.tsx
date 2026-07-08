import { notFound } from "next/navigation";

/**
 * Unmatched URLs are only caught by a root-level not-found.tsx, which now
 * lives inside (site) so the 404 page keeps the site chrome. This catch-all
 * routes them into the group and triggers that not-found boundary.
 */
export default function CatchAll() {
  notFound();
}
