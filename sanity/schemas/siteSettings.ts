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
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
