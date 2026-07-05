import type {
  CareGuideData,
  CollectionCardData,
  CollectionDetailData,
  FaqItemData,
  ProductCardData,
  ProductDetailData,
  SiteSettingsData,
} from "./types";

/**
 * Seed content shown until the Sanity project is configured and filled.
 * Shapes match the normalized data-layer types exactly, so pages don't
 * know (or care) which source they're rendering.
 */

interface SeedProduct extends ProductCardData {
  images: string[];
  description: string;
  materials: string[];
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    id: "seed-golden-hour",
    name: "Golden Hour Necklace",
    slug: "golden-hour-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-warm-tones.png",
    images: ["/products/necklace-warm-tones.png"],
    description:
      "Warm rose quartz pinks, honey ambers, and toasted caramel tones strung with delicate gold spacers. Like the last golden minutes of a summer evening, made wearable.",
    materials: ["Glass & stone beads", "Gold-tone spacers", "Durable stringing wire"],
    colors: [
      { hex: "#f2b8c6" },
      { hex: "#e8a33d" },
      { hex: "#c96f2f" },
      { hex: "#8a5a2b" },
    ],
    newArrival: true,
  },
  {
    id: "seed-tidepool",
    name: "Tidepool Necklace",
    slug: "tidepool-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-ocean-blues.png",
    images: ["/products/necklace-ocean-blues.png"],
    description:
      "Ocean blues, seaglass greens, and deep lapis paired with brushed gold accents. A little piece of the coast for everyday wear.",
    materials: ["Glass & stone beads", "Gold-tone spacers", "Durable stringing wire"],
    colors: [
      { hex: "#2f7fb8" },
      { hex: "#8fbf4d" },
      { hex: "#bfe3d9" },
      { hex: "#28306e" },
    ],
    newArrival: true,
  },
  {
    id: "seed-sorbet-skies",
    name: "Sorbet Skies Necklace",
    slug: "sorbet-skies-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-rainbow-pastel.png",
    images: ["/products/necklace-rainbow-pastel.png"],
    description:
      "A full rainbow of frosted pastel rondelles separated by tiny gold discs. Sweet, colorful, and impossible not to smile at.",
    materials: ["Frosted glass rondelles", "Gold-tone discs", "Durable stringing wire"],
    colors: [
      { hex: "#f4a7b9" },
      { hex: "#f7c873" },
      { hex: "#9cc2e5" },
      { hex: "#a8d5a2" },
    ],
    newArrival: true,
  },
  {
    id: "seed-cotton-candy",
    name: "Cotton Candy Stack",
    slug: "cotton-candy-stack",
    category: "bracelets",
    price: 15,
    image: "/products/bracelet-pastel-stack.png",
    images: ["/products/bracelet-pastel-stack.png"],
    description:
      "Three coordinating pastel bracelets meant to be worn together (or shared with your best friend). Soft pinks, blues, and buttery yellows with gold details.",
    materials: ["Glass beads", "Gold-tone spacers", "Sturdy elastic cord"],
    colors: [
      { hex: "#f4b8c9" },
      { hex: "#a5cbe8" },
      { hex: "#f7e39a" },
      { hex: "#b6dcb6" },
    ],
  },
  {
    id: "seed-seashore",
    name: "Seashore Anklet",
    slug: "seashore-anklet",
    category: "anklets",
    price: 15,
    image: "/products/anklet-coral-gold.png",
    images: ["/products/anklet-coral-gold.png"],
    description:
      "Coral, turquoise, and gold rondelles on a dainty strand made for sandy toes and sunshine. Sized to order.",
    materials: ["Stone rondelles", "Gold-tone spacers", "Durable stringing wire"],
    colors: [{ hex: "#e8836b" }, { hex: "#5bbdb4" }, { hex: "#d9a441" }],
  },
  {
    id: "seed-confetti-charm",
    name: "Confetti Bag Charm",
    slug: "confetti-bag-charm",
    category: "bag-charms",
    price: 15,
    image: "/products/bag-charm-confetti.png",
    images: ["/products/bag-charm-confetti.png"],
    description:
      "Chunky, happy beads in hot pink, orange, and green with a gold clasp—clip it to your tote, backpack, or keys for instant personality.",
    materials: ["Acrylic beads", "Gold-tone clasp"],
    colors: [{ hex: "#e04f8a" }, { hex: "#ef8a3c" }, { hex: "#6faf5a" }],
  },
];

