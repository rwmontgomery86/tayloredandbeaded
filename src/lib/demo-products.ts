import type { CategorySlug } from "./categories";

/**
 * Seed catalog for the static build phase; replaced by Sanity data in
 * Phase 2 (the shape mirrors the product schema's card projection).
 */
export interface DemoProduct {
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  image: string;
  colors: string[];
  newArrival?: boolean;
  featured?: boolean;
  sold?: boolean;
}

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    name: "Golden Hour Necklace",
    slug: "golden-hour-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-warm-tones.png",
    colors: ["#f2b8c6", "#e8a33d", "#c96f2f", "#8a5a2b"],
    newArrival: true,
    featured: true,
  },
  {
    name: "Tidepool Necklace",
    slug: "tidepool-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-ocean-blues.png",
    colors: ["#2f7fb8", "#8fbf4d", "#bfe3d9", "#28306e"],
    newArrival: true,
    featured: true,
  },
  {
    name: "Sorbet Skies Necklace",
    slug: "sorbet-skies-necklace",
    category: "necklaces",
    price: 25,
    image: "/products/necklace-rainbow-pastel.png",
    colors: ["#f4a7b9", "#f7c873", "#9cc2e5", "#a8d5a2"],
    newArrival: true,
    featured: true,
  },
  {
    name: "Cotton Candy Stack",
    slug: "cotton-candy-stack",
    category: "bracelets",
    price: 15,
    image: "/products/bracelet-pastel-stack.png",
    colors: ["#f4b8c9", "#a5cbe8", "#f7e39a", "#b6dcb6"],
    featured: true,
  },
  {
    name: "Seashore Anklet",
    slug: "seashore-anklet",
    category: "anklets",
    price: 15,
    image: "/products/anklet-coral-gold.png",
    colors: ["#e8836b", "#5bbdb4", "#d9a441"],
    featured: true,
  },
  {
    name: "Confetti Bag Charm",
    slug: "confetti-bag-charm",
    category: "bag-charms",
    price: 15,
    image: "/products/bag-charm-confetti.png",
    colors: ["#e04f8a", "#ef8a3c", "#6faf5a"],
    featured: true,
  },
];
