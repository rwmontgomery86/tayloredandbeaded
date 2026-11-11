import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getMailer,
  isSpam,
  jsonError,
  parseBody,
  sendFailure,
  spamGuardFields,
  unconfiguredResponse,
} from "@/lib/email";
import { configSchema, resolveOrder } from "@/lib/order-config";
import { createRateLimiter } from "@/lib/rate-limit";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  slug: z.string().min(1).max(120),
  config: configSchema,
  name: z.string().min(1).max(100),
  email: z.string().email(),
  notes: z.string().max(1000).optional().or(z.literal("")),
  ...spamGuardFields,
});

const rateLimited = createRateLimiter(5, 60 * 60 * 1000);

export async function POST(req: Request) {
  const parsed = await parseBody(
    req,
    schema,
    "Please check the form and try again",
  );
  if (parsed.response) return parsed.response;
  const { slug, config, name, email, notes } = parsed.data;

  if (rateLimited(req)) {
    return jsonError("Too many requests — please try again later", 429);
  }

  // Spam guards: filled honeypot or superhuman submit speed → pretend success.
  // Log the drop so a false positive is at least visible server-side.
  if (isSpam(parsed.data, 1500)) {
    console.warn("[order-request] spam guard dropped a submission", {
      slug,
      honeypot: Boolean(parsed.data.website),
      elapsed: parsed.data.elapsed,
    });
    return NextResponse.json({ ok: true });
  }

  const resolved = await resolveOrder(slug, config);
  if (!resolved.ok) return jsonError(resolved.error, resolved.status);
  const { product, quote, configLines, detailLines } = resolved;

  const summary = [
    ...configLines,
    ...detailLines,
    `Total: ${formatPrice(quote.total)}`,
  ].join("\n");

  const mailer = getMailer();
  if (!mailer) {
    return unconfiguredResponse(
      "order-request",
      "Requests are temporarily unavailable",
      { name, email, slug, summary, notes },
    );
  }
  const { resend, from, to } = mailer;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `🛍️ Order request: ${product.name} for ${name}`,
    text: `From: ${name} <${email}>\n\n${summary}\n${notes ? `\nNotes:\n${notes}\n` : ""}\nReply to this email to confirm the order and arrange payment.`,
  });
  if (error) {
    return sendFailure("order-request", error, "Could not send your request");
  }

  // Confirmation copy to the shopper. Taylor already has the request, so a
  // failure here shouldn't fail the whole submission — but the UI copy is
  // told about it so it doesn't promise an inbox copy that never arrives.
  // Deliberately excludes the free-text fields (name/notes): this email goes
  // to an unverified address, and echoing caller-written text would make it
  // a vehicle for spam sent from our domain.
  const confirmation = await resend.emails.send({
    from,
    to: email,
    subject: `Your request for the ${product.name} ♡`,
    text: `Thank you for your request! Here's what you asked for:\n\n${summary}\n\nNo payment is taken online — Taylor will confirm your order, availability, and payment details by email soon.\n\nTaylored & Beaded`,
  });
  if (confirmation.error) {
    console.error("[order-request] confirmation error:", confirmation.error);
  }

  return NextResponse.json({ ok: true, confirmationSent: !confirmation.error });
}
