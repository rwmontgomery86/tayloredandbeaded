import { sanityFetch } from "../../sanity/lib/fetch";
import { urlFor } from "../../sanity/lib/image";
import {
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  NEW_ARRIVALS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
  COLLECTIONS_QUERY,
  COLLECTION_BY_SLUG_QUERY,
  COLLECTION_SLUGS_QUERY,
  FAQ_QUERY,
  CARE_GUIDE_QUERY,
  PRICING_QUERY,
  SETTINGS_QUERY,
} from "../../sanity/queries";
import { CATEGORIES, NEW_ARRIVALS_SLUG, type CategorySlug } from "./categories";
import {
  SEED_PRODUCTS,
  SEED_FEATURED_SLUGS,
  SEED_COLLECTIONS,
  SEED_FAQ,
  SEED_CARE_GUIDE,
  SEED_SETTINGS,
  seedProductDetail,
} from "./seed";
import type {
  CareGuideData,
  CollectionCardData,
  CollectionDetailData,
  FaqItemData,
  PricingMap,
  ProductCardData,
  ProductDetailData,
  SiteSettingsData,
} from "./types";

/* ---------- pricing ---------- */

const FALLBACK_PRICING: PricingMap = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.basePrice]),
) as PricingMap;

interface SanityPricing {
  necklaces?: number;
  bracelets?: number;
  anklets?: number;
  bagCharms?: number;
}

export async function getPricing(): Promise<PricingMap> {
  const p = await sanityFetch<SanityPricing>(PRICING_QUERY, {}, ["pricing"]);
  if (!p) return FALLBACK_PRICING;
  return {
    necklaces: p.necklaces ?? FALLBACK_PRICING.necklaces,
    bracelets: p.bracelets ?? FALLBACK_PRICING.bracelets,
    anklets: p.anklets ?? FALLBACK_PRICING.anklets,
    "bag-charms": p.bagCharms ?? FALLBACK_PRICING["bag-charms"],
  };
}

/* ---------- products ---------- */

interface SanityCard {
  _id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  price?: number;
  image?: unknown;
  colors?: { label?: string; hex?: string }[];
  featured?: boolean;
  newArrival?: boolean;
  status?: string;
}

function normalizeCard(p: SanityCard, pricing: PricingMap): ProductCardData {
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.price ?? pricing[p.category] ?? 0,
    image: p.image ? urlFor(p.image as never, 800) : null,
    colors: (p.colors ?? []).filter((c): c is { hex: string; label?: string } =>
      Boolean(c.hex),
    ),
    newArrival: p.newArrival,
    sold: p.status === "sold",
  };
}

export async function getProducts(
  category?: string,
): Promise<ProductCardData[]> {
  let query = ALL_PRODUCTS_QUERY;
  let params: Record<string, unknown> = {};
  if (category === NEW_ARRIVALS_SLUG) {
    query = NEW_ARRIVALS_QUERY;
  } else if (category && CATEGORIES.some((c) => c.slug === category)) {
    query = PRODUCTS_BY_CATEGORY_QUERY;
    params = { category };
  }

  const [cards, pricing] = await Promise.all([
    sanityFetch<SanityCard[]>(query, params, ["product"]),
    getPricing(),
  ]);
  if (cards === null) {
    return SEED_PRODUCTS.filter((p) =>
      !category || category === "all"
        ? true
        : category === NEW_ARRIVALS_SLUG
          ? p.newArrival
          : p.category === category,
    );
  }
  return cards.map((c) => normalizeCard(c, pricing));
}

export async function getFeaturedProducts(): Promise<ProductCardData[]> {
  const [cards, pricing] = await Promise.all([
    sanityFetch<SanityCard[]>(FEATURED_PRODUCTS_QUERY, {}, ["product"]),
    getPricing(),
  ]);
  if (cards === null) {
    return SEED_PRODUCTS.filter((p) => SEED_FEATURED_SLUGS.includes(p.slug));
  }
  return cards.map((c) => normalizeCard(c, pricing));
}

interface SanityDetail extends Omit<SanityCard, "image"> {
  images?: unknown[];
  description?: string;
  materials?: string[];
  related?: SanityCard[];
}

