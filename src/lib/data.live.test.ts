import { beforeEach, describe, expect, it, vi } from "vitest";

const { sanityFetchMock } = vi.hoisted(() => ({
  sanityFetchMock: vi.fn<() => Promise<unknown>>(),
}));

vi.mock("../../sanity/lib/fetch", () => ({ sanityFetch: sanityFetchMock }));
vi.mock("../../sanity/env", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../../sanity/env")>()),
  sanityConfigured: true,
}));

import {
  getCheckoutSettings,
  getCustomization,
  getLiveCustomization,
  getLivePricing,
  getPricing,
} from "./data";
import { SEED_CUSTOMIZATION } from "./seed";

// With Sanity configured, a null fetch means the live values couldn't be read.
describe("live loaders when Sanity doesn't answer", () => {
  beforeEach(() => {
    sanityFetchMock.mockReset().mockResolvedValue(null);
  });

  it("returns null so checkout can refuse instead of charging defaults", async () => {
    await expect(getLivePricing()).resolves.toBeNull();
    await expect(getLiveCustomization()).resolves.toBeNull();
    await expect(getCheckoutSettings()).resolves.toBeNull();
  });

  it("still gives pages their display fallbacks", async () => {
    await expect(getPricing()).resolves.toEqual({
      necklaces: 25,
      bracelets: 15,
      "bag-charms": 15,
    });
    await expect(getCustomization()).resolves.toEqual(SEED_CUSTOMIZATION);
  });

  it("fills unset fields from defaults when the settings document loads", async () => {
    sanityFetchMock.mockResolvedValue({ salesTaxPercent: 8.25 });
    await expect(getCheckoutSettings()).resolves.toEqual({
      shippingFlatRate: 5,
      freeShippingThreshold: 100,
      salesTaxPercent: 8.25,
    });
  });
});
