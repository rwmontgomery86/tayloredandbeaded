import Button from "@/components/ui/Button";
import FloralDecor from "@/components/ui/FloralDecor";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center">
      <FloralDecor className="-left-8 top-8 w-40 text-sage/40" />
      <FloralDecor className="-right-8 bottom-8 w-40 text-blush" flip />
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-medium">
        This one got away from <em className="font-normal italic">the string.</em>
      </h1>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
        The page you&rsquo;re looking for doesn&rsquo;t exist&mdash;but there
        are plenty of beautiful pieces waiting for you.
      </p>
      <div className="mt-8">
        <Button href="/shop">Browse the Shop</Button>
      </div>
    </section>
  );
}
