import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import ProductGrid from "@/components/product/ProductGrid";
import { getCollection } from "@/lib/data";

// The Edit is the one curated (not handmade) grouping, so it gets its own
// page instead of living under a general collections index.
const SLUG = "the-edit";

export async function generateMetadata(): Promise<Metadata> {
  const collection = await getCollection(SLUG);
  if (!collection) return { title: "The Edit" };
  return { title: collection.title, description: collection.description };
}

export default async function TheEditPage() {
  const collection = await getCollection(SLUG);
  if (!collection) notFound();

  return (
    <Section className="pt-12 md:pt-16">
      <Container>
        <Reveal>
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
            {collection.image && (
              <div className="relative aspect-[7/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 92vw"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="eyebrow mb-3">Personally selected by Taylor</p>
              <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight">
                {collection.title}
              </h1>
              {collection.intro && (
                <p className="mt-5 max-w-prose leading-relaxed text-ink-soft">
                  {collection.intro}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-20">
          {collection.products.length > 0 ? (
            <ProductGrid products={collection.products} />
          ) : (
            <p className="py-10 text-center text-ink-soft">
              Pieces for The Edit are coming soon.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
