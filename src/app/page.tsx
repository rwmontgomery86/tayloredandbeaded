import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import CategoryGrid from "@/components/home/CategoryGrid";
import MeetTheMaker from "@/components/home/MeetTheMaker";
import FeaturedPieces from "@/components/home/FeaturedPieces";
import NewsletterBand from "@/components/home/NewsletterBand";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

export default function HomePage() {
  const featured = DEMO_PRODUCTS.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryGrid />
      <MeetTheMaker />
      <FeaturedPieces products={featured} />
      <NewsletterBand />
    </>
  );
}