export async function getProduct(
  slug: string,
): Promise<ProductDetailData | null> {
  const [p, pricing] = await Promise.all([
    sanityFetch<SanityDetail | null>(PRODUCT_BY_SLUG_QUERY, { slug }, [
      "product",
      `product:${slug}`,
    ]),
    getPricing(),
  ]);
  if (p === null) {
    // Sanity unconfigured (fall back to seed) or genuinely not found
    return seedProductDetail(slug);
  }
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    price: p.price ?? pricing[p.category] ?? 0,
    images: (p.images ?? [])
      .map((i) => urlFor(i as never, 1600))
      .filter((u): u is string => Boolean(u)),
    description: p.description,
    materials: p.materials,
    colors: (p.colors ?? []).filter((c): c is { hex: string; label?: string } =>
      Boolean(c.hex),
    ),
    newArrival: p.newArrival,
    sold: p.status === "sold",
    related: (p.related ?? []).map((r) => normalizeCard(r, pricing)),
  };
}

export async function getProductSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(PRODUCT_SLUGS_QUERY, {}, [
    "product",
  ]);
  return slugs ?? SEED_PRODUCTS.map((p) => p.slug);
}

/* ---------- collections ---------- */

interface SanityCollectionCard {
  _id: string;
  title: string;
  slug: string;
  coverImage?: unknown;
  description?: string;
}

export async function getCollections(): Promise<CollectionCardData[]> {
  const cols = await sanityFetch<SanityCollectionCard[]>(
    COLLECTIONS_QUERY,
    {},
    ["collection"],
  );
  if (cols === null) return SEED_COLLECTIONS;
  return cols.map((c) => ({
    id: c._id,
    title: c.title,
    slug: c.slug,
    image: c.coverImage ? urlFor(c.coverImage as never, 1200) : null,
    description: c.description,
  }));
}

export async function getCollection(
  slug: string,
): Promise<CollectionDetailData | null> {
  const [c, pricing] = await Promise.all([
    sanityFetch<
      | (SanityCollectionCard & { intro?: string; products?: SanityCard[] })
      | null
    >(COLLECTION_BY_SLUG_QUERY, { slug }, ["collection", `collection:${slug}`]),
    getPricing(),
  ]);
  if (c === null) {
    return SEED_COLLECTIONS.find((s) => s.slug === slug) ?? null;
  }
  return {
    id: c._id,
    title: c.title,
    slug: c.slug,
    image: c.coverImage ? urlFor(c.coverImage as never, 1600) : null,
    description: c.description,
    intro: c.intro,
    products: (c.products ?? []).map((p) => normalizeCard(p, pricing)),
  };
}

export async function getCollectionSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(COLLECTION_SLUGS_QUERY, {}, [
    "collection",
  ]);
  return slugs ?? SEED_COLLECTIONS.map((c) => c.slug);
}

/* ---------- info content ---------- */

export async function getFaq(): Promise<FaqItemData[]> {
  const items = await sanityFetch<
    { _id: string; question: string; answer: string; category?: string }[]
  >(FAQ_QUERY, {}, ["faq"]);
  if (items === null || items.length === 0) return SEED_FAQ;
  return items.map((i) => ({
    id: i._id,
    question: i.question,
    answer: i.answer,
    category: (i.category ?? "general") as FaqItemData["category"],
  }));
}

export async function getCareGuide(): Promise<CareGuideData> {
  const guide = await sanityFetch<CareGuideData | null>(
    CARE_GUIDE_QUERY,
    {},
    ["careGuide"],
  );
  if (!guide || !guide.sections?.length) return SEED_CARE_GUIDE;
  return guide;
}

export async function getSettings(): Promise<SiteSettingsData> {
  const s = await sanityFetch<Partial<SiteSettingsData> | null>(
    SETTINGS_QUERY,
    {},
    ["settings"],
  );
  return {
    announcementMessages:
      s?.announcementMessages?.length
        ? s.announcementMessages
        : SEED_SETTINGS.announcementMessages,
    instagramUrl: s?.instagramUrl ?? SEED_SETTINGS.instagramUrl,
    email: s?.email,
    metaDescription: s?.metaDescription,
    aboutTeaser: s?.aboutTeaser ?? SEED_SETTINGS.aboutTeaser,
  };
}
