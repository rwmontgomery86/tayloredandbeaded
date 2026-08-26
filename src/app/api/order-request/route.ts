import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getCustomization, getPricing, getProduct } from "@/lib/data";
import { calculateQuote, type QuoteConfiguration } from "@/lib/quote";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  slug: z.string().min(1).max(120),
  config: z
    .object({
      initialCharm: z.boolean().optional(),
      /** The letter(s) for the initial charm; required when initialCharm is on. */
      initial: z.string().trim().min(1).max(2).optional(),
      matchingBracelet: z.boolean().optional(),
    })
    .default({}),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  notes: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot — checked in the handler, not rejected here
  elapsed: z.number().optional(),
});

/** Drop add-ons the product doesn't offer; the server, not the client, decides. */
function allowedConfiguration(
  category: string,
  availability: string,
  config: z.infer<typeof schema>["config"],
): QuoteConfiguration {
  const isNecklace = category === "necklaces";
  return {
    initialCharm: isNecklace && Boolean(config.initialCharm),
    matchingBracelet:
      isNecklace &&
      availability === "year-round" &&
      Boolean(config.matchingBracelet),
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again" },
      { status: 400 },
    );
  }
  const { slug, config, name, email, notes, website, elapsed } = parsed.data;

  // Spam guards: filled honeypot or superhuman submit speed → pretend success
  if (website || (typeof elapsed === "number" && elapsed < 3000)) {
    return NextResponse.json({ ok: true });
  }

  if (config.initialCharm && !config.initial) {
    return NextResponse.json(
      { ok: false, error: "Please tell us which initial you'd like" },
      { status: 400 },
    );
  }

  const product = await getProduct(slug);
  if (!product || product.origin === "curated") {
    return NextResponse.json(
      { ok: false, error: "This piece can't be requested online" },
      { status: 404 },
    );
  }
  if (product.sold) {
    return NextResponse.json(
      { ok: false, error: "This piece has already found a home" },
      { status: 409 },
    );
  }

  const [customization, pricing] = await Promise.all([
    getCustomization(),
    getPricing(),
  ]);
  // Always recompute the total server-side — a client-sent total is never trusted.
  const configuration = allowedConfiguration(
    product.category,
    product.availability,
    config,
  );
  const quote = calculateQuote(product, configuration, customization, pricing);

  const configLines = quote.lines.map((line) => {
    const detail =
      line.label === "Initial charm" && config.initial
        ? ` (“${config.initial.toUpperCase()}”)`
        : "";
    return `- ${line.label}${detail}: ${formatPrice(line.amount)}`;
  });
  const summary = [
    ...configLines,
    `Total: ${formatPrice(quote.total)}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "development") {
      console.log("[order-request] (no Resend config, logging only)", {
        name,
        email,
        slug,
        summary,
        notes,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Requests are temporarily unavailable" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Taylored & Beaded <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `🛍️ Order request: ${product.name} for ${name}`,
    text: `From: ${name} <${email}>\n\n${summary}\n${notes ? `\nNotes:\n${notes}\n` : ""}\nReply to this email to confirm the order and arrange payment.`,
  });
  if (error) {
    console.error("[order-request] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your request" },
      { status: 502 },
    );
  }

  // Confirmation copy to the shopper. Taylor already has the request, so a
  // failure here shouldn't fail the whole submission.
  const confirmation = await resend.emails.send({
    from,
    to: email,
    subject: `Your request for the ${product.name} ♡`,
    text: `Hi ${name},\n\nThank you for your request! Here's what you asked for:\n\n${summary}\n${notes ? `\nYour notes:\n${notes}\n` : ""}\nNo payment is taken online — Taylor will confirm your order, availability, and payment details by email soon.\n\nTaylored & Beaded`,
  });
  if (confirmation.error) {
    console.error("[order-request] confirmation error:", confirmation.error);
  }

  return NextResponse.json({ ok: true });
}
