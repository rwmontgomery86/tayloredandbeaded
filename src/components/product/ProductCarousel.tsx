"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import { ChevronIcon } from "@/components/ui/icons";
import type { ProductCardData } from "@/lib/types";

/** Native scroll-snap carousel; buttons nudge by one card width. */
export default function ProductCarousel({ products }: { products: ProductCardData[] }) {
  const track = useRef<HTMLUListElement>(null);

  function nudge(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <li
            key={p.slug}
            className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-[calc((100%-3.75rem)/4)]"
          >
            <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 38vw, 62vw" />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center gap-3 lg:mt-0 lg:justify-normal">
        <button
          onClick={() => nudge(-1)}
          aria-label="Previous pieces"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/60 lg:absolute lg:top-1/3 lg:-left-16"
        >
          <ChevronIcon size={16} className="-scale-x-100" />
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Next pieces"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink/60 lg:absolute lg:top-1/3 lg:-right-16"
        >
          <ChevronIcon size={16} />
        </button>
      </div>
    </div>
  );
}
