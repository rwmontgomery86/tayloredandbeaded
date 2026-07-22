import HeroFullBleed from "@/components/home/heroes/HeroFullBleed";
import ValueProps from "@/components/home/ValueProps";
import CategoryGrid from "@/components/home/CategoryGrid";
import MakerStoryBand from "@/components/home/makers/MakerStoryBand";
import FeaturedPieces from "@/components/home/FeaturedPieces";
import PermanentJewelryBand from "@/components/home/PermanentJewelryBand";
import NewsletterBand from "@/components/home/NewsletterBand";
import { getFeaturedProducts, getSettings } from "@/lib/data";

export default async function HomePage() {
  const [featured, settings] = await Promise.all([
    getFeaturedProducts(),
    getSettings(),
  ]);

  return (
    <>
      <HeroFullBleed />
      <ValueProps />
      <CategoryGrid />
      <MakerStoryBand teaser={settings.aboutTeaser} />
      <FeaturedPieces products={featured} />
      <PermanentJewelryBand />
      <NewsletterBand />
    </>
  );
}
