/**
 * Palette explorations for the design lab. Each entry overrides the
 * design tokens from globals.css; every `bg-cream`/`text-ink`/… utility
 * inside a scoped wrapper resolves to these values via the cascade.
 */
export interface Palette {
  id: string;
  name: string;
  blurb: string;
  vars: Record<string, string>;
}

/** The retired warm-cream palette, kept for comparison in the lab. */
export const LEGACY_CREAM_VARS: Record<string, string> = {
  "--color-cream": "#f7f4ef",
  "--color-cream-dark": "#efe9e0",
  "--color-ink": "#3d3733",
  "--color-ink-soft": "#7a716a",
  "--color-mauve": "#c49a9a",
  "--color-mauve-deep": "#a87e80",
  "--color-blush": "#e8d9d5",
  "--color-sage": "#b8bdad",
};

export const PALETTES: Palette[] = [
  {
    id: "warm-ivory",
    name: "A · Warm Ivory",
    blurb:
      "The cozy end of black & white — creamy ivory grounds, putty bands, and a warm soft-black accent. Feels like a boutique with linen curtains; the gentlest way to go monochrome.",
    vars: {
      "--color-cream": "#faf8f4",
      "--color-cream-dark": "#f2eee6",
      "--color-ink": "#2c2823",
      "--color-ink-soft": "#79726a",
      "--color-mauve": "#2b241d",
      "--color-mauve-deep": "#17130e",
      "--color-blush": "#efe9df",
      "--color-sage": "#b5aca0",
    },
  },
  {
    id: "porcelain-charcoal",
    name: "B · Porcelain Charcoal",
    blurb:
      "Quiet modern — keeps the site's current cool porcelain off-whites and swaps the rose accent for charcoal. The middle path: monochrome without going stark.",
    vars: {
      "--color-cream": "#f7f8f8",
      "--color-cream-dark": "#eceef0",
      "--color-ink": "#2e3134",
      "--color-ink-soft": "#6e7378",
      "--color-mauve": "#43474b",
      "--color-mauve-deep": "#2a2d30",
      "--color-blush": "#e4e7e9",
      "--color-sage": "#a9b0b4",
    },
  },
  {
    id: "gallery",
    name: "C · Gallery",
    blurb:
      "High-contrast editorial — pure white grounds and true black accents, like an art-gallery lookbook. The starkest take; the bead colors carry all the color.",
    vars: {
      "--color-cream": "#ffffff",
      "--color-cream-dark": "#f5f5f5",
      "--color-ink": "#121212",
      "--color-ink-soft": "#6b6b6b",
      "--color-mauve": "#111111",
      "--color-mauve-deep": "#000000",
      "--color-blush": "#ececec",
      "--color-sage": "#9a9a9a",
    },
  },
];
