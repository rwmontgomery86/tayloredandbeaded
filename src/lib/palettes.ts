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

export const CURRENT_PALETTE_VARS: Record<string, string> = {
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
    id: "porcelain",
    name: "A · Cool Porcelain",
    blurb:
      "Crisp off-whites with a whisper of grey-blue; cool near-black ink and a dustier rose accent. The furthest from brown — modern, editorial, lets the bead colors pop.",
    vars: {
      "--color-cream": "#f7f8f8",
      "--color-cream-dark": "#eceef0",
      "--color-ink": "#33363a",
      "--color-ink-soft": "#6e7378",
      "--color-mauve": "#c39aa5",
      "--color-mauve-deep": "#a67a87",
      "--color-blush": "#e8dee3",
      "--color-sage": "#aeb9b5",
    },
  },
  {
    id: "blush-ivory",
    name: "B · Blush Ivory",
    blurb:
      "Off-white warmed by pink instead of brown — rosy ivory grounds, petal-pink bands, and a slightly richer rose accent. Keeps the femininity, loses the tan cast.",
    vars: {
      "--color-cream": "#faf6f5",
      "--color-cream-dark": "#f3e9e8",
      "--color-ink": "#3e3536",
      "--color-ink-soft": "#7d6e70",
      "--color-mauve": "#c98f96",
      "--color-mauve-deep": "#ad727b",
      "--color-blush": "#f0dcdc",
      "--color-sage": "#b9c0af",
    },
  },
  {
    id: "bleached-linen",
    name: "C · Bleached Linen",
    blurb:
      "The current warm family, bleached: much lighter, much less brown, still cozy. The most conservative move — everything feels sun-brightened rather than recolored.",
    vars: {
      "--color-cream": "#fbfaf7",
      "--color-cream-dark": "#f2efe9",
      "--color-ink": "#403b36",
      "--color-ink-soft": "#7d766e",
      "--color-mauve": "#c9a1a1",
      "--color-mauve-deep": "#ab8384",
      "--color-blush": "#eee0dc",
      "--color-sage": "#bcc1b2",
    },
  },
];
