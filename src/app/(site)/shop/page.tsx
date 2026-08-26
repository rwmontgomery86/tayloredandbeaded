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
    "Browse handmade beaded necklaces, bracelets, and bag charms.",
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
  const yearRoundNecklaces = products.filter(
    (product) => product.availability === "year-round",
  );
  const premadeNecklaces = products.filter(
    (product) => product.availability === "premade",
  );

  return (
    <Section className="pt-12 md:pt-16">
      <Container wide>
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">
            {category === "necklaces"
              ? "Made to order & one of a kind"
              : category === "bag-charms"
                ? "Made for you, bead by bead"
                : "Hand-strung by Taylor"}
          </p>
          <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">
            {category === "all" ? (
              <>
                The <em className="font-normal italic">Shop</em>
              </>
            ) : (
              categoryTitle(category)
            )}
          </h1>
          {category === "bag-charms" && (
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
              Pick your bead color, add an initial or name, and choose your
              charms — every bag charm is customized just for you, with a
              matching bag scarf if you&rsquo;d like one.
            </p>
          )}
        </div>

        <div className="mb-12">
          <CategoryFilter active={category} />
        </div>

        {products.length > 0 ? (
          category === "necklaces" ? (
            <div className="space-y-20 md:space-y-24">
              {yearRoundNecklaces.length > 0 && (
                <section aria-labelledby="year-round-necklaces">
                  <div className="mb-8 max-w-2xl">
                    <p className="eyebrow mb-3">Made to order</p>
                    <h2
                      id="year-round-necklaces"
                      className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium"
                    >
                      The year-round <em className="font-normal italic">collection</em>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Taylor makes these signature styles to order, so they are
                      available all year.
                    </p>
                  </div>
                  <ProductGrid products={yearRoundNecklaces} showDescriptions />
                </section>
              )}

              {premadeNecklaces.length > 0 && (
                <section aria-labelledby="premade-necklaces">
                  <div className="mb-8 max-w-2xl">
                    <p className="eyebrow mb-3">One of a kind</p>
                    <h2
                      id="premade-necklaces"
                      className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium"
                    >
                      Premade <em className="font-normal italic">necklaces</em>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      Each necklace is a one-off piece, available only until it
                      finds a home.
                    </p>
                  </div>
                  <ProductGrid products={premadeNecklaces} />
                </section>
              )}
            </div>
          ) : (
            <ProductGrid products={products} />
          )
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
