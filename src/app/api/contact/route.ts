import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getMailer,
  isSpam,
  parseBody,
  sendFailure,
  spamGuardFields,
  unconfiguredResponse,
} from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10).max(3000),
  ...spamGuardFields,
});

export async function POST(req: Request) {
  const parsed = await parseBody(
    req,
    schema,
    "Please check the form and try again",
  );
  if (parsed.response) return parsed.response;
  const { name, email, subject, message } = parsed.data;

  // Spam guards: filled honeypot or superhuman submit speed → pretend success
  if (isSpam(parsed.data, 3000)) {
    return NextResponse.json({ ok: true });
  }

  const mailer = getMailer();
  if (!mailer) {
    return unconfiguredResponse(
      "contact",
      "Messaging is temporarily unavailable",
      { name, email, subject, message },
    );
  }

  const finalSubject = subject?.trim()
    ? `✉️ ${subject.trim()}`
    : `✉️ New message from ${name}`;

  const { error } = await mailer.resend.emails.send({
    from: mailer.from,
    to: mailer.to,
    replyTo: email,
    subject: finalSubject,
    text: `From: ${name} <${email}>\n${subject ? `Subject: ${subject}\n` : ""}\n${message}`,
  });

  if (error) {
    return sendFailure("contact", error, "Could not send your message");
  }
  return NextResponse.json({ ok: true });
}
