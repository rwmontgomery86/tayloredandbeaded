import type { MetadataRoute } from "next";
import { getCollectionSlugs, getProductSlugs } from "@/lib/data";
import { CATEGORIES, NEW_ARRIVALS_SLUG } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    getProductSlugs(),
    getCollectionSlugs(),
  ]);

  const staticPages = [
    "",
    "/shop",
    "/collections",
    "/permanent-jewelry",
    "/about",
    "/contact",
    "/faq",
  ].map(
    (p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }),
  );
  const categoryPages = [...CATEGORIES.map((c) => c.slug), NEW_ARRIVALS_SLUG].map(
    (slug) => ({ url: `${SITE_URL}/shop?category=${slug}`, lastModified: new Date() }),
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...products.map((slug) => ({
      url: `${SITE_URL}/shop/${slug}`,
      lastModified: new Date(),
    })),
    ...collections.map((slug) => ({
      url: `${SITE_URL}/collections/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
