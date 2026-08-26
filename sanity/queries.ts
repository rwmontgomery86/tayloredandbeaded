import { CATEGORIES } from "../src/lib/categories";

const PRODUCT_CATEGORY_FILTER = `category in ${JSON.stringify(CATEGORIES.map((category) => category.slug))}`;
const HANDMADE_PRODUCT_FILTER = `coalesce(origin, "handmade") == "handmade"`;
const HANDMADE_PRODUCT_CATEGORY_FILTER = `${PRODUCT_CATEGORY_FILTER} && ${HANDMADE_PRODUCT_FILTER}`;

/** Shared card projection for product lists. */
const CARD = `{
  _id,
  name,
  "slug": slug.current,
  category,
  price,
  "image": images[0],
  colors[]{ label, hex },
  featured,
  newArrival,
  description,
  "availability": coalesce(availability, "premade"),
  "origin": coalesce(origin, "handmade"),
  status
}`;

export const ALL_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && ${HANDMADE_PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc) ${CARD}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && defined(slug.current) && category == $category && ${HANDMADE_PRODUCT_FILTER}] | order(_createdAt desc) ${CARD}`;

export const NEW_ARRIVALS_QUERY = `*[_type == "product" && defined(slug.current) && newArrival == true && ${HANDMADE_PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc) ${CARD}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && featured == true && ${HANDMADE_PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc)[0...8] ${CARD}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug && ${PRODUCT_CATEGORY_FILTER}][0]{
  _id,
  name,
  "slug": slug.current,
  category,
  price,
  images,
  description,
  materials,
  colors[]{ label, hex },
  newArrival,
  "availability": coalesce(availability, "premade"),
  "origin": coalesce(origin, "handmade"),
  status,
  "related": *[_type == "product" && category == ^.category && _id != ^._id && coalesce(origin, "handmade") == coalesce(^.origin, "handmade") && ${PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc)[0...4] ${CARD}
}`;

export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current) && ${PRODUCT_CATEGORY_FILTER}].slug.current`;

export const COLLECTION_BY_SLUG_QUERY = `*[_type == "collection" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description,
  "intro": pt::text(intro),
  "products": products[]-> ${CARD}
}`;

export const FAQ_QUERY = `*[_type == "faqItem"] | order(order asc, _createdAt asc){
  _id,
  question,
  "answer": pt::text(answer),
  category
}`;

export const CARE_GUIDE_QUERY = `*[_type == "careGuide"][0]{
  title,
  intro,
  sections[]{ heading, "body": pt::text(body) }
}`;

export const PRICING_QUERY = `*[_type == "pricing"][0]{ necklaces, bracelets, bagCharms }`;

export const CUSTOMIZATION_QUERY = `*[_type == "customization"][0]{
  beadColors[]{ label, hex },
  charmOptions,
  bagScarfPrice,
  initialCharmPrice
}`;

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  announcementMessages,
  instagramUrl,
  email,
  metaDescription,
  aboutTeaser
}`;
