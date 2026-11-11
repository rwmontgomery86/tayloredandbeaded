import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ProductDetailData } from "@/lib/types";
import type { PaymentLinkRequest } from "@/lib/checkout";
import { SEED_CUSTOMIZATION } from "@/lib/seed";

const parker: ProductDetailData = {
  id: "seed-parker-necklace",
  name: "Parker",
  slug: "parker-necklace",
  category: "necklaces",
  availability: "year-round",
  origin: "handmade",
  price: 25,
  images: [],
  colors: [],
  sold: false,
  related: [],
};

const mocks = vi.hoisted(() => ({ getProduct: vi.fn() }));

vi.mock("@/lib/data", () => ({
  getProduct: mocks.getProduct,
  getCustomization: async () => SEED_CUSTOMIZATION,
  getPricing: async () => ({ necklaces: 25, bracelets: 15, "bag-charms": 15 }),
  getCheckoutSettings: async () => ({
    shippingFlatRate: 5, freeShippingThreshold: 100, salesTaxPercent: 0,
  }),
}));

import { POST } from "./route";

const fetchMock = vi.fn<typeof fetch>();
const checkoutUrl = "https://square.link/u/test";
const valid = {
  slug: "parker-necklace",
  config: { initialCharm: true, initial: "a", matchingBracelet: true },
};

function request(body: unknown, ip?: string) {
  return new Request("https://example.com/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(ip ? { "x-forwarded-for": ip } : {}) },
    body: JSON.stringify(body),
  });
}

