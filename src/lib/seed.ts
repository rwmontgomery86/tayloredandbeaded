import type {
  CareGuideData,
  CollectionCardData,
  CollectionDetailData,
  CustomizationData,
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
    id: "seed-confetti-charm",
    name: "Bag Charm",
    slug: "confetti-bag-charm",
    category: "bag-charms",
    origin: "handmade",
    // Bag charms are customized to order, so they are year-round by nature.
    availability: "year-round",
    price: 15,
    image: "/products/bag-charm-taylored.jpg",
    images: ["/products/bag-charm-taylored.jpg"],
    description:
      "Chunky, happy beads in hot pink, orange, and green with a gold clasp—clip it to your tote, backpack, or keys for instant personality.",
    materials: ["Acrylic beads", "Gold-tone clasp"],
    colors: [{ hex: "#e04f8a" }, { hex: "#ef8a3c" }, { hex: "#6faf5a" }],
  },
  {
    id: "seed-parker-necklace",
    name: "Parker",
    slug: "parker-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Baby Pink Double with Gold Accent",
    materials: [],
    colors: [],
  },
  {
    id: "seed-cameron-necklace",
    name: "Cameron",
    slug: "cameron-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Marble Blue Double with Gold Accent",
    materials: [],
    colors: [],
  },
  {
    id: "seed-faith-necklace",
    name: "Faith",
    slug: "faith-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Multicolor Jewel Tone",
    materials: [],
    colors: [],
  },
  {
    id: "seed-ryan-necklace",
    name: "Ryan",
    slug: "ryan-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Wine / Maroon Round",
    materials: [],
    colors: [],
  },
  {
    id: "seed-hannah-necklace",
    name: "Hannah",
    slug: "hannah-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Multi Color Flat Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-lynsey-necklace",
    name: "Lynsey",
    slug: "lynsey-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Rainbow Flat Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-mandy-necklace",
    name: "Mandy",
    slug: "mandy-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Brown Square Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-sara-necklace",
    name: "Sara",
    slug: "sara-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Olive Green Square Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-carol-necklace",
    name: "Carol",
    slug: "carol-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Pink Square Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-tanner-necklace",
    name: "Tanner",
    slug: "tanner-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Greyish Blue Square Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-braelyn-necklace",
    name: "Braelyn",
    slug: "braelyn-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Turquoise Square Bead",
    materials: [],
    colors: [],
  },
  {
    id: "seed-alivia-necklace",
    name: "Alivia",
    slug: "alivia-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "White Flat Bead & Gold",
    materials: [],
    colors: [],
  },
  {
    id: "seed-ansley-necklace",
    name: "Ansley",
    slug: "ansley-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Royal Blue Round",
    materials: [],
    colors: [],
  },
  {
    id: "seed-sierra-necklace",
    name: "Sierra",
    slug: "sierra-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "year-round",
    price: 25,
    image: null,
    images: [],
    description: "Fuchsia Round",
    materials: [],
    colors: [],
  },
  {
    id: "seed-sage-marble-stone-necklace",
    name: "Sage Marble Stone Necklace",
    slug: "sage-marble-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Softly marbled sage-green stones in a chunky, squared silhouette.",
    materials: [],
    colors: [
      { label: "Sage", hex: "#8CA183" },
      { label: "Mist", hex: "#AEBFA0" },
    ],
  },
  {
    id: "seed-bold-multicolor-stone-necklace",
    name: "Bold Multicolor Stone Necklace",
    slug: "bold-multicolor-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Vivid stone nuggets in turquoise, amber, fuchsia, black, and cream strung into one bold statement.",
    materials: [],
    colors: [
      { label: "Turquoise", hex: "#4FB6B2" },
      { label: "Amber", hex: "#E89B3C" },
      { label: "Fuchsia", hex: "#C2367E" },
    ],
  },
  {
    id: "seed-peach-and-cream-stone-necklace",
    name: "Peach and Cream Stone Necklace",
    slug: "peach-and-cream-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Warm peach, blush, and cream stones with soft olive undertones.",
    materials: [],
    colors: [
      { label: "Peach", hex: "#F0A47C" },
      { label: "Blush", hex: "#F3C1B6" },
      { label: "Cream", hex: "#F5E9D6" },
    ],
  },
  {
    id: "seed-pastel-multicolor-stone-necklace",
    name: "Pastel Multicolor Stone Necklace",
    slug: "pastel-multicolor-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Powdery pastels—periwinkle, mint, peach, and butter—in smooth oversized stones.",
    materials: [],
    colors: [
      { label: "Periwinkle", hex: "#A9B8DC" },
      { label: "Mint", hex: "#A8D8B4" },
      { label: "Peach", hex: "#F6C6A8" },
    ],
  },
  {
    id: "seed-brown-and-cream-stone-necklace",
    name: "Brown and Cream Stone Necklace",
    slug: "brown-and-cream-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description: "Rich caramel and cream stones with warm, honeyed marbling.",
    materials: [],
    colors: [
      { label: "Caramel", hex: "#8B5A2B" },
      { label: "Cream", hex: "#EFE3CC" },
    ],
  },
  {
    id: "seed-blue-and-green-stone-necklace",
    name: "Blue and Green Stone Necklace",
    slug: "blue-and-green-stone-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Cool blues and greens—sky, cobalt, jade, and mint—in one easy statement strand.",
    materials: [],
    colors: [
      { label: "Sky", hex: "#7FA9D8" },
      { label: "Cobalt", hex: "#2F4B9E" },
      { label: "Jade", hex: "#3E8E5A" },
    ],
  },
  {
    id: "seed-multicolor-cross-necklace",
    name: "Multicolor Cross Necklace",
    slug: "multicolor-cross-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Bold marbled rounds in jewel tones finished with a carved cross pendant.",
    materials: [],
    colors: [
      { label: "Emerald", hex: "#2E6B4F" },
      { label: "Fuchsia", hex: "#C2367E" },
      { label: "Orange", hex: "#E8952F" },
    ],
  },
];

