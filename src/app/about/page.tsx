import type { Metadata } from "next";
import AboutQuietLetter from "@/components/about/AboutQuietLetter";

export const metadata: Metadata = {
  title: "About Taylor",
  description:
    "Meet Taylor, the maker behind Taylored & Beaded — turning setbacks into something beautiful, one hand-strung piece at a time.",
};

export default function AboutPage() {
  return <AboutQuietLetter />;
}
