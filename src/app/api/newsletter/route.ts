import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  website: z.string().optional(), // honeypot — checked in the handler, not rejected here
  elapsed: z.number().optional(),
});

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
      { ok: false, error: "Please enter a valid email" },
      { status: 400 },
    );
  }
  const { email, website, elapsed } = parsed.data;

  if (website || (typeof elapsed === "number" && elapsed < 2000)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    if (process.env.NODE_ENV === "development") {
      console.log("[newsletter] (no Resend config, logging only)", email);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Signups are temporarily unavailable" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  // Treat "already exists" as success — the visitor's goal is met
  if (error && !/exist/i.test(error.message ?? "")) {
    console.error("[newsletter] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Could not subscribe right now" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
