import { defineField, defineType } from "sanity";

/** Singleton: site-wide editable settings. */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "announcementMessages",
      title: "Announcement bar messages",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(4),
      initialValue: [
        "Handmade with love",
        "Free shipping on orders $75+",
      ],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/taylored_beaded/",
    }),
    defineField({
      name: "email",
      title: "Public contact email",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Default SEO description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "aboutTeaser",
      title: "Homepage 'Meet the Maker' blurb",
      type: "text",
      rows: 3,
      initialValue:
        "What started as a way to relieve stress after unexpectedly losing my job became my creative outlet, my therapy, and my passion. Every piece is handmade with love, creativity, and a little piece of my story.",
    }),
    defineField({
      name: "makerPhoto",
      title: "Homepage 'Meet the Maker' photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Shown as a square. Drag the hotspot to choose what stays in frame. Leave empty to use the built-in photo.",
      fields: [
        defineField({
          name: "alt",
          title: "Photo description",
          type: "string",
          description: "Read aloud by screen readers, e.g. 'Taylor at her workbench'.",
        }),
      ],
    }),
    defineField({
      name: "categoryImages",
      title: "Homepage 'Shop by Category' tiles",
      type: "object",
      description:
        "Each tile is a square. Leave a tile empty to keep the built-in photo.",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "newArrivals", title: "New Arrivals" },
        { name: "necklaces", title: "Necklaces" },
        { name: "bracelets", title: "Bracelets" },
        { name: "bagCharms", title: "Bag Charms" },
      ].map((f) =>
        defineField({ ...f, type: "image", options: { hotspot: true } }),
      ),
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
