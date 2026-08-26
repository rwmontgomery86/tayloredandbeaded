# Spec — Product & Collection Update (client brief, Aug 2026)

Status: ready-for-agent
Discovery: [discovery.md](./discovery.md) (approved 2026-08-26)
Approved: specification by Ross Montgomery, 2026-08-26.

## Problem Statement

Taylor's site is a showcase: visitors can see her jewelry but cannot choose,
personalize, or ask to buy a specific piece. Her business now centers on
customizable bag charms, a stable roster of year-round necklace styles (each
also available as a matching bracelet), and a hand-picked set of necklaces she
didn't make but wants to offer. None of that is expressible on the site today,
anklets she no longer sells still appear, and shoppers can't tell an
always-orderable style from a one-off piece that may already be gone.

## Solution

Turn product pages into configurators that end in an email order request
rather than a checkout. Shoppers pick their options (bead color, initial or
name, charms, add-ons), watch the price update live, and submit a request;
Taylor gets the full configuration by email and arranges payment herself, and
the shopper gets a confirmation copy plus a clear note that no payment is
taken online. The catalog gains a Bag Charms section with customization, a
year-round necklace collection (14 named styles, each with a matching-bracelet
add-on and an initial-charm add-on), and "The Edit" — a clearly separated
curated collection. Anklets disappear from the site. Everything Taylor might
tune — colors, charm list, add-on prices — is editable in her Sanity Studio.

## User Stories

### Bag charms
1. As a shopper, I want a dedicated Bag Charms section, so that I can find customizable charms without digging through other jewelry.
2. As a shopper, I want to pick one bead color from Taylor's palette (Bright Blue, Pink, Red/Coral, Caramel/Brown, Lavender Purple, Seafoam Green), so that my charm matches my bag.
3. As a shopper, I want one text field for an initial or short name (capped ~12 characters), so that I can personalize the charm without guessing what fits.
4. As a shopper, I want to select any combination of charms (MAMA, Heart, Cross, Smiley Face, Bow), so that I can compose the charm I actually want.
5. As a shopper, I want an "add a matching bag scarf (+$5)" option, so that I can complete the look in one request.
6. As a shopper, I want the displayed price to update as I choose options, so that I always know what my configuration costs.

### Year-round necklaces
7. As a shopper, I want a year-round necklace collection of Taylor's named styles, so that I can order a style any time knowing it isn't one-of-a-kind.
8. As a shopper, I want each style shown with its name, photo, bead/color description, and price, so that I can compare styles at a glance.
9. As a shopper, I want an "add an initial charm (+$3)" option when requesting a necklace, so that I can personalize it.
10. As a shopper, I want an "add the matching bracelet" option with its price shown, so that I can order the set in one request.
11. As a shopper, I want year-round styles clearly badged as made-to-order, so that I never think a style is sold out.
12. As a shopper, I want premade one-off pieces clearly distinguished (including a sold state), so that I don't request something that's gone.

### The Edit
13. As a shopper, I want The Edit presented as its own collection with Taylor's explanation, so that I understand these are curated, not handmade, pieces.
14. As a shopper, I want curated pieces visibly badged and kept out of the handmade listings, so that I'm never confused about what Taylor made.

### Ordering
15. As a shopper, I want to submit my configured piece with my name, email, and optional notes, so that Taylor knows exactly what I want.
16. As a shopper, I want a confirmation email restating my configuration and total, so that I have a record of what I asked for.
17. As a shopper, I want a plain statement that no payment happens online and Taylor will follow up, so that I'm not hunting for a checkout button.
18. As a shopper, I want a notes field, so that I can mention a second piece or special request without a cart.

### Taylor (site owner)
19. As Taylor, I want each order request emailed to me with every chosen option and the computed total, so that I can make the piece without back-and-forth.
20. As Taylor, I want to edit bead colors, the charm list, and add-on prices in my Studio, so that seasonal changes never need a developer.
21. As Taylor, I want to mark a product year-round or premade, and handmade or curated, so that the site sorts and badges it correctly on its own.
22. As Taylor, I want the 14 named styles pre-created in my Studio, so that I only add photos as they're shot.
23. As Taylor, I want anklets gone from the storefront but recoverable in the Studio, so that the site matches what I sell without destroying history.
24. As Taylor, I want spam-guarded request forms, so that my inbox holds real orders.

