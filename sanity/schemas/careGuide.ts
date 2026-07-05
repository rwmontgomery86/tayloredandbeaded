import { defineField, defineType } from "sanity";

/** Singleton: the jewelry care guide shown on /faq#care. */
export default defineType({
  name: "careGuide",
  title: "Care Guide",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Jewelry Care",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Jewelry Care guide" }) },
});
