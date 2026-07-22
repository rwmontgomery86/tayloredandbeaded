import type { CategorySlug } from "./categories";

export interface Swatch {
  label?: string;
  hex: string;
}

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  /** Final display price (per-product override or category base). */
  price: number;
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
}

export type PricingMap = Record<CategorySlug, number>;
