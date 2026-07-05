import Section, { Container } from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ProductCarousel from "@/components/product/ProductCarousel";
import type { DemoProduct } from "@/lib/demo-products";

export default function FeaturedPieces({ products }: { products: DemoProduct[] }) {
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
