# 05 — Necklace order request (the tracer bullet)

Spec: [spec.md](../spec.md)

**What to build:** The first complete configure-then-inquire path. On a
year-round necklace page, a shopper toggles "add an initial charm (+$3)" and
"add the matching bracelet", watches the total update live, and submits a
request with their name, email, and optional notes — under a clear note that
no payment is taken online and Taylor will confirm details by email. Taylor
receives an email with the full configuration and server-computed total,
reply-to set to the shopper; the shopper receives a confirmation copy
restating the piece and total.

**Blocked by:** 02 — Year-round vs premade (request CTA semantics differ for
made-to-order vs premade); 04 — Customization singleton + quote module
(prices and totals come from there).

**Status:** done (2026-08-26)

- [x] Necklace detail pages offer initial-charm and matching-bracelet add-ons
      with a live total computed by the quote module
- [x] Request form collects name, email, and optional notes; states plainly
      that payment is arranged by email after confirmation
- [x] Order-request API route validates payload shape, applies the established
      honeypot and minimum-elapsed-time spam guards (pretend success), and
      recomputes the total server-side — never trusting a client total
- [x] On success, Taylor's email carries every chosen option and the total;
      the shopper gets a confirmation copy; dev-mode logs instead of sending
      when email is unconfigured
- [x] Sold premade pieces cannot be requested
- [x] Route covered by tests: valid submission, invalid payload, honeypot,
      too-fast submission, unconfigured email, total recomputation
- [x] Form is keyboard- and screen-reader-operable
