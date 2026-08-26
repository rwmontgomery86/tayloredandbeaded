import { describe, expect, it } from "vitest";
import { calculateQuote, type QuoteProduct } from "./quote";
import type { CustomizationData, PricingMap } from "./types";

const pricing: PricingMap = {
  necklaces: 27,
  bracelets: 16,
  "bag-charms": 18,
};

const customization: CustomizationData = {
  beadColors: [],
  charmOptions: [],
  bagScarfPrice: 6,
  initialCharmPrice: 4,
};

const necklace: QuoteProduct = {
  name: "Parker",
  category: "necklaces",
};

describe("calculateQuote", () => {
  it.each([
    { category: "necklaces" as const, expected: 27 },
    { category: "bracelets" as const, expected: 16 },
    { category: "bag-charms" as const, expected: 18 },
  ])("uses the $category category base price", ({ category, expected }) => {
    const quote = calculateQuote(
      { name: "Test piece", category },
      {},
      customization,
      pricing,
    );

    expect(quote).toEqual({
      lines: [{ label: "Test piece", amount: expected }],
      total: expected,
    });
  });

  it.each([
    {
      name: "a premade product price override",
      product: { ...necklace, price: 38 },
      configuration: {},
      expectedLines: [{ label: "Parker", amount: 38 }],
      expectedTotal: 38,
    },
    {
      name: "an initial charm",
      product: necklace,
      configuration: { initialCharm: true },
      expectedLines: [
        { label: "Parker", amount: 27 },
        { label: "Initial charm", amount: 4 },
      ],
      expectedTotal: 31,
    },
    {
      name: "a matching bracelet at the bracelet base price",
      product: necklace,
      configuration: { matchingBracelet: true },
      expectedLines: [
        { label: "Parker", amount: 27 },
        { label: "Matching bracelet", amount: 16 },
      ],
      expectedTotal: 43,
    },
    {
      name: "a matching bag scarf",
      product: {
        name: "Custom bag charm",
        category: "bag-charms" as const,
      },
      configuration: { bagScarf: true },
      expectedLines: [
        { label: "Custom bag charm", amount: 18 },
        { label: "Matching bag scarf", amount: 6 },
      ],
      expectedTotal: 24,
    },
    {
      name: "all add-ons together",
      product: necklace,
      configuration: {
        initialCharm: true,
        matchingBracelet: true,
        bagScarf: true,
      },
      expectedLines: [
        { label: "Parker", amount: 27 },
        { label: "Initial charm", amount: 4 },
        { label: "Matching bracelet", amount: 16 },
        { label: "Matching bag scarf", amount: 6 },
      ],
      expectedTotal: 53,
    },
  ])("prices $name", ({ product, configuration, expectedLines, expectedTotal }) => {
    expect(calculateQuote(product, configuration, customization, pricing)).toEqual({
      lines: expectedLines,
      total: expectedTotal,
    });
  });

  it.each([
    { name: "undefined options", customizationOptions: undefined },
    { name: "null options", customizationOptions: null },
    { name: "an empty options object", customizationOptions: {} },
  ])(
    "uses default add-on prices for $name",
    ({ customizationOptions }) => {
      const quote = calculateQuote(
        necklace,
        { initialCharm: true, bagScarf: true },
        customizationOptions,
        pricing,
      );

      expect(quote.lines).toEqual([
        { label: "Parker", amount: 27 },
        { label: "Initial charm", amount: 3 },
        { label: "Matching bag scarf", amount: 5 },
      ]);
      expect(quote.total).toBe(35);
    },
  );

  it("preserves configured zero-dollar add-ons", () => {
    const quote = calculateQuote(
      necklace,
      { initialCharm: true, bagScarf: true },
      { initialCharmPrice: 0, bagScarfPrice: 0 },
      pricing,
    );

    expect(quote.total).toBe(27);
  });
});