### Housekeeping
25. As a visitor with an old anklets link, I want to land on the shop instead of a 404, so that stale links and search results still work.
26. As a shopper on any device, I want the configurator to work with keyboard and screen reader, so that personalization isn't mouse-only.

## Implementation Decisions

- **Commerce model:** configure-then-inquire; single-item order request through
  the existing Resend email flow. No payments, no cart.
- **New pure quote module** computes line items and total from (product,
  configuration, customization options, pricing). Both the product-page UI and
  the order-request route use it — one source of pricing truth. The request
  route recomputes the total server-side and never trusts a client total.
- **New order-request API route** following the established contact-route
  pattern: zod schema validation, honeypot + minimum-elapsed-time spam guards
  ("pretend success" on spam), Resend send to Taylor with reply-to set to the
  shopper, confirmation copy to the shopper, dev-mode log-only fallback when
  Resend is unconfigured.
- **Schema — product** gains: `availability` ("year-round" | "premade";
  premade keeps the existing sold status, year-round ignores it) and `origin`
  ("handmade" | "curated"). Handmade category listings exclude curated;
  The Edit page shows curated only.
- **Schema — new "Customization" singleton:** bead colors (label + hex),
  charm options, bag-scarf price, initial-charm price. Added to the Studio's
  singleton structure alongside Pricing. Data layer exposes it with a seeded
  fallback, consistent with every other fetch.
- **The Edit** is a normal collection document (title, slug, intro copy from
  the brief, cover image) rendered by the existing collection page machinery.
- **Matching bracelet** is a request-form toggle priced from the bracelets
  base price in the Pricing singleton — not separate products.
- **Anklets:** removed from the category constants, pricing schema/singleton
  UI, seed data, and navigation; permanent redirect from the old anklets
  category URL to the shop; existing Sanity anklet documents unpublished, not
  deleted.
- **Seeding:** the existing idempotent seed script gains the 14 named
  year-round styles (name, bead/color description from the brief,
  `availability: year-round`, `origin: handmade`, no images) and the
  Customization singleton defaults. Cards already tolerate missing images.
- **Revalidation:** the new singleton joins the webhook tag map so Studio
  edits invalidate exactly the affected pages, per the existing tag scheme.
- **Configurator UI** builds on the existing product detail page: options
  render from the Customization singleton, the live total comes from the quote
  module, and the request form replaces any buy affordance. Copy at the
  request step states that payment is arranged by email after confirmation.

## Testing Decisions

- Good tests here exercise external behavior only: given a configuration, the
  quote returns these line items and this total; given this request payload,
  the route responds with this status and sends (or refuses to send) this
  email content. No assertions on internals or markup.
- **Vitest** is introduced with minimal config (first test runner in the repo).
- **Quote module:** table-driven cases — base prices per category, each add-on,
  combinations, premade price overrides, missing-options fallbacks.
- **Order-request route:** called directly as a function of Request →
  Response — valid submission, invalid payload, honeypot hit, too-fast
  submission, unconfigured-Resend behavior, server-side total recompute.
  Prior art: the contact route's shape (no existing tests to copy).
- **Data layer:** year-round/premade filtering, curated exclusion, and
  Customization fallback verified at the exported-function level with seed
  data (Sanity unconfigured path).
- UI/configurator verified visually; no component tests (no repo precedent).

## Out of Scope

- Online payments of any kind (Stripe, Shopify, etc.), carts, or checkout.
- Per-style bracelet products (bracelet is an add-on only).
- Photography and image loading for the 14 styles (content task, post-build).
- Public nav visibility timing for the year-round page (content-readiness
  call, decided at launch, not in code).
- Inventory, order tracking, or any order state beyond the emails.

## Further Notes

- Client to confirm the bag-charm form interpretation (one color, one text
  field, multi-select charms). The model keeps this cheap to change: options
  are data, and only the form-composition rule is code.
- The quote module is deliberately the only place money math lives; if real
  checkout arrives later, it becomes the input to payment-line items, so
  nothing here is throwaway.
- 14 styles are named in the brief against a stated range of 12–15; seed the
  14 and let Taylor add/retire in the Studio.
