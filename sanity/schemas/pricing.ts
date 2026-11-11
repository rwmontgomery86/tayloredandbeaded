import { defineField, defineType } from "sanity";

/** Singleton: base price per category; products can override individually. */
export default defineType({
  name: "pricing",
  title: "Pricing",
  type: "document",
  fields: [
    defineField({ name: "necklaces", title: "Necklaces ($)", type: "number", initialValue: 25 }),
    defineField({ name: "bracelets", title: "Bracelets ($)", type: "number", initialValue: 15 }),
    defineField({ name: "bagCharms", title: "Bag Charms ($)", type: "number", initialValue: 15 }),
    defineField({
      name: "shippingFlatRate",
      title: "Shipping charge ($)",
      type: "number",
      description: "Flat shipping charge for orders below the free shipping amount.",
      initialValue: 5,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "freeShippingThreshold",
      title: "Free shipping at ($)",
      type: "number",
      description: "Orders with a subtotal at or above this amount ship free.",
      initialValue: 100,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "salesTaxPercent",
      title: "Sales tax (%)",
      type: "number",
      description: "Leave 0 until confirmed what must be collected.",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: { prepare: () => ({ title: "Category pricing" }) },
});
