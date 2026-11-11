import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildPaymentLinkRequest } from "./checkout";
import { checkoutEnabled, createPaymentLink, getSquareConfig } from "./square";

const body = buildPaymentLinkRequest({
  quote: { lines: [{ label: "Parker", amount: 25 }], total: 25 },
  details: [],
  settings: { shippingFlatRate: 5, freeShippingThreshold: 100, salesTaxPercent: 0 },
  locationId: "location-1",
  redirectUrl: "https://example.com/order/thanks",
  idempotencyKey: "request-1",
});
const config = {
  accessToken: "test-token",
  locationId: "location-1",
  baseUrl: "https://connect.squareupsandbox.com",
};
const fetchMock = vi.fn<typeof fetch>();

describe("Square client", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("SQUARE_ACCESS_TOKEN", config.accessToken);
    vi.stubEnv("SQUARE_LOCATION_ID", config.locationId);
    vi.stubEnv("SQUARE_ENVIRONMENT", "sandbox");
    vi.stubEnv("CHECKOUT_ENABLED", "true");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each([undefined, "sandbox", "staging", "production"])(
    "uses production only for the exact production environment: %s",
    (environment) => {
      vi.stubEnv("SQUARE_ENVIRONMENT", environment);
      expect(getSquareConfig()).toEqual({
        ...config,
        baseUrl: environment === "production"
          ? "https://connect.squareup.com"
          : "https://connect.squareupsandbox.com",
      });
    },
  );

  it("requires an exact true flag and both credentials", () => {
    expect(checkoutEnabled()).toBe(true);
    vi.stubEnv("CHECKOUT_ENABLED", "TRUE");
    expect(checkoutEnabled()).toBe(false);
    vi.stubEnv("CHECKOUT_ENABLED", "true");
    vi.stubEnv("SQUARE_ACCESS_TOKEN", "");
    expect(getSquareConfig()).toBeNull();
    expect(checkoutEnabled()).toBe(false);
    vi.stubEnv("SQUARE_ACCESS_TOKEN", config.accessToken);
    vi.stubEnv("SQUARE_LOCATION_ID", "");
    expect(getSquareConfig()).toBeNull();
    expect(checkoutEnabled()).toBe(false);
  });

  it("returns the hosted URL and optional order ID", async () => {
    fetchMock.mockResolvedValueOnce(Response.json({
      payment_link: { url: "https://square.link/u/test", order_id: "order-1" },
    }));
    await expect(createPaymentLink(config, body)).resolves.toEqual({
      url: "https://square.link/u/test", orderId: "order-1",
    });
    fetchMock.mockResolvedValueOnce(Response.json({
      payment_link: { url: "https://square.link/u/test" },
    }));
    await expect(createPaymentLink(config, body)).resolves.toEqual({
      url: "https://square.link/u/test",
    });
  });

  it.each([200, 400])("includes Square error details when no URL is returned with status %s", async (status) => {
    fetchMock.mockResolvedValue(Response.json({
      errors: [{ detail: "Invalid location" }, { detail: "Contact support" }],
    }, { status }));
    await expect(createPaymentLink(config, body)).rejects.toThrow("Invalid location; Contact support");
  });

  it("rejects non-2xx even when a payment URL is present", async () => {
    fetchMock.mockResolvedValue(Response.json({
      payment_link: { url: "https://square.link/u/test" },
      errors: [{ detail: "Request rejected" }],
    }, { status: 400 }));
    await expect(createPaymentLink(config, body)).rejects.toThrow("Request rejected");
  });

  it("rejects missing URLs and non-JSON responses", async () => {
    fetchMock.mockResolvedValueOnce(Response.json({ payment_link: {} }));
    await expect(createPaymentLink(config, body)).rejects.toThrow("missing payment link URL");
    fetchMock.mockResolvedValueOnce(new Response("Bad Gateway", { status: 502 }));
    await expect(createPaymentLink(config, body)).rejects.toThrow("Square checkout failed (502)");
  });

  it("redacts credentials if Square echoes them in an error", async () => {
    fetchMock.mockResolvedValue(Response.json({
      errors: [{ detail: "Invalid credential test-token" }],
    }, { status: 401 }));
    await expect(createPaymentLink(config, body)).rejects.toThrow("Invalid credential [redacted]");
  });
});
