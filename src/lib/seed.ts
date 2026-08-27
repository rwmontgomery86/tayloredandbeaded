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
    id: "seed-coastal-pearl-pendant",
    name: "Coastal Pearl Pendant",
    slug: "coastal-pearl-pendant",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "A delicate gold-tone chain finished with a single pearl-inspired pendant.",
    materials: ["Glass pearl", "Gold-tone chain"],
    colors: [{ label: "Pearl", hex: "#F4EFE5" }],
  },
  {
    id: "seed-tortoise-link-necklace",
    name: "Tortoise Link Necklace",
    slug: "tortoise-link-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "Warm tortoise-pattern links with polished gold-tone details and an easy statement shape.",
    materials: ["Acetate links", "Gold-tone clasp"],
    colors: [
      { label: "Tortoise", hex: "#7A4B2D" },
      { label: "Honey", hex: "#C99245" },
    ],
  },
  {
    id: "seed-sculpted-heart-necklace",
    name: "Sculpted Heart Necklace",
    slug: "sculpted-heart-necklace",
    category: "necklaces",
    origin: "curated",
    availability: "premade",
    price: 25,
    image: null,
    images: [],
    description:
      "A softly sculpted heart pendant on a simple gold-tone chain for everyday wear.",
    materials: ["Gold-tone chain", "Polished heart pendant"],
    colors: [{ label: "Gold", hex: "#C9A45B" }],
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
        "coastal-pearl-pendant",
        "tortoise-link-necklace",
        "sculpted-heart-necklace",
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
