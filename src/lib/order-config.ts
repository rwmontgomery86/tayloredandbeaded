import { z } from "zod";
import {
  getCustomization,
  getLiveCustomization,
  getLivePricing,
  getPricing,
  getProduct,
} from "./data";
import {
  availableAddOns,
  calculateQuote,
  type QuoteConfiguration,
  type QuoteResult,
} from "./quote";
import type { ProductDetailData } from "./types";
import { formatPrice } from "./utils";

export const configSchema = z
  .object({
    initialCharm: z.boolean().optional(),
    /** The letter(s) for the initial charm; required when initialCharm is on. */
    initial: z.string().trim().min(1).max(2).optional(),
    matchingBracelet: z.boolean().optional(),
    // Bag charm options. Loose length caps only — real validation is
    // membership in the Studio-managed Customization options below, so
    // Taylor growing the option lists can never invalidate the form.
    beadColor: z.string().trim().max(200).optional(),
    /** Initial or short name strung into the charm. */
    personalization: z.string().trim().max(12).optional(),
    charms: z.array(z.string().trim().max(200)).max(50).optional(),
    bagScarf: z.boolean().optional(),
  })
  .default({});

export type OrderConfiguration = z.infer<typeof configSchema>;

export const CHECKOUT_UNAVAILABLE = "Online checkout isn't available right now";

export type ResolvedOrder =
  | {
      ok: true;
      product: ProductDetailData;
      quote: QuoteResult;
      detailLines: string[];
      configLines: string[];
    }
  | { ok: false; error: string; status: number };

/** Mask the request's add-ons by what the product actually offers. */
function allowedConfiguration(
  product: Parameters<typeof availableAddOns>[0],
  config: OrderConfiguration,
): QuoteConfiguration {
  const offers = availableAddOns(product);
  return {
    initialCharm: offers.initialCharm && Boolean(config.initialCharm),
    matchingBracelet:
      offers.matchingBracelet && Boolean(config.matchingBracelet),
    bagScarf: offers.bagScarf && Boolean(config.bagScarf),
  };
}

/**
 * `live` is for checkout: prices must come from Sanity right now, so a failed
 * lookup is an error rather than a fallback amount charged to a card.
 */
export async function resolveOrder(
  slug: string,
  config: OrderConfiguration,
  { live = false }: { live?: boolean } = {},
): Promise<ResolvedOrder> {
  if (config.initialCharm && !config.initial) {
    return {
      ok: false,
      error: "Please tell us which initial you'd like",
      status: 400,
    };
  }

  // Personalization is echoed into an email sent to an unverified address, so
  // it must read like a name or initials — never a URL or other smuggled text.
  if (
    config.personalization &&
    !/^[\p{L}\p{N} .'’&-]+$/u.test(config.personalization)
  ) {
    return {
      ok: false,
      error: "Personalization can only use letters and numbers",
      status: 400,
    };
  }

  const product = await getProduct(slug);
  if (!product || product.origin === "curated") {
    return {
      ok: false,
      error: "This piece can't be requested online",
      status: 404,
    };
  }
  if (product.sold) {
    return {
      ok: false,
      error: "This piece has already found a home",
      status: 409,
    };
  }

  const [customization, pricing] = await Promise.all([
    live ? getLiveCustomization() : getCustomization(),
    live ? getLivePricing() : getPricing(),
  ]);
  if (!customization || !pricing) {
    return { ok: false, error: CHECKOUT_UNAVAILABLE, status: 503 };
  }

  // Free bag-charm choices, validated against Taylor's Studio-managed options.
  // Unknown values are rejected, not dropped — a silently incomplete order
  // email would be worse than asking the shopper to reload and retry.
  const detailLines: string[] = [];
  if (product.category === "bag-charms") {
    const color = customization.beadColors.find(
      (c) => c.label === config.beadColor,
    );
    if (!color) {
      return { ok: false, error: "Please pick a bead color", status: 400 };
    }
    const charms = config.charms ?? [];
    if (charms.some((charm) => !customization.charmOptions.includes(charm))) {
      return {
        ok: false,
        error: "The charm options changed — please refresh the page and pick again",
        status: 400,
      };
    }
    detailLines.push(`- Bead color: ${color.label}`);
    if (charms.length) detailLines.push(`- Charms: ${charms.join(", ")}`);
    if (config.personalization)
      detailLines.push(`- Initial or name: “${config.personalization}”`);
  }

  // Always recompute the total server-side — a client-sent total is never trusted.
  const configuration = allowedConfiguration(product, config);
  const quote = calculateQuote(product, configuration, customization, pricing);

  const configLines = quote.lines.map((line) => {
    const detail =
      line.label === "Initial charm" && config.initial
        ? ` (“${config.initial.toUpperCase()}”)`
        : "";
    return `- ${line.label}${detail}: ${formatPrice(line.amount)}`;
  });

  return { ok: true, product, quote, detailLines, configLines };
}
