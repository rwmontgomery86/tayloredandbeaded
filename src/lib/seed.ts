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
    id: "seed-golden-hour",
    name: "Golden Hour Necklace",
    slug: "golden-hour-necklace",
    category: "necklaces",
    origin: "handmade",
    availability: "premade",
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
    origin: "handmade",
    availability: "premade",
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
    origin: "handmade",
    availability: "premade",
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
    origin: "handmade",
    availability: "premade",
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
    id: "seed-confetti-charm",
    name: "Confetti Bag Charm",
    slug: "confetti-bag-charm",
    category: "bag-charms",
    origin: "handmade",
    // Bag charms are customized to order, so they are year-round by nature.
    availability: "year-round",
    price: 15,
    image: "/products/bag-charm-confetti.png",
    images: ["/products/bag-charm-confetti.png"],
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
  "golden-hour-necklace",
  "tidepool-necklace",
  "sorbet-skies-necklace",
  "cotton-candy-stack",
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
      ["sorbet-skies-necklace", "cotton-candy-stack", "confetti-bag-charm"].includes(p.slug),
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
