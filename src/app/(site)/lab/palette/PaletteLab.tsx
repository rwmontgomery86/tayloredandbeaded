"use client";

import VariantLab, { type LabVariant } from "@/components/lab/VariantLab";
import HeroFullBleed from "@/components/home/heroes/HeroFullBleed";
import ValueProps from "@/components/home/ValueProps";
import CategoryGrid from "@/components/home/CategoryGrid";
import MakerStoryBand from "@/components/home/makers/MakerStoryBand";
import FeaturedPieces from "@/components/home/FeaturedPieces";
import NewsletterBand from "@/components/home/NewsletterBand";
import { PALETTES, type Palette } from "@/lib/palettes";
import { SEED_PRODUCTS, SEED_FEATURED_SLUGS } from "@/lib/seed";

const featured = SEED_PRODUCTS.filter((p) =>
  SEED_FEATURED_SLUGS.includes(p.slug),
);

/** The live homepage sections, rendered as the palette comparison canvas. */
function HomeSampler() {
  return (
    <>
      <HeroFullBleed />
      <ValueProps />
      <CategoryGrid />
      <MakerStoryBand />
      <FeaturedPieces products={featured} />
      <NewsletterBand />
    </>
  );
}

/** Scopes the design tokens so everything inside renders in the palette. */
function paletteVariant(palette: Palette): LabVariant {
  return {
    id: palette.id,
    name: palette.name,
    blurb: palette.blurb,
    Comp: function PaletteScope() {
      return (
        <div
          style={palette.vars as React.CSSProperties}
          className="bg-cream text-ink"
        >
          <HomeSampler />
        </div>
      );
    },
  };
}

const VARIANTS = PALETTES.map(paletteVariant);

export default function PaletteLab() {
  return (
    <VariantLab title="Palette" variants={VARIANTS} previewHeight={1400} />
  );
}
