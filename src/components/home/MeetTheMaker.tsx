import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";
import { HeartIcon } from "@/components/ui/icons";

export default function MeetTheMaker({ teaser }: { teaser: string }) {
  return (
    <Section bg="cream-dark" className="overflow-hidden">
      <FloralDecor className="right-[-3rem] top-1/2 hidden w-56 -translate-y-1/2 text-mauve/25 lg:block" flip />
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div className="relative aspect-[5/6] overflow-hidden [border-radius:2.5rem_2.5rem_2.5rem_2.5rem] md:[border-radius:52%_48%_46%_54%/48%_44%_56%_52%]">
                <Image
                  src="/photos/taylor.png"
                  alt="Taylor sitting by a rose garden"
                  fill
                  sizes="(min-width: 768px) 40vw, 85vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-2 flex h-24 w-24 items-center justify-center rounded-full border border-ink/15 bg-cream text-center md:h-28 md:w-28">
                <p className="text-[0.55rem] leading-[1.7] tracking-[0.22em] uppercase">
                  Made
                  <br />
                  with
                  <br />
                  love
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow flex items-center gap-2">
              Meet the maker
              <HeartIcon size={13} filled className="text-mauve" />
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.1rem)] font-medium leading-tight">
              Hi, I&rsquo;m <em className="font-normal italic">Taylor</em>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              {teaser}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                More About Taylor
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
