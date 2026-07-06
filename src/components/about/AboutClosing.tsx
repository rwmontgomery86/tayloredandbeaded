import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { INSTAGRAM_URL } from "@/lib/site";

/**
 * Shared layered closing for every About variant:
 * primary Shop CTA, quieter contact and Instagram follow.
 */
export default function AboutClosing() {
  return (
    <Section bg="blush" className="py-16 md:py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">Every piece carries this story</p>
          <h2 className="font-serif text-[clamp(1.8rem,3.2vw,2.6rem)] font-medium">
            Find the piece that tells{" "}
            <em className="font-normal italic">yours.</em>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/shop">Shop the Collection</Button>
            <Button href="/contact" variant="outline">
              Say Hello
            </Button>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.16em] uppercase text-ink-soft"
          >
            <InstagramIcon size={15} />
            Follow along @taylored_beaded
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
