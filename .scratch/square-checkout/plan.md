# Square hosted checkout: phased plan

_Drafted Oct 26, 2026. Status: phase 1 built and open as PR #20; sandbox test pending._

## Goal

Let shoppers pay on tayloredandbeaded.com instead of sending an order request
and waiting for Taylor to arrange payment. Card entry, Apple Pay / Google Pay,
receipts and payment security stay with Square: our site builds the order and
sends the shopper to a Square-hosted checkout page (Square **Checkout API →
CreatePaymentLink**, `POST /v2/online-checkout/payment-links`).

## Where we start from

- `src/lib/quote.ts` already holds all pricing math and add-on rules
  (`availableAddOns`, `isConfigurable`, `calculateQuote`). Checkout reuses it
  unchanged, so the price on the page, the price in the email, and the price
  Square charges all come from the same place.
- `src/app/api/order-request/route.ts` already validates a configured piece
  server-side (initial, bead color, charms, personalization) and never trusts a
  client-sent total. Checkout needs the same validation.
- `ProductConfigurator.tsx` is a single-item form ending in "Request this
  piece". That button becomes "Buy now" (phase 1) and later "Add to bag"
  (phase 2).
- Nearly every handmade product is **made to order** (14 named necklaces + Bag
  Charm), so there is no stock to oversell in phase 1. The 7 Edit pieces are
  one of a kind and curated, and stay on "Inquire" until phase 2.
- Sanity stays the source of truth for products and prices. We do **not** sync
  products into Square's catalog. Orders arrive in Square as ad-hoc line items.

## Phase 0: before any code (Taylor + Ross)

Blocking for go-live, but sandbox building can start once item 2 exists.

1. **Square account verified**: Taylor confirms her account can accept card
   payments (identity + bank verification complete in the Square Dashboard).
2. **API access**: Taylor (signed in with her Square login) creates an app at
   developer.squareup.com and shares, privately:
   - Sandbox access token + sandbox location ID (for building/testing)
   - Production access token + production location ID (for launch)
   Tokens go into Vercel env vars, never into chat or the repo.
3. **Shipping**: the flat rate for orders under the free-shipping threshold,
   and confirm the threshold. **Conflict found Oct 26:** July notes say $100,
   the live announcement bar says "$50+", the live FAQ says "over $75". The
   Pricing singleton value and both Studio texts must agree before go-live.
4. **Sales tax**: Taylor should confirm with her accountant/registration what
   she must collect. Square does not automatically tax ad-hoc API line items
   (to verify in sandbox), so we need a rate (or "none for now") from her.
5. **Returns/shipping policy copy**: a short paragraph each. Card networks
   and Square expect a visible refund policy once money is taken online.
6. **Which pieces are buyable online**: default proposal is all made-to-order
   handmade pieces; Edit pieces stay inquiry-only until phase 2.

## Phase 1: "Buy now" (smallest shippable version)

One piece per checkout, no cart. Shopper configures a piece exactly as today,
clicks **Buy now**, pays on Square's page, lands on our thank-you page.

**Server**
- `src/lib/square.ts`: small fetch-based client (no SDK dependency):
  `createPaymentLink(order, options)`, pinned `Square-Version` header,
  sandbox vs production base URL from `SQUARE_ENVIRONMENT`.
- `src/lib/checkout.ts` (pure, unit-tested): turns a validated configuration
  + `QuoteResult` into a Square order payload:
  - one ad-hoc line item per quote line (piece, initial charm, matching
    bracelet, bag scarf), amounts in cents;
  - a line-item `note` with the details Taylor needs to make it (initial
    letter, bead color, charms, personalization);
  - shipping fee from the rule (flat rate under threshold, free at/over it);
  - optional order-level tax percentage if Taylor gives one.
- Extract the shared validation from `order-request/route.ts` into
  `src/lib/order-validation.ts` so both routes enforce identical rules.
- `src/app/api/checkout/route.ts`: validate → reprice server-side → create the
  payment link (`ask_for_shipping_address: true`, `redirect_url` → thank-you
  page, `merchant_support_email`, random idempotency key) → return the URL.
  Keep the existing rate limit. No spam honeypot needed (paying is the filter),
  but keep the per-IP throttle so bots can't mint thousands of links.
- **Kill switch**: `CHECKOUT_ENABLED` env var. Off = today's request form
  renders unchanged. Lets us ship to production dark and flip it on when Taylor
  is ready, or flip back instantly if something goes wrong.

