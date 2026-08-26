import { defineField, defineType } from "sanity";

const DEFAULT_BEAD_COLORS = [
  {
    _type: "object",
    _key: "bright-blue",
    label: "Bright Blue",
    hex: "#2F7FB8",
  },
  { _type: "object", _key: "pink", label: "Pink", hex: "#F4A7B9" },
  {
    _type: "object",
    _key: "red-coral",
    label: "Red/Coral",
    hex: "#E76F61",
  },
  {
    _type: "object",
    _key: "caramel-brown",
    label: "Caramel/Brown",
    hex: "#A66A3F",
  },
  {
    _type: "object",
    _key: "lavender-purple",
    label: "Lavender Purple",
    hex: "#9B83C5",
  },
  {
    _type: "object",
    _key: "seafoam-green",
    label: "Seafoam Green",
    hex: "#9CCDBF",
  },
];

const DEFAULT_CHARM_OPTIONS = ["MAMA", "Heart", "Cross", "Smiley Face", "Bow"];

/** Singleton: shopper-selectable options and their add-on prices. */
export default defineType({
  name: "customization",
  title: "Customization",
  type: "document",
  initialValue: {
    beadColors: DEFAULT_BEAD_COLORS,
    charmOptions: DEFAULT_CHARM_OPTIONS,
    bagScarfPrice: 5,
    initialCharmPrice: 3,
  },
  fields: [
    defineField({
      name: "beadColors",
      title: "Bead colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "hex",
              title: "Hex color",
              type: "string",
              description: 'e.g. "#2F7FB8"',
              validation: (r) =>
                r
                  .required()
                  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
                    name: "hex color",
                  }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "hex" } },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "charmOptions",
      title: "Charm options",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.required().min(1).unique(),
    }),
    defineField({
      name: "bagScarfPrice",
      title: "Matching bag scarf ($)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "initialCharmPrice",
      title: "Initial charm ($)",
      type: "number",
      initialValue: 3,
      validation: (r) => r.required().min(0),
    }),
  ],
  preview: { prepare: () => ({ title: "Customization options" }) },
});
