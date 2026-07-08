import type { Metadata } from "next";
import PaletteLab from "./PaletteLab";

export const metadata: Metadata = {
  title: "Palette Lab",
  robots: { index: false, follow: false },
};

export default function PaletteLabPage() {
  return <PaletteLab />;
}
