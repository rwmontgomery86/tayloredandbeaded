import { sanityConfigured } from "../../sanity/env";
import { sanityFetch } from "../../sanity/lib/fetch";
import { squareUrlFor, urlFor } from "../../sanity/lib/image";
import {
  ALL_PRODUCTS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  NEW_ARRIVALS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
  COLLECTION_BY_SLUG_QUERY,
  FAQ_QUERY,
  CARE_GUIDE_QUERY,
  PRICING_QUERY,
  CUSTOMIZATION_QUERY,
  SETTINGS_QUERY,
} from "../../sanity/queries";
import { CATEGORIES, NEW_ARRIVALS_SLUG, type CategorySlug } from "./categories";
import {
  SEED_PRODUCTS,
  SEED_FEATURED_SLUGS,
  SEED_COLLECTIONS,
  SEED_FAQ,
  SEED_CARE_GUIDE,
  SEED_CUSTOMIZATION,
  SEED_SETTINGS,
  seedProductDetail,
} from "./seed";
import type {
  CareGuideData,
  CollectionDetailData,
  CustomizationColor,
  CustomizationData,
  FaqItemData,
  PricingMap,
  ProductAvailability,
  ProductCardData,
  ProductDetailData,
  ProductOrigin,
  SiteSettingsData,
} from "./types";

/* ---------- pricing ---------- */

const FALLBACK_PRICING: PricingMap = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.basePrice]),
) as PricingMap;

interface SanityPricing {
  necklaces?: number;
  bracelets?: number;
  bagCharms?: number;
}

export async function getPricing(): Promise<PricingMap> {
  const p = await sanityFetch<SanityPricing>(PRICING_QUERY, {}, ["pricing"]);
  if (!p) return FALLBACK_PRICING;
  return {
    necklaces: p.necklaces ?? FALLBACK_PRICING.necklaces,
    bracelets: p.bracelets ?? FALLBACK_PRICING.bracelets,
    "bag-charms": p.bagCharms ?? FALLBACK_PRICING["bag-charms"],
  };
}

/* ---------- customization ---------- */

interface SanityCustomization {
  beadColors?: { label?: string; hex?: string }[];
  charmOptions?: (string | null)[];
  bagScarfPrice?: number;
  initialCharmPrice?: number;
}

export async function getCustomization(): Promise<CustomizationData> {
  const c = await sanityFetch<SanityCustomization | null>(
    CUSTOMIZATION_QUERY,
    {},
    ["customization"],
  );
  if (!c) return SEED_CUSTOMIZATION;

  const beadColors = (c.beadColors ?? []).filter(
    (color): color is CustomizationColor =>
      Boolean(color.label) && Boolean(color.hex),
  );
  const charmOptions = (c.charmOptions ?? []).filter(
    (option): option is string => Boolean(option),
  );

  return {
    beadColors: beadColors.length ? beadColors : SEED_CUSTOMIZATION.beadColors,
    charmOptions: charmOptions.length
      ? charmOptions
      : SEED_CUSTOMIZATION.charmOptions,
    bagScarfPrice: c.bagScarfPrice ?? SEED_CUSTOMIZATION.bagScarfPrice,
    initialCharmPrice:
      c.initialCharmPrice ?? SEED_CUSTOMIZATION.initialCharmPrice,
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
  description?: string;
  availability?: string;
  origin?: string;
  status?: string;
}

function normalizeAvailability(value?: string): ProductAvailability {
  return value === "year-round" ? "year-round" : "premade";
}

function normalizeOrigin(value?: string): ProductOrigin {
  return value === "curated" ? "curated" : "handmade";
}

function normalizeCard(p: SanityCard, pricing: PricingMap): ProductCardData {
  const availability = normalizeAvailability(p.availability);

  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    availability,
    origin: normalizeOrigin(p.origin),
    price: p.price ?? pricing[p.category] ?? 0,
    description: p.description,
    image: p.image ? urlFor(p.image as never, 800) : null,
    colors: (p.colors ?? []).filter((c): c is { hex: string; label?: string } =>
      Boolean(c.hex),
    ),
    newArrival: p.newArrival,
    sold: availability === "premade" && p.status === "sold",
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
    if (sanityConfigured) return []; // fetch error: honest empty beats phantoms
    return SEED_PRODUCTS.filter(
      (p) =>
        p.origin === "handmade" &&
        (!category || category === "all"
          ? true
          : category === NEW_ARRIVALS_SLUG
            ? p.newArrival
            : p.category === category),
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
    if (sanityConfigured) return [];
    return SEED_PRODUCTS.filter(
      (p) => p.origin === "handmade" && SEED_FEATURED_SLUGS.includes(p.slug),
    );
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
    // Seed data only stands in while Sanity is unconfigured. With a live
    // dataset, a missing/unpublished document is genuinely gone — serving the
    // seed version would resurrect retired pieces as orderable phantoms.
    return sanityConfigured ? null : seedProductDetail(slug);
  }
  const availability = normalizeAvailability(p.availability);

  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: p.category,
    availability,
    origin: normalizeOrigin(p.origin),
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
    sold: availability === "premade" && p.status === "sold",
    related: (p.related ?? []).map((r) => normalizeCard(r, pricing)),
  };
}

