import Section, { Container } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function PermanentJewelryBand() {
  return (
    <Section bg="cream-dark" className="py-16 md:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">New — permanent jewelry</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-medium">
            Jewelry that <em className="font-normal italic">stays</em>.
          </h2>
          <p className="mx-auto mt-3 mb-7 max-w-md text-sm leading-relaxed text-ink-soft">
            Dainty chains custom-fit and welded closed, in person — at
            pop-ups, parties, and events around town. Taylor comes to you.
          </p>
          <Button href="/permanent-jewelry" variant="outline">
            Discover Permanent Jewelry
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
