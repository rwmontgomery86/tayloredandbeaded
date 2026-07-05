import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import ProductGrid from "@/components/product/ProductGrid";
import { getCollection, getCollectionSlugs } from "@/lib/data";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return { title: "Collection not found" };
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();

  return (
    <Section className="pt-12 md:pt-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-[0.68rem] tracking-[0.16em] uppercase text-ink-soft">
          <Link href="/collections" className="link-underline">
            Collections
          </Link>
          <span className="mx-2">/</span>
          {collection.title}
        </nav>

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
              <p className="eyebrow mb-3">A curated collection</p>
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
              Pieces for this collection are coming soon.
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
