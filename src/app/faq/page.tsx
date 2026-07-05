import type { Metadata } from "next";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import { SparkleIcon } from "@/components/ui/icons";
import { getCareGuide, getFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ & Jewelry Care",
  description:
    "How ordering works, shipping, and how to care for your handmade beaded jewelry.",
};

export default async function FaqPage() {
  const [faq, care] = await Promise.all([getFaq(), getCareGuide()]);

  return (
    <>
      <Section className="pt-12 md:pt-16">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Good to know</p>
            <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium">
              Questions &amp; <em className="font-normal italic">Answers</em>
            </h1>
          </div>
          <Reveal>
            <Accordion
              items={faq.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-dark" id="care" className="scroll-mt-24">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Keep it sparkling</p>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] font-medium">
              {care.title.includes(" ") ? (
                <>
                  {care.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="font-normal italic">
                    {care.title.split(" ").at(-1)}
                  </em>
                </>
              ) : (
                care.title
              )}
            </h2>
            {care.intro && (
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-soft">
                {care.intro}
              </p>
            )}
          </div>

          <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {care.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.05}>
                <div className="flex gap-4">
                  <SparkleIcon size={20} className="mt-1 shrink-0 text-mauve-deep" />
                  <div>
                    <h3 className="font-serif text-xl">{s.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="mb-5 text-sm text-ink-soft">
              Still have a question? I&rsquo;d love to help.
            </p>
            <Button href="/contact" variant="outline">
              Get in Touch
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