export const SEED_FEATURED_SLUGS = [
  "parker-necklace",
  "ansley-necklace",
  "lynsey-necklace",
  "faith-necklace",
  "confetti-bag-charm",
];

export function seedProductDetail(slug: string): ProductDetailData | null {
  const p = SEED_PRODUCTS.find((s) => s.slug === slug);
  if (!p) return null;
  const related = SEED_PRODUCTS.filter(
    (s) =>
      s.category === p.category &&
      s.origin === p.origin &&
      s.slug !== slug,
  ).slice(0, 4);
  return { ...p, related };
}

// The Edit is the only collection document the site still renders — the
// mood collections were retired when the collections index folded into the
// shop. The doc type stays for future seasonal drops.
export const SEED_COLLECTIONS: (CollectionDetailData & CollectionCardData)[] = [
  {
    id: "seed-the-edit",
    title: "The Edit",
    slug: "the-edit",
    image: null,
    description:
      "The Edit is a collection of necklaces I personally love and have selected because I love their style, look, and overall aesthetic. These pieces are curated rather than handmade by me.",
    intro:
      "The Edit is a collection of necklaces I personally love and have selected because I love their style, look, and overall aesthetic. These pieces are curated rather than handmade by me.",
    products: SEED_PRODUCTS.filter((p) =>
      [
        "sage-marble-stone-necklace",
        "bold-multicolor-stone-necklace",
        "peach-and-cream-stone-necklace",
        "pastel-multicolor-stone-necklace",
        "brown-and-cream-stone-necklace",
        "blue-and-green-stone-necklace",
        "multicolor-cross-necklace",
      ].includes(p.slug),
    ),
  },
];

