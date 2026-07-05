import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Necklaces", value: "necklaces" },
          { title: "Bracelets", value: "bracelets" },
          { title: "Anklets", value: "anklets" },
          { title: "Bag Charms", value: "bag-charms" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price override (USD)",
      description:
        "Leave empty to use the standard category price from Pricing settings. Only set this for special pieces.",
      type: "number",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "The first photo is used on product cards.",
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: 'e.g. "glass beads", "gold-filled clasp"',
    }),
    defineField({
      name: "colors",
      title: "Color swatches",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Name", type: "string" }),
            defineField({
              name: "hex",
              title: "Hex color",
              type: "string",
              description: 'e.g. "#f4a7b9"',
              validation: (r) =>
                r.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                  name: "hex color",
                }),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "hex" },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "newArrival",
      title: "New arrival",
      type: "boolean",
      initialValue: true,
      description: "Shown in New Arrivals. Untick as pieces get older.",
    }),
    defineField({
      name: "status",
      title: "Availability",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
});