**Shop settings (Sanity)**
- Add `shippingFlatRate`, `freeShippingThreshold`, and optional `taxRate` to
  the existing Pricing singleton so Taylor can change them in Studio.

**UI + copy**
- Configurator: "Buy now" button; show shipping line ("Free shipping over
  $100" / flat rate) in the quote box; remove "No payment is taken online".
- `/order/thanks` page: warm confirmation + made-to-order turnaround note
  ("Made for you within 1–2 weeks"). Square sends the payment receipt
  (verify in sandbox).
- Copy sweep for the old model: FAQ ordering/shipping answers, contact page
  bullet, product-page notes, `PRODUCT.md` / `README.md` ("no cart or
  checkout").
- Shipping & Returns page (or FAQ section) from Taylor's policy copy, linked in
  the footer.

**How Taylor sees orders in phase 1**: Square Dashboard / Square app Orders
tab + Square's new-order notification. Each line item carries the
customization note. No website emails yet.

**Tests**
- Unit: `buildCheckoutOrder` (cents conversion, notes, shipping threshold edge
  at exactly $100, tax on/off), shared validation.
- Route test mirroring `order-request/route.test.ts` with Square mocked.
- Sandbox end-to-end on a Preview deploy using Square's sandbox test cards:
  necklace + initial + bracelet, bag charm with all options, order lands in the
  sandbox dashboard with correct notes, totals and shipping address.

**Build status (Oct 26)**: code done on branch `claude/latest-from-main-230f11`
(PR #20), behind `CHECKOUT_ENABLED`. Buy now is limited to made-to-order
pieces; one-of-a-kind ones keep the email request until phase 2's auto-sold.
Not yet run against the real sandbox.

**Launch-day Studio edits** (live copy lives in Sanity, not code): FAQ "how do
I order" answer (still says "Request this piece… no payment online"), FAQ
shipping answer and announcement bar threshold, Pricing singleton shipping
fields.

**Ship criteria**: sandbox run passes; production tokens set; Taylor places one
real low-value order on production and refunds it from Square; flag on.

## Phase 2: Bag (cart) + order emails + one-of-a-kind sales

- **Cart**: "Add to bag" from the configurator, bag drawer/page, stored in the
  browser (`localStorage`). Server re-prices every line on checkout, one
  payment link for the whole bag, so free shipping over $100 actually becomes
  reachable and multi-piece buyers pay shipping once.
- **Square webhook** (`/api/square/webhook`, `payment.updated`): verify the
  `x-square-hmacsha256-signature` (HMAC-SHA256 over notification URL + raw
  body, constant-time compare, exact URL match), then:
  - email Taylor a branded order summary via the existing Resend setup
    (`src/lib/email.ts`), formatted for making the piece;
  - mark one-of-a-kind pieces **Sold** in Sanity (needs a server-side Sanity
    write token).
- **Edit pieces purchasable**: once auto-sold works. Small race (two buyers in
  the same minute) is handled by refund; acceptable at this volume.

## Phase 3: Taylor's wider July wishlist

- Bracelet sizing (S/M/L or exact wrist measurement) + a sizing guide page.
- Turnaround shown per product (ready to ship 1–3 days vs made to order
  1–2 weeks).
- Seasonal / limited drops (the `collection` doc type is still in the schema
  for this).
- Square coupons (`enable_coupon`) if Taylor wants discount codes.

## Env vars

| Name | Phase | Notes |
| --- | --- | --- |
| `SQUARE_ENVIRONMENT` | 1 | `sandbox` on Preview, `production` on Production |
| `SQUARE_ACCESS_TOKEN` | 1 | sensitive; different value per environment |
| `SQUARE_LOCATION_ID` | 1 | per environment |
| `CHECKOUT_ENABLED` | 1 | `true` to show Buy now |
| `SQUARE_WEBHOOK_SIGNATURE_KEY` | 2 | per webhook subscription |
| `SANITY_WRITE_TOKEN` | 2 | for auto-marking pieces sold |

## Risks / things to verify during phase 1

- Exact `redirect_url` behaviour and any query params Square appends.
  Thank-you page must not depend on them.
- Whether Square emails the buyer a receipt for payment-link orders by default.
- Tax: confirm ad-hoc line items are untaxed unless we add an order-level tax.
- Preview deploys sit behind Vercel Authentication. Fine for browser testing,
  but the phase 2 webhook needs a Production URL or a protection bypass.
- Square API reference checked Oct 26, 2026: current `Square-Version` is
  `2026-09-16`.
