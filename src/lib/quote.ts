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
