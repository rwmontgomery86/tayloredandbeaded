"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import { calculateQuote } from "@/lib/quote";
import { formatPrice } from "@/lib/utils";
import type { CustomizationData, PricingMap, ProductDetailData } from "@/lib/types";

type Status = "idle" | "pending" | "success" | "error";

const inputClasses =
  "w-full rounded-2xl border border-ink/20 bg-cream px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink/50 focus:outline-none";

const checkboxClasses =
  "h-4 w-4 shrink-0 rounded border-ink/30 accent-mauve-deep";

export default function ProductConfigurator({
  product,
  customization,
  pricing,
}: {
  product: Pick<
    ProductDetailData,
    "slug" | "name" | "price" | "category" | "availability"
  >;
  customization: CustomizationData;
  pricing: PricingMap;
}) {
  const [initialCharm, setInitialCharm] = useState(false);
  const [initial, setInitial] = useState("");
  const [matchingBracelet, setMatchingBracelet] = useState(false);
  const [beadColor, setBeadColor] = useState<string>();
  const [personalization, setPersonalization] = useState("");
  const [charms, setCharms] = useState<string[]>([]);
  const [bagScarf, setBagScarf] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>();
  const [startedAt] = useState(() => Date.now());

  const isBagCharm = product.category === "bag-charms";
  const isNecklace = product.category === "necklaces";
  const offersBracelet = isNecklace && product.availability === "year-round";

  const quote = useMemo(
    () =>
      calculateQuote(
        product,
        {
          initialCharm: isNecklace && initialCharm,
          matchingBracelet: offersBracelet && matchingBracelet,
          bagScarf: isBagCharm && bagScarf,
        },
        customization,
        pricing,
      ),
    [product, isNecklace, initialCharm, matchingBracelet, offersBracelet, isBagCharm, bagScarf, customization, pricing],
  );

  function toggleCharm(charm: string) {
    setCharms((prev) =>
      prev.includes(charm) ? prev.filter((c) => c !== charm) : [...prev, charm],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    setError(undefined);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/order-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          config: {
            initialCharm: isNecklace && initialCharm,
            initial: isNecklace && initialCharm ? initial : undefined,
            matchingBracelet: offersBracelet && matchingBracelet,
            beadColor: isBagCharm ? beadColor : undefined,
            personalization:
              isBagCharm && personalization ? personalization : undefined,
            charms: isBagCharm && charms.length ? charms : undefined,
            bagScarf: isBagCharm && bagScarf,
          },
          name: data.name,
          email: data.email,
          notes: data.notes,
          website: data.website,
          elapsed: Date.now() - startedAt,
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[2rem] border border-ink/10 bg-cream-dark/60 px-8 py-12 text-center"
        role="status"
      >
        <p className="font-serif text-2xl">
          Request sent! <em className="font-normal italic">Thank you ♡</em>
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          You&rsquo;ll find a copy in your inbox. Taylor will confirm your
          order, availability, and payment details by email soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="eyebrow mb-3 text-[0.65rem]">Make it yours</legend>

        {isBagCharm && (
          <>
            <div>
              <p className="mb-2.5 text-sm">Bead color</p>
              <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Bead color">
                {customization.beadColors.map((color) => {
                  const selected = beadColor === color.label;
                  return (
                    <button
                      key={color.label}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      title={color.label}
                      onClick={() => setBeadColor(color.label)}
                      className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-cream transition-shadow ${
                        selected ? "ring-ink" : "ring-transparent hover:ring-ink/30"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="sr-only">{color.label}</span>
                    </button>
                  );
                })}
              </div>
              {beadColor && (
                <p className="mt-2 text-xs text-ink-soft">{beadColor}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="personalization"
                className="mb-2 block pt-2 text-sm"
              >
                Initial or name{" "}
                <span className="text-ink-soft">(optional, included)</span>
              </label>
              <input
                id="personalization"
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
                maxLength={12}
                className={`${inputClasses} max-w-[14rem]`}
                placeholder="MAMA, an initial…"
              />
            </div>

            <div className="pt-2">
              <p className="mb-2.5 text-sm">
                Charms <span className="text-ink-soft">(pick any, included)</span>
              </p>
              <div className="space-y-2">
                {customization.charmOptions.map((charm) => (
                  <label
                    key={charm}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={charms.includes(charm)}
                      onChange={() => toggleCharm(charm)}
                      className={checkboxClasses}
                    />
                    {charm}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 pt-2 text-sm">
              <input
                type="checkbox"
                checked={bagScarf}
                onChange={(e) => setBagScarf(e.target.checked)}
                className={checkboxClasses}
              />
              <span>
                Add a matching bag scarf{" "}
                <span className="text-ink-soft">
                  (+{formatPrice(customization.bagScarfPrice)})
                </span>
              </span>
            </label>
          </>
        )}

        {isNecklace && (
          <>
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={initialCharm}
                onChange={(e) => setInitialCharm(e.target.checked)}
                className={checkboxClasses}
              />
              <span>
                Add an initial charm{" "}
                <span className="text-ink-soft">
                  (+{formatPrice(customization.initialCharmPrice)})
                </span>
              </span>
            </label>

            {initialCharm && (
              <div className="pl-7">
                <label htmlFor="initial" className="eyebrow mb-2 block text-[0.65rem]">
                  Which initial?
                </label>
                <input
                  id="initial"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                  required
                  maxLength={2}
                  className={`${inputClasses} max-w-[8rem] text-center uppercase`}
                  placeholder="A"
                />
              </div>
            )}

            {offersBracelet && (
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={matchingBracelet}
                  onChange={(e) => setMatchingBracelet(e.target.checked)}
                  className={checkboxClasses}
                />
                <span>
                  Add the matching bracelet{" "}
                  <span className="text-ink-soft">
                    (+{formatPrice(pricing.bracelets)})
                  </span>
                </span>
              </label>
            )}
          </>
        )}
      </fieldset>

      <div className="rounded-2xl border border-ink/10 bg-cream-dark/50 px-5 py-4 text-sm">
        <ul className="space-y-1">
          {quote.lines.map((line) => (
            <li key={line.label} className="flex justify-between gap-4">
              <span className="text-ink-soft">{line.label}</span>
              <span>{formatPrice(line.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between gap-4 border-t border-ink/10 pt-2 font-medium">
          <span>Total</span>
          <span>{formatPrice(quote.total)}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="request-name" className="eyebrow mb-2 block text-[0.65rem]">
            Name
          </label>
          <input
            id="request-name"
            name="name"
            required
            maxLength={100}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="request-email" className="eyebrow mb-2 block text-[0.65rem]">
            Email
          </label>
          <input
            id="request-email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="request-notes" className="eyebrow mb-2 block text-[0.65rem]">
          Notes <span className="normal-case text-ink-soft/70">(optional)</span>
        </label>
        <textarea
          id="request-notes"
          name="notes"
          maxLength={1000}
          rows={3}
          className={inputClasses}
          placeholder="Anything else Taylor should know — another piece you'd like, a gift note…"
        />
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      {status === "error" && (
        <p className="text-sm text-mauve-deep" role="alert">
          {error} — please try again, or email Taylor directly.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "pending"}>
          {status === "pending" ? "Sending…" : "Request this piece"}
        </Button>
        <p className="text-xs leading-relaxed text-ink-soft">
          No payment is taken online — Taylor confirms your order and payment
          details by email.
        </p>
      </div>
    </form>
  );
}
