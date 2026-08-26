import { cn } from "@/lib/utils";
import type { ProductAvailability } from "@/lib/types";

export default function AvailabilityBadge({
  availability,
}: {
  availability: ProductAvailability;
}) {
  const madeToOrder = availability === "year-round";

  return (
    <span
      className={cn(
        "inline-flex whitespace-nowrap rounded-full px-3 py-1 text-[0.62rem] tracking-[0.15em] uppercase ring-1 ring-ink/10",
        madeToOrder
          ? "bg-blush/95 text-ink"
          : "bg-cream-dark/95 text-ink-soft",
      )}
    >
      {madeToOrder ? "Made to order" : "One of a kind"}
    </span>
  );
}
