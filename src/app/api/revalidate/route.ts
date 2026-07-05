import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

interface WebhookPayload {
  _type: string;
  slug?: string;
}

/** Tags to invalidate per document type (mirrors sanityFetch tags). */
const TYPE_TAGS: Record<string, string[]> = {
  product: ["product"],
  collection: ["collection"],
  faqItem: ["faq"],
  careGuide: ["careGuide"],
  pricing: ["pricing"],
  siteSettings: ["settings"],
};

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "SANITY_REVALIDATE_SECRET not set" },
      { status: 500 },
    );
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    req as never,
    secret,
  );
  if (!isValidSignature) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ ok: false, error: "Missing _type" }, { status: 400 });
  }

  const tags = [...(TYPE_TAGS[body._type] ?? [])];
  if (body.slug) tags.push(`${body._type}:${body.slug}`);
  tags.forEach((t) => revalidateTag(t, "max"));

  return NextResponse.json({ ok: true, revalidated: tags });
}