export async function getProductSlugs(): Promise<string[]> {
  const slugs = await sanityFetch<string[]>(PRODUCT_SLUGS_QUERY, {}, [
    "product",
  ]);
  if (slugs !== null) return slugs;
  return sanityConfigured ? [] : SEED_PRODUCTS.map((p) => p.slug);
}

/* ---------- collections ---------- */

interface SanityCollectionCard {
  _id: string;
  title: string;
  slug: string;
  coverImage?: unknown;
  description?: string;
}

export async function getCollection(
  slug: string,
): Promise<CollectionDetailData | null> {
  const [c, pricing] = await Promise.all([
    sanityFetch<
      | (SanityCollectionCard & { intro?: string; products?: SanityCard[] })
      | null
      // "product" tag included: the response embeds product cards, so product
      // edits must invalidate collection pages too, not just product pages.
    >(COLLECTION_BY_SLUG_QUERY, { slug }, [
      "collection",
      `collection:${slug}`,
      "product",
    ]),
    getPricing(),
  ]);
  if (c === null) {
    // Same rule as getProduct: seed only stands in while Sanity is unconfigured.
    return sanityConfigured
      ? null
      : (SEED_COLLECTIONS.find((s) => s.slug === slug) ?? null);
  }
  return {
    id: c._id,
    title: c.title,
    slug: c.slug,
    image: c.coverImage ? urlFor(c.coverImage as never, 1600) : null,
    description: c.description,
    intro: c.intro,
    // products[]-> yields null for broken references; drop those and any
    // documents from retired categories before normalizing. The Edit is
    // curated-only by definition — a member flipped back to handmade must
    // not appear there, whatever the collection document references.
    products: (c.products ?? [])
      .filter(
        (p): p is SanityCard =>
          Boolean(p) && CATEGORIES.some((cat) => cat.slug === p.category),
      )
      .map((p) => normalizeCard(p, pricing))
      .filter((p) => slug !== "the-edit" || p.origin === "curated"),
  };
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
  const guide = await sanityFetch<CareGuideData | null>(CARE_GUIDE_QUERY, {}, [
    "careGuide",
  ]);
  if (!guide || !guide.sections?.length) return SEED_CARE_GUIDE;
  return guide;
}

type SanityImage = { asset?: { _ref?: string } };
type SettingsDoc = Omit<
  Partial<SiteSettingsData>,
  "makerPhoto" | "categoryImages"
> & {
  makerPhoto?: SanityImage & { alt?: string };
  categoryImages?: {
    newArrivals?: SanityImage;
    necklaces?: SanityImage;
    bracelets?: SanityImage;
    bagCharms?: SanityImage;
  };
};

/** Square CDN URL, or undefined when the editor hasn't uploaded anything. */
function tileUrl(img?: SanityImage) {
  return img?.asset?._ref
    ? (squareUrlFor(img as never) ?? undefined)
    : undefined;
}

export async function getSettings(): Promise<SiteSettingsData> {
  const s = await sanityFetch<SettingsDoc | null>(SETTINGS_QUERY, {}, [
    "settings",
  ]);
  const maker = tileUrl(s?.makerPhoto);
  const tiles = s?.categoryImages;
  return {
    announcementMessages: s?.announcementMessages?.length
      ? s.announcementMessages
      : SEED_SETTINGS.announcementMessages,
    instagramUrl: s?.instagramUrl ?? SEED_SETTINGS.instagramUrl,
    email: s?.email,
    metaDescription: s?.metaDescription,
    aboutTeaser: s?.aboutTeaser ?? SEED_SETTINGS.aboutTeaser,
    makerPhoto: maker ? { url: maker, alt: s?.makerPhoto?.alt } : null,
    categoryImages: {
      "new-arrivals": tileUrl(tiles?.newArrivals),
      necklaces: tileUrl(tiles?.necklaces),
      bracelets: tileUrl(tiles?.bracelets),
      "bag-charms": tileUrl(tiles?.bagCharms),
    },
  };
}
