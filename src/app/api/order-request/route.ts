import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { getCustomization, getPricing, getProduct } from "@/lib/data";
import {
  availableAddOns,
  calculateQuote,
  type QuoteConfiguration,
} from "@/lib/quote";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  slug: z.string().min(1).max(120),
  config: z
    .object({
      initialCharm: z.boolean().optional(),
      /** The letter(s) for the initial charm; required when initialCharm is on. */
      initial: z.string().trim().min(1).max(2).optional(),
      matchingBracelet: z.boolean().optional(),
      // Bag charm options. Loose length caps only — real validation is
      // membership in the Studio-managed Customization options below, so
      // Taylor growing the option lists can never invalidate the form.
      beadColor: z.string().trim().max(200).optional(),
      /** Initial or short name strung into the charm. */
      personalization: z.string().trim().max(12).optional(),
      charms: z.array(z.string().trim().max(200)).max(50).optional(),
      bagScarf: z.boolean().optional(),
    })
    .default({}),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  notes: z.string().max(1000).optional().or(z.literal("")),
  website: z.string().optional(), // honeypot — checked in the handler, not rejected here
  elapsed: z.number().optional(),
});

/** Mask the request's add-ons by what the product actually offers. */
function allowedConfiguration(
  product: Parameters<typeof availableAddOns>[0],
  config: z.infer<typeof schema>["config"],
): QuoteConfiguration {
  const offers = availableAddOns(product);
  return {
    initialCharm: offers.initialCharm && Boolean(config.initialCharm),
    matchingBracelet:
      offers.matchingBracelet && Boolean(config.matchingBracelet),
    bagScarf: offers.bagScarf && Boolean(config.bagScarf),
  };
}

// Best-effort per-IP throttle. In-memory state is per server instance, so this
// is a speed bump rather than a wall — but it turns "unlimited emails per
// second" into a trickle, which is what protects the Resend account.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function rateLimited(req: Request): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return false;
  const now = Date.now();
  const stamps = (recentRequests.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  if (stamps.length >= RATE_LIMIT) return true;
  stamps.push(now);
  recentRequests.set(ip, stamps);
  if (recentRequests.size > 5000) recentRequests.clear(); // memory backstop
  return false;
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

  if (rateLimited(req)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again later" },
      { status: 429 },
    );
  }

  // Spam guards: filled honeypot or superhuman submit speed → pretend success.
  // Log the drop so a false positive is at least visible server-side.
  if (website || (typeof elapsed === "number" && elapsed < 1500)) {
    console.warn("[order-request] spam guard dropped a submission", {
      slug,
      honeypot: Boolean(website),
      elapsed,
    });
    return NextResponse.json({ ok: true });
  }

  if (config.initialCharm && !config.initial) {
    return NextResponse.json(
      { ok: false, error: "Please tell us which initial you'd like" },
      { status: 400 },
    );
  }

  // Personalization is echoed into an email sent to an unverified address, so
  // it must read like a name or initials — never a URL or other smuggled text.
  if (
    config.personalization &&
    !/^[\p{L}\p{N} .'’&-]+$/u.test(config.personalization)
  ) {
    return NextResponse.json(
      { ok: false, error: "Personalization can only use letters and numbers" },
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

  // Free bag-charm choices, validated against Taylor's Studio-managed options.
  // Unknown values are rejected, not dropped — a silently incomplete order
  // email would be worse than asking the shopper to reload and retry.
  const detailLines: string[] = [];
  if (product.category === "bag-charms") {
    const color = customization.beadColors.find(
      (c) => c.label === config.beadColor,
    );
    if (!color) {
      return NextResponse.json(
        { ok: false, error: "Please pick a bead color" },
        { status: 400 },
      );
    }
    const charms = config.charms ?? [];
    if (charms.some((charm) => !customization.charmOptions.includes(charm))) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "The charm options changed — please refresh the page and pick again",
        },
        { status: 400 },
      );
    }
    detailLines.push(`- Bead color: ${color.label}`);
    if (charms.length) detailLines.push(`- Charms: ${charms.join(", ")}`);
    if (config.personalization)
      detailLines.push(`- Initial or name: “${config.personalization}”`);
  }

  // Always recompute the total server-side — a client-sent total is never trusted.
  const configuration = allowedConfiguration(product, config);
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
    ...detailLines,
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
