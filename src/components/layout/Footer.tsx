import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { INSTAGRAM_URL } from "@/lib/site";
import { HeartIcon, InstagramIcon } from "@/components/ui/icons";
import NewsletterForm from "@/components/forms/NewsletterForm";

const HELP_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/faq#care", label: "Jewelry Care" },
  { href: "/contact", label: "Contact" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Taylor" },
  { href: "/collections", label: "Collections" },
  { href: "/shop?category=new-arrivals", label: "New Arrivals" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/logo.png"
              alt="Taylored & Beaded"
              width={72}
              height={72}
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              One-of-a-kind beaded pieces, hand-strung with love in small
              batches. Here&rsquo;s to turning setbacks into something
              beautiful.
            </p>
          </div>

          <nav aria-label="Shop">
            <p className="eyebrow mb-4">Shop</p>
            <ul className="space-y-2.5">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="link-underline text-sm text-ink"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help and company">
            <p className="eyebrow mb-4">Info</p>
            <ul className="space-y-2.5">
              {[...HELP_LINKS, ...COMPANY_LINKS].map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="link-underline text-sm text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Stay in the know</p>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft">
              New arrivals, exclusive offers, and sparkly inspiration.
            </p>
            <NewsletterForm compact />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-mauve-deep"
            >
              <InstagramIcon size={18} />
              @taylored_beaded
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-2 border-t border-ink/10 pt-6 text-center">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} Taylored & Beaded. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-ink-soft">
            Handmade with
            <HeartIcon size={12} filled className="text-mauve" />
            by Taylor
          </p>
        </div>
      </div>
    </footer>
  );
}
