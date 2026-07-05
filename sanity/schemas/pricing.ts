import { defineField, defineType } from "sanity";

/** Singleton: base price per category; products can override individually. */
export default defineType({
  name: "pricing",
  title: "Pricing",
  type: "document",
  fields: [
    defineField({ name: "necklaces", title: "Necklaces ($)", type: "number", initialValue: 25 }),
    defineField({ name: "bracelets", title: "Bracelets ($)", type: "number", initialValue: 15 }),
    defineField({ name: "anklets", title: "Anklets ($)", type: "number", initialValue: 15 }),
    defineField({ name: "bagCharms", title: "Bag Charms ($)", type: "number", initialValue: 15 }),
  ],
  preview: { prepare: () => ({ title: "Category pricing" }) },
});
