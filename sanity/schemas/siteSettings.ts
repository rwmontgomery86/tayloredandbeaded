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
        "Woman owned",
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
        "Taylored & Beaded was created from my love of color, creativity, and meaningful connection. Every piece is hand-strung with care in small batches—because you deserve jewelry as special as you are.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
