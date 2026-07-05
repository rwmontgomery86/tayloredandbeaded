import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import ProductCard from "./ProductCard";
import type { ProductCardData } from "@/lib/types";

export default function ProductGrid({ products }: { products: ProductCardData[] }) {
  return (
    <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
      {products.map((p) => (
        <StaggerItem key={p.id}>
          <ProductCard product={p} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
