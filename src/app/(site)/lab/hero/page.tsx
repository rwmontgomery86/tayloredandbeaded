import type { Metadata } from "next";
import HeroLab from "./HeroLab";

export const metadata: Metadata = {
  title: "Hero Lab",
  robots: { index: false, follow: false },
};

export default function HeroLabPage() {
  return <HeroLab />;
}
