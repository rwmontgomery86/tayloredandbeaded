import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import CategoryGrid from "@/components/home/CategoryGrid";
import MeetTheMaker from "@/components/home/MeetTheMaker";
import FeaturedPieces from "@/components/home/FeaturedPieces";
import NewsletterBand from "@/components/home/NewsletterBand";
import { getFeaturedProducts, getSettings } from "@/lib/data";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    getFeaturedProducts(),
    getSettings(),
  ]);

  return (
    <>
      <Hero />
      <ValueProps />
      <CategoryGrid />
      <MeetTheMaker teaser={settings.aboutTeaser} />
      <FeaturedPieces products={featured} />
      <NewsletterBand />
    </>
  );
}
