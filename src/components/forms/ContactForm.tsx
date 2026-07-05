"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

type Status = "idle" | "pending" | "success" | "error";

const inputClasses =
  "w-full rounded-2xl border border-ink/20 bg-cream px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink/50 focus:outline-none";

export default function ContactForm({
  defaultSubject,
}: {
  defaultSubject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>();
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    setError(undefined);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[2rem] border border-ink/10 bg-cream-dark/60 px-8 py-14 text-center" role="status">
        <p className="font-serif text-2xl">
          Thank you! <em className="font-normal italic">Your message is on its way.</em>
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Taylor reads every message herself and will get back to you within a
          day or two. ♡
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-2 block text-[0.65rem]">
            Name
          </label>
          <input id="name" name="name" required maxLength={100} className={inputClasses} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow mb-2 block text-[0.65rem]">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="eyebrow mb-2 block text-[0.65rem]">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          maxLength={150}
          defaultValue={defaultSubject}
          className={inputClasses}
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block text-[0.65rem]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          className={inputClasses}
          placeholder="Tell me about the piece you have in mind, ask a question, or just say hi…"
        />
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px]"
      />

      {status === "error" && (
        <p className="text-sm text-mauve-deep" role="alert">
          {error} — please try again, or email Taylor directly.
        </p>
      )}

      <Button type="submit" disabled={status === "pending"}>
        {status === "pending" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
