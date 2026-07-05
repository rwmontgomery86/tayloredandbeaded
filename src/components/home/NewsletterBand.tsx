import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterBand() {
  return (
    <Section bg="blush" className="py-16 md:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] font-medium">
            Stay in the <em className="font-normal italic">know</em>
          </h2>
          <p className="mx-auto mt-3 mb-7 max-w-md text-sm leading-relaxed text-ink-soft">
            Be the first to see new arrivals, exclusive offers, and sparkly
            inspiration.
          </p>
          <NewsletterForm />
        </Reveal>
      </Container>
    </Section>
  );
}
