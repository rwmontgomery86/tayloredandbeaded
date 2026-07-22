"use client";

import VariantLab from "@/components/lab/VariantLab";
import PjEditorialBands from "@/components/permanent-jewelry/PjEditorialBands";
import PjBookingBrochure from "@/components/permanent-jewelry/PjBookingBrochure";
import PjGalleryMosaic from "@/components/permanent-jewelry/PjGalleryMosaic";

const VARIANTS = [
  {
    id: "editorial-bands",
    name: "A · Editorial Bands",
    blurb:
      "Safe — the site's classic long scroll: full-bleed event hero, alternating photo/text bands, icon step row, FAQ accordion, and a soft closing band.",
    Comp: PjEditorialBands,
  },
  {
    id: "booking-brochure",
    name: "B · Booking Brochure",
    blurb:
      "Medium — a service page built to convert: a sticky booking card keeps the event inquiry in view while the story, steps, and FAQ scroll beside it.",
    Comp: PjBookingBrochure,
  },
  {
    id: "gallery-mosaic",
    name: "C · Gallery Mosaic",
    blurb:
      "Bold — leans into the Gallery palette: a tiled hero of type and photography, then occasions, steps, and FAQ as card grids ending on a dark CTA tile.",
    Comp: PjGalleryMosaic,
  },
] as const;

export default function PermanentJewelryLab() {
  return (
    <VariantLab
      title="Permanent jewelry"
      variants={VARIANTS}
      previewHeight={3850}
    />
  );
}
