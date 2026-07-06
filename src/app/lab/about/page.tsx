import type { Metadata } from "next";
import AboutLab from "./AboutLab";

export const metadata: Metadata = {
  title: "About Page Lab",
  robots: { index: false, follow: false },
};

export default function AboutLabPage() {
  return <AboutLab />;
}
