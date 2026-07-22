import {
  HeartIcon,
  SparkleIcon,
  GemIcon,
  GiftIcon,
  BeadsIcon,
} from "@/components/ui/icons";

/**
 * Single source of copy for the permanent-jewelry lab variants, so the
 * side-by-side comparison is about layout, not words. Events-first
 * framing per Taylor's direction; no pricing anywhere by design.
 */

export type HeadlineParts = { pre?: string; em?: string; post?: string };

/** Renders a headline with the site's italic-accent convention. */
export function Headline({ text }: { text: HeadlineParts }) {
  return (
    <>
      {text.pre}
      {text.em && <em className="font-normal italic">{text.em}</em>}
      {text.post}
    </>
  );
}

export const CTAS = {
  event: {
    label: "Inquire About an Event",
    href: "/contact?topic=permanent-jewelry-event",
  },
  fitting: {
    label: "Book a Fitting",
    href: "/contact?topic=permanent-jewelry",
  },
  closing: { label: "Get in Touch", href: "/contact?topic=permanent-jewelry" },
} as const;

export const HERO = {
  eyebrow: "Permanent jewelry — in person only",
  headline: { pre: "Bring the ", em: "sparkle", post: " to your event." },
  sub: "Taylor packs up her little welding table and comes to you — markets, boutiques, showers, girls' nights. Guests choose a dainty chain, she fits it right on their wrist, and one tiny painless spark later it's theirs for keeps.",
} as const;

export const WHAT = {
  eyebrow: "The forever bracelet",
  heading: { pre: "Jewelry that ", em: "stays", post: "." },
  paragraphs: [
    "Permanent jewelry is a delicate chain, custom-fit to your wrist or ankle and gently welded closed — no clasp, nothing to fumble with, nothing to lose. You choose the chain, Taylor fits it exactly to you, and a quick, painless spark seals it shut.",
    "Every weld happens in person, one wrist at a time. And it isn't as permanent as it sounds: ordinary scissors take it off in seconds, and Taylor will happily weld it back on.",
  ],
} as const;

export const EVENTS = {
  eyebrow: "Pop-ups & parties",
  heading: { pre: "Bring Taylor to ", em: "your", post: " event." },
  body: "Planning a celebration, or run a local shop? Taylor sets up a small, pretty welding station — chains, charms, and all — and your guests leave wearing something they'll never take off. It's a lovely draw for boutiques and markets, and the sweetest activity for showers and girls' nights.",
} as const;

export const OCCASIONS = [
  {
    icon: HeartIcon,
    label: "Private parties",
    detail: "Birthdays, bachelorettes & girls' nights",
  },
  {
    icon: GiftIcon,
    label: "Bridal & showers",
    detail: "A keepsake the whole party shares",
  },
  {
    icon: SparkleIcon,
    label: "Markets & festivals",
    detail: "A pop-up moment people line up for",
  },
  {
    icon: GemIcon,
    label: "Boutique pop-ups",
    detail: "Give your shoppers a reason to stay",
  },
] as const;

export const STEPS_HEADING = {
  eyebrow: "How it works",
  heading: { pre: "Simple as a ", em: "spark", post: "." },
} as const;

export const STEPS = [
  {
    n: "01",
    icon: BeadsIcon,
    title: "Choose your chain",
    detail:
      "Pick a dainty chain — and a tiny charm, if you like — from Taylor's curated tray.",
  },
  {
    n: "02",
    icon: GemIcon,
    title: "Fitted to you",
    detail:
      "Taylor measures it right on your wrist or ankle, so it sits exactly the way you want.",
  },
  {
    n: "03",
    icon: SparkleIcon,
    title: "One tiny spark",
    detail:
      "A quick, painless weld closes the loop. No clasp — just jewelry that stays with you.",
  },
] as const;

export const FAQ_HEADING = {
  eyebrow: "Good to know",
  heading: { pre: "Questions & ", em: "answers", post: "" },
} as const;

export const FAQ = [
  {
    id: "pj-hurt",
    question: "Does the weld hurt?",
    answer:
      "Not at all. The spark is tiny, quick, and never touches your skin — a small guard sits between you and the weld. Most people are mid-sentence when it's already done.",
  },
  {
    id: "pj-removal",
    question: "Can I take it off?",
    answer:
      "It's made to stay, but it isn't forever unless you want it to be: ordinary scissors snip it off in seconds. Keep the chain and Taylor will weld it right back on next time you see her.",
  },
  {
    id: "pj-water",
    question: "Can I shower and swim in it?",
    answer:
      "Yes — it's made for everyday life, showers included. Like any delicate jewelry, lots of pool and salt water can dull the finish over time, so give it a rinse after swimming.",
  },
  {
    id: "pj-where",
    question: "Where do fittings happen?",
    answer:
      "In person, always — at markets, pop-ups, and private events around town. Send a note and Taylor will tell you where she'll be next.",
  },
  {
    id: "pj-events",
    question: "Do you do private events?",
    answer:
      "Happily — birthdays, bridal showers, girls' nights, boutique pop-ups. Taylor brings the whole station; you just gather your people. Send your date and she'll take it from there.",
  },
] as const;

export const CLOSING = {
  heading: { pre: "Ready when ", em: "you", post: " are." },
  sub: "Tell Taylor about your event — or just say you'd like a forever bracelet of your own — and she'll reply with all the details.",
} as const;

export const PHOTOS = {
  wrist: {
    src: "/photos/permanent-jewelry-wrist.png",
    alt: "A dainty gold chain bracelet being welded closed on a wrist",
    width: 1024,
    height: 1024,
  },
  event: {
    src: "/photos/permanent-jewelry-event.png",
    alt: "Taylor's permanent jewelry pop-up table with spools of gold chain",
    width: 1536,
    height: 1024,
  },
  chains: {
    src: "/photos/permanent-jewelry-chains.png",
    alt: "Delicate gold chains and tiny charms in a ceramic dish on white linen",
    width: 1024,
    height: 1536,
  },
  party: {
    src: "/photos/permanent-jewelry-party.png",
    alt: "Two friends admiring a freshly welded bracelet at a celebration",
    width: 1536,
    height: 1024,
  },
} as const;
