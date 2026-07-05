import Link from "next/link";
import { CATEGORIES, NEW_ARRIVALS_SLUG } from "@/lib/categories";
import { cn } from "@/lib/utils";

const PILLS = [
  { slug: "all", title: "All Pieces" },
  { slug: NEW_ARRIVALS_SLUG, title: "New Arrivals" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, title: c.title })),
];

/** Link-based pills so filtered views have shareable URLs. */
export default function CategoryFilter({ active }: { active: string }) {
  return (
    <nav
      aria-label="Product categories"
      className="flex flex-wrap justify-center gap-2.5"
    >
      {PILLS.map((pill) => {
        const isActive = active === pill.slug;
        return (
          <Link
            key={pill.slug}
            href={pill.slug === "all" ? "/shop" : `/shop?category=${pill.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "rounded-full border px-5 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-300",
              isActive
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 text-ink hover:border-ink/60",
            )}
          >
            {pill.title}
          </Link>
        );
      })}
    </nav>
  );
}
