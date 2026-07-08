"use client";

import VariantLab from "@/components/lab/VariantLab";
import HeroArch from "@/components/home/heroes/HeroArch";
import HeroEditorial from "@/components/home/heroes/HeroEditorial";
import HeroFullBleed from "@/components/home/heroes/HeroFullBleed";

const VARIANTS = [
  {
    id: "arch",
    name: "A · Boutique Arch",
    blurb:
      "Safe evolution — the launch split layout, with Taylor in a boutique-window arch instead of the oval.",
    Comp: HeroArch,
  },
  {
    id: "editorial",
    name: "B · Editorial Split",
    blurb:
      "Medium departure — left-aligned magazine grid, hairline rules, and two clean rectangles hung like a gallery wall.",
    Comp: HeroEditorial,
  },
  {
    id: "fullbleed",
    name: "C · Full-Bleed",
    blurb:
      "Bold — edge-to-edge campaign photo of the jewelry with the headline set on the image. The product is the hero. (Currently live on the homepage.)",
    Comp: HeroFullBleed,
  },
] as const;

export default function HeroLab() {
  return <VariantLab title="Hero" variants={VARIANTS} previewHeight={720} />;
}
