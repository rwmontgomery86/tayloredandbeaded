import type { Metadata } from "next";
import PermanentJewelryLab from "./PermanentJewelryLab";

export const metadata: Metadata = {
  title: "Permanent Jewelry Lab",
  robots: { index: false, follow: false },
};

export default function PermanentJewelryLabPage() {
  return <PermanentJewelryLab />;
}
