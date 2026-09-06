import type { CategorySlug } from "./categories";

export interface Swatch {
  label?: string;
  hex: string;
}

export interface CustomizationColor extends Swatch {
  label: string;
}

export interface CustomizationData {
  beadColors: CustomizationColor[];
  charmOptions: string[];
  bagScarfPrice: number;
  initialCharmPrice: number;
}

export type ProductAvailability = "year-round" | "premade";
export type ProductOrigin = "handmade" | "curated";

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  availability: ProductAvailability;
  origin: ProductOrigin;
  /** Final display price (per-product override or category base). */
  price: number;
  /** Short bead/color description, shown on year-round style cards. */
  description?: string;
  image: string | null;
  colors: Swatch[];
  newArrival?: boolean;
  sold?: boolean;
}

export interface ProductDetailData extends Omit<ProductCardData, "image"> {
  images: string[];
  description?: string;
  materials?: string[];
  related: ProductCardData[];
}

export interface CollectionCardData {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  description?: string;
}

export interface CollectionDetailData extends CollectionCardData {
  intro?: string;
  products: ProductCardData[];
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  category: "orders" | "shipping" | "care" | "general" | "permanent-jewelry";
}

export interface CareGuideData {
  title: string;
  intro?: string;
  sections: { heading: string; body: string }[];
}

export interface SiteSettingsData {
  announcementMessages: string[];
  instagramUrl: string;
  email?: string;
  metaDescription?: string;
  aboutTeaser: string;
  /** Square-cropped CDN URL, or null to use the built-in photo. */
  makerPhoto: { url: string; alt?: string } | null;
  /** Square-cropped CDN URLs keyed by shop category slug; missing = built-in photo. */
  categoryImages: Partial<Record<CategorySlug | "new-arrivals", string>>;
}

export type PricingMap = Record<CategorySlug, number>;
