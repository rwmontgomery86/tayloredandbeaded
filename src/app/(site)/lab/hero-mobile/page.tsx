import type { Metadata } from "next";
import HeroMobileLab from "./HeroMobileLab";

export const metadata: Metadata = {
  title: "Mobile Hero Lab",
  robots: { index: false, follow: false },
};

export default function HeroMobileLabPage() {
  return <HeroMobileLab />;
}
