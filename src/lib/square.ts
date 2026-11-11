import { z } from "zod";
import type { PaymentLinkRequest } from "./checkout";

export const SQUARE_VERSION = "2026-09-16";

export interface SquareConfig {
  accessToken: string;
  locationId: string;
  baseUrl: string;
}

export function getSquareConfig(): SquareConfig | null {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!accessToken || !locationId) return null;
  return {
    accessToken,
    locationId,
    baseUrl:
      process.env.SQUARE_ENVIRONMENT === "production"
        ? "https://connect.squareup.com"
        : "https://connect.squareupsandbox.com",
  };
}

export function checkoutEnabled(): boolean {
  return process.env.CHECKOUT_ENABLED === "true" && getSquareConfig() !== null;
}

const responseSchema = z.object({
  errors: z.array(z.object({ detail: z.string().optional() })).nullish(),
  payment_link: z
    .object({
      url: z.string().nullish(),
      order_id: z.string().nullish(),
    })
    .nullish(),
});

export async function createPaymentLink(
  config: SquareConfig,
  body: PaymentLinkRequest,
): Promise<{ url: string; orderId?: string }> {
  const response = await fetch(
    `${config.baseUrl}/v2/online-checkout/payment-links`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const parsed = responseSchema.safeParse(
    await response.json().catch(() => null),
  );
  const data = parsed.success ? parsed.data : undefined;
  if (!response.ok || !data?.payment_link?.url) {
    const detail = data?.errors
      ?.map((error) => error.detail)
      .filter(Boolean)
      .join("; ");
    const message =
      detail || `Square checkout failed (${response.status}): missing payment link URL`;
    throw new Error(message.replaceAll(config.accessToken, "[redacted]"));
  }
  return {
    url: data.payment_link.url,
    ...(data.payment_link.order_id ? { orderId: data.payment_link.order_id } : {}),
  };
}
