# Discovery — Website Product & Collection Brief (client, Aug 2026)

Source: "WEBSITE PRODUCT & COLLECTION BRIEF" PDF from Taylor (client), received 2026-08-26.
Route: Standard (graph-engineer v1.1). Discovery conducted via grilling interview.

## Confirmed decisions

1. **Commerce model: configure-then-inquire.** No online payments this release.
   Customers customize a piece and submit a single-item order request through the
   existing Resend email flow. Taylor receives the full configuration; the
   customer receives a confirmation copy.
2. **Order shape: single-item request.** No cart/basket. A notes field covers
   multi-piece intentions.
3. **Bag charm configuration:** one bead color (six brief colors), one
   "initial or name" text field (~12-char cap), multi-select charms
   (MAMA, Heart, Cross, Smiley, Bow), optional matching bag scarf (+$5).
   *Interpretation to be confirmed with client — non-blocking.*
4. **Customization values live in Sanity:** a new "Customization" singleton
   (bead colors with swatches, charm list, scarf price, initial-charm price),
   seeded from the brief, with code fallbacks per the site's existing pattern.
5. **Matching bracelet = add-on toggle** on the necklace request form, priced
   from the bracelets base price. Not separate products.
6. **Year-round vs premade = product `availability` field.** Year-round pieces
   are made to order and never sold out; premade pieces are one-offs that can
   sell. Collection pages query by field; badges surface the distinction.
7. **The Edit = product `origin` field (handmade | curated) + a normal
   collection document.** Curated pieces are excluded from handmade listings
   and badged; the collection doc carries the client's intro copy.
8. **Anklets: remove + redirect + archive.** Strip from categories, pricing,
   seed, and nav; 301-redirect the old category URL to the shop; unpublish
   (not delete) anklet products in Sanity.
9. **Content: seed now, photos later.** The seed script creates all 14 named
   year-round styles from the brief without images; photos arrive via the
   Studio. Public visibility of the year-round page may gate on content
   readiness (nav-link decision deferred).
10. **Pricing presentation: live-computed total** on product pages as add-ons
    toggle, with a clear "no payment is taken online" note at the request step.

## Testing seams (confirmed)

- One NEW seam: a pure quote module — (product, configuration, customization
  options, pricing) → line items + total — shared by the product page UI and
  the order-request route so displayed and emailed totals cannot diverge.
- Existing seams: the order-request API route (modeled on the contact route:
  zod validation, honeypot + timing spam guards, Resend send) and the data
  layer (Sanity/seed fallback functions).
- Vitest added with minimal config; tests only at the quote and route seams.
  UI verified visually (no component-test precedent in repo).

## Out of scope (this release)

Real checkout/payments (Stripe etc.), multi-item cart, per-style bracelet
products, photography itself.

## Open items for client (non-blocking)

- Confirm bag-charm form interpretation (one color / one text / multi charms).
- Decide when the year-round page becomes publicly linked (photo readiness).

Approved: discovery by Ross Montgomery, 2026-08-26.
