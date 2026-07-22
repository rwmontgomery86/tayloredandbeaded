import type { Metadata } from "next";
import Section, { Container } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import FloralDecor from "@/components/ui/FloralDecor";
import { InstagramIcon, HeartIcon, GiftIcon } from "@/components/ui/icons";
import { getProduct, getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Inquire about a piece, ask a question, or just say hi — Taylor reads every message.",
};

const TOPIC_SUBJECTS: Record<string, string> = {
  "permanent-jewelry": "Permanent jewelry — book a fitting",
  "permanent-jewelry-event": "Permanent jewelry — event / pop-up inquiry",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ piece?: string; sold?: string; topic?: string }>;
}) {
  const { piece, sold, topic } = await searchParams;
  const settings = await getSettings();
  const product = piece ? await getProduct(piece) : null;
  const topicSubject = topic ? TOPIC_SUBJECTS[topic] : undefined;
  const defaultSubject = product
    ? sold
      ? `A piece like "${product.name}"`
      : `Inquiry: ${product.name}`
    : topicSubject;

  return (
    <Section className="overflow-hidden pt-12 md:pt-16">
      <FloralDecor className="-right-10 top-16 hidden w-40 text-blush lg:block" flip />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <Reveal>
            <p className="eyebrow mb-3">Say hello</p>
            <h1 className="font-serif text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight">
              Let&rsquo;s make something{" "}
              <em className="font-normal italic">special.</em>
            </h1>
            <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">
              Interested in a piece? Dreaming up a custom design? Or just want
              to say hi? Send a note&mdash;Taylor reads and answers every
              message herself.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-ink-soft">
              <li className="flex items-center gap-3">
                <HeartIcon size={16} className="text-mauve-deep" />
                Every piece is one-of-a-kind
              </li>
              <li className="flex items-center gap-3">
                <GiftIcon size={16} className="text-mauve-deep" />
                Beautifully packaged &amp; gift ready
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={16} className="text-mauve-deep" />
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  DM on Instagram works too
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            {product && (
              <p className="mb-5 rounded-2xl bg-blush/50 px-5 py-3.5 text-sm text-ink">
                {sold ? (
                  <>
                    Asking about a piece similar to{" "}
                    <strong className="font-medium">{product.name}</strong> —
                    great choice, Taylor loves making custom versions.
                  </>
                ) : (
                  <>
                    Inquiring about{" "}
                    <strong className="font-medium">{product.name}</strong> —
                    it&rsquo;s a beauty!
                  </>
                )}
              </p>
            )}
            {!product && topicSubject && (
              <p className="mb-5 rounded-2xl bg-blush/50 px-5 py-3.5 text-sm text-ink">
                Asking about permanent jewelry — lovely! Tell Taylor your date
                or occasion and she&rsquo;ll reply with all the details.
              </p>
            )}
            <ContactForm defaultSubject={defaultSubject} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
