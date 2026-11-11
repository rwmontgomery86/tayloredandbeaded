import { NextResponse } from "next/server";
import { z } from "zod";
import { buildPaymentLinkRequest } from "@/lib/checkout";
import { getCheckoutSettings } from "@/lib/data";
import { jsonError, parseBody } from "@/lib/email";
import { configSchema, resolveOrder } from "@/lib/order-config";
import { createRateLimiter } from "@/lib/rate-limit";
import { checkoutEnabled, createPaymentLink, getSquareConfig } from "@/lib/square";

const schema = z.object({
  slug: z.string().min(1).max(120),
  config: configSchema,
});

const rateLimited = createRateLimiter(20, 60 * 60 * 1000);

export async function POST(req: Request) {
  const parsed = await parseBody(
    req,
    schema,
    "Please check the form and try again",
  );
  if (parsed.response) return parsed.response;

  const square = getSquareConfig();
  if (!checkoutEnabled() || !square) {
    return jsonError("Online checkout isn't available right now", 503);
  }
  if (rateLimited(req)) {
    return jsonError("Too many requests — please try again later", 429);
  }

  const { slug, config } = parsed.data;
  const resolved = await resolveOrder(slug, config);
  if (!resolved.ok) return jsonError(resolved.error, resolved.status);
  const { product, quote, detailLines, configLines } = resolved;
  // Nothing marks a one-of-a-kind piece sold after payment yet, so only
  // made-to-order styles can be bought online.
  if (product.availability !== "year-round") {
    return jsonError("Please request this one-of-a-kind piece by email", 409);
  }
  const settings = await getCheckoutSettings();
  const details = [
    ...detailLines,
    ...configLines.filter((line) => line.startsWith("- Initial charm (“")),
  ].map((line) => line.replace(/^- /, ""));
  const body = buildPaymentLinkRequest({
    quote,
    details,
    settings,
    locationId: square.locationId,
    redirectUrl: new URL("/order/thanks", req.url).toString(),
    supportEmail: process.env.CONTACT_TO_EMAIL,
    idempotencyKey: crypto.randomUUID(),
  });

  try {
    const { url } = await createPaymentLink(square, body);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    console.error(
      "[checkout]",
      error instanceof Error
        ? error.message.replaceAll(square.accessToken, "[redacted]")
        : "Square request failed",
    );
    return jsonError("Couldn't start checkout — please try again", 502);
  }
}
