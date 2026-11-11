import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

/** Where Square's hosted checkout sends shoppers after a successful payment. */
export default function OrderThanksPage() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <FloralDecor className="-left-8 top-8 w-40 text-sage/40" />
      <FloralDecor className="-right-8 bottom-8 w-40 text-blush" flip />
      <p className="eyebrow">Order received</p>
      <h1 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-medium">
        Thank you <em className="font-normal italic">so much ♡</em>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
        Your order is in and your receipt is on its way to your inbox. I make
        each piece by hand, so made-to-order styles usually take about a week
        before they ship. I&rsquo;ll be in touch if I have any questions about
        your choices.
      </p>
      <p className="mt-3 text-sm italic text-ink-soft">Love, Taylor</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/shop">Keep browsing</Button>
        <Button variant="outline" href="/contact">
          Questions? Get in touch
        </Button>
      </div>
    </section>
  );
}
