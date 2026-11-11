import { describe, expect, it } from "vitest";
import { buildPaymentLinkRequest, shippingFor, type PaymentLinkInput } from "./checkout";

const input: PaymentLinkInput = {
  quote: {
    lines: [{ label: "Parker", amount: 25 }, { label: "Initial charm", amount: 3 }],
    total: 28,
  },
  details: ["Initial charm (“A”): $3"],
  settings: { shippingFlatRate: 5, freeShippingThreshold: 100, salesTaxPercent: 0 },
  locationId: "location-1",
  redirectUrl: "https://example.com/order/thanks",
  idempotencyKey: "request-1",
};

describe("buildPaymentLinkRequest", () => {
  it("converts dollars to cents and puts details only on the piece", () => {
    const body = buildPaymentLinkRequest(input);
    expect(body.order.line_items).toEqual([
      {
        name: "Parker", quantity: "1",
        base_price_money: { amount: 2500, currency: "USD" },
        note: "Initial charm (“A”): $3",
      },
      {
        name: "Initial charm", quantity: "1",
        base_price_money: { amount: 300, currency: "USD" },
      },
    ]);
    expect(body.payment_note).toBe("Parker");
    expect(body.idempotency_key).toBe("request-1");
    expect(body.order.location_id).toBe("location-1");
  });

  it("rounds fractional cents for item and shipping amounts", () => {
    const body = buildPaymentLinkRequest({
      ...input,
      quote: { lines: [{ label: "Parker", amount: 25.126 }], total: 25.126 },
      settings: { ...input.settings, shippingFlatRate: 5.126 },
    });
    expect(body.order.line_items[0].base_price_money.amount).toBe(2513);
    expect(body.checkout_options.shipping_fee?.charge.amount).toBe(513);
  });

  it("joins detail lines and omits notes when no details were given", () => {
    const body = buildPaymentLinkRequest({ ...input, details: ["Bead color: Pink", "Charms: Bow"] });
    expect(body.order.line_items[0].note).toBe("Bead color: Pink\nCharms: Bow");
    expect(buildPaymentLinkRequest({ ...input, details: [] }).order.line_items[0]).not.toHaveProperty("note");
  });

  it("caps item notes at 2000 and payment notes at 500 characters", () => {
    const body = buildPaymentLinkRequest({
      ...input,
      quote: { lines: [{ label: "P".repeat(501), amount: 25 }], total: 25 },
      details: ["A".repeat(2001)],
    });
    expect(body.order.line_items[0].note).toHaveLength(2000);
    expect(body.payment_note).toHaveLength(500);
  });

  it.each([99.99, 100, 100.01])("uses the shipping threshold at subtotal %s", (subtotal) => {
    const shipping = subtotal < 100 ? 5 : 0;
    expect(shippingFor(subtotal, input.settings)).toBe(shipping);
    const body = buildPaymentLinkRequest({
      ...input,
      quote: { lines: [{ label: "Piece", amount: subtotal }], total: subtotal },
    });
    if (shipping) {
      expect(body.checkout_options.shipping_fee).toEqual({
        name: "Shipping", charge: { amount: 500, currency: "USD" },
      });
    } else {
      expect(body.checkout_options).not.toHaveProperty("shipping_fee");
    }
  });

  it("adds order tax only when the configured percent is positive", () => {
    expect(buildPaymentLinkRequest(input).order).not.toHaveProperty("taxes");
    const body = buildPaymentLinkRequest({
      ...input, settings: { ...input.settings, salesTaxPercent: 8.25 },
    });
    expect(body.order.taxes).toEqual([
      { uid: "sales-tax", name: "Sales tax", percentage: "8.25", scope: "ORDER" },
    ]);
  });

  it("includes support email only when given", () => {
    expect(buildPaymentLinkRequest(input).checkout_options).toEqual({
      ask_for_shipping_address: true,
      redirect_url: input.redirectUrl,
      shipping_fee: { name: "Shipping", charge: { amount: 500, currency: "USD" } },
    });
    expect(buildPaymentLinkRequest({ ...input, supportEmail: "taylor@example.com" })
      .checkout_options.merchant_support_email).toBe("taylor@example.com");
  });
});
