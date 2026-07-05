import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section, { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import { HeartIcon } from "@/components/ui/icons";
import { getProduct, getProductSlugs } from "@/lib/data";
import { categoryTitle } from "@/lib/categories";
import { formatPrice } from "@/lib/utils";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description:
      product.description ??
      `${product.name} — a one-of-a-kind handmade piece by Taylored & Beaded.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <Section className="pt-10 md:pt-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-8 text-[0.68rem] tracking-[0.16em] uppercase text-ink-soft">
          <Link href="/shop" className="link-underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="link-underline"
          >
            {categoryTitle(product.category)}
          </Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <Reveal delay={0.08} className="md:pt-4">
            <div className="flex flex-wrap items-center gap-3">
              {product.sold && (
                <span className="rounded-full bg-cream-dark px-3 py-1 text-[0.62rem] tracking-[0.15em] uppercase text-ink-soft">
                  Sold
                </span>
              )}
              {!product.sold && product.newArrival && (
                <span className="rounded-full bg-blush px-3 py-1 text-[0.62rem] tracking-[0.15em] uppercase text-ink">
                  New arrival
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-ink-soft">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="mt-6 max-w-prose leading-relaxed text-ink-soft">
                {product.description}
              </p>
            )}

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-2.5 text-[0.65rem]">Colors</p>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <span
                      key={c.hex}
                      title={c.label}
                      className="h-5 w-5 rounded-full ring-1 ring-ink/15"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.materials && product.materials.length > 0 && (
              <div className="mt-6">
                <p className="eyebrow mb-2.5 text-[0.65rem]">Materials</p>
                <ul className="space-y-1 text-sm text-ink-soft">
                  {product.materials.map((m) => (
                    <li key={m} className="flex items-center gap-2">
                      <HeartIcon size={10} className="text-mauve" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {product.sold ? (
                <>
                  <Button variant="outline" href={`/contact?piece=${product.slug}&sold=1`}>
                    Ask about a similar piece
                  </Button>
                  <p className="text-xs text-ink-soft">
                    This one found a home, but Taylor can make something in the
                    same spirit.
                  </p>
                </>
              ) : (
                <Button href={`/contact?piece=${product.slug}`}>
                  Inquire about this piece
                </Button>
              )}
            </div>

            <p className="mt-6 flex items-center gap-2 text-xs text-ink-soft">
              <HeartIcon size={12} filled className="text-mauve" />
              One-of-a-kind &middot; Beautifully packaged &amp; gift ready
            </p>
          </Reveal>
        </div>

        {product.related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-10 text-center font-serif text-[clamp(1.6rem,3vw,2.3rem)] font-medium">
              You may also <em className="font-normal italic">love</em>
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {product.related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