export const SEED_FAQ: FaqItemData[] = [
  {
    id: "seed-faq-order",
    question: "How do I order a piece?",
    answer:
      "Pick your piece, choose your options—bead colors, initials, charms, add-ons—and tap “Request this piece.” Your request lands in my inbox with every detail, and I’ll follow up by email within a day or two to arrange payment and shipping. No payment is ever taken online.",
    category: "orders",
  },
  {
    id: "seed-faq-custom",
    question: "Do you take custom requests?",
    answer:
      "I love making custom pieces! Bag charms and my year-round necklaces can be personalized right on their pages, and if you’re dreaming of something different altogether, send me a message through the contact page and we’ll design it together.",
    category: "orders",
  },
  {
    id: "seed-faq-shipping",
    question: "How long does shipping take?",
    answer:
      "One-of-a-kind pieces that are ready to go ship within 2–3 business days. Made-to-order styles and personalized charms usually take about a week to make before they ship. Orders over $75 ship free!",
    category: "shipping",
  },
  {
    id: "seed-faq-sold",
    question: "The piece I loved is marked sold. Can you make another?",
    answer:
      "Only one-of-a-kind premade pieces are ever marked sold—my year-round styles are made to order, so you can request those any time. If a one-off you loved is gone, exact remakes aren’t always possible (small bead batches!), but I can almost always create something in the same spirit. Just ask!",
    category: "general",
  },
  {
    id: "seed-faq-gift",
    question: "Is gift wrapping included?",
    answer:
      "Yes! Every order arrives beautifully packaged and gift ready, at no extra cost.",
    category: "general",
  },
  {
    id: "seed-pj-hurt",
    question: "Does the weld hurt?",
    answer:
      "Not at all. The spark is tiny, quick, and never touches your skin — a small guard sits between you and the weld. Most people are mid-sentence when it's already done.",
    category: "permanent-jewelry",
  },
  {
    id: "seed-pj-removal",
    question: "Can I take it off?",
    answer:
      "It's made to stay, but it isn't forever unless you want it to be: ordinary scissors snip it off in seconds. Keep the chain and Taylor will weld it right back on next time you see her.",
    category: "permanent-jewelry",
  },
  {
    id: "seed-pj-water",
    question: "Can I shower and swim in it?",
    answer:
      "Yes — it's made for everyday life, showers included. Like any delicate jewelry, lots of pool and salt water can dull the finish over time, so give it a rinse after swimming.",
    category: "permanent-jewelry",
  },
  {
    id: "seed-pj-where",
    question: "Where do fittings happen?",
    answer:
      "In person, always — at markets, pop-ups, and private events around town. Send a note and Taylor will tell you where she'll be next.",
    category: "permanent-jewelry",
  },
  {
    id: "seed-pj-events",
    question: "Do you do private events?",
    answer:
      "Happily — birthdays, bridal showers, girls' nights, boutique pop-ups. Taylor brings the whole station; you just gather your people. Send your date and she'll take it from there.",
    category: "permanent-jewelry",
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

export const SEED_CUSTOMIZATION: CustomizationData = {
  beadColors: [
    { label: "Bright Blue", hex: "#2F7FB8" },
    { label: "Pink", hex: "#F4A7B9" },
    { label: "Red/Coral", hex: "#E76F61" },
    { label: "Caramel/Brown", hex: "#A66A3F" },
    { label: "Lavender Purple", hex: "#9B83C5" },
    { label: "Seafoam Green", hex: "#9CCDBF" },
  ],
  charmOptions: ["MAMA", "Heart", "Cross", "Smiley Face", "Bow"],
  bagScarfPrice: 5,
  initialCharmPrice: 3,
};

export const SEED_SETTINGS: SiteSettingsData = {
  announcementMessages: [
    "Handmade with love",
    "Free shipping on orders $75+",
  ],
  instagramUrl: "https://www.instagram.com/taylored_beaded/",
  aboutTeaser:
    "What started as a way to relieve stress after unexpectedly losing my job became my creative outlet, my therapy, and my passion. Every piece is handmade with love, creativity, and a little piece of my story.",
};