export const SEED_FEATURED_SLUGS = [
  "golden-hour-necklace",
  "tidepool-necklace",
  "sorbet-skies-necklace",
  "cotton-candy-stack",
  "seashore-anklet",
  "confetti-bag-charm",
];

export function seedProductDetail(slug: string): ProductDetailData | null {
  const p = SEED_PRODUCTS.find((s) => s.slug === slug);
  if (!p) return null;
  const related = SEED_PRODUCTS.filter(
    (s) => s.category === p.category && s.slug !== slug,
  ).slice(0, 4);
  return { ...p, related };
}

export const SEED_COLLECTIONS: (CollectionDetailData & CollectionCardData)[] = [
  {
    id: "seed-summer-brights",
    title: "Summer Brights",
    slug: "summer-brights",
    image: "/products/necklace-rainbow-pastel.png",
    description: "Sun-soaked color for long days and golden evenings.",
    intro:
      "The pieces in this collection were inspired by popsicles, beach umbrellas, and that first warm weekend of the year. Bright, happy color you can wear every single day.",
    products: SEED_PRODUCTS.filter((p) =>
      ["sorbet-skies-necklace", "cotton-candy-stack", "seashore-anklet", "confetti-bag-charm"].includes(p.slug),
    ),
  },
  {
    id: "seed-golden-hour-collection",
    title: "Golden Hour",
    slug: "golden-hour",
    image: "/products/necklace-warm-tones.png",
    description: "Warm ambers, dusty pinks, and evening light.",
    intro:
      "Warm tones for the dreamers. These pieces pair beautifully with linen, sundresses, and a good sunset.",
    products: SEED_PRODUCTS.filter((p) =>
      ["golden-hour-necklace", "tidepool-necklace"].includes(p.slug),
    ),
  },
];

export const SEED_FAQ: FaqItemData[] = [
  {
    id: "seed-faq-order",
    question: "How do I order a piece?",
    answer:
      "Every piece on the site is one-of-a-kind. When something catches your eye, tap “Inquire about this piece” and send me a note—I’ll reply with payment and shipping details within a day or two.",
    category: "orders",
  },
  {
    id: "seed-faq-custom",
    question: "Do you take custom requests?",
    answer:
      "I love making custom pieces! Send me a message through the contact page with your color ideas, the occasion, and the type of piece you’d like, and we’ll design something together.",
    category: "orders",
  },
  {
    id: "seed-faq-shipping",
    question: "How long does shipping take?",
    answer:
      "Ready-made pieces ship within 2–3 business days. Custom pieces usually take about a week to make before they ship. Orders over $75 ship free!",
    category: "shipping",
  },
  {
    id: "seed-faq-sold",
    question: "The piece I loved is marked sold. Can you make another?",
    answer:
      "Because every piece is hand-strung from small bead batches, exact remakes aren’t always possible—but I can almost always create something in the same spirit. Just ask!",
    category: "general",
  },
  {
    id: "seed-faq-gift",
    question: "Is gift wrapping included?",
    answer:
      "Yes! Every order arrives beautifully packaged and gift ready, at no extra cost.",
    category: "general",
  },
];

export const SEED_CARE_GUIDE: CareGuideData = {
  title: "Jewelry Care",
  intro:
    "A little love keeps handmade jewelry beautiful for years. Here’s how to care for your beaded pieces.",
  sections: [
    {
      heading: "Keep it dry",
      body: "Remove your jewelry before swimming, showering, or working out. Water and sweat can weaken the stringing and dull metal accents over time.",
    },
    {
      heading: "Store it gently",
      body: "Store pieces flat or hanging, away from direct sunlight. A soft pouch or lined jewelry box keeps beads from scratching each other.",
    },
    {
      heading: "Last on, first off",
      body: "Put your jewelry on after lotions, perfume, and hairspray, and take it off first at the end of the day.",
    },
    {
      heading: "Clean with care",
      body: "Wipe beads gently with a soft, dry cloth. Skip harsh cleaners—they can damage the finish on glass and stone beads.",
    },
  ],
};

export const SEED_SETTINGS: SiteSettingsData = {
  announcementMessages: [
    "Handmade with love",
    "Free shipping on orders $75+",
    "Woman owned",
  ],
  instagramUrl: "https://www.instagram.com/taylored_beaded/",
  aboutTeaser:
    "Taylored & Beaded was created from my love of color, creativity, and meaningful connection. Every piece is hand-strung with care in small batches—because you deserve jewelry as special as you are.",
};
