export type CategorySlug = "necklaces" | "bracelets" | "anklets" | "bag-charms";

export interface Category {
  slug: CategorySlug;
  title: string;
  /** Fallback base price; live values come from the Sanity pricing singleton */
  basePrice: number;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "necklaces",
    title: "Necklaces",
    basePrice: 25,
    image: "/products/necklace-rainbow-pastel.png",
  },
  {
    slug: "bracelets",
    title: "Bracelets",
    basePrice: 15,
    image: "/products/bracelet-pastel-stack.png",
  },
  {
    slug: "anklets",
    title: "Anklets",
    basePrice: 15,
    image: "/products/anklet-coral-gold.png",
  },
  {
    slug: "bag-charms",
    title: "Bag Charms",
    basePrice: 15,
    image: "/products/bag-charm-confetti.png",
  },
];

export const NEW_ARRIVALS_SLUG = "new-arrivals";

export function categoryTitle(slug: string) {
  if (slug === NEW_ARRIVALS_SLUG) return "New Arrivals";
  return CATEGORIES.find((c) => c.slug === slug)?.title ?? "Shop";
}
