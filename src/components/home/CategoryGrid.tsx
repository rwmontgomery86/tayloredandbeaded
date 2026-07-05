import Image from "next/image";
import Link from "next/link";
import Section, { Container } from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CATEGORIES, NEW_ARRIVALS_SLUG } from "@/lib/categories";
import { ArrowRightIcon } from "@/components/ui/icons";

const CARDS = [
  ...CATEGORIES.map((c) => ({
    slug: c.slug,
    title: c.title,
    image: c.image,
  })),
  {
    slug: NEW_ARRIVALS_SLUG,
    title: "New Arrivals",
    image: "/products/necklace-warm-tones.png",
  },
];

export default function CategoryGrid() {
  return (
    <Section>
      <Container wide>
        <SectionHeading eyebrow="Explore the studio">
          Shop <em>by Category</em>
        </SectionHeading>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-5">
          {CARDS.map((card) => (
            <StaggerItem key={card.slug}>
              <Link
                href={`/shop?category=${card.slug}`}
                className="group block overflow-hidden rounded-[1.5rem] border border-ink/10 bg-cream"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="px-4 py-4 text-center">
                  <p className="text-[0.72rem] tracking-[0.18em] uppercase">
                    {card.title}
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-[0.62rem] tracking-[0.14em] uppercase text-ink-soft transition-colors group-hover:text-mauve-deep">
                    Shop now
                    <ArrowRightIcon
                      size={11}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
