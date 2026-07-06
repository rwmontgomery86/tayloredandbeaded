"use client";

import MobileVariantLab from "@/components/lab/MobileVariantLab";
import HeroFullBleed from "@/components/home/heroes/HeroFullBleed";
import HeroMobileStack from "@/components/home/heroes/mobile/HeroMobileStack";
import HeroMobilePanel from "@/components/home/heroes/mobile/HeroMobilePanel";
import HeroMobileRecrop from "@/components/home/heroes/mobile/HeroMobileRecrop";

const VARIANTS = [
  {
    id: "stack",
    name: "A · Porcelain Stack",
    blurb:
      "Type and photo never overlap — the headline owns a clean porcelain panel up top, and the campaign photo gets its own full-width moment below. Typographic-first; the subhead moves below the fold.",
    Comp: HeroMobileStack,
  },
  {
    id: "panel",
    name: "B · Frosted Panel",
    blurb:
      "The photo stays immersive and edge-to-edge; every word lives on a frosted-glass card anchored to the bottom. Keeps the campaign energy, adds a guaranteed-readable surface.",
    Comp: HeroMobilePanel,
  },
  {
    id: "recrop",
    name: "C · Recrop",
    blurb:
      "Closest to today: text stays on the image, but art-directed properly — the beads settle into the lower half and a porcelain scrim carries the type up top, so the two never fight.",
    Comp: HeroMobileRecrop,
  },
] as const;

export default function HeroMobileLab() {
  return (
    <MobileVariantLab
      title="Mobile hero"
      variants={VARIANTS}
      DesktopReference={HeroFullBleed}
      desktopNote="Desktop keeps the adopted full-bleed hero — every variant only changes how the hero arranges itself on phones."
    />
  );
}
