import product from "./product";
import pricing from "./pricing";
import collection from "./collection";
import faqItem from "./faqItem";
import careGuide from "./careGuide";
import siteSettings from "./siteSettings";

export const schemaTypes = [
  product,
  collection,
  faqItem,
  pricing,
  careGuide,
  siteSettings,
];

/** Document types that should exist exactly once. */
export const singletonTypes = ["pricing", "careGuide", "siteSettings"];
