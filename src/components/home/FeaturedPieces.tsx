import Section, { Container } from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ProductCarousel from "@/components/product/ProductCarousel";
import type { ProductCardData } from "@/lib/types";

export default function FeaturedPieces({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null;
  return (
    <Section>
      <Container className="md:px-8">
        <SectionHeading eyebrow="Hand-picked by Taylor">
          Featured <em>Pieces</em>
        </SectionHeading>
        <Reveal>
          <ProductCarousel products={products} />
        </Reveal>
      </Container>
    </Section>
  );
}
