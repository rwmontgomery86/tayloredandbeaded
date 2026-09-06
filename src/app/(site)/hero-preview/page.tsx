import HeroSplit from "@/components/home/heroes/HeroSplit";
import HeroCover from "@/components/home/heroes/HeroCover";
import HeroPoster from "@/components/home/heroes/HeroPoster";
import ValueProps from "@/components/home/ValueProps";

/** Temporary comparison route for the close-up hero options: /hero-preview?v=1|2|3 */
export default async function HeroPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const Hero = v === "2" ? HeroCover : v === "3" ? HeroPoster : HeroSplit;
  return (
    <>
      {/* hide the Next dev-tools badge so screenshots are clean */}
      <style>{`nextjs-portal{display:none}`}</style>
      <Hero />
      <ValueProps />
    </>
  );
}
