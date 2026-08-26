import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/**
 * Shared plumbing for the email-sending API routes (contact, newsletter,
 * order-request): body parsing, spam guards, and Resend configuration.
 */

/** Fields every email form submits alongside its own; spread into the route's schema. */
export const spamGuardFields = {
  website: z.string().optional(), // honeypot — checked in the handler, not rejected here
  elapsed: z.number().optional(),
};

export function jsonError(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Parse + validate the request body, or the 400 response to return as-is. */
export async function parseBody<S extends z.ZodType>(
  req: Request,
  schema: S,
  invalidMessage: string,
): Promise<
  | { data: z.output<S>; response?: undefined }
  | { data?: undefined; response: NextResponse }
> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return { response: jsonError("Invalid request", 400) };
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return { response: jsonError(invalidMessage, 400) };
  return { data: parsed.data };
}

/** Filled honeypot or superhuman submit speed. */
export function isSpam(
  data: { website?: string; elapsed?: number },
  minElapsedMs: number,
): boolean {
  return (
    Boolean(data.website) ||
    (typeof data.elapsed === "number" && data.elapsed < minElapsedMs)
  );
}

export type Mailer = { resend: Resend; to: string; from: string };

/** Resend client + inquiry addresses, or null when the env isn't configured. */
export function getMailer(): Mailer | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return null;
  return {
    resend: new Resend(apiKey),
    to,
    from:
      process.env.CONTACT_FROM_EMAIL ??
      "Taylored & Beaded <onboarding@resend.dev>",
  };
}

/** Resend client + newsletter audience, or null when the env isn't configured. */
export function getAudience(): { resend: Resend; audienceId: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return null;
  return { resend: new Resend(apiKey), audienceId };
}

/** In development, log the submission and pretend success; in production, 503. */
export function unconfiguredResponse(
  tag: string,
  message: string,
  devLog: unknown,
) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[${tag}] (no Resend config, logging only)`, devLog);
    return NextResponse.json({ ok: true });
  }
  return jsonError(message, 503);
}

/** Log a Resend failure and return the 502 shown to the visitor. */
export function sendFailure(tag: string, error: unknown, message: string) {
  console.error(`[${tag}] Resend error:`, error);
  return jsonError(message, 502);
}