function sentBody(): PaymentLinkRequest {
  return JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    mocks.getProduct.mockReset().mockResolvedValue(parker);
    fetchMock.mockReset().mockImplementation(async () => Response.json({
      payment_link: { url: checkoutUrl, order_id: "order-1" },
    }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("CHECKOUT_ENABLED", "true");
    vi.stubEnv("SQUARE_ACCESS_TOKEN", "test-token");
    vi.stubEnv("SQUARE_LOCATION_ID", "location-1");
    vi.stubEnv("SQUARE_ENVIRONMENT", "sandbox");
    vi.stubEnv("CONTACT_TO_EMAIL", "taylor@example.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns 503 when CHECKOUT_ENABLED is unset", async () => {
    vi.stubEnv("CHECKOUT_ENABLED", undefined);
    const res = await POST(request(valid));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "Online checkout isn't available right now" });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mocks.getProduct).not.toHaveBeenCalled();
  });

  it.each(["SQUARE_ACCESS_TOKEN", "SQUARE_LOCATION_ID"])("returns 503 without %s", async (key) => {
    vi.stubEnv(key, undefined);
    expect((await POST(request(valid))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects invalid bodies before checking whether checkout is enabled", async () => {
    vi.stubEnv("CHECKOUT_ENABLED", undefined);
    expect((await POST(request({ slug: "" }))).status).toBe(400);
    expect((await POST(request({ ...valid, config: { initialCharm: "yes" } }))).status).toBe(400);
    expect((await POST(new Request("https://example.com/api/checkout", {
      method: "POST", body: "{",
    }))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 404 for curated or missing products", async () => {
    mocks.getProduct.mockResolvedValue({ ...parker, origin: "curated" });
    expect((await POST(request(valid))).status).toBe(404);
    mocks.getProduct.mockResolvedValue(null);
    expect((await POST(request(valid))).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps one-of-a-kind pieces on the email request", async () => {
    mocks.getProduct.mockResolvedValue({ ...parker, availability: "premade" });
    expect((await POST(request(valid))).status).toBe(409);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("passes through sold and missing-initial validation errors", async () => {
    expect((await POST(request({ ...valid, config: { initialCharm: true } }))).status).toBe(400);
    mocks.getProduct.mockResolvedValue({ ...parker, sold: true });
    expect((await POST(request(valid))).status).toBe(409);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("creates a sandbox link with server prices, shipping, notes, and the pinned version", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, url: checkoutUrl });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://connect.squareupsandbox.com/v2/online-checkout/payment-links",
      expect.objectContaining({
        method: "POST",
        headers: {
          Authorization: "Bearer test-token",
          "Square-Version": "2026-09-16",
          "Content-Type": "application/json",
        },
      }),
    );
    const body = sentBody();
    expect(body.order).toEqual({
      location_id: "location-1",
      line_items: [
        { name: "Parker", quantity: "1", base_price_money: { amount: 2500, currency: "USD" }, note: "Initial charm (“A”): $3" },
        { name: "Initial charm", quantity: "1", base_price_money: { amount: 300, currency: "USD" } },
        { name: "Matching bracelet", quantity: "1", base_price_money: { amount: 1500, currency: "USD" } },
      ],
    });
    expect(body.checkout_options).toEqual({
      ask_for_shipping_address: true,
      redirect_url: "https://example.com/order/thanks",
      merchant_support_email: "taylor@example.com",
      shipping_fee: { name: "Shipping", charge: { amount: 500, currency: "USD" } },
    });
    expect(body.idempotency_key).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it("ignores client prices, totals, shipping, and taxes", async () => {
    const res = await POST(request({
      ...valid, price: 0.01, total: 0.01, shippingFlatRate: 0, salesTaxPercent: 99,
      config: { ...valid.config, price: 0.01, total: 0.01, initialCharmPrice: 0 },
    }));
    expect(res.status).toBe(200);
    const body = sentBody();
    expect(body.order.line_items.map((line) => line.base_price_money.amount)).toEqual([2500, 300, 1500]);
    expect(body.checkout_options.shipping_fee?.charge.amount).toBe(500);
    expect(body.order).not.toHaveProperty("taxes");
  });

  it("includes bag-charm details and strips add-ons the product cannot offer", async () => {
    mocks.getProduct.mockResolvedValue({ ...parker, category: "bag-charms", name: "Bag Charm" });
    const res = await POST(request({
      ...valid,
      config: {
        beadColor: "Seafoam Green", personalization: "MAMA", charms: ["MAMA", "Bow"],
        bagScarf: true, initialCharm: true, initial: "a", matchingBracelet: true,
      },
    }));
    expect(res.status).toBe(200);
    expect(sentBody().order.line_items).toEqual([
      {
        name: "Bag Charm", quantity: "1", base_price_money: { amount: 2500, currency: "USD" },
        note: "Bead color: Seafoam Green\nCharms: MAMA, Bow\nInitial or name: “MAMA”",
      },
      { name: "Matching bag scarf", quantity: "1", base_price_money: { amount: 500, currency: "USD" } },
    ]);
  });

  it("defaults omitted config to an uncustomized piece", async () => {
    expect((await POST(request({ slug: valid.slug }))).status).toBe(200);
    expect(sentBody().order.line_items).toEqual([
      { name: "Parker", quantity: "1", base_price_money: { amount: 2500, currency: "USD" } },
    ]);
  });

  it("returns 502 and logs Square's detail without exposing it to shoppers", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue(Response.json({ errors: [{ detail: "Location is inactive" }] }, { status: 400 }));
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ ok: false, error: "Couldn't start checkout — please try again" });
    expect(log).toHaveBeenCalledWith("[checkout]", "Location is inactive");
  });

  it("returns 502 for a missing payment URL or a network failure", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockResolvedValue(Response.json({ payment_link: { order_id: "order-1" } }));
    expect((await POST(request(valid))).status).toBe(502);
    fetchMock.mockRejectedValue(new Error("Network unavailable"));
    expect((await POST(request(valid))).status).toBe(502);
  });

  it("limits each IP to 20 requests per hour", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1_000_000);
    for (let i = 0; i < 20; i++) {
      expect((await POST(request(valid, "192.0.2.10, 192.0.2.20"))).status).toBe(200);
    }
    expect((await POST(request(valid, "192.0.2.10"))).status).toBe(429);
    expect(fetchMock).toHaveBeenCalledTimes(20);
    expect((await POST(request(valid, "192.0.2.11"))).status).toBe(200);
    vi.spyOn(Date, "now").mockReturnValue(1_000_000 + 60 * 60 * 1000);
    expect((await POST(request(valid, "192.0.2.10"))).status).toBe(200);
  });
});
