import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10).max(3000),
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
      { ok: false, error: "Please check the form and try again" },
      { status: 400 },
    );
  }
  const { name, email, subject, message, website, elapsed } = parsed.data;

  // Spam guards: filled honeypot or superhuman submit speed → pretend success
  if (website || (typeof elapsed === "number" && elapsed < 3000)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "development") {
      console.log("[contact] (no Resend config, logging only)", {
        name,
        email,
        subject,
        message,
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Messaging is temporarily unavailable" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const finalSubject = subject?.trim()
    ? `✉️ ${subject.trim()}`
    : `✉️ New message from ${name}`;

  const { error } = await resend.emails.send({
    from:
      process.env.CONTACT_FROM_EMAIL ??
      "Taylored & Beaded <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: finalSubject,
    text: `From: ${name} <${email}>\n${subject ? `Subject: ${subject}\n` : ""}\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message" },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
