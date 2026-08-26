import { CATEGORIES } from "../src/lib/categories";

const PRODUCT_CATEGORY_FILTER = `category in ${JSON.stringify(CATEGORIES.map((category) => category.slug))}`;

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
  "availability": coalesce(availability, "premade"),
  status
}`;

export const ALL_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && ${PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc) ${CARD}`;

export const PRODUCTS_BY_CATEGORY_QUERY = `*[_type == "product" && defined(slug.current) && category == $category] | order(_createdAt desc) ${CARD}`;

export const NEW_ARRIVALS_QUERY = `*[_type == "product" && defined(slug.current) && newArrival == true && ${PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc) ${CARD}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && featured == true && ${PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc)[0...8] ${CARD}`;

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
  status,
  "related": *[_type == "product" && category == ^.category && _id != ^._id && ${PRODUCT_CATEGORY_FILTER}] | order(_createdAt desc)[0...4] ${CARD}
}`;

export const PRODUCT_SLUGS_QUERY = `*[_type == "product" && defined(slug.current) && ${PRODUCT_CATEGORY_FILTER}].slug.current`;

export const COLLECTIONS_QUERY = `*[_type == "collection" && defined(slug.current)] | order(order asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description
}`;

export const COLLECTION_BY_SLUG_QUERY = `*[_type == "collection" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  coverImage,
  description,
  "intro": pt::text(intro),
  "products": products[]->[${PRODUCT_CATEGORY_FILTER}] ${CARD}
}`;

export const COLLECTION_SLUGS_QUERY = `*[_type == "collection" && defined(slug.current)].slug.current`;

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

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  announcementMessages,
  instagramUrl,
  email,
  metaDescription,
  aboutTeaser
}`;
