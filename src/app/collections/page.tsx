import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section, { Container } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import PlaceholderImage from "@/components/product/PlaceholderImage";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getCollections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Curated collections of one-of-a-kind handmade beaded jewelry by Taylored & Beaded.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <Section className="pt-12 md:pt-16">
      <Container>
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">Curated by mood &amp; moment</p>
          <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">
            The <em className="font-normal italic">Collections</em>
          </h1>
        </div>

        {collections.length > 0 ? (
          <Stagger className="grid gap-8 md:grid-cols-2">
            {collections.map((c) => (
              <StaggerItem key={c.id}>
                <Link href={`/collections/${c.slug}`} className="group block">
                  <div className="relative aspect-[7/5] overflow-hidden rounded-[2rem] bg-cream-dark">
                    {c.image ? (
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 92vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <PlaceholderImage />
                    )}
                  </div>
                  <div className="mt-5 text-center">
                    <h2 className="font-serif text-2xl group-hover:text-mauve-deep transition-colors">
                      {c.title}
                    </h2>
                    {c.description && (
                      <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
                        {c.description}
                      </p>
                    )}
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.15em] uppercase text-ink-soft transition-colors group-hover:text-mauve-deep">
                      Explore
                      <ArrowRightIcon size={11} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="py-16 text-center text-ink-soft">
            Collections are being curated&mdash;check back soon.
          </p>
        )}
      </Container>
    </Section>
  );
}
