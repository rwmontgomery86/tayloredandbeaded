import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductCardData } from "@/lib/types";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 60vw",
}: {
  product: ProductCardData;
  sizes?: string;
}) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-cream-dark">
        <div className="relative aspect-[4/5]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        {product.sold && (
          <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-[0.62rem] tracking-[0.15em] uppercase text-ink-soft">
            Sold
          </span>
        )}
        {!product.sold && product.newArrival && (
          <span className="absolute top-3 left-3 rounded-full bg-blush/90 px-3 py-1 text-[0.62rem] tracking-[0.15em] uppercase text-ink">
            New
          </span>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg leading-snug text-ink group-hover:text-mauve-deep transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{formatPrice(product.price)}</p>
        {product.colors.length > 0 && (
          <div className="mt-2.5 flex justify-center gap-1.5" aria-hidden>
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.hex}
                className="h-2.5 w-2.5 rounded-full ring-1 ring-ink/10"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
