import type { Metadata } from "next";
import Image from "next/image";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";
import { HeartIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About Taylor",
  description:
    "Meet Taylor, the maker behind Taylored & Beaded — turning setbacks into something beautiful, one hand-strung piece at a time.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="overflow-hidden pt-12 md:pt-16">
        <FloralDecor className="-left-10 top-24 hidden w-44 text-sage/40 lg:block" />
        <Container>
          <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <Reveal className="md:sticky md:top-32">
              <div className="relative mx-auto max-w-sm md:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden [border-radius:48%_52%_45%_55%/55%_48%_52%_45%]">
                  <Image
                    src="/photos/taylor.png"
                    alt="Taylor, founder of Taylored & Beaded"
                    fill
                    priority
                    sizes="(min-width: 768px) 40vw, 85vw"
                    className="object-cover object-[50%_15%]"
                  />
                </div>
                <p className="mt-6 text-center font-serif text-xl italic text-ink-soft">
                  &ldquo;Here&rsquo;s to turning setbacks into something
                  beautiful.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="eyebrow flex items-center gap-2">
                Meet the maker
                <HeartIcon size={13} filled className="text-mauve" />
              </p>
              <h1 className="mt-4 font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight">
                Hi, I&rsquo;m <em className="font-normal italic">Taylor</em>
              </h1>

              <div className="mt-7 max-w-prose space-y-5 leading-relaxed text-ink-soft">
                <p>
                  I&rsquo;m so excited to officially introduce{" "}
                  <strong className="font-medium text-ink">
                    Taylored &amp; Beaded
                  </strong>
                  .
                </p>
                <p>
                  After unexpectedly losing my job earlier this year, I found
                  myself searching for what was next. While it wasn&rsquo;t the
                  path I had planned, it gave me something I didn&rsquo;t
                  realize I needed&mdash;the opportunity to slow down, be
                  creative, and pour my energy into something that truly brings
                  me joy.
                </p>
                <p>
                  What started as a way to relieve stress and keep my hands
                  busy quickly became a passion. Creating beaded jewelry became
                  my creative outlet, my therapy, and a reminder that sometimes
                  new beginnings come from the most unexpected circumstances.
                </p>
                <p>
                  Every piece is handmade with love, creativity, and a little
                  piece of my story. Whether you&rsquo;re looking for the
                  perfect gift, a custom piece, or something special for
                  yourself, I&rsquo;m excited to share my creations with you.
                </p>
                <p>Here&rsquo;s to turning setbacks into something beautiful.</p>
                <p>
                  Thank you for being here&mdash;I can&rsquo;t wait to show you
                  what&rsquo;s to come!
                </p>
                <p className="font-serif text-xl italic text-ink">
                  Love, Taylor
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/shop">Shop the Collection</Button>
                <Button href="/contact" variant="outline">
                  Say Hello
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
