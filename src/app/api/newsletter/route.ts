import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getAudience,
  isSpam,
  parseBody,
  sendFailure,
  spamGuardFields,
  unconfiguredResponse,
} from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  ...spamGuardFields,
});

export async function POST(req: Request) {
  const parsed = await parseBody(req, schema, "Please enter a valid email");
  if (parsed.response) return parsed.response;
  const { email } = parsed.data;

  if (isSpam(parsed.data, 2000)) {
    return NextResponse.json({ ok: true });
  }

  const audience = getAudience();
  if (!audience) {
    return unconfiguredResponse(
      "newsletter",
      "Signups are temporarily unavailable",
      email,
    );
  }

  const { error } = await audience.resend.contacts.create({
    email,
    audienceId: audience.audienceId,
    unsubscribed: false,
  });

  // Treat "already exists" as success — the visitor's goal is met
  if (error && !/exist/i.test(error.message ?? "")) {
    return sendFailure("newsletter", error, "Could not subscribe right now");
  }
  return NextResponse.json({ ok: true });
}
