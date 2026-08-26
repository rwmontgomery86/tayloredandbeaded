import type { CategorySlug } from "./categories";
import type { CustomizationData, PricingMap } from "./types";

const DEFAULT_BAG_SCARF_PRICE = 5;
const DEFAULT_INITIAL_CHARM_PRICE = 3;

export interface QuoteProduct {
  name: string;
  category: CategorySlug;
  /** Product-specific price, when one overrides the category base price. */
  price?: number | null;
}

export interface AddOnAvailability {
  initialCharm: boolean;
  matchingBracelet: boolean;
  bagScarf: boolean;
  /** Free bag-charm choices: bead color, personalization, charms. */
  bagCharmOptions: boolean;
}

/**
 * The single home of "which add-ons does this product offer" — the request
 * route, the configurator, and the product page must all read from here so
 * the displayed and emailed quotes can never disagree.
 */
export function availableAddOns(product: {
  category: CategorySlug;
  availability: "year-round" | "premade";
}): AddOnAvailability {
  const isNecklace = product.category === "necklaces";
  const isBagCharm = product.category === "bag-charms";
  return {
    initialCharm: isNecklace,
    matchingBracelet: isNecklace && product.availability === "year-round",
    bagScarf: isBagCharm,
    bagCharmOptions: isBagCharm,
  };
}

/** Whether a product page should render the configurator at all. */
export function isConfigurable(product: {
  category: CategorySlug;
  availability: "year-round" | "premade";
  origin: "handmade" | "curated";
  sold?: boolean;
}): boolean {
  if (product.origin !== "handmade" || product.sold) return false;
  const offers = availableAddOns(product);
  return offers.initialCharm || offers.bagCharmOptions;
}

export interface QuoteConfiguration {
  initialCharm?: boolean;
  matchingBracelet?: boolean;
  bagScarf?: boolean;
}

export interface QuoteLine {
  label: string;
  amount: number;
}

export interface QuoteResult {
  lines: QuoteLine[];
  total: number;
}

/** Compute a quote without reading external state or mutating its inputs. */
export function calculateQuote(
  product: QuoteProduct,
  configuration: QuoteConfiguration,
  customization: Partial<CustomizationData> | null | undefined,
  pricing: PricingMap,
): QuoteResult {
  const lines: QuoteLine[] = [
    {
      label: product.name,
      amount: product.price ?? pricing[product.category],
    },
  ];

  if (configuration.initialCharm) {
    lines.push({
      label: "Initial charm",
      amount:
        customization?.initialCharmPrice ?? DEFAULT_INITIAL_CHARM_PRICE,
    });
  }

  if (configuration.matchingBracelet) {
    lines.push({
      label: "Matching bracelet",
      amount: pricing.bracelets,
    });
  }

  if (configuration.bagScarf) {
    lines.push({
      label: "Matching bag scarf",
      amount: customization?.bagScarfPrice ?? DEFAULT_BAG_SCARF_PRICE,
    });
  }

  return {
    lines,
    total: lines.reduce((total, line) => total + line.amount, 0),
  };
}
