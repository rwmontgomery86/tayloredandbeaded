import type { QuoteResult } from "./quote";
import type { CheckoutSettings } from "./types";

export interface PaymentLinkInput {
  quote: QuoteResult;
  details: string[];
  settings: CheckoutSettings;
  locationId: string;
  redirectUrl: string;
  supportEmail?: string;
  idempotencyKey: string;
}

interface Money {
  amount: number;
  currency: "USD";
}

export interface PaymentLinkRequest {
  idempotency_key: string;
  order: {
    location_id: string;
    line_items: {
      name: string;
      quantity: "1";
      base_price_money: Money;
      note?: string;
    }[];
    taxes?: {
      uid: string;
      name: string;
      percentage: string;
      scope: "ORDER";
    }[];
  };
  checkout_options: {
    ask_for_shipping_address: true;
    redirect_url: string;
    merchant_support_email?: string;
    shipping_fee?: { name: string; charge: Money };
  };
  payment_note: string;
}

export function shippingFor(
  subtotal: number,
  settings: CheckoutSettings,
): number {
  return subtotal >= settings.freeShippingThreshold
    ? 0
    : settings.shippingFlatRate;
}

export function buildPaymentLinkRequest({
  quote,
  details,
  settings,
  locationId,
  redirectUrl,
  supportEmail,
  idempotencyKey,
}: PaymentLinkInput): PaymentLinkRequest {
  const shipping = shippingFor(quote.total, settings);
  const note = details.join("\n").slice(0, 2000);
  return {
    idempotency_key: idempotencyKey,
    order: {
      location_id: locationId,
      line_items: quote.lines.map((line, index) => ({
        name: line.label,
        quantity: "1",
        base_price_money: {
          amount: Math.round(line.amount * 100),
          currency: "USD",
        },
        ...(index === 0 && note ? { note } : {}),
      })),
      ...(settings.salesTaxPercent > 0
        ? {
            taxes: [
              {
                uid: "sales-tax",
                name: "Sales tax",
                percentage: String(settings.salesTaxPercent),
                scope: "ORDER" as const,
              },
            ],
          }
        : {}),
    },
    checkout_options: {
      ask_for_shipping_address: true,
      redirect_url: redirectUrl,
      ...(supportEmail ? { merchant_support_email: supportEmail } : {}),
      ...(shipping > 0
        ? {
            shipping_fee: {
              name: "Shipping",
              charge: {
                amount: Math.round(shipping * 100),
                currency: "USD" as const,
              },
            },
          }
        : {}),
    },
    payment_note: (quote.lines[0]?.label ?? "").slice(0, 500),
  };
}
