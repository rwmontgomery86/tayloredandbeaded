import type { Metadata } from "next";
import MakerLab from "./MakerLab";

export const metadata: Metadata = {
  title: "Meet-the-Maker Lab",
  robots: { index: false, follow: false },
};

export default function MakerLabPage() {
  return <MakerLab />;
}
