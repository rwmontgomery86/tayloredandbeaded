import type { Metadata } from "next";
import Section, { Container } from "@/components/ui/Section";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import Button from "@/components/ui/Button";
import { getProducts } from "@/lib/data";
import { categoryTitle, NEW_ARRIVALS_SLUG, CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse one-of-a-kind handmade beaded necklaces, bracelets, anklets, and bag charms.",
};

const VALID = new Set(["all", NEW_ARRIVALS_SLUG, ...CATEGORIES.map((c) => c.slug)]);

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: raw } = await searchParams;
  const category = raw && VALID.has(raw) ? raw : "all";
  const products = await getProducts(category === "all" ? undefined : category);

  return (
    <Section className="pt-12 md:pt-16">
      <Container wide>
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">One-of-a-kind, hand-strung</p>
          <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">
            {category === "all" ? (
              <>
                The <em className="font-normal italic">Shop</em>
              </>
            ) : (
              categoryTitle(category)
            )}
          </h1>
        </div>

        <div className="mb-12">
          <CategoryFilter active={category} />
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl">
              New pieces coming <em className="font-normal italic">soon</em>
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              Taylor is at the beading table right now. Follow along on
              Instagram or join the newsletter to see new pieces first.
            </p>
            <div className="mt-8">
              <Button href="/shop" variant="outline">
                View All Pieces
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
