import { beforeEach, describe, expect, it, vi } from "vitest";
import { ALL_PRODUCTS_QUERY, PRICING_QUERY } from "../../sanity/queries";

const { sanityFetchMock } = vi.hoisted(() => ({
  sanityFetchMock: vi.fn<
    (
      query: string,
      params: Record<string, unknown>,
      tags: string[],
    ) => Promise<unknown>
  >(),
}));

vi.mock("../../sanity/lib/fetch", () => ({
  sanityFetch: sanityFetchMock,
}));

import { getCollection, getProduct, getProducts } from "./data";

describe("product origin data behavior", () => {
  beforeEach(() => {
    sanityFetchMock.mockReset();
  });

  it("keeps curated seed products out of handmade listings but exposes The Edit", async () => {
    sanityFetchMock.mockResolvedValue(null);

    const [necklaces, curatedProduct, theEdit] = await Promise.all([
      getProducts("necklaces"),
      getProduct("sage-marble-stone-necklace"),
      getCollection("the-edit"),
    ]);

    expect(necklaces.length).toBeGreaterThan(0);
    expect(necklaces.every((product) => product.origin === "handmade")).toBe(
      true,
    );
    expect(curatedProduct?.origin).toBe("curated");
    expect(
      curatedProduct?.related.every((product) => product.origin === "curated"),
    ).toBe(true);
    expect(theEdit?.intro).toContain("curated rather than handmade by me");
    expect(theEdit?.products).toHaveLength(7);
    expect(
      theEdit?.products.every((product) => product.origin === "curated"),
    ).toBe(true);
  });

  it("normalizes a missing origin to handmade", async () => {
    sanityFetchMock.mockImplementation(async (query) => {
      if (query === PRICING_QUERY) return null;
      if (query === ALL_PRODUCTS_QUERY) {
        return [
          {
            _id: "legacy-necklace",
            name: "Legacy Necklace",
            slug: "legacy-necklace",
            category: "necklaces",
            colors: [],
          },
        ];
      }
      return null;
    });

    await expect(getProducts()).resolves.toMatchObject([
      {
        id: "legacy-necklace",
        origin: "handmade",
        availability: "premade",
      },
    ]);
  });
});
