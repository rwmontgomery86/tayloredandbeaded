"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "pending" | "success" | "error";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm text-ink" role="status">
        You&rsquo;re on the list — thank you! ♡
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", !compact && "mx-auto max-w-md")}>
      <div className="flex overflow-hidden rounded-full border border-ink/20 bg-cream focus-within:border-ink/50 transition-colors">
        <label htmlFor={compact ? "newsletter-footer" : "newsletter"} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? "newsletter-footer" : "newsletter"}
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
        />
        {/* honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px]"
        />
        <button
          type="submit"
          disabled={status === "pending"}
          className="shrink-0 bg-ink px-5 text-[0.68rem] font-medium tracking-[0.16em] text-cream uppercase transition-colors hover:bg-mauve-deep disabled:opacity-60"
        >
          {status === "pending" ? "…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-mauve-deep" role="alert">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
